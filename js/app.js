window.COURSES_DB = window.COURSES_DB || {};
let activeCourseKey = localStorage.getItem('gs_active_course') || 'mat204_grup';
let modulesDB = (window.COURSES_DB && window.COURSES_DB[activeCourseKey]) ? window.COURSES_DB[activeCourseKey].modules : {};

// ================= DYNAMIC COURSE LOADER (Modular Data Fetching) =================
const loadedCoursePromises = {};

function loadScriptAsync(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = (err) => reject(new Error('Script load failed: ' + src));
        document.head.appendChild(s);
    });
}

function showLoadingToast(msg) {
    let toast = document.getElementById('portal-loading-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portal-loading-toast';
        toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; background: rgba(15, 23, 42, 0.94); color: #fff; padding: 10px 18px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; box-shadow: 0 8px 24px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; gap: 10px; z-index: 99999; backdrop-filter: blur(8px); transition: opacity 0.2s ease;';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="font-size: 1.1rem;">⏳</span> <span>${msg || 'Ders içeriği yükleniyor...'}</span>`;
    toast.style.display = 'flex';
    toast.style.opacity = '1';
}

function hideLoadingToast() {
    const toast = document.getElementById('portal-loading-toast');
    if (toast) {
        toast.style.opacity = '0';
        setTimeout(() => { toast.style.display = 'none'; }, 200);
    }
}

async function ensureCourseLoaded(courseKey) {
    if (!courseKey) courseKey = 'mat204_grup';
    window.COURSES_DB = window.COURSES_DB || {};
    
    if (window.COURSES_DB[courseKey] && window.COURSES_DB[courseKey].modules) {
        return window.COURSES_DB[courseKey];
    }
    
    if (loadedCoursePromises[courseKey]) {
        return loadedCoursePromises[courseKey];
    }
    
    const manifest = (typeof COURSES_MANIFEST !== 'undefined') ? COURSES_MANIFEST[courseKey] : null;
    const courseTitle = manifest ? `${manifest.code} (${manifest.title})` : courseKey;
    showLoadingToast(`${courseTitle} yükleniyor...`);
    
    loadedCoursePromises[courseKey] = (async () => {
        try {
            if (window.location.protocol !== 'file:') {
                const res = await fetch(`data/courses/${courseKey}.json?v=7`);
                if (res.ok) {
                    const data = await res.json();
                    window.COURSES_DB[courseKey] = data;
                    return data;
                }
            }
        } catch(e) {
            console.warn(`[MathPortal] Fetch failed for ${courseKey}, falling back to script injection:`, e);
        }
        
        try {
            await loadScriptAsync(`data/courses/${courseKey}.js?v=7`);
            if (window.COURSES_DB[courseKey]) {
                return window.COURSES_DB[courseKey];
            }
        } catch(err) {
            console.error(`[MathPortal] Failed to load course ${courseKey}:`, err);
        }
        
        if (typeof COURSES_DB !== 'undefined' && COURSES_DB[courseKey]) {
            return COURSES_DB[courseKey];
        }
        
        throw new Error(`Ders yüklenemedi: ${courseKey}`);
    })().finally(() => {
        hideLoadingToast();
        delete loadedCoursePromises[courseKey];
    });
    
    return loadedCoursePromises[courseKey];
}

                // ================= FLASHCARDS REPOSITORY =================


// ================= CLOUD SYNC ENGINE (Multi-Device Sync) =================
const SYNC_API_URL = (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'https://gsu-akademik-portal.vercel.app/api/sync'
    : '/api/sync';

let isCloudSyncing = false;

function updateSyncStatusUI(status, label) {
    const el = document.getElementById('cloud-sync-status');
    const txt = document.getElementById('cloud-sync-text');
    if (!el || !txt) return;
    el.className = 'cloud-sync-status ' + (status || '');
    if (label) txt.textContent = label;
}

function getAllLocalData() {
    const courses = {};
    const courseKeys = (typeof COURSES_DB !== 'undefined') ? Object.keys(COURSES_DB) : ['mat204_grup', 'mat201_seriler', 'fiz101_fizik', 'mat206_olasilik'];
    courseKeys.forEach(cKey => {
        let st = [];
        let sol = [];
        let th = [];
        try {
            const stRaw = localStorage.getItem(cKey + '_starred_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_starred_ex') : null);
            if (stRaw) st = JSON.parse(stRaw);
        } catch(e) {}
        try {
            const solRaw = localStorage.getItem(cKey + '_solved_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_solved_ex') : null);
            if (solRaw) sol = JSON.parse(solRaw);
        } catch(e) {}
        try {
            const thRaw = localStorage.getItem(cKey + '_completed_theories') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_completed_theories') : null);
            if (thRaw) th = JSON.parse(thRaw);
        } catch(e) {}

        courses[cKey] = {
            starred: st,
            completed: sol,
            completedTheory: th
        };
    });
    return courses;
}

async function fetchFromCloud(isInitial) {
    if (isCloudSyncing) return;
    isCloudSyncing = true;
    updateSyncStatusUI('syncing', 'Eşitleniyor...');

    try {
        const resp = await fetch(SYNC_API_URL, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        const json = await resp.json();
        if (json && json.success && json.data) {
            const cloudCourses = json.data.courses || {};
            let localChanged = false;
            let needsUpload = false;
            const localData = getAllLocalData();

            for (const cKey in cloudCourses) {
                const cloudC = cloudCourses[cKey] || {};
                const localC = localData[cKey] || { starred: [], completed: [], completedTheory: [] };

                // Starred merge
                const cloudStarred = cloudC.starred || [];
                const localStarred = localC.starred || [];
                const mergedStarred = Array.from(new Set([...localStarred, ...cloudStarred]));
                if (mergedStarred.length !== localStarred.length) {
                    try { localStorage.setItem(cKey + '_starred_ex', JSON.stringify(mergedStarred)); } catch(e) {}
                    localChanged = true;
                }
                if (mergedStarred.length !== cloudStarred.length) needsUpload = true;

                // Completed exercises merge
                const cloudSolved = cloudC.completed || [];
                const localSolved = localC.completed || [];
                const mergedSolved = Array.from(new Set([...localSolved, ...cloudSolved]));
                if (mergedSolved.length !== localSolved.length) {
                    try { localStorage.setItem(cKey + '_solved_ex', JSON.stringify(mergedSolved)); } catch(e) {}
                    localChanged = true;
                }
                if (mergedSolved.length !== cloudSolved.length) needsUpload = true;

                // Completed theories merge
                const cloudTheories = cloudC.completedTheory || [];
                const localTheories = localC.completedTheory || [];
                const mergedTheories = Array.from(new Set([...localTheories, ...cloudTheories]));
                if (mergedTheories.length !== localTheories.length) {
                    try { localStorage.setItem(cKey + '_completed_theories', JSON.stringify(mergedTheories)); } catch(e) {}
                    localChanged = true;
                }
                if (mergedTheories.length !== cloudTheories.length) needsUpload = true;
            }

            for (const cKey in localData) {
                if (!cloudCourses[cKey] && (localData[cKey].starred.length || localData[cKey].completed.length || localData[cKey].completedTheory.length)) {
                    needsUpload = true;
                }
            }

            if (localChanged) {
                updateProgressUI();
                if (currentViewMode === 'special' && currentSpecialView === 'starred') {
                    openStarredPool();
                } else if (currentViewMode === 'module') {
                    renderModuleView();
                }
            }

            if (needsUpload) {
                const mergedState = getAllLocalData();
                fetch(SYNC_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'sync', courses: mergedState })
                }).catch(() => {});
            }

            updateSyncStatusUI('', 'Bulut: Eşitlendi');
        } else {
            updateSyncStatusUI('', 'Bulut: Aktif');
        }
    } catch(err) {
        console.warn('Cloud sync error:', err);
        updateSyncStatusUI('error', 'Çevrimdışı (Yerel)');
    } finally {
        isCloudSyncing = false;
    }
}

async function syncToggleStarToCloud(courseKey, exId, isStarred) {
    updateSyncStatusUI('syncing', 'Kaydediliyor...');
    try {
        await fetch(SYNC_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'toggle_star',
                courseKey: courseKey,
                exerciseId: exId,
                starred: isStarred
            })
        });
        updateSyncStatusUI('', 'Bulut: Eşitlendi');
    } catch(e) {
        console.warn('Sync star error:', e);
        updateSyncStatusUI('error', 'Bulut: Beklemede');
    }
}

async function syncToggleSolvedToCloud(courseKey, exId, isSolved) {
    updateSyncStatusUI('syncing', 'Kaydediliyor...');
    try {
        await fetch(SYNC_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'toggle_complete',
                courseKey: courseKey,
                exerciseId: exId,
                completed: isSolved
            })
        });
        updateSyncStatusUI('', 'Bulut: Eşitlendi');
    } catch(e) {
        console.warn('Sync solved error:', e);
        updateSyncStatusUI('error', 'Bulut: Beklemede');
    }
}

async function syncToggleTheoryToCloud(courseKey, modKey, isDone) {
    updateSyncStatusUI('syncing', 'Kaydediliyor...');
    try {
        await fetch(SYNC_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'set_theory_done',
                courseKey: courseKey,
                moduleKey: modKey,
                done: isDone
            })
        });
        updateSyncStatusUI('', 'Bulut: Eşitlendi');
    } catch(e) {
        console.warn('Sync theory error:', e);
        updateSyncStatusUI('error', 'Bulut: Beklemede');
    }
}

function triggerManualSync() {
    fetchFromCloud(false);
}

// ================= PROGRESS TRACKING (localStorage) =================
        function getSolvedExercises() {
            try {
                const key = activeCourseKey + '_solved_ex';
                const stored = localStorage.getItem(key) || (activeCourseKey === 'mat204_grup' ? localStorage.getItem('mat204_solved_ex') : null);
                return stored ? JSON.parse(stored) : [];
            } catch(e) {
                return [];
            }
        }

        function setExerciseSolved(exId, isSolved) {
            let list = getSolvedExercises();
            if (isSolved) {
                if (!list.includes(exId)) list.push(exId);
            } else {
                list = list.filter(id => id !== exId);
            }
            try {
                localStorage.setItem(activeCourseKey + '_solved_ex', JSON.stringify(list));
            } catch(e) {}
            updateProgressUI();
            renderModuleView();
            syncToggleSolvedToCloud(activeCourseKey, exId, isSolved);
        }

        function getCompletedTheories() {
            try {
                const key = activeCourseKey + '_completed_theories';
                const stored = localStorage.getItem(key) || (activeCourseKey === 'mat204_grup' ? localStorage.getItem('mat204_completed_theories') : null);
                return stored ? JSON.parse(stored) : [];
            } catch(e) {
                return [];
            }
        }

        function setTheoryCompleted(modId, isCompleted) {
            let list = getCompletedTheories();
            if (isCompleted) {
                if (!list.includes(modId)) list.push(modId);
            } else {
                list = list.filter(id => id !== modId);
            }
            try {
                localStorage.setItem(activeCourseKey + '_completed_theories', JSON.stringify(list));
            } catch(e) {}
            updateProgressUI();
            renderModuleView();
            syncToggleTheoryToCloud(activeCourseKey, modId, isCompleted);
        }

        function updateProgressUI() {
            const solved = getSolvedExercises();
            const theories = getCompletedTheories();
            let totalItems = 0;
            let completedItems = 0;
            let unresolvedCount = 0;

            Object.keys(modulesDB).forEach(modKey => {
                const mod = modulesDB[modKey];
                let modSolved = 0;
                mod.exercises.forEach(ex => {
                    totalItems++;
                    if (solved.includes(ex.id)) {
                        completedItems++;
                        modSolved++;
                    } else {
                        unresolvedCount++;
                    }
                });

                // Add theory item to progress
                totalItems++;
                if (theories.includes(modKey)) {
                    completedItems++;
                }

                const badge = document.getElementById('badge-' + modKey);
                if (badge) {
                    badge.textContent = `${modSolved}/${mod.exercises.length}`;
                    if (modSolved === mod.exercises.length) {
                        badge.style.background = 'rgba(52, 211, 153, 0.2)';
                        badge.style.color = 'var(--accent-emerald)';
                    } else {
                        badge.style.background = 'rgba(125, 125, 125, 0.15)';
                        badge.style.color = 'inherit';
                    }
                }
            });

            const starList = getStarredExercises();
            const starBadge = document.getElementById('badge-starred-count');
            if (starBadge) starBadge.textContent = `${starList.length} Kayıt`;

            const unBadge = document.getElementById('badge-unresolved-count');
            if (unBadge) unBadge.textContent = `${unresolvedCount} Soru`;

            const pct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
            const pctDisplay = document.getElementById('progress-pct-display');
            const barFill = document.getElementById('progress-bar-fill');
            if (pctDisplay) pctDisplay.textContent = `${pct}% (${completedItems}/${totalItems})`;
            if (barFill) barFill.style.width = `${pct}%`;
        }


        // ================= SIDEBAR TOGGLE =================
        function toggleSidebar() {
            const aside = document.querySelector('aside');
            const isCollapsed = aside.classList.toggle('collapsed');
            document.body.classList.toggle('sidebar-is-collapsed', isCollapsed);
            try {
                localStorage.setItem('mat204_sidebar_collapsed', isCollapsed ? '1' : '0');
            } catch(e) {}
        }

        // Check stored sidebar state
        (function initSidebarState() {
            try {
                if (localStorage.getItem('mat204_sidebar_collapsed') === '1') {
                    document.addEventListener('DOMContentLoaded', () => {
                        const aside = document.querySelector('aside');
                        if (aside) {
                            aside.classList.add('collapsed');
                            document.body.classList.add('sidebar-is-collapsed');
                        }
                    });
                }
            } catch(e) {}
        })();

        // Keyboard shortcut: [ or \ to toggle sidebar
        document.addEventListener('keydown', function(e) {
            if ((e.key === '[' || e.key === '\\') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                toggleSidebar();
            }
        });

        // ================= STATE MANAGEMENT & PERSISTENCE =================
        let currentViewMode = 'module'; // 'module' or 'special'
        let currentSpecialView = null; // 'pitfalls', 'mock-exam', 'unresolved', 'flashcards', 'ispatlar', 'fransizca', 'hesaplayici'
        let currentModuleKey = 'modul1';
        let currentTrack = 'theory'; // 'theory' (Konu Anlatımı & Teori Kitabı) or 'exercises'
        let currentExerciseIdx = 0;
        let currentStepIdx = 1;
        let showAllStepsMode = false;
        let isHintVisible = false;
        let currentTheoryPageIdx = 0; // for paginated theory
        let showAllTheoryPages = false;
        let currentCardIdx = 0;

        function saveAppState() {
            try {
                const state = {
                    courseKey: activeCourseKey,
                    viewMode: currentViewMode,
                    specialView: currentSpecialView,
                    moduleKey: currentModuleKey,
                    track: currentTrack,
                    exerciseIdx: currentExerciseIdx,
                    theoryPageIdx: currentTheoryPageIdx,
                    showAllTheoryPages: showAllTheoryPages
                };
                localStorage.setItem('gs_portal_state_' + activeCourseKey, JSON.stringify(state));
                localStorage.setItem('gs_active_course', activeCourseKey);

                let hash = '';
                if (currentViewMode === 'special' && currentSpecialView) {
                    hash = `#/${activeCourseKey}/special/${currentSpecialView}`;
                } else if (currentTrack === 'theory') {
                    hash = `#/${activeCourseKey}/${currentModuleKey}/theory/${currentTheoryPageIdx}`;
                } else {
                    hash = `#/${activeCourseKey}/${currentModuleKey}/exercises/${currentExerciseIdx}`;
                }
                if (window.location.hash !== hash) {
                    history.replaceState(null, '', hash);
                }
            } catch(e) {}
        }

        async function restoreAppState() {
            // 1. Try URL Hash: #/courseKey/moduleKey/track/idx or #/courseKey/special/viewKey
            const hash = window.location.hash;
            if (hash && hash.startsWith('#/')) {
                const parts = hash.slice(2).split('/');
                const cKey = parts[0];
                const part2 = parts[1];
                const part3 = parts[2];
                const part4 = parts[3];

                const manifest = (typeof COURSES_MANIFEST !== 'undefined') ? COURSES_MANIFEST[cKey] : null;
                if (cKey && (manifest || (window.COURSES_DB && window.COURSES_DB[cKey]))) {
                    activeCourseKey = cKey;
                    await ensureCourseLoaded(activeCourseKey);
                    modulesDB = COURSES_DB[activeCourseKey].modules;
                    try { localStorage.setItem('gs_active_course', activeCourseKey); } catch(e) {}

                    if (part2 === 'special' && part3) {
                        currentViewMode = 'special';
                        currentSpecialView = part3;
                        return true;
                    } else if (part2 && modulesDB[part2]) {
                        currentViewMode = 'module';
                        currentSpecialView = null;
                        currentModuleKey = part2;
                        currentTrack = (part3 === 'exercises') ? 'exercises' : 'theory';
                        if (currentTrack === 'theory') {
                            currentTheoryPageIdx = parseInt(part4, 10) || 0;
                        } else {
                            currentExerciseIdx = parseInt(part4, 10) || 0;
                        }
                        return true;
                    }
                }
            }

            // 2. Try LocalStorage
            try {
                const savedCourse = localStorage.getItem('gs_active_course') || 'mat204_grup';
                const manifest = (typeof COURSES_MANIFEST !== 'undefined') ? COURSES_MANIFEST[savedCourse] : null;
                if (manifest || (window.COURSES_DB && window.COURSES_DB[savedCourse])) {
                    activeCourseKey = savedCourse;
                    await ensureCourseLoaded(activeCourseKey);
                    modulesDB = COURSES_DB[activeCourseKey].modules;
                }
                const savedStateStr = localStorage.getItem('gs_portal_state_' + activeCourseKey);
                if (savedStateStr) {
                    const st = JSON.parse(savedStateStr);
                    if (st.viewMode === 'special' && st.specialView) {
                        currentViewMode = 'special';
                        currentSpecialView = st.specialView;
                        return true;
                    } else if (st.moduleKey && modulesDB[st.moduleKey]) {
                        currentViewMode = 'module';
                        currentSpecialView = null;
                        currentModuleKey = st.moduleKey;
                        currentTrack = st.track || 'theory';
                        currentExerciseIdx = parseInt(st.exerciseIdx, 10) || 0;
                        currentTheoryPageIdx = parseInt(st.theoryPageIdx, 10) || 0;
                        showAllTheoryPages = !!st.showAllTheoryPages;
                        return true;
                    }
                }
            } catch(e) {}

            // 3. Fallback to first module
            await ensureCourseLoaded(activeCourseKey || 'mat204_grup');
            modulesDB = COURSES_DB[activeCourseKey].modules;
            currentViewMode = 'module';
            currentSpecialView = null;
            currentModuleKey = Object.keys(modulesDB)[0];
            currentTrack = 'theory';
            currentExerciseIdx = 0;
            currentTheoryPageIdx = 0;
            return false;
        }

        function renderCurrentView() {
            if (currentViewMode === 'special') {
                if (currentSpecialView === 'starred') openStarredPool();
                else if (currentSpecialView === 'unresolved') openUnresolvedPool();
                else if (currentSpecialView === 'flashcards') openFlashcardArena();
                else if (currentSpecialView === 'pitfalls') loadPitfallsView();
                else if (currentSpecialView === 'mock-exam') loadMockExamView();
                else if (currentSpecialView) loadSpecialView(currentSpecialView);
                else {
                    currentViewMode = 'module';
                    currentSpecialView = null;
                    setActiveNav('nav-' + currentModuleKey);
                    renderModuleView();
                }
            } else {
                setActiveNav('nav-' + currentModuleKey);
                renderModuleView();
            }
        }

        function setActiveNav(navId) {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            if (navId) {
                const target = document.getElementById(navId);
                if (target) target.classList.add('active');
            }
        }

        function loadModule(modKey) {
            currentViewMode = 'module';
            currentSpecialView = null;
            currentModuleKey = modKey;
            if (!currentTrack) currentTrack = 'theory';
            currentExerciseIdx = 0;
            currentStepIdx = 1;
            showAllStepsMode = false;
            isHintVisible = false;
            currentTheoryPageIdx = 0;
            showAllTheoryPages = false;
            setActiveNav('nav-' + modKey);
            renderModuleView();
            saveAppState();
        }

        function switchTrack(trackName) {
            currentTrack = trackName;
            currentStepIdx = 1;
            showAllStepsMode = false;
            isHintVisible = false;
            renderModuleView();
            saveAppState();
        }

        function switchExercise(exIdx) {
            currentExerciseIdx = exIdx;
            currentStepIdx = 1;
            showAllStepsMode = false;
            isHintVisible = false;
            renderModuleView();
            saveAppState();
        }

        function nextStep() {
            const mod = modulesDB[currentModuleKey];
            const ex = mod.exercises[currentExerciseIdx];
            if (currentStepIdx < ex.steps.length) {
                currentStepIdx++;
                renderModuleView();
            }
        }

        function toggleAllSteps() {
            showAllStepsMode = !showAllStepsMode;
            if (showAllStepsMode) {
                const mod = modulesDB[currentModuleKey];
                const ex = mod.exercises[currentExerciseIdx];
                currentStepIdx = ex.steps.length;
            } else {
                currentStepIdx = 1;
            }
            renderModuleView();
        }

        function resetSteps() {
            currentStepIdx = 1;
            showAllStepsMode = false;
            renderModuleView();
        }

        function toggleHint() {
            isHintVisible = !isHintVisible;
            const hintBox = document.getElementById('question-hint-box');
            if (hintBox) {
                hintBox.style.display = isHintVisible ? 'block' : 'none';
                if (isHintVisible && typeof renderMathInElement !== 'undefined') {
                    renderMathInElement(hintBox, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '$', right: '$', display: false}
                        ],
                        throwOnError: false
                    });
                }
            }
        }

        function switchTheoryPage(pageIdx) {
            currentTheoryPageIdx = pageIdx;
            showAllTheoryPages = false;
            renderModuleView();
            saveAppState();
        }

        function toggleAllTheoryPages() {
            showAllTheoryPages = !showAllTheoryPages;
            renderModuleView();
            saveAppState();
        }

        // ================= MAIN RENDER FUNCTION =================
        function renderModuleView() {
            const main = document.getElementById('main-content');
            const mod = modulesDB[currentModuleKey];
            if (!mod || !main) return;
            const solvedList = getSolvedExercises();
            const completedTheories = getCompletedTheories();
            const isTheoryCompleted = completedTheories.includes(mod.id);

            // Luxury Track Switcher
            const luxurySwitcherHTML = `
                <div class="luxury-track-switcher">
                    <button class="luxury-track-btn ${currentTrack === 'theory' ? 'active' : ''}" onclick="switchTrack('theory')">
                        <span class="track-icon">${window.ICONS ? window.ICONS.book : ""}</span>
                        <div class="track-text-group">
                            <span class="track-main-label">Konu Anlatımı &amp; Teori Kitabı</span>
                            <span class="track-sub-label">Sayfa sayfa anlatım + İçiçe çözümlü örnekler</span>
                        </div>
                    </button>
                    <button class="luxury-track-btn ${currentTrack === 'exercises' ? 'active' : ''}" onclick="switchTrack('exercises')">
                        <span class="track-icon">${window.ICONS ? window.ICONS.penTool : ""}</span>
                        <div class="track-text-group">
                            <span class="track-main-label">İnteraktif TD Soru Bankası</span>
                            <span class="track-sub-label">Adım adım koç rehberli çözümler (${mod.exercises.length} Soru)</span>
                        </div>
                        <span class="track-count-badge">${mod.exercises.length}</span>
                    </button>
                </div>
            `;

            if (currentTrack === 'theory') {
                // RENDER PAGINATED THEORY BOOK
                const pages = mod.theoryPages || [{ title: 'Tam Konu Anlatımı', html: mod.theoryContent }];
                let pagesNavHTML = '';
                
                if (pages.length > 1) {
                    pagesNavHTML = '<div class="theory-pages-nav">';
                    pages.forEach((p, idx) => {
                        const activeClass = (!showAllTheoryPages && idx === currentTheoryPageIdx) ? 'active' : '';
                        pagesNavHTML += `<button class="theory-page-btn ${activeClass}" onclick="switchTheoryPage(${idx})">${window.ICONS ? window.ICONS.fileText : ""} Sayfa ${idx+1}: ${p.title.split(':')[0]}</button>`;
                    });
                    pagesNavHTML += `<button class="theory-page-btn ${showAllTheoryPages ? 'active' : ''}" onclick="toggleAllTheoryPages()">${window.ICONS ? window.ICONS.book : ""} Tüm Kitabı Tek Sayfada Gör</button>`;
                    pagesNavHTML += '</div>';
                }

                let currentContentHTML = '';
                if (showAllTheoryPages || pages.length <= 1) {
                    currentContentHTML = mod.theoryContent;
                } else {
                    currentContentHTML = pages[currentTheoryPageIdx].html;
                }

                // Add pagination bottom bar if paginated
                let paginationBottomBar = '';
                if (pages.length > 1 && !showAllTheoryPages) {
                    paginationBottomBar = `
                        <div style="margin-top: 30px; padding-top: 18px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <div>
                                ${currentTheoryPageIdx > 0 ? `
                                    <button class="btn-stepper" onclick="switchTheoryPage(${currentTheoryPageIdx - 1})">
                                        ${window.ICONS ? window.ICONS.arrowLeft : ""} Önceki Sayfa (${pages[currentTheoryPageIdx - 1].title.split(':')[0]})
                                    </button>
                                ` : '<span></span>'}
                            </div>
                            <span style="font-size: 0.86rem; color: var(--text-muted); font-weight: 600;">
                                Sayfa ${currentTheoryPageIdx + 1} / ${pages.length}
                            </span>
                            <div>
                                ${currentTheoryPageIdx + 1 < pages.length ? `
                                    <button class="btn-stepper primary" onclick="switchTheoryPage(${currentTheoryPageIdx + 1})">
                                        Sonraki Sayfa (${pages[currentTheoryPageIdx + 1].title.split(':')[0]}) ${window.ICONS ? window.ICONS.arrowRight : ""}
                                    </button>
                                ` : `
                                    <button class="btn-stepper primary" onclick="switchTrack('exercises')">
                                        Bu Modülün TD Sorularına Geç (${mod.exercises.length} Soru) ${window.ICONS ? window.ICONS.arrowRight : ""}
                                    </button>
                                `}
                            </div>
                        </div>
                    `;
                }

                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">${mod.breadcrumb} > Kapsamlı Ders Kitabı &amp; Teori</div>
                            <h1 class="content-title">${mod.title}</h1>
                        </div>
                    </div>

                    ${luxurySwitcherHTML}

                    ${pagesNavHTML}

                    <div class="academic-card">
                        ${currentContentHTML}

                        ${paginationBottomBar}

                        <div style="margin-top: 36px; border-top: 1px dashed var(--border-subtle); padding-top: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                            <div>
                                ${!isTheoryCompleted ? `
                                    <button class="btn-stepper success" onclick="setTheoryCompleted('${mod.id}', true)">
                                        ${window.ICONS ? window.ICONS.check : ""} Konu Anlatımını Tamamladım
                                    </button>
                                ` : `
                                    <button class="btn-stepper completed-state">
                                        ${window.ICONS ? window.ICONS.check : ""} Konu Anlatımı Tamamlandı
                                    </button>
                                    <button class="btn-stepper" onclick="setTheoryCompleted('${mod.id}', false)" style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">
                                        İşareti Kaldır
                                    </button>
                                `}
                            </div>
                            <button class="btn-stepper primary" onclick="switchTrack('exercises')">
                                Bu Modülün TD Sorularına Geç (${mod.exercises.length} Soru) ${window.ICONS ? window.ICONS.arrowRight : ""}
                            </button>
                        </div>
                    </div>
                `;
            } else {
                // RENDER INTERACTIVE STEP-BY-STEP EXERCISE VIEW
                if (currentExerciseIdx >= mod.exercises.length) {
                    currentExerciseIdx = 0;
                }
                const ex = mod.exercises[currentExerciseIdx];
                const isSolved = solvedList.includes(ex.id);
                const steps = ex.steps || [{ title: 'Démonstration', content: ex.solution }];

                // Pills bar for all questions
                let pillsHTML = '<div class="exercise-pills-bar">';
                mod.exercises.forEach((item, idx) => {
                    const activeClass = idx === currentExerciseIdx ? 'active' : '';
                    const checkIcon = solvedList.includes(item.id) ? '<span class="pill-check">✓</span>' : '';
                    pillsHTML += `<button class="pill-btn ${activeClass}" onclick="switchExercise(${idx})">${checkIcon} ${item.name}</button>`;
                });
                pillsHTML += '</div>';

                // Step progress dots
                let dotsHTML = '';
                for (let i = 0; i < steps.length; i++) {
                    let dotClass = '';
                    if (i < currentStepIdx) dotClass = 'completed';
                    if (i === currentStepIdx - 1) dotClass = 'active';
                    dotsHTML += `<div class="step-dot ${dotClass}" title="Adım ${i+1}"></div>`;
                }

                // Render revealed steps
                let stepsHTML = '';
                const displayCount = showAllStepsMode ? steps.length : Math.min(currentStepIdx, steps.length);
                for (let i = 0; i < displayCount; i++) {
                    const s = steps[i];
                    stepsHTML += `
                        <div class="step-block-card">
                            <div class="step-block-header">
                                <span class="step-number-tag">Adım ${i+1}</span>
                                <span class="step-title-text">${s.title}</span>
                            </div>
                            <div class="step-body-content">${s.content}</div>
                        </div>
                    `;
                }

                // Stepper Action Buttons
                const allRevealed = displayCount >= steps.length;
                let stepperActionsHTML = '';

                if (!allRevealed) {
                    stepperActionsHTML = `
                        <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                            <button class="btn-stepper primary pulse-btn" onclick="nextStep()">
                                ${window.ICONS ? window.ICONS.arrowRight : ""} Sıradaki Adım (${currentStepIdx + 1}/${steps.length})
                            </button>
                            <button class="btn-stepper" onclick="toggleAllSteps()" style="font-size: 0.85rem;">
                                ${window.ICONS ? window.ICONS.eye : ""} Tüm Çözümü Göster
                            </button>
                            <button class="btn-stepper hint-btn" onclick="toggleHint()">
                                ${window.ICONS ? window.ICONS.compass : ""} Sınav İpucu &amp; Yöntem
                            </button>
                        </div>
                    `;
                } else {
                    stepperActionsHTML = `
                        <div class="step-complete-celebration">
                            <span class="award-badge-icon">${window.ICONS ? window.ICONS.award : ""}</span>
                            <div>
                                <strong>Tüm Çözüm Adımları Tamamlandı.</strong> İspatı incelediyseniz bu soruyu "Çözüldü" olarak kaydedebilirsiniz.
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                            ${!isSolved ? `
                                <button class="btn-stepper success" onclick="setExerciseSolved('${ex.id}', true)">
                                    ${window.ICONS ? window.ICONS.check : ""} Çözüldü Olarak İşaretle
                                </button>
                            ` : `
                                <button class="btn-stepper completed-state">
                                    ${window.ICONS ? window.ICONS.check : ""} Çözüldü Olarak Kaydedildi
                                </button>
                                <button class="btn-stepper" onclick="setExerciseSolved('${ex.id}', false)" style="font-size: 0.8rem; color: var(--text-muted);">
                                    İşareti Kaldır
                                </button>
                            `}
                            ${currentExerciseIdx + 1 < mod.exercises.length ? `
                                <button class="btn-stepper primary" onclick="switchExercise(${currentExerciseIdx + 1})">
                                    Sıradaki Soru (${currentExerciseIdx + 2}/${mod.exercises.length}) ${window.ICONS ? window.ICONS.arrowRight : ""}
                                </button>
                            ` : ''}
                            <button class="btn-stepper" onclick="resetSteps()" style="font-size: 0.82rem; color: var(--text-muted);">
                                ${window.ICONS ? window.ICONS.refresh : ""} Başa Dön
                            </button>
                            <button class="btn-stepper hint-btn" onclick="toggleHint()">
                                ${window.ICONS ? window.ICONS.compass : ""} Sınav İpucu
                            </button>
                        </div>
                    `;
                }

                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">${mod.breadcrumb} > TD Soru Bankası (${currentExerciseIdx + 1} / ${mod.exercises.length})</div>
                            <h1 class="content-title">${mod.title}</h1>
                        </div>
                    </div>

                    ${luxurySwitcherHTML}

                    ${pillsHTML}

                    <div class="academic-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); background: var(--term-link-bg); padding: 4px 10px; border-radius: 4px;">
                                    ${ex.tag || 'TD Sorusu'} • Soru ${currentExerciseIdx + 1} / ${mod.exercises.length}
                                </span>
                                <button class="btn-star ${getStarredExercises().includes(ex.id) ? 'starred' : ''}" onclick="toggleStar('${ex.id}')">
                                    ${getStarredExercises().includes(ex.id) ? (window.ICONS ? window.ICONS.starFilled : "") + " Yıldızlı" : (window.ICONS ? window.ICONS.star : "") + " Yıldıza Ekle"}
                                </button>
                                <button class="btn-stepper secondary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="copyCurrentQuestion()" title="Soru metnini ve LaTeX kodunu panoya kopyala">
                                    ${window.ICONS ? window.ICONS.copy : ""} Soruyu Kopyala
                                </button>
                            </div>
                            <span style="font-size: 0.82rem; font-weight: 600; color: ${isSolved ? 'var(--accent-emerald)' : 'var(--text-muted)'};">
                                ${isSolved ? (window.ICONS ? window.ICONS.check : "") + " Çözüldü" : "Henüz Çözülmedi"}
                            </span>
                        </div>

                        <div class="question-statement" style="font-size: 1.18rem; margin-bottom: 18px; line-height: 1.7;">
                            ${ex.enonce}
                        </div>

                        <div id="question-hint-box" class="hint-callout-box" style="display: ${isHintVisible ? 'block' : 'none'};">
                            <strong>${window.ICONS ? window.ICONS.compass : ""} Sınav Taktik İpucu:</strong> ${ex.hint}
                        </div>

                        <div class="exam-sheet">
                            <div class="exam-sheet-header">
                                <span class="exam-sheet-title">${window.ICONS ? window.ICONS.listTodo : ""} Ayrıntılı Sınav Çözümü &amp; Adım Adım İspat</span>
                                <div class="step-progress-indicator" style="margin-bottom: 0; padding: 4px 10px;">
                                    <span class="step-badge">Adım ${displayCount} / ${steps.length}</span>
                                    <div class="step-dots" style="margin-left: 10px;">
                                        ${dotsHTML}
                                    </div>
                                </div>
                            </div>
                            <div class="exam-sheet-body" style="padding: 22px;">
                                ${stepsHTML}
                                ${stepperActionsHTML}
                            </div>
                        </div>
                    </div>
                `;
            }

            renderMath();
        }


                        // ================= UNRESOLVED POOL (Çözülmemiş Sorular Havuzu) =================
        function openUnresolvedPool(filterCourseKey = null) {
            currentViewMode = 'special';
            currentSpecialView = 'unresolved';
            setActiveNav('nav-unresolved');
            saveAppState();

            const main = document.getElementById('main-content');
            const courseKeys = Object.keys(COURSES_DB);
            
            // Calculate unresolved counts per course
            const countsPerCourse = {};
            let totalUnresolvedAcrossAll = 0;
            courseKeys.forEach(cKey => {
                const c = COURSES_DB[cKey];
                let solved = [];
                try {
                    const raw = localStorage.getItem(cKey + '_solved_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_solved_ex') : null);
                    solved = raw ? JSON.parse(raw) : [];
                } catch(e) {}
                let cCount = 0;
                Object.keys(c.modules).forEach(mKey => {
                    c.modules[mKey].exercises.forEach(ex => {
                        if (!solved.includes(ex.id)) cCount++;
                    });
                });
                countsPerCourse[cKey] = cCount;
                totalUnresolvedAcrossAll += cCount;
            });

            const activeFilter = filterCourseKey === 'all' ? 'all' : (filterCourseKey || activeCourseKey);
            const coursesToScan = activeFilter === 'all' ? courseKeys : [activeFilter];

            let poolHTML = '';
            let displayedCount = 0;

            coursesToScan.forEach(cKey => {
                const c = COURSES_DB[cKey];
                if (!c) return;
                let solved = [];
                try {
                    const raw = localStorage.getItem(cKey + '_solved_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_solved_ex') : null);
                    solved = raw ? JSON.parse(raw) : [];
                } catch(e) {}

                Object.keys(c.modules).forEach(modKey => {
                    const mod = c.modules[modKey];
                    mod.exercises.forEach((ex, idx) => {
                        if (!solved.includes(ex.id)) {
                            displayedCount++;
                            const cleanPreview = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '';
                            poolHTML += `
                                <div class="pool-item" onclick="switchCourseAndJump('${cKey}', '${modKey}', ${idx})">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                            <span style="font-size: 0.72rem; font-weight: 700; color: ${c.color}; border: 1px solid ${c.color}; padding: 1px 6px; border-radius: 4px;">${c.code}</span>
                                            <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase;">${mod.title.split(':')[0]}</span>
                                            <span style="font-size: 0.75rem; color: var(--text-muted);">${ex.tag || ''}</span>
                                        </div>
                                        <h4 style="color: var(--text-main); margin-top: 6px;">${ex.name}</h4>
                                        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 4px;">${cleanPreview}</p>
                                    </div>
                                    <button class="btn-stepper primary" style="padding: 6px 14px; font-size: 0.82rem; white-space: nowrap;">Şimdi Çöz ${window.ICONS ? window.ICONS.arrowRight : ""}</button>
                                </div>
                            `;
                        }
                    });
                });
            });

            // Tabs HTML
            let tabsHTML = `
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color);">
                    <button class="btn-stepper ${activeFilter === 'all' ? 'primary' : 'secondary'}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openUnresolvedPool('all')">
                        Tüm Dersler (${totalUnresolvedAcrossAll})
                    </button>
            `;
            courseKeys.forEach(cKey => {
                const c = COURSES_DB[cKey];
                const isCurrent = (activeFilter === cKey);
                tabsHTML += `
                    <button class="btn-stepper ${isCurrent ? 'primary' : 'secondary'}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openUnresolvedPool('${cKey}')">
                        ${c.icon} ${c.code} (${countsPerCourse[cKey] || 0})
                    </button>
                `;
            });
            tabsHTML += '</div>';

            if (displayedCount === 0) {
                poolHTML = `
                    <div style="text-align: center; padding: 50px 20px;">
                        <div class="award-badge-icon" style="width: 56px; height: 56px; margin: 0 auto 12px; font-size: 2rem;">${window.ICONS ? window.ICONS.award : ""}</div>
                        <h2 style="color: var(--accent-emerald); margin-top: 10px;">Tebrikler!</h2>
                        <p style="color: var(--text-secondary); margin-top: 6px;">Bu dersteki tüm soruları başarıyla tamamladınız. Sınava tam olarak hazırsınız!</p>
                    </div>
                `;
            }

            const headerTitle = activeFilter === 'all' ? 'Tüm Derslerde Çözülecek Sorular' : `${COURSES_DB[activeFilter]?.code} Çözülecek Sorular Listesi`;

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${COURSES_DB[activeCourseKey]?.code || 'Portal'} > Sınav Araçları > Çözülecek Sorular</div>
                        <h1 class="content-title">${window.ICONS ? window.ICONS.compass : ""} ${headerTitle} (${displayedCount} Soru Kaldı)</h1>
                    </div>
                </div>

                <div class="academic-card">
                    ${tabsHTML}
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
                        Burada henüz çözüldü olarak işaretlemediğiniz sorular listelenir. Soruların üzerine tıklayarak ayrıntılı sınav çözümlerini adım adım inceleyebilirsiniz.
                    </p>
                    ${poolHTML}
                </div>
            `;

            renderMath();
        }

        
// ================= FLOATING TOAST & CLIPBOARD SYSTEM =================
function showPortalToast(msg, duration = 2400) {
    let toast = document.getElementById('portal-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portal-toast';
        toast.className = 'portal-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function copyTextToClipboard(text, successMsg = (window.ICONS ? window.ICONS.check : "") + " Panoya Kopyalandı") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showPortalToast(successMsg);
        }).catch(() => {
            fallbackCopy(text, successMsg);
        });
    } else {
        fallbackCopy(text, successMsg);
    }
}

function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        showPortalToast(successMsg);
    } catch(e) {}
    document.body.removeChild(ta);
}

function copyCurrentQuestion() {
    const mod = modulesDB[currentModuleKey];
    if (!mod || !mod.exercises || !mod.exercises[currentExerciseIdx]) return;
    const ex = mod.exercises[currentExerciseIdx];
    const textToCopy = `[${COURSES_DB[activeCourseKey]?.code || ''} • ${mod.title.split(':')[0]} • ${ex.name}]\n${ex.enonce.replace(/<[^>]+>/g, '').trim()}`;
    copyTextToClipboard(textToCopy, (window.ICONS ? window.ICONS.copy : "") + " Soru Metni & LaTeX Kopyalandı");
}

function printMockExam(withSolutions = false) {
    document.body.classList.remove('print-blank', 'print-solutions');
    if (withSolutions) {
        document.body.classList.add('print-solutions');
        document.querySelectorAll('.mock-question-card details').forEach(d => d.setAttribute('open', 'true'));
    } else {
        document.body.classList.add('print-blank');
        document.querySelectorAll('.mock-question-card details').forEach(d => d.removeAttribute('open'));
    }
    window.print();
    setTimeout(() => {
        document.body.classList.remove('print-blank', 'print-solutions');
    }, 1000);
}


        async function switchCourseAndJump(cKey, modKey, exIdx) {
            if (activeCourseKey !== cKey) {
                await switchActiveCourse(cKey);
            }
            jumpToExercise(modKey, exIdx);
        }

        function jumpToExercise(modKey, exIdx) {
            currentViewMode = 'module';
            currentSpecialView = null;
            currentModuleKey = modKey;
            currentTrack = 'exercises';
            currentExerciseIdx = exIdx;
            currentStepIdx = 1;

            setActiveNav('nav-' + modKey);
            renderModuleView();
            saveAppState();
        }

        // ================= CONCEPT MODAL =================
        function openConceptModal(conceptKey) {
            const c = conceptsDB[conceptKey];
            if (!c) return;

            const modalTitleEl = document.getElementById('modal-concept-title');
            const modalBodyEl = document.getElementById('modal-concept-body');
            const modalEl = document.getElementById('concept-modal');

            modalTitleEl.innerHTML = c.title;
            modalBodyEl.innerHTML = `
                <div style="margin-bottom: 14px; font-family: 'Newsreader', serif; font-size: 1.15rem; color: var(--text-main); line-height: 1.8;">${c.definition}</div>
                <div style="background: rgba(125,125,125,0.06); padding: 14px 16px; border-radius: 8px; border-left: 3px solid var(--accent-indigo); font-family: 'Inter', sans-serif;">
                    <strong style="color: var(--accent-indigo); display: block; margin-bottom: 4px;">Türkçe Sınav Mantığı:</strong>
                    ${c.intuition}
                </div>
            `;
            modalEl.style.display = 'flex';

            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(modalEl, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError: false
                });
            }
        }

        function closeConceptModal(e) {
            document.getElementById('concept-modal').style.display = 'none';
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeConceptModal();
            }
        });

                // ================= FLASHCARDS ARENA (GAMIFIED MASTERY) =================
        let flashcardFilterCategory = 'all';
        let flashcardStats = { known: 0, review: 0 };

        function openFlashcardArena() {
            currentViewMode = 'special';
            currentSpecialView = 'flashcards';
            setActiveNav('nav-flashcards');

            currentCardIdx = 0;
            flashcardFilterCategory = 'all';
            renderFlashcard();
            saveAppState();
        }

        function getActiveFlashcards() {
            const all = FLASHCARDS_BY_COURSE[activeCourseKey] || FLASHCARDS_BY_COURSE['mat204_grup'] || [];
            if (!flashcardFilterCategory || flashcardFilterCategory === 'all') return all;
            return all.filter(c => c.category === flashcardFilterCategory);
        }

        function setFlashcardCategory(cat) {
            flashcardFilterCategory = cat;
            currentCardIdx = 0;
            renderFlashcard();
        }

        function shuffleFlashcards() {
            const cards = getActiveFlashcards();
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
            currentCardIdx = 0;
            renderFlashcard();
            showPortalToast((window.ICONS ? window.ICONS.shuffle : "") + " Kartlar Karıştırıldı");
        }

        function markCardMastery(known) {
            if (known) {
                flashcardStats.known++;
                showPortalToast((window.ICONS ? window.ICONS.check : "") + " Bildim! (+1)");
            } else {
                flashcardStats.review++;
                showPortalToast((window.ICONS ? window.ICONS.refresh : "") + " Tekrar Listesine Eklendi");
            }
            nextCard();
        }

        function prevCard() {
            const cards = getActiveFlashcards();
            if (cards.length === 0) return;
            currentCardIdx = (currentCardIdx - 1 + cards.length) % cards.length;
            renderFlashcard();
        }

        function renderFlashcard() {
            const allCards = FLASHCARDS_BY_COURSE[activeCourseKey] || FLASHCARDS_BY_COURSE['mat204_grup'] || [];
            const cards = getActiveFlashcards();
            if (currentCardIdx >= cards.length) currentCardIdx = 0;
            const card = cards[currentCardIdx] || { category: 'Genel', prompt: 'Bu kategoride henüz kart yok.', answer: 'Diğer kategorileri seçebilirsiniz.' };
            const main = document.getElementById('main-content');
            const c = COURSES_DB[activeCourseKey];

            // Categories list for pills
            const categories = ['all', ...new Set(allCards.map(item => item.category))];
            let catPillsHTML = '<div class="flashcard-cat-pills">';
            categories.forEach(cat => {
                const isSelected = flashcardFilterCategory === cat;
                const count = cat === 'all' ? allCards.length : allCards.filter(i => i.category === cat).length;
                const label = cat === 'all' ? `Tüm Konular (${count})` : `${cat} (${count})`;
                catPillsHTML += `
                    <button class="btn-stepper ${isSelected ? 'primary' : 'secondary'}" style="padding: 5px 12px; font-size: 0.8rem; white-space: nowrap;" onclick="setFlashcardCategory('${cat}')">
                        ${label}
                    </button>
                `;
            });
            catPillsHTML += '</div>';

            const totalAnswered = flashcardStats.known + flashcardStats.review;
            const successRate = totalAnswered > 0 ? Math.round((flashcardStats.known / totalAnswered) * 100) : 0;

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${c.code} > Sınav ve Çalışma Araçları > Kavram & Formül Kartları</div>
                        <h1 class="content-title">${window.ICONS ? window.ICONS.flashcards : ""} ${c.code} Kavram &amp; Formül Kartları</h1>
                    </div>
                </div>

                <div class="academic-card">
                    ${catPillsHTML}

                    <div class="flashcard-score-bar">
                        <div class="flashcard-score-pill" style="color: var(--accent-emerald);">
                            <span>${window.ICONS ? window.ICONS.check : ""} Bildim:</span> <span>${flashcardStats.known}</span>
                        </div>
                        <div class="flashcard-score-pill" style="color: #ef4444;">
                            <span>${window.ICONS ? window.ICONS.refresh : ""} Tekrar Et:</span> <span>${flashcardStats.review}</span>
                        </div>
                        <div class="flashcard-score-pill" style="color: var(--accent-blue);">
                            <span>${window.ICONS ? window.ICONS.award : ""} Başarı:</span> <span>%${successRate}</span>
                        </div>
                        <button class="btn-stepper" style="padding: 4px 10px; font-size: 0.78rem;" onclick="shuffleFlashcards()">
                            ${window.ICONS ? window.ICONS.shuffle : ""} Karıştır
                        </button>
                    </div>

                    <div class="flashcard-arena">
                        <div class="flashcard-inner">
                            <div class="card-top">
                                <span class="card-category">${window.ICONS ? window.ICONS.tag : ""} ${card.category}</span>
                                <span class="card-counter">${cards.length > 0 ? currentCardIdx + 1 : 0} / ${cards.length}</span>
                            </div>

                            <div class="card-prompt">
                                ${card.prompt}
                            </div>

                            <div class="card-answer-box" id="flashcard-answer">
                                ${card.answer}
                            </div>

                            <div class="card-bottom-actions" style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 18px;">
                                <button class="btn-stepper" onclick="prevCard()" title="Önceki Kart (Sol Ok)">
                                    ${window.ICONS ? window.ICONS.arrowLeft : ""} Önceki
                                </button>
                                <button class="btn-stepper primary" id="btn-flip" onclick="flipCard()">
                                    Cevabı Göster (Space)
                                </button>
                                <button class="btn-stepper" onclick="nextCard()" title="Sıradaki Kart (Sağ Ok)">
                                    Sonraki ${window.ICONS ? window.ICONS.arrowRight : ""}
                                </button>
                            </div>

                            <div id="flashcard-mastery-actions" style="display: none; justify-content: center; gap: 12px; margin-top: 14px; border-top: 1px dashed var(--border-subtle); padding-top: 14px;">
                                <button class="btn-stepper flashcard-btn-review" onclick="markCardMastery(false)" title="Klavye: 1">
                                    ${window.ICONS ? window.ICONS.refresh : ""} Tekrar Edilecek [1]
                                </button>
                                <button class="btn-stepper flashcard-btn-known" onclick="markCardMastery(true)" title="Klavye: 2">
                                    ${window.ICONS ? window.ICONS.check : ""} Biliyorum [2]
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="intuition-callout" style="text-align: center; margin-top: 20px;">
                        <strong>Klavye Kısayolları:</strong> <code>Space</code> = Kartı Çevir &nbsp;•&nbsp; <code>Sağ/Sol Ok</code> = Kart Değiştir &nbsp;•&nbsp; <code>1</code> = Tekrar Et &nbsp;•&nbsp; <code>2</code> = Bildim
                    </div>
                </div>
            `;

            renderMath();
        }

        function flipCard() {
            const ans = document.getElementById('flashcard-answer');
            const btn = document.getElementById('btn-flip');
            const masteryBox = document.getElementById('flashcard-mastery-actions');
            if (!ans || !btn) return;
            if (ans.style.display === 'block') {
                ans.style.display = 'none';
                btn.textContent = 'Cevabı Göster (Space)';
                if (masteryBox) masteryBox.style.display = 'none';
            } else {
                ans.style.display = 'block';
                btn.textContent = 'Cevabı Gizle';
                if (masteryBox) masteryBox.style.display = 'flex';
                if (typeof renderMathInElement !== 'undefined') {
                    renderMathInElement(ans, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '$', right: '$', display: false}
                        ],
                        throwOnError: false
                    });
                }
            }
        }

        function nextCard() {
            const cards = getActiveFlashcards();
            if (cards.length === 0) return;
            currentCardIdx = (currentCardIdx + 1) % cards.length;
            renderFlashcard();
        }

        // ================= MULTI-COURSE PROOFS & THEOREMS =================
        function getProofsForCourse(cKey) {
            if (cKey === 'mat201_seriler') {
                return [
                    {
                        title: "Théorème 1 : Critère de Leibniz pour les séries alternées & Majoration du Reste",
                        stmt: "Soit $(a_n)$ une suite positive décroissante tendant vers 0. Alors la série alternée $\\sum (-1)^n a_n$ converge, et pour tout $n$, $|R_n| \\leq a_{n+1}$.",
                        proof: `Considérons les deux sous-suites de sommes partielles de parités différentes :
$$\\begin{aligned}
S_{2n+2} - S_{2n} &= a_{2n+2} - a_{2n+1} \\leq 0 \\implies (S_{2n}) \\text{ est décroissante} \\\\
S_{2n+1} - S_{2n-1} &= -a_{2n+1} + a_{2n} \\geq 0 \\implies (S_{2n+1}) \\text{ est croissante} \\\\
S_{2n+1} - S_{2n} &= -a_{2n+1} \\longrightarrow 0 \\quad (\\text{quand } n \\to \\infty)
\\end{aligned}$$
Les suites $(S_{2n})$ et $(S_{2n+1})$ sont adjacentes, donc elles convergent vers une limite commune $S$. La série converge.  
De plus, $S$ est toujours encadrée par deux sommes partielles consécutives : $S_{2n+1} \\leq S \\leq S_{2n}$.  
D'où l'inégalité fondamentale sur le reste : $\\mathbf{|R_n| = |S - S_n| \\leq a_{n+1}}$. $\\blacksquare$`
                    },
                    {
                        title: "Théorème 2 : Théorème de Continuité de la Somme (Convergence Uniforme)",
                        stmt: "Soit $(f_n)$ une suite de fonctions continues sur un intervalle $I$. Si $\\sum f_n$ converge uniformément sur $I$ vers $S$, alors $S$ est continue sur $I$.",
                        proof: `Soit $x_0 \\in I$ et soit $\\epsilon > 0$.  
Notons $S_n = \\sum_{k=0}^n f_k$ la $n$-ième somme partielle (qui est continue car somme finie de fonctions continues).  
Par convergence uniforme sur $I$, il existe $N \\in \\mathbb{N}$ tel que :
$$ \\forall n \\geq N, \\quad \\sup_{x \\in I} |S(x) - S_n(x)| \\leq \\frac{\\epsilon}{3} $$
Fixons ce $N$. Puisque $S_N$ est continue en $x_0$, il existe $\\delta > 0$ tel que :
$$ |x - x_0| < \\delta \\implies |S_N(x) - S_N(x_0)| \\leq \\frac{\\epsilon}{3} $$
Par l'inégalité triangulaire (technique en $\\epsilon/3$) :
$$\\begin{aligned}
|S(x) - S(x_0)| &= |(S(x) - S_N(x)) + (S_N(x) - S_N(x_0)) + (S_N(x_0) - S(x_0))| \\\\
&\\leq |S(x) - S_N(x)| + |S_N(x) - S_N(x_0)| + |S_N(x_0) - S(x_0)| \\\\
&\\leq \\frac{\\epsilon}{3} + \\frac{\\epsilon}{3} + \\frac{\\epsilon}{3} = \\epsilon
\\end{aligned}$$
Donc $S$ est continue en tout point $x_0 \\in I$. $\\blacksquare$`
                    },
                    {
                        title: "Théorème 3 : Règle de D'Alembert (Critère du Rapport)",
                        stmt: "Soit $\\sum u_n$ une série à termes strictement positifs telle que $\\lim \\frac{u_{n+1}}{u_n} = L$. Si $L < 1$, la série converge. Si $L > 1$, la série diverge.",
                        proof: `Supposons $L < 1$. Choisissons un réel $q$ tel que $L < q < 1$ (par exemple $q = \\frac{L+1}{2}$).  
Puisque $\\frac{u_{n+1}}{u_n} \\to L < q$, il existe un rang $N$ à partir duquel :
$$ \\forall n \\geq N, \\quad \\frac{u_{n+1}}{u_n} \\leq q $$
Par récurrence immédiate pour $n \\geq N$ :
$$ u_n \\leq u_N \\cdot q^{n-N} = \\left(\\frac{u_N}{q^N}\\right) q^n $$
La série géométrique $\\sum q^n$ converge car $0 < q < 1$.  
Par le critère de comparaison à termes positifs, $\\sum u_n$ converge également. $\\blacksquare$`
                    }
                ];
            } else if (cKey === 'fiz101_fizik') {
                return [
                    {
                        title: "Théorème 1 : Formule de Poisson pour les Repères Tournants",
                        stmt: "Pour tout vecteur $\\vec{A}$ et un repère $R'$ en rotation à la vitesse angulaire $\\vec{\\Omega}_{R'/R}$ par rapport à $R$ : $\\left[\\frac{d\\vec{A}}{dt}\\right]_R = \\left[\\frac{d\\vec{A}}{dt}\\right]_{R'} + \\vec{\\Omega}_{R'/R} \\wedge \\vec{A}$.",
                        proof: `Soit $(\\vec{e}_1', \\vec{e}_2', \\vec{e}_3')$ une base orthonormée liée à $R'$.  
Décomposons $\\vec{A}$ sur cette base : $\\vec{A} = A_1' \\vec{e}_1' + A_2' \\vec{e}_2' + A_3' \\vec{e}_3'$.  
La dérivée par rapport à $R$ donne :
$$ \\left[\\frac{d\\vec{A}}{dt}\\right]_R = \\sum_{i=1}^3 \\frac{dA_i'}{dt} \\vec{e}_i' + \\sum_{i=1}^3 A_i' \\left[\\frac{d\\vec{e}_i'}{dt}\\right]_R $$
Le premier terme est par définition la dérivée relative dans $R'$ : $\\left[\\frac{d\\vec{A}}{dt}\\right]_{R'}$.  
Pour les vecteurs de base unitaires en rotation, on démontre que $\\left[\\frac{d\\vec{e}_i'}{dt}\\right]_R = \\vec{\\Omega} \\wedge \\vec{e}_i'$.  
En factorisant le produit vectoriel par distributivité :
$$ \\sum_{i=1}^3 A_i' (\\vec{\\Omega} \\wedge \\vec{e}_i') = \\vec{\\Omega} \\wedge \\left( \\sum_{i=1}^3 A_i' \\vec{e}_i' \\right) = \\vec{\\Omega} \\wedge \\vec{A} $$
On obtient bien la formule de Poisson : $\\mathbf{\\left[\\frac{d\\vec{A}}{dt}\\right]_R = \\left[\\frac{d\\vec{A}}{dt}\\right]_{R'} + \\vec{\\Omega} \\wedge \\vec{A}}$. $\\blacksquare$`
                    },
                    {
                        title: "Théorème 2 : Dérivation de la Base de Frenet & Accélérations",
                        stmt: "Dans le repère de Frenet $(\\vec{T}, \\vec{N})$, la vitesse est $\\vec{v} = v\\vec{T}$ et l'accélération vaut $\\vec{a} = \\frac{dv}{dt}\\vec{T} + \\frac{v^2}{\\rho}\\vec{N}$.",
                        proof: `Soit $s(t)$ l'abscisse curviligne du point matériel $P$ sur sa trajectoire.  
Le vecteur vitesse est par définition : $\\vec{v} = \\frac{d\\vec{OP}}{dt} = \\frac{d\\vec{OP}}{ds} \\frac{ds}{dt} = v \\vec{T}$, où $\\vec{T}$ est le vecteur unitaire tangent.  
Dérivons la vitesse par rapport au temps :
$$ \\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d(v\\vec{T})}{dt} = \\frac{dv}{dt}\\vec{T} + v \\frac{d\\vec{T}}{dt} $$
Exprimons $\\frac{d\\vec{T}}{dt}$ en utilisant l'angle tangentiel $\\theta$ :
$$ \\frac{d\\vec{T}}{dt} = \\frac{d\\vec{T}}{d\\theta} \\frac{d\\theta}{ds} \\frac{ds}{dt} = \\vec{N} \\cdot \\frac{1}{\\rho} \\cdot v = \\frac{v}{\\rho}\\vec{N} $$
En réinjectant dans l'expression de l'accélération :
$$ \\mathbf{\\vec{a} = \\underbrace{\\frac{dv}{dt}\\vec{T}}_{\\vec{a}_T \\text{ (tangentielle)}} + \\underbrace{\\frac{v^2}{\\rho}\\vec{N}}_{\\vec{a}_N \\text{ (normale / centripète)}}} \\quad \\blacksquare $$`
                    }
                ];
            } else if (cKey === 'mat206_olasilik') {
                return [
                    {
                        title: "Théorème 1 : Formule de Poincaré (Principe d'Inclusion-Exclusion)",
                        stmt: "Pour tous événements $A, B \\in \\mathcal{F}$ : $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
                        proof: `Décomposons $A \\cup B$ en union d'événements disjoints :
$$ A \\cup B = A \\cup (B \\setminus (A \\cap B)) $$
Puisque $A$ et $B \\setminus (A \\cap B)$ sont disjoints, par le 3ème axiome de Kolmogorov :
$$ P(A \\cup B) = P(A) + P(B \\setminus (A \\cap B)) $$
De même, $B$ est l'union disjointe de $(B \\setminus (A \\cap B))$ et $(A \\cap B)$ :
$$ P(B) = P(B \\setminus (A \\cap B)) + P(A \\cap B) \\implies P(B \\setminus (A \\cap B)) = P(B) - P(A \\cap B) $$
En substituant cette égalité, on trouve :
$$ \\mathbf{P(A \\cup B) = P(A) + P(B) - P(A \\cap B)} \\quad \\blacksquare $$`
                    },
                    {
                        title: "Théorème 2 : Théorème de Bayes & Probabilités Totales",
                        stmt: "Si $(B_i)_{i=1}^n$ forme un système complet d'événements et $P(A) > 0$, alors $P(B_k \\mid A) = \\frac{P(A \\mid B_k)P(B_k)}{\\sum_{i=1}^n P(A \\mid B_i)P(B_i)}$.",
                        proof: `Par définition de la probabilité conditionnelle :
$$ P(B_k \\mid A) = \\frac{P(B_k \\cap A)}{P(A)} = \\frac{P(A \\mid B_k)P(B_k)}{P(A)} $$
Puisque $(B_i)$ forme une partition de $\\Omega$, l'événement $A$ se décompose en union disjointe :
$$ A = A \\cap \\Omega = A \\cap \\left(\\bigcup_{i=1}^n B_i\\right) = \\bigcup_{i=1}^n (A \\cap B_i) $$
Par additivité (formule des probabilités totales) :
$$ P(A) = \\sum_{i=1}^n P(A \\cap B_i) = \\sum_{i=1}^n P(A \\mid B_i)P(B_i) $$
En reportant dans le numérateur, on obtient le Théorème de Bayes. $\\blacksquare$`
                    }
                ];
            }

            // Default: mat204_grup
            return [
                {
                    title: "Théorème 1 : $g^n = e \\iff m \\mid n$ (où $m = o(g)$)",
                    stmt: "Soit $g \\in G$ d'ordre $m = o(g)$. Alors $g^n = e$ si et seulement si $m$ divise $n$.",
                    proof: `<strong>(⇐)</strong> Si $m \\mid n$, alors $n = m \\cdot k$. D'où $g^n = (g^m)^k = e^k = e$.<br><br>
<strong>(⇒)</strong> Supposons $g^n = e$. Effectuons la division euclidienne de $n$ par $m$ :
<div class="math-callout">$$n = m \\cdot q + r \\quad \\text{avec} \\quad 0 \\leq r < m$$</div>
Alors $e = g^n = g^{mq+r} = (g^m)^q g^r = e^q g^r = g^r$.<br>
Si $r > 0$, cela contredit la minimalité de $m = o(g)$ (qui est le plus petit entier strictement positif annulant la puissance de $g$).  
Donc nécessairement $\\mathbf{r = 0} \\implies \\mathbf{m \\mid n}$. $\\blacksquare$`
                },
                {
                    title: "Théorème 2 : Tout sous-groupe d'un groupe cyclique est cyclique",
                    stmt: "Soit $G = \\langle a \\rangle$ un groupe cyclique et $H \\leq G$ un sous-groupe. Alors $H$ est lui-même cyclique.",
                    proof: `Si $H = \\{e\\}$, $H = \\langle e \\rangle$ est trivialement cyclique.<br>
Supposons $H \\neq \\{e\\}$. L'ensemble $S = \\{ k \\in \\mathbb{N}^* \\mid a^k \\in H \\}$ est non vide.  
Par le principe du bon ordre, posons $\\mathbf{m = \\min(S)}$.  
Montrons que $\\mathbf{H = \\langle a^m \\rangle}$ :<br>
L'inclusion $\\langle a^m \\rangle \\subseteq H$ est évidente car $a^m \\in H$ et $H$ est stable par puissance.<br>
Réciproquement, soit $h \\in H$. Comme $h \\in G$, il existe $k \\in \\mathbb{Z}$ tel que $h = a^k$.  
Effectuons la division euclidienne de $k$ par $m$ :
$$ k = m \\cdot q + r \\quad \\text{avec} \\quad 0 \\leq r < m $$
On a alors : $a^r = a^{k - mq} = a^k \\cdot (a^m)^{-q} = h \\cdot (a^m)^{-q} \\in H$.  
Si $r > 0$, $r \\in S$ et $r < m$, ce qui contredit la définition de $m$ comme le minimum de $S$.  
Donc $\\mathbf{r = 0}$, ce qui prouve que $k = mq$ et $h = (a^m)^q \\in \\langle a^m \\rangle$.  
<div class="exam-conclusion"><strong>Conclusion :</strong> $H = \\langle a^m \\rangle$ est donc cyclique et engendré par la plus petite puissance positive présente dans $H$. $\\blacksquare$</div>`
                },
                {
                    title: "Théorème 3 : Théorème de Lagrange (L'ordre divise l'ordre du groupe)",
                    stmt: "Soit $G$ un groupe fini et $H \\leq G$ un sous-groupe. Alors l'ordre de $H$ divise l'ordre de $G$ : $|G| = |H| \\cdot [G:H]$.",
                    proof: `Définissons sur $G$ la relation binaire : $x \\sim y \\iff x^{-1}y \\in H$.  
C'est une relation d'équivalence :
1) Réflexive : $x^{-1}x = e \\in H$.  
2) Symétrique : $x^{-1}y \\in H \\implies (x^{-1}y)^{-1} = y^{-1}x \\in H$.  
3) Transitive : $x^{-1}y \\in H$ et $y^{-1}z \\in H \\implies (x^{-1}y)(y^{-1}z) = x^{-1}z \\in H$.  
La classe d'équivalence de $x$ est la classe à gauche $\\bar{x} = xH = \\{ xh \\mid h \\in H \\}$.  
L'application $h \\mapsto xh$ est une bijection de $H$ sur $xH$, donc chaque classe possède exactement $|H|$ éléments.  
Puisque les classes d'équivalence forment une partition de l'ensemble fini $G$, la réunion disjointe des $k$ classes donne :
$$ |G| = \\sum_{i=1}^k |x_i H| = k \\cdot |H| = [G:H] \\cdot |H| $$
D'où $|H|$ divise rigoureusement $|G|$. $\\blacksquare$`
                }
            ];
        }

        function getFrenchPhrasesForCourse(cKey) {
            if (cKey === 'mat201_seriler') {
                return [
                    { fr: "Montrons que la suite des sommes partielles $(S_n)$ est majorée et croissante...", tr: "Kısmi toplamlar dizisinin üstten sınırlı ve artan olduğunu gösterelim (monoton yakınsaklık için)" },
                    { fr: "Par le critère de comparaison des séries à termes positifs...", tr: "Pozitif terimli seriler için karşılaştırma testi gereğince" },
                    { fr: "Effectuons un développement limité (DL) de $u_n$ au voisinage de $+\\infty$...", tr: "un genel teriminin +sonsuz komşuluğunda Taylor (DL) açılımını yapalım" },
                    { fr: "La série converge absolument, donc elle converge.", tr: "Seri mutlak yakınsaktır, dolayısıyla yakınsar" },
                    { fr: "La convergence est uniforme sur tout segment compact $[a, b] \\subset ]-1, 1[$...", tr: "Yakınsaklık her tıkız aralık üzerinde düzgündür" },
                    { fr: "Puisque chaque $f_n$ est continue et la convergence est uniforme, la somme $S$ est continue.", tr: "Her fn fonksiyonu sürekli ve yakınsaklık düzgün olduğundan toplam fonksiyonu süreklidir" },
                    { fr: "Le terme général ne tend pas vers 0, donc la série diverge grossièrement.", tr: "Genel terim sıfıra gitmediğinden seri aşikar biçimde ıraksar" }
                ];
            } else if (cKey === 'fiz101_fizik') {
                return [
                    { fr: "Le référentiel terrestre $R$ est supposé galiléen dans le cadre de cette étude.", tr: "Bu inceleme kapsamında Dünya'ya bağlı R referans sistemi eylemsiz kabul edilmiştir" },
                    { fr: "Projetons la relation fondamentale de la dynamique ($\\sum \\vec{F} = m\\vec{a}$) sur les axes...", tr: "Newton'un 2. yasasını (RFD) seçilen tabanın eksenleri üzerine iz düşürelim" },
                    { fr: "En appliquant la formule de dérivation dans un repère mobile (formule de Poisson)...", tr: "Hareketli referans sisteminde vektörel türev formülünü (Poisson bağıntısını) uygulayarak" },
                    { fr: "Par intégration successive par rapport au temps $t$ avec les conditions initiales...", tr: "Başlangıç koşulları kullanılarak t zamanına göre ardışık integral alındığında" },
                    { fr: "Le travail des forces conservatives dérive d'une énergie potentielle : $W = -\\Delta E_p$.", tr: "Korunumlu kuvvetlerin yaptığı iş potansiyel enerjiden türer" },
                    { fr: "Dans la base de Frenet, l'accélération possède une composante tangentielle et une normale.", tr: "Frenet tabanında ivme teğetsel ve normal (merkezcil) bileşenlere ayrılır" }
                ];
            } else if (cKey === 'mat206_olasilik') {
                return [
                    { fr: "Soit $(\\Omega, \\mathcal{F}, P)$ un espace probabilisé associé à l'expérience aléatoire.", tr: "Rastgele deneye bağlı olasılık uzayı olsun" },
                    { fr: "Les événements $(A_i)_{i=1}^n$ forment un système complet d'événements (partition de $\\Omega$)...", tr: "Olaylar örneklem uzayının tam bir ayrışımını (bölüntüsünü) oluşturur" },
                    { fr: "D'après la formule des probabilités totales : $P(B) = \\sum P(A_i) P(B \\mid A_i)$...", tr: "Toplam olasılık formülüne göre" },
                    { fr: "D'après le théorème de Bayes, la probabilité a posteriori s'écrit...", tr: "Bayes teoremine göre sonsal (a posteriori) olasılık formülü şöyledir" },
                    { fr: "Puisque $P(A \\cap B) = P(A) \\cdot P(B)$, les événements $A$ et $B$ sont mutuellement indépendants.", tr: "Kesişim olasılığı çarpımlarına eşit olduğundan A ve B bağımsızdır" },
                    { fr: "On passe par l'événement contraire $\\bar{A}$ : $P(A) = 1 - P(\\bar{A})$.", tr: "Tümleyen olaydan gidersek: P(A) = 1 - P(tümleyen)" }
                ];
            }

            // Default: mat204_grup
            return [
                { fr: "Soient $a, b \\in G$ deux éléments arbitraires...", tr: "İspata başlarken: G'den rastgele alınan iki eleman olsun" },
                { fr: "Procédons par double implication ($\\implies$ et $\\impliedby$)...", tr: "Çift yönlü gerektirmeyle ilerleyelim" },
                { fr: "Effectuons la division euclidienne de $n$ par $m$...", tr: "n'in m'ye kalanlı bölmesini yapalım" },
                { fr: "Puisque les supports sont disjoints, ces cycles commutent.", tr: "Destekleri ayrık olduğundan bu döngüler değişmelidir" },
                { fr: "Ce qui contredit la minimalité de $m$. Absurde.", tr: "m'in minimalitesiyle çelişir. Çelişki!" },
                { fr: "Par conséquent / On en conclut que...", tr: "Dolayısıyla / Sonuç olarak..." }
            ];
        }

        function getCalculatorTitle(cKey) {
            if (cKey === 'mat201_seriler') return 'Seri Yakınsaklık & Kısmi Toplam';
            if (cKey === 'fiz101_fizik') return '3B Vektörel Analiz & Çarpım';
            if (cKey === 'mat206_olasilik') return 'Bayes Teoremi & Tanı Simülatörü';
            return 'Bézout & Modüler Ters Hesaplayıcı';
        }

        // ================= SPECIAL VIEWS =================
        function loadSpecialView(viewKey) {
            currentViewMode = 'special';
            currentSpecialView = viewKey;
            setActiveNav('nav-' + viewKey);

            const main = document.getElementById('main-content');
            const c = COURSES_DB[activeCourseKey];

            if (viewKey === 'ispatlar') {
                const proofs = getProofsForCourse(activeCourseKey);
                let proofsHTML = '';
                proofs.forEach((p, idx) => {
                    proofsHTML += `
                        <div class="academic-card">
                            <div class="question-statement">${p.title}</div>
                            <div style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 14px;"><strong>Teorem Önermesi:</strong> ${p.stmt}</div>
                            <div class="exam-sheet">
                                <div class="exam-sheet-header"><span class="exam-sheet-title">${window.ICONS ? window.ICONS.listTodo : ""} Model İspat ve Puan Baremi</span></div>
                                <div class="exam-sheet-body" style="font-family: 'Newsreader', serif; font-size: 1.14rem; line-height: 1.8;">
                                    ${p.proof}
                                </div>
                            </div>
                        </div>
                    `;
                });

                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">${c.code} > Sınav Araçları > Kritik İspatlar</div>
                            <h1 class="content-title">${window.ICONS ? window.ICONS.book : ""} ${c.code} Sınavında Çıkabilecek Kritik Teorem İspatları</h1>
                        </div>
                    </div>
                    ${proofsHTML}
                `;
            } else if (viewKey === 'fransizca') {
                const phrases = getFrenchPhrasesForCourse(activeCourseKey);
                let phrasesHTML = '';
                phrases.forEach(item => {
                    phrasesHTML += `
                        <div class="math-callout" style="padding: 14px 18px; margin-bottom: 10px;">
                            <div style="font-size: 1.05rem; color: var(--accent-blue); font-weight: 600; margin-bottom: 4px;">• "${item.fr}"</div>
                            <div style="font-size: 0.88rem; color: var(--text-secondary);"><span style="color: var(--accent-emerald); font-weight: 700;">Türkçe Mantığı:</span> ${item.tr}</div>
                        </div>
                    `;
                });

                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">${c.code} > Sınav Araçları > Fransızca</div>
                            <h1 class="content-title"><span class="badge-lang-tag" style="font-size: 1rem; padding: 4px 10px;">FR</span> ${c.code} Fransızca Matematiksel İfade ve İspat Kılavuzu</h1>
                        </div>
                    </div>
                    <div class="academic-card">
                        <p style="margin-bottom: 16px; color: var(--text-secondary);">Galatasaray Üniversitesi sınavlarında tam puan kazandıran Fransızca matematiksel argüman ve ispat kalıpları (Rédaction):</p>
                        ${phrasesHTML}
                    </div>
                `;
            } else if (viewKey === 'hesaplayici') {
                if (activeCourseKey === 'mat201_seriler') {
                    main.innerHTML = `
                        <div class="content-header">
                            <div>
                                <div class="breadcrumbs">${c.code} > Sınav Araçları > Seri Hesaplayıcı</div>
                                <h1 class="content-title">${window.ICONS ? window.ICONS.calculator : ""} Seri Kısmi Toplam ($S_N$) ve Yakınsaklık Hesaplayıcı</h1>
                            </div>
                        </div>
                        <div class="academic-card">
                            <div class="calc-box">
                                <div class="calc-input-wrapper">
                                    <label>Örnek Seri Seç veya Formül İncele:</label>
                                    <select id="calc-series-type" style="padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-subtle); background: var(--bg-paper); color: var(--text-main); font-size: 0.95rem;">
                                        <option value="riemann2">∑ 1/n² (Riemann α=2, Yakınsar)</option>
                                        <option value="geom_half">∑ (1/2)ⁿ (Geometrik q=0.5, Yakınsar)</option>
                                        <option value="harmonic">∑ 1/n (Harmonik Seri, Iraksar)</option>
                                        <option value="telescopic">∑ 1 / (n(n+1)) (Teleskopik Seri, S=1)</option>
                                        <option value="exp">∑ 1/n! (e sayısı, Süper Yakınsar)</option>
                                        <option value="alt_harmonic">∑ (-1)ⁿ⁺¹ / n (Alterne Harmonik, ln 2)</option>
                                    </select>
                                </div>
                                <div class="calc-input-wrapper">
                                    <label>Terim Sayısı (N):</label>
                                    <input type="number" id="calc-n-terms" value="10" min="1" max="100">
                                </div>
                                <button class="btn-stepper primary" style="margin-top: 18px;" onclick="runSeriesCalculator()">Kısmi Toplamı ve Yakınsaklığı Hesapla</button>
                            </div>
                            <div id="calc-result-area" class="exam-sheet" style="padding: 20px; display: none;"></div>
                        </div>
                    `;
                    setTimeout(runSeriesCalculator, 100);
                } else if (activeCourseKey === 'fiz101_fizik') {
                    main.innerHTML = `
                        <div class="content-header">
                            <div>
                                <div class="breadcrumbs">${c.code} > Sınav ve Çalışma Araçları > 3B Vektörel Analiz</div>
                                <h1 class="content-title">${window.ICONS ? window.ICONS.calculator : ""} 3B Vektörel Analiz ve Açı Hesaplayıcı</h1>
                            </div>
                        </div>
                        <div class="academic-card">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                                <div class="calc-box">
                                    <strong>Vektör a (x, y, z):</strong>
                                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                                        <input type="number" id="vec-ax" value="1" placeholder="x" style="width: 100%;">
                                        <input type="number" id="vec-ay" value="2" placeholder="y" style="width: 100%;">
                                        <input type="number" id="vec-az" value="2" placeholder="z" style="width: 100%;">
                                    </div>
                                </div>
                                <div class="calc-box">
                                    <strong>Vektör b (x, y, z):</strong>
                                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                                        <input type="number" id="vec-bx" value="2" placeholder="x" style="width: 100%;">
                                        <input type="number" id="vec-by" value="0" placeholder="y" style="width: 100%;">
                                        <input type="number" id="vec-bz" value="1" placeholder="z" style="width: 100%;">
                                    </div>
                                </div>
                            </div>
                            <button class="btn-stepper primary" onclick="runVectorCalculator()">Skaler & Vektörel Çarpımı Hesapla</button>
                            <div id="calc-result-area" class="exam-sheet" style="padding: 20px; display: none; margin-top: 16px;"></div>
                        </div>
                    `;
                    setTimeout(runVectorCalculator, 100);
                } else if (activeCourseKey === 'mat206_olasilik') {
                    main.innerHTML = `
                        <div class="content-header">
                            <div>
                                <div class="breadcrumbs">${c.code} > Sınav ve Çalışma Araçları > Bayes Hesaplayıcı</div>
                                <h1 class="content-title">${window.ICONS ? window.ICONS.calculator : ""} Bayes Teoremi ve Tanı / Tarama Testi Hesaplayıcı</h1>
                            </div>
                        </div>
                        <div class="academic-card">
                            <div class="calc-box" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
                                <div class="calc-input-wrapper">
                                    <label>Hastalık Prevalansı P(M):</label>
                                    <input type="number" id="bayes-prior" value="0.001" step="0.001" min="0.0001" max="1">
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Örn: 1000'de 1 = 0.001</span>
                                </div>
                                <div class="calc-input-wrapper">
                                    <label>Duyarlılık / Sensibilité P(T|M):</label>
                                    <input type="number" id="bayes-sens" value="0.99" step="0.01" min="0" max="1">
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Örn: %99 = 0.99</span>
                                </div>
                                <div class="calc-input-wrapper">
                                    <label>Yalancı Pozitiflik P(T|M̄):</label>
                                    <input type="number" id="bayes-fp" value="0.02" step="0.01" min="0" max="1">
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Örn: %2 = 0.02</span>
                                </div>
                            </div>
                            <button class="btn-stepper primary" style="margin-top: 18px;" onclick="runBayesCalculator()">Sonsal (Posterior) Olasılığı Hesapla</button>
                            <div id="calc-result-area" class="exam-sheet" style="padding: 20px; display: none; margin-top: 16px;"></div>
                        </div>
                    `;
                    setTimeout(runBayesCalculator, 100);
                } else {
                    // Default: mat204_grup
                    main.innerHTML = `
                        <div class="content-header">
                            <div>
                                <div class="breadcrumbs">${c.code} > Sınav Araçları > Hesaplayıcı</div>
                                <h1 class="content-title">${window.ICONS ? window.ICONS.calculator : ""} Bézout Özdeşliği ve Modüler Ters Hesaplayıcı</h1>
                            </div>
                        </div>
                        <div class="academic-card">
                            <div class="calc-box">
                                <div class="calc-input-wrapper">
                                    <label>Sayı (a):</label>
                                    <input type="number" id="calc-a" value="7">
                                </div>
                                <div class="calc-input-wrapper">
                                    <label>Mod (n):</label>
                                    <input type="number" id="calc-n" value="26">
                                </div>
                                <button class="btn-stepper primary" style="margin-top: 18px;" onclick="runCalculator()">Ayrıntılı Çözümü Üret</button>
                            </div>
                            <div id="calc-result-area" class="exam-sheet" style="padding: 20px; display: none;"></div>
                        </div>
                    `;
                    setTimeout(runCalculator, 100);
                }
            }

            renderMath();
            saveAppState();
        }

        function runSeriesCalculator() {
            const type = document.getElementById('calc-series-type').value;
            const N = Math.min(100, Math.max(1, parseInt(document.getElementById('calc-n-terms').value) || 10));
            const out = document.getElementById('calc-result-area');
            if (!out) return;
            out.style.display = 'block';

            let terms = [];
            let sum = 0;
            let formulaName = '';
            let exactSum = '';

            for (let n = 1; n <= N; n++) {
                let un = 0;
                if (type === 'riemann2') {
                    un = 1 / (n * n);
                    formulaName = 'u_n = \\frac{1}{n^2}';
                    exactSum = '\\frac{\\pi^2}{6} \\approx 1.644934';
                } else if (type === 'geom_half') {
                    un = Math.pow(0.5, n);
                    formulaName = 'u_n = \\left(\\frac{1}{2}\\right)^n';
                    exactSum = '1.0 (\\sum_{n=1}^{+\\infty} 2^{-n} = 1)';
                } else if (type === 'harmonic') {
                    un = 1 / n;
                    formulaName = 'u_n = \\frac{1}{n}';
                    exactSum = '+\\infty \\text{ (Iraksak Seri)}';
                } else if (type === 'telescopic') {
                    un = 1 / (n * (n + 1));
                    formulaName = 'u_n = \\frac{1}{n(n+1)}';
                    exactSum = '1 - \\frac{1}{N+1} \\longrightarrow 1.0';
                } else if (type === 'exp') {
                    let fact = 1;
                    for (let k = 1; k <= n; k++) fact *= k;
                    un = 1 / fact;
                    formulaName = 'u_n = \\frac{1}{n!}';
                    exactSum = 'e - 1 \\approx 1.718281';
                } else if (type === 'alt_harmonic') {
                    un = (n % 2 === 1 ? 1 : -1) / n;
                    formulaName = 'u_n = \\frac{(-1)^{n+1}}{n}';
                    exactSum = '\\ln 2 \\approx 0.693147';
                }
                sum += un;
                terms.push({ n, un, sum });
            }

            let tableRows = '';
            terms.slice(0, 10).forEach(t => {
                tableRows += `<tr><td style="padding: 6px 12px; border-bottom: 1px solid var(--border-subtle);">${t.n}</td><td style="padding: 6px 12px; border-bottom: 1px solid var(--border-subtle);">${t.un.toFixed(6)}</td><td style="padding: 6px 12px; border-bottom: 1px solid var(--border-subtle); font-weight: 700; color: var(--accent-blue);">${t.sum.toFixed(6)}</td></tr>`;
            });

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 8px;">Kısmi Toplam ($S_{${N}}$) Analizi:</h3>
                <div class="math-callout">$$ ${formulaName} \\quad \\implies \\quad S_{${N}} = \\sum_{n=1}^{${N}} u_n \\approx \\mathbf{${sum.toFixed(7)}} $$</div>
                <div style="font-size: 0.95rem; margin-top: 8px;"><strong>Teorik Limit Toplam:</strong> $${exactSum}$</div>
                <div style="margin-top: 14px; overflow-x: auto;">
                    <table style="width: 100%; text-align: left; border-collapse: collapse; font-size: 0.88rem;">
                        <thead>
                            <tr style="background: rgba(125, 125, 125, 0.08);">
                                <th style="padding: 8px 12px;">$n$</th>
                                <th style="padding: 8px 12px;">Genel Terim $u_n$</th>
                                <th style="padding: 8px 12px;">Kısmi Toplam $S_n$</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            `;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
            }
        }

        function runVectorCalculator() {
            const ax = parseFloat(document.getElementById('vec-ax').value) || 0;
            const ay = parseFloat(document.getElementById('vec-ay').value) || 0;
            const az = parseFloat(document.getElementById('vec-az').value) || 0;
            const bx = parseFloat(document.getElementById('vec-bx').value) || 0;
            const by = parseFloat(document.getElementById('vec-by').value) || 0;
            const bz = parseFloat(document.getElementById('vec-bz').value) || 0;
            const out = document.getElementById('calc-result-area');
            if (!out) return;
            out.style.display = 'block';

            const normA = Math.sqrt(ax * ax + ay * ay + az * az);
            const normB = Math.sqrt(bx * bx + by * by + bz * bz);
            const dot = ax * bx + ay * by + az * bz;
            const crossX = ay * bz - az * by;
            const crossY = az * bx - ax * bz;
            const crossZ = ax * by - ay * bx;
            const normCross = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ);

            let cosTheta = 0;
            let degTheta = 0;
            let radTheta = 0;
            if (normA > 0 && normB > 0) {
                cosTheta = Math.max(-1, Math.min(1, dot / (normA * normB)));
                radTheta = Math.acos(cosTheta);
                degTheta = (radTheta * 180) / Math.PI;
            }

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 12px;">3D Vektörel Hesap Sonuçları:</h3>
                <div class="math-callout">
                    $$\\begin{aligned}
                    ||\\vec{a}|| &= \\sqrt{${ax}^2 + ${ay}^2 + ${az}^2} = \\mathbf{${normA.toFixed(4)}} \\\\
                    ||\\vec{b}|| &= \\sqrt{${bx}^2 + ${by}^2 + ${bz}^2} = \\mathbf{${normB.toFixed(4)}} \\\\
                    \\vec{a} \\cdot \\vec{b} &= (${ax})(${bx}) + (${ay})(${by}) + (${az})(${bz}) = \\mathbf{${dot.toFixed(4)}} \\\\
                    \\vec{a} \\wedge \\vec{b} &= \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ ${ax} & ${ay} & ${az} \\\\ ${bx} & ${by} & ${bz} \\end{vmatrix} = \\mathbf{(${crossX.toFixed(2)})\\vec{i} + (${crossY.toFixed(2)})\\vec{j} + (${crossZ.toFixed(2)})\\vec{k}} \\\\
                    ||\\vec{a} \\wedge \\vec{b}|| &= \\mathbf{${normCross.toFixed(4)}} \\\\
                    \\cos(\\theta) &= \\frac{\\vec{a} \\cdot \\vec{b}}{||\\vec{a}|| \\cdot ||\\vec{b}||} = ${cosTheta.toFixed(4)} \\implies \\mathbf{\\theta \\approx ${degTheta.toFixed(2)}^\\circ \\quad (${radTheta.toFixed(3)} \\text{ rad})}
                    \\end{aligned}$$
                </div>
                <div class="exam-conclusion">
                    <strong>Vektör İlişkisi:</strong> ${dot === 0 ? 'Vektörler birbirine **DİKTİR** (Orthogonaux).' : (normCross === 0 ? 'Vektörler **PARALELDİR / ÇAKIŞIKTIR** (Colinéaires).' : 'Vektörler uzayda bir düzlem tanımlar.')}
                </div>
            `;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
            }
        }

        function runBayesCalculator() {
            const pM = parseFloat(document.getElementById('bayes-prior').value) || 0.001;
            const pT_M = parseFloat(document.getElementById('bayes-sens').value) || 0.99;
            const pT_notM = parseFloat(document.getElementById('bayes-fp').value) || 0.02;
            const out = document.getElementById('calc-result-area');
            if (!out) return;
            out.style.display = 'block';

            const pNotM = 1 - pM;
            const pT = (pT_M * pM) + (pT_notM * pNotM);
            const pM_T = (pT_M * pM) / pT;
            const pM_T_percent = (pM_T * 100).toFixed(2);

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 12px;">Bayes Teoremi ve Tanı Testi Güvenilirlik Analizi:</h3>
                <div class="math-callout">
                    $$\\begin{aligned}
                    P(T) &= P(T \\mid M)P(M) + P(T \\mid \\bar{M})P(\\bar{M}) \\\\
                    &= (${pT_M})(${pM}) + (${pT_notM})(${pNotM.toFixed(4)}) \\\\
                    &= ${(pT_M * pM).toFixed(6)} + ${(pT_notM * pNotM).toFixed(6)} = \\mathbf{${pT.toFixed(6)}} \\[8pt]
                    P(M \\mid T) &= \\frac{P(T \\mid M)P(M)}{P(T)} = \\frac{${(pT_M * pM).toFixed(6)}}{${pT.toFixed(6)}} = \\mathbf{${pM_T.toFixed(4)} \\quad (${pM_T_percent}\\%)}
                    \\end{aligned}$$
                </div>
                <div class="mock-rubric-box" style="margin-top: 14px;">
                    <strong>${window.ICONS ? window.ICONS.compass : ""} Sezgisel Sınav Yorumu:</strong> Test pozitifliği %${(pT_M*100).toFixed(1)} hassas olsa dahi, hastalığın nadir olması ($P(M) = ${pM}$) sebebiyle test sonucu <strong>POZİTİF ÇIKAN birinin GERÇEKTEN HASTA OLMA OLASILIĞI SADECE %${pM_T_percent}</strong>'dir! Geriye kalan %${(100 - pM_T_percent).toFixed(2)} yalancı pozitiftir.
                </div>
            `;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
            }
        }

// ================= THEME MANAGEMENT =================
        function applyTheme(theme) {
            const html = document.documentElement;
            html.setAttribute('data-theme', theme);

            const icon = document.getElementById('theme-icon');
            const text = document.getElementById('theme-text');
            if (icon && text) {
                if (theme === 'dark') {
                    icon.innerHTML = (window.ICONS ? window.ICONS.sun : "");
                    text.textContent = 'Aydınlık Mod';
                } else {
                    icon.innerHTML = (window.ICONS ? window.ICONS.moon : "");
                    text.textContent = 'Koyu Mod';
                }
            }
        }

        function toggleTheme() {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme') || 'light';
            const newTheme = (current === 'dark') ? 'light' : 'dark';
            applyTheme(newTheme);
            try {
                localStorage.setItem('portal_theme', newTheme);
            } catch(e) {}
        }

        function initTheme() {
            let savedTheme = 'light';
            try {
                savedTheme = localStorage.getItem('portal_theme') || 'light';
            } catch(e) {}
            applyTheme(savedTheme);
        }

        function renderMath() {
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError: false
                });
            }
        }

        
                // ================= STARRED QUESTIONS (FAVORITES) =================
        function getStarredExercises() {
            try {
                const key = activeCourseKey + '_starred_ex';
                const stored = localStorage.getItem(key) || (activeCourseKey === 'mat204_grup' ? localStorage.getItem('mat204_starred_ex') : null);
                return stored ? JSON.parse(stored) : [];
            } catch(e) {
                return [];
            }
        }

        function toggleStar(exId) {
            let list = getStarredExercises();
            let isStarred = false;
            if (list.includes(exId)) {
                list = list.filter(id => id !== exId);
                isStarred = false;
            } else {
                list.push(exId);
                isStarred = true;
            }
            try {
                localStorage.setItem(activeCourseKey + '_starred_ex', JSON.stringify(list));
            } catch(e) {}
            updateProgressUI();
            if (currentViewMode === 'special' && currentSpecialView === 'starred') {
                openStarredPool();
            } else {
                renderModuleView();
            }
            syncToggleStarToCloud(activeCourseKey, exId, isStarred);
        }

        function openStarredPool(filterCourseKey = null) {
            currentViewMode = 'special';
            currentSpecialView = 'starred';
            setActiveNav('nav-starred');
            saveAppState();
            const main = document.getElementById('main-content');
            
            // Compute starred counts across all courses
            const allStarredCounts = {};
            let totalStarredAcrossAll = 0;
            const courseKeys = Object.keys(COURSES_DB);
            courseKeys.forEach(cKey => {
                try {
                    const raw = localStorage.getItem(cKey + '_starred_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_starred_ex') : null);
                    const list = raw ? JSON.parse(raw) : [];
                    allStarredCounts[cKey] = list.length;
                    totalStarredAcrossAll += list.length;
                } catch(e) {
                    allStarredCounts[cKey] = 0;
                }
            });

            const activeFilter = filterCourseKey === 'all' ? 'all' : (filterCourseKey || activeCourseKey);

            let poolHTML = '';
            let displayedCount = 0;

            const coursesToScan = activeFilter === 'all' ? courseKeys : [activeFilter];

            coursesToScan.forEach(cKey => {
                const c = COURSES_DB[cKey];
                if (!c) return;
                let starredForThis = [];
                try {
                    const raw = localStorage.getItem(cKey + '_starred_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_starred_ex') : null);
                    starredForThis = raw ? JSON.parse(raw) : [];
                } catch(e) {}

                Object.keys(c.modules).forEach(modKey => {
                    const mod = c.modules[modKey];
                    mod.exercises.forEach((ex, idx) => {
                        if (starredForThis.includes(ex.id)) {
                            displayedCount++;
                            const cleanPreview = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '';
                            poolHTML += `
                                <div class="pool-item" onclick="switchCourseAndJump('${cKey}', '${modKey}', ${idx})">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                            <span style="font-size: 0.72rem; font-weight: 700; color: ${c.color}; border: 1px solid ${c.color}; padding: 1px 6px; border-radius: 4px;">${c.code}</span>
                                            <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-amber); text-transform: uppercase;">⭐ ${mod.title.split(':')[0]}</span>
                                            <span style="font-size: 0.75rem; color: var(--text-muted);">${ex.tag || ''}</span>
                                        </div>
                                        <h4 style="color: var(--text-main); margin-top: 6px;">${ex.name}</h4>
                                        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 4px;">${cleanPreview}</p>
                                    </div>
                                    <div style="display: flex; gap: 8px; align-items: center;">
                                        <button class="btn-stepper primary" style="padding: 6px 14px; font-size: 0.82rem; white-space: nowrap;">Çöz &amp; İncele ${window.ICONS ? window.ICONS.arrowRight : ""}</button>
                                    </div>
                                </div>
                            `;
                        }
                    });
                });
            });

            // Generate tabs
            let tabsHTML = `
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color);">
                    <button class="btn-stepper ${activeFilter === 'all' ? 'primary' : 'secondary'}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openStarredPool('all')">
                        Tüm Dersler (${totalStarredAcrossAll})
                    </button>
            `;
            courseKeys.forEach(cKey => {
                const c = COURSES_DB[cKey];
                const isCurrent = (activeFilter === cKey);
                tabsHTML += `
                    <button class="btn-stepper ${isCurrent ? 'primary' : 'secondary'}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openStarredPool('${cKey}')">
                        ${window.getIcon ? (window.getIcon(c.icon) || c.icon) : c.icon} ${c.code} (${allStarredCounts[cKey] || 0})
                    </button>
                `;
            });
            tabsHTML += '</div>';

            if (displayedCount === 0) {
                poolHTML = `
                    <div style="text-align: center; padding: 50px 20px;">
                        <div class="award-badge-icon" style="width: 56px; height: 56px; margin: 0 auto 12px; font-size: 2rem; color: #f59e0b; background: rgba(245, 158, 11, 0.15);">${window.ICONS ? window.ICONS.starFilled : ""}</div>
                        <h3 style="color: var(--accent-amber); margin-top: 10px;">Bu Filtrede Henüz Yıldızlı Soru Eklenmedi</h3>
                        <p style="color: var(--text-secondary); margin-top: 6px; max-width: 500px; margin-left: auto; margin-right: auto;">
                            Çalışırken tekrar etmek istediğiniz veya önemli bulduğunuz soruların üzerindeki <strong>"Yıldıza Ekle"</strong> butonuna basarak bu listeye kaydedebilirsiniz. Bulut senkronizasyonu sayesinde telefonunuzda işaretlediğiniz sorular masaüstünde de anında eşitlenecektir.
                        </p>
                    </div>
                `;
            }

            const headerTitle = activeFilter === 'all' ? 'Tüm Derslerdeki Yıldızlı Sorular' : `${COURSES_DB[activeFilter]?.code} Yıldızlı ve Önemli Sorular`;

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${COURSES_DB[activeCourseKey]?.code || 'Portal'} > Sınav Araçları > Yıldızlı Sorular</div>
                        <h1 class="content-title">${window.ICONS ? window.ICONS.starFilled : ""} ${headerTitle} (${displayedCount} Soru)</h1>
                    </div>
                </div>

                <div class="academic-card">
                    ${tabsHTML}
                    <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 16px;">
                        Burada mobil ve web üzerinden işaretlediğiniz tüm kritik sınav soruları listelenir. Sınavdan önce bu soruları gözden geçirerek eksiklerinizi kapatabilirsiniz.
                    </p>
                    ${poolHTML}
                </div>
            `;

            renderMath();
        }

        // ================= SPOTLIGHT / SEARCH WITH COURSE TABS & SHORTCUTS =================
        let spotlightCourseFilter = 'current'; // 'current', 'all', or course key
        let spotlightTypeFilter = 'all'; // 'all', 'concepts', 'exercises', 'starred'
        let spotlightSelectedIndex = 0;

        function renderSpotlightTabs() {
            const tabsContainer = document.getElementById('spotlight-course-tabs');
            if (!tabsContainer) return;

            const fullList = window.COURSES_MANIFEST || COURSES_DB;
            const activeC = COURSES_DB[activeCourseKey] || (fullList ? fullList[activeCourseKey] : null);
            const activeCode = activeC ? activeC.code : 'Aktif';

            let tabsHTML = '';

            // Current course tab
            const isCurrentActive = (spotlightCourseFilter === 'current' || spotlightCourseFilter === activeCourseKey);
            tabsHTML += `
                <button class="spotlight-course-btn ${isCurrentActive ? 'active' : ''}" onclick="setSpotlightCourseFilter('current')">
                    ${window.getIcon ? (window.getIcon(activeC?.icon || 'courseGrup') || '') : ''}
                    <span>${activeCode} (Aktif Ders)</span>
                </button>
            `;

            // All courses tab
            const isAllActive = (spotlightCourseFilter === 'all');
            tabsHTML += `
                <button class="spotlight-course-btn ${isAllActive ? 'active' : ''}" onclick="setSpotlightCourseFilter('all')">
                    ${window.ICONS ? window.ICONS.compass : ''}
                    <span>Tüm Dersler</span>
                </button>
            `;

            // Specific other courses
            Object.keys(fullList).forEach(key => {
                if (key === activeCourseKey) return;
                const c = fullList[key];
                const isActive = (spotlightCourseFilter === key);
                tabsHTML += `
                    <button class="spotlight-course-btn ${isActive ? 'active' : ''}" onclick="setSpotlightCourseFilter('${key}')">
                        ${window.getIcon ? (window.getIcon(c.icon) || '') : ''}
                        <span>${c.code}</span>
                    </button>
                `;
            });

            tabsContainer.innerHTML = tabsHTML;
        }

        function setSpotlightCourseFilter(cKey) {
            spotlightCourseFilter = cKey;
            renderSpotlightTabs();
            
            if (cKey === 'all') {
                preloadAllCourses();
            } else if (cKey !== 'current' && (!window.COURSES_DB[cKey] || !window.COURSES_DB[cKey].modules)) {
                ensureCourseLoaded(cKey).then(() => {
                    const input = document.getElementById('spotlight-input');
                    handleSearch(input ? input.value : '');
                });
            }

            const input = document.getElementById('spotlight-input');
            handleSearch(input ? input.value : '');
        }

        function setSpotlightTypeFilter(type) {
            spotlightTypeFilter = type;
            document.querySelectorAll('#spotlight-type-chips .spotlight-type-btn').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-type') === type);
            });
            const input = document.getElementById('spotlight-input');
            handleSearch(input ? input.value : '');
        }

        async function preloadAllCourses() {
            const fullList = window.COURSES_MANIFEST || COURSES_DB;
            for (const key of Object.keys(fullList)) {
                if (!window.COURSES_DB[key] || !window.COURSES_DB[key].modules) {
                    await ensureCourseLoaded(key);
                }
            }
            const input = document.getElementById('spotlight-input');
            handleSearch(input ? input.value : '');
        }

        function highlightMatch(text, query) {
            if (!query || !text) return text;
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="search-highlight">$1</mark>');
        }

        function updateSelectedSpotlightItem() {
            const items = document.querySelectorAll('.spotlight-item');
            if (!items.length) return;
            if (spotlightSelectedIndex < 0) spotlightSelectedIndex = 0;
            if (spotlightSelectedIndex >= items.length) spotlightSelectedIndex = items.length - 1;

            items.forEach((item, idx) => {
                const isSel = (idx === spotlightSelectedIndex);
                item.classList.toggle('selected', isSel);
                if (isSel) {
                    item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            });
        }

        function openSearchModal() {
            const modal = document.getElementById('spotlight-modal');
            const input = document.getElementById('spotlight-input');
            if (modal) {
                modal.style.display = 'flex';
                spotlightCourseFilter = 'current'; // Defaults to current active course
                spotlightTypeFilter = 'all';
                spotlightSelectedIndex = 0;
                renderSpotlightTabs();
                
                document.querySelectorAll('#spotlight-type-chips .spotlight-type-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-type') === 'all');
                });

                if (input) {
                    input.value = '';
                    input.focus();
                    handleSearch('');
                }
            }
        }

        function closeSearchModal(e) {
            const modal = document.getElementById('spotlight-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleSearch(query) {
            const resultsBox = document.getElementById('spotlight-results');
            const countBadge = document.getElementById('spotlight-count-badge');
            if (!resultsBox) return;
            const q = query.trim().toLowerCase();

            let conceptsHTML = '';
            let exercisesHTML = '';
            let totalCount = 0;

            const effectiveCourseFilter = (spotlightCourseFilter === 'current') ? activeCourseKey : spotlightCourseFilter;
            const starredIds = getStarredExercises();

            // 1. Search concepts
            if (spotlightTypeFilter === 'all' || spotlightTypeFilter === 'concepts') {
                Object.keys(conceptsDB).forEach(key => {
                    const c = conceptsDB[key];
                    if (effectiveCourseFilter !== 'all' && effectiveCourseFilter !== 'mat204_grup') {
                        return;
                    }
                    const matchTitle = c.title && c.title.toLowerCase().includes(q);
                    const matchDef = c.definition && c.definition.toLowerCase().includes(q);
                    const matchInt = c.intuition && c.intuition.toLowerCase().includes(q);

                    if (!q || matchTitle || matchDef || matchInt) {
                        totalCount++;
                        const snippet = c.intuition ? c.intuition.replace(/<[^>]+>/g, '').slice(0, 95) : '';
                        conceptsHTML += `
                            <div class="spotlight-item" onclick="closeSearchModal(); openConceptModal('${key}')">
                                <div>
                                    <div class="spotlight-item-title">
                                        ${window.ICONS ? window.ICONS.book : ''}
                                        <span>${highlightMatch(c.title, q)}</span>
                                    </div>
                                    <div class="spotlight-item-sub">${highlightMatch(snippet, q)}...</div>
                                </div>
                                <span style="font-size: 0.72rem; color: var(--accent-indigo); font-weight: 700; text-transform: uppercase;">Teorem &amp; Tanım</span>
                            </div>
                        `;
                    }
                });
            }

            // 2. Search exercises across filtered courses
            if (spotlightTypeFilter === 'all' || spotlightTypeFilter === 'exercises' || spotlightTypeFilter === 'starred') {
                const targetCourseKeys = (effectiveCourseFilter === 'all')
                    ? Object.keys(COURSES_DB)
                    : (COURSES_DB[effectiveCourseFilter] ? [effectiveCourseFilter] : []);

                targetCourseKeys.forEach(cKey => {
                    const c = COURSES_DB[cKey];
                    if (!c || !c.modules) return;

                    Object.keys(c.modules).forEach(modKey => {
                        const mod = c.modules[modKey];
                        if (!mod || !mod.exercises) return;

                        mod.exercises.forEach((ex, idx) => {
                            if (spotlightTypeFilter === 'starred' && !starredIds.includes(ex.id)) {
                                return;
                            }

                            const matchName = ex.name && ex.name.toLowerCase().includes(q);
                            const matchEnonce = ex.enonce && ex.enonce.toLowerCase().includes(q);
                            const matchTag = ex.tag && ex.tag.toLowerCase().includes(q);

                            if (!q || matchName || matchEnonce || matchTag) {
                                totalCount++;
                                const cleanSnippet = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 95) : '';
                                const isStarred = starredIds.includes(ex.id);
                                const glyph = window.getIcon ? (window.getIcon(c.icon) || '') : '';
                                const starIcon = isStarred ? (window.ICONS ? window.ICONS.starFilled : '') : '';

                                exercisesHTML += `
                                    <div class="spotlight-item" onclick="closeSearchModal(); switchCourseAndJump('${cKey}', '${modKey}', ${idx})">
                                        <div>
                                            <div class="spotlight-item-title">
                                                ${glyph}
                                                <span>${c.code} • ${mod.title.split(':')[0]} • ${highlightMatch(ex.name, q)}</span>
                                                ${starIcon}
                                            </div>
                                            <div class="spotlight-item-sub">${highlightMatch(cleanSnippet, q)}...</div>
                                        </div>
                                        <span style="font-size: 0.72rem; color: ${c.color}; font-weight: 700; text-transform: uppercase; border: 1px solid ${c.color}; padding: 2px 6px; border-radius: 4px;">${c.code}</span>
                                    </div>
                                `;
                            }
                        });
                    });
                });
            }

            let fullHTML = '';
            if (conceptsHTML) {
                fullHTML += '<div class="spotlight-group-title">Teoremler ve Temel Tanımlar</div>' + conceptsHTML;
            }
            if (exercisesHTML) {
                fullHTML += '<div class="spotlight-group-title">TD Soruları ve İspatlar</div>' + exercisesHTML;
            }
            if (!fullHTML) {
                fullHTML = '<div style="text-align: center; padding: 36px 20px; color: var(--text-muted); font-size: 0.92rem;">Bu filtrede eşleşen teorem veya soru bulunamadı.</div>';
            }

            resultsBox.innerHTML = fullHTML;
            if (countBadge) {
                countBadge.textContent = `${totalCount} sonuç`;
            }

            spotlightSelectedIndex = 0;
            updateSelectedSpotlightItem();

            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(resultsBox, {
                    delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
                    throwOnError: false
                });
            }
        }

        // Global shortcut for Cmd+K, /, Arrow Navigation, Enter and ESC
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('spotlight-modal');
            const isSpotlightOpen = modal && modal.style.display === 'flex';

            if (isSpotlightOpen) {
                const items = document.querySelectorAll('.spotlight-item');
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (items.length) {
                        spotlightSelectedIndex = (spotlightSelectedIndex + 1) % items.length;
                        updateSelectedSpotlightItem();
                    }
                    return;
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (items.length) {
                        spotlightSelectedIndex = (spotlightSelectedIndex - 1 + items.length) % items.length;
                        updateSelectedSpotlightItem();
                    }
                    return;
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const selectedItem = document.querySelector('.spotlight-item.selected');
                    if (selectedItem) {
                        selectedItem.click();
                    }
                    return;
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    closeSearchModal();
                    return;
                }
            }

            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openSearchModal();
            } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                openSearchModal();
            } else if (e.key === 'Escape' && isSpotlightOpen) {
                closeSearchModal();
            }
        });


        // ================= COMMON PITFALLS & EXAM WARNINGS =================
        function loadPitfallsView() {
            currentViewMode = 'special';
            currentSpecialView = 'pitfalls';
            setActiveNav('nav-pitfalls');
            const main = document.getElementById('main-content');
            const c = COURSES_DB[activeCourseKey];

            let traps = [];

            if (activeCourseKey === 'mat201_seriler') {
                traps = [
                    {
                        title: "1. Alterne Serilerde Eşdeğerlik ($u_n \sim v_n$) Tuzağı",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "İşareti değişen veya alterne serilerde $\\frac{(-1)^n}{\\sqrt{n} + (-1)^n} \\sim \\frac{(-1)^n}{\\sqrt{n}}$ belirterek 'Leibniz ile yakınsar' demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Asimptotik eşdeğerlik ($u_n \\sim v_n$) kuralı **YALNIZCA sabit işaretli (pozitif)** serilerde geçerlidir! Alterne serilerde Taylor açılımı yaparak $u_n = \\frac{(-1)^n}{\\sqrt{n}} - \\frac{1}{n} + o(1/n)$ şeklinde iki serinin toplamı olarak incelenmelidir."
                    },
                    {
                        title: "2. Genel Terim Sıfıra Gidince 'Seri Yakınsaktır' Demek",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "$\\lim_{n \\to \\infty} u_n = 0$ bulunca 'O halde seri yakınsaktır' belirterek çözümü sonlandırmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "$\\lim u_n = 0$ yakınsaklık için yalnızca bir **GEREK ŞARTTIR**, yeter şart değildir! Karşıt örnek: $\\sum \\frac{1}{n}$ serisinde $1/n \\to 0$ fakat seri sonsuza ıraksar."
                    },
                    {
                        title: "3. D'Alembert Oranında $L = 1$ Çıkınca Karar Vermek",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-5 Puan):</span>`,
                        wrongDesc: "$\\lim \\frac{u_{n+1}}{u_n} = 1$ çıkınca seriye yakınsak ya da ıraksak demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "$L = 1$ durumunda D'Alembert testi **tamamen kararsızdır**. Bu durumda Riemann serisiyle karşılaştırma veya Raabe-Duhamel testine geçilmelidir."
                    },
                    {
                        title: "4. Düzgün Yakınsaklık Olmadan İntegral ve Türev Kaydırmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "Sadece noktasal yakınsaklık varken $\\lim \\int_0^1 f_n(x)dx = \\int_0^1 \\lim f_n(x)dx$ eşitliğini doğrudan uygulamak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "İntegral veya türevin limit ile yer değiştirebilmesi için $(f_n)$ dizisinin ya da $\\sum u_n$ serisinin o aralıkta **DÜZGÜN YAKINSAK (Convergence Uniforme)** olduğunu ispatlamak şarttır."
                    },
                    {
                        title: "5. Fonksiyon Dizilerinde Supremum Normunu Yanlış Hesaplamak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-8 Puan):</span>`,
                        wrongDesc: "$\\|f_n - f\\|_\\infty$ yerine $x$'e sabit bir sayı (örneğin $x=1/2$) koyup limitin sıfıra gittiğini göstererek 'düzgün yakınsaktır' demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Düzgün yakınsaklık tüm tanım kümesindeki **en büyük sapmaya (supremum normu)** bakar. Türev yardımıyla tepe noktası ($x_n$) belirlenmeli ve $\sup |f_n(x) - f(x)|$ limitinin sıfıra yakınsayıp yakınsamadığı irdelenmelidir."
                    },
                    {
                        title: "6. Riemann Serisinde $\\alpha = 1$ Durumu",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-5 Puan):</span>`,
                        wrongDesc: "$\\sum \\frac{1}{n^\\alpha}$ serisinin $\\alpha \\ge 1$ için yakınsadığını yazmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Riemann serisi sadece ve sadece **$\\alpha > 1$** için yakınsar! $\\alpha = 1$ harmonik seridir ve ıraksar."
                    }
                ];
            } else if (activeCourseKey === 'fiz101_fizik') {
                traps = [
                    {
                        title: "1. Frenet Tabanında Normal (Merkezcil) İvmeyi Atlamak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "İvmeyi sadece hız büyüklüğünün skaler türevi kabul edip $\\vec{a} = \\frac{dv}{dt} \\vec{T}$ yazmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Eğrisel yörüngelerde hız büyüklüğü sabit olsa dahi yönü değişir. Bu nedenle merkezcil ivme bileşeni kesinlikle eklenmelidir: $\\vec{a} = \\frac{dv}{dt} \\vec{T} + \\frac{v^2}{\\rho} \\vec{N}$."
                    },
                    {
                        title: "2. Kutupsal Taban Vektörlerinin Türevini Sıfır Almak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-8 Puan):</span>`,
                        wrongDesc: "$\\vec{r} = r \\vec{u}_r$ türevini alırken taban türevini ihmal edip $\\vec{v} = \\dot{r} \\vec{u}_r$ yazmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Kutupsal taban vektörleri zamana bağlı olarak yön değiştirir: $\\frac{d\\vec{u}_r}{dt} = \\dot{\\theta}\\vec{u}_\\theta$. Dolayısıyla hız vektörü $\\vec{v} = \\dot{r}\\vec{u}_r + r\\dot{\\theta}\\vec{u}_\\theta$ şeklinde ifade edilir."
                    },
                    {
                        title: "3. Dönen Referans Sisteminde Poisson Bağıntısını Unutmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "Sabit repere göre türevi hareketli repere göre türeve doğrudan eşitlemek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Poisson formülü uygulanmalıdır: $\\left(\\frac{d\\vec{A}}{dt}\\right)_{R_0} = \\left(\\frac{d\\vec{A}}{dt}\\right)_{R'} + \\vec{\\Omega} \\times \\vec{A}$."
                    },
                    {
                        title: "4. Sürtünme Kuvvetini Daima $f = \\mu N$ Almak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-6 Puan):</span>`,
                        wrongDesc: "Cisim henüz kaymazken (statik dengedeyken) sürtünmeyi doğrudan $\\mu_s N$ olarak hesaplamak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Statik sürtünme bir eşitsizliktir: $f_s \\le \\mu_s N$. Değeri uygulanan net kuvvete göre denge denkleminden bulunur; sadece kayma anında maksimuma ($f_{s,\\max} = \\mu_s N$) ulaşır."
                    }
                ];
            } else if (activeCourseKey === 'mat206_olasilik') {
                traps = [
                    {
                        title: "1. Bağımsızlık ile Ayrıklığı Karıştırmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "İki olay bağımsız olduğunda $A \\cap B = \\emptyset$ sanmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Ayrıklık (disjoints) kesişimin boş olması demektir ($P(A \\cap B) = 0$). Bağımsızlık ise $P(A \\cap B) = P(A)P(B)$ demektir. Pozitif olasılıklı iki olay hem ayrık hem bağımsız OLAMAZ!"
                    },
                    {
                        title: "2. Bayes Formülünün Paydasını Eksik Açmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-8 Puan):</span>`,
                        wrongDesc: "Bayes formülünde paydadaki $P(B)$'yi açarken tümleyen durumu ($P(\\bar{A})P(B \\mid \\bar{A})$) unutmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Payda toplam olasılık formülüdür: $P(B) = P(A)P(B \\mid A) + P(\\bar{A})P(B \\mid \\bar{A})$. Özellikle tıbbi test sorularında sağlam popülasyon terimi sonucu belirler."
                    },
                    {
                        title: "3. İadesiz Çekilişte Olasılıkları Sabit Tutmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-5 Puan):</span>`,
                        wrongDesc: "Tirage sans remise (iadesiz çekiliş) yaparken ikinci çekiliş için paydayı $n$ olarak bırakmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Her çekilişte torbadaki bilye sayısı 1 azalır (payda $n-1$). İadeli ise bağımsızdır ve payda sabit kalır."
                    }
                ];
            } else {
                // Default: mat204_grup
                traps = [
                    {
                        title: "1. Permütasyon Bileşkesinde İşlem Sırası",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-5 Puan):</span>`,
                        wrongDesc: "$(\\sigma \\circ \\tau)(x)$ işleminde soldan sağa doğru giderek elemanın görüntüsünü bulmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Bileşke fonksiyon gibi değerlendirilir: **Sağdaki $\\tau$'dan başlanıp sola $\\sigma$'ya gidilir**: $(\\sigma \\circ \\tau)(x) = \\sigma(\\tau(x))$."
                    },
                    {
                        title: "2. Alt Grup İspatında Birim Elemanı ($e \\in H$) Unutmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-6 Puan):</span>`,
                        wrongDesc: "Doğrudan $\\forall x, y \\in H, xy^{-1} \\in H$ yazmak ama kümenin boş küme olmadığını ($H \\neq \\emptyset$) göstermemek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "İspata daima 'Puisque $e \\in H$, $H \\neq \\emptyset$' tespitiyle başlanmalıdır. $H$\'nin boş küme olmadığı teyit edilmeden alt grup kriteri geçerli olmaz."
                    },
                    {
                        title: "3. Lagrange Teoreminin Tersinin Her Zaman Doğru Olduğunu Sanmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "'$d$ böler $|G|$ ise $G$'nin mertebesi $d$ olan kesin bir alt grubu vardır' demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Lagrange teoreminin tersi genel gruplarda **DOĞRU DEĞİLDİR**! Klasik karşıt örnek: $|\\mathcal{A}_4| = 12$ olup $6 \\mid 12$ olmasına rağmen $\\mathcal{A}_4$'ün mertebesi 6 olan hiçbir alt grubu yoktur!"
                    },
                    {
                        title: "4. Bézout Katsayılarında Eksi İşaretini Unutmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-4 Puan):</span>`,
                        wrongDesc: "Geriye doğru sararken $r = A - qB$ yerine $A + qB$ yazıp katsayı işaretlerini karıştırmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Her satırda parantezleri titizlikle takip ediniz: $au + bv = 1$ eşitliğinde katsayıların negatif olabileceği göz önünde bulundurulmalıdır."
                    },
                    {
                        title: "5. Devirli Gruplarda Mertebe ile Bölünebilme Yönü",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-5 Puan):</span>`,
                        wrongDesc: "$g^n = e$ olduğunda hemen $o(g) = n$ demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "$g^n = e \\iff o(g) \\mid n$. Yani $n$, mertebenin bir katıdır; en küçük pozitif kat mertebedir."
                    },
                    {
                        title: "6. Diedral Grupta Yansıma ve Dönme Çarpımı ($D_n$)",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-5 Puan):</span>`,
                        wrongDesc: "$s \\cdot r^2 = r^2 \\cdot s$ olduğunu varsaymak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Yansıma elemanı saat yönündeki dönmeyi tersine çevirir: **$s \\cdot r^k = r^{-k} \\cdot s = r^{n-k} \\cdot s$**. $s$ elemanı sağa aktarılırken $r$ dönme elemanının kuvvetinin işaretinin eksiye döneceği dikkate alınmalıdır."
                    }
                ];
            }

            let trapsHTML = '';
            traps.forEach(t => {
                trapsHTML += `
                    <div class="pitfall-card">
                        <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-main);">
                            ${t.title}
                        </div>
                        <div class="pitfall-grid">
                            <div class="pitfall-wrong">
                                <strong style="color: var(--accent-rose);">${t.wrongText}</strong>
                                <p style="font-size: 0.88rem; margin-top: 6px;">
                                    ${t.wrongDesc}
                                </p>
                            </div>
                            <div class="pitfall-right">
                                <strong style="color: var(--accent-emerald);">${t.rightText}</strong>
                                <p style="font-size: 0.88rem; margin-top: 6px;">
                                    ${t.rightDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${c.code} > Sınav Kılavuzu > Sık Yapılan Hatalar</div>
                        <h1 class="content-title">${window.ICONS ? window.ICONS.alertTriangle : ""} Sık Yapılan Hatalar &amp; Sınav Uyarıları (${c.code})</h1>
                    </div>
                </div>

                <div class="academic-card">
                    <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.7;">
                        Galatasaray Üniversitesi matematik ve fen sınavlarında tam puan almak için <strong>akademik yazım ve ispat kurallarına (rédaction mathématique)</strong> titizlikle uymak esastır. Aşağıda, <strong>${c.code} (${c.title})</strong> sınav kağıtlarında en sık puan kaybettiren hatalar ve doğru çözüm yaklaşımları derlenmiştir:
                    </p>

                    ${trapsHTML}
                </div>
            `;

            renderMath();
            saveAppState();
        }

        // ================= MOCK EXAM SIMULATOR =================
        let mockTimerInterval = null;
        let mockTimeRemaining = 90 * 60; // 90 minutes
        let isMockTimerRunning = false;
        let currentMockExam = null;

        function generateMockExam() {
            const c = COURSES_DB[activeCourseKey];
            const mods = c.modules;

            if (activeCourseKey === 'mat201_seriler') {
                return [
                    { num: 1, points: 20, topic: 'Sayı Dizileri & Monotonluk', ex: mods['seriler_mod1'].exercises[0], rubric: '+6 Puan: Fark formülü $u_{n+1}-u_n$, +8 Puan: Pozitiflik analizi, +6 Puan: Artanlık sonucu.' },
                    { num: 2, points: 20, topic: 'Geometrik & Teleskopik Seriler', ex: mods['seriler_mod2'].exercises[3], rubric: '+6 Puan: Genel terimin parçalanışı, +8 Puan: Kısmi toplam sadeleşmesi, +6 Puan: Seri toplamı.' },
                    { num: 3, points: 20, topic: 'İntegral Testi & Bertrand Serileri', ex: mods['seriler_mod2'].exercises[7], rubric: '+6 Puan: Asimptotik hız kıyaslaması, +8 Puan: İntegral hesabı, +6 Puan: Yakınsaklık kararı.' },
                    { num: 4, points: 20, topic: 'Alterne Seriler & Leibniz Kriteri', ex: mods['seriler_mod3'].exercises[9] || mods['seriler_mod3'].exercises[0], rubric: '+6 Puan: Terim pozitifliği ve azalanlık, +8 Puan: Limit sıfır koşulu, +6 Puan: Leibniz sonucu.' },
                    { num: 5, points: 20, topic: 'Fonksiyon Dizileri & Düzgün Yakınsaklık', ex: mods['seriler_mod4'].exercises[7] || mods['seriler_mod4'].exercises[0], rubric: '+6 Puan: Noktasal limit hesabı, +8 Puan: Süreklilik aktarımı çelişkisi, +6 Puan: Supremum normu.' }
                ];
            } else if (activeCourseKey === 'fiz101_fizik') {
                return [
                    { num: 1, points: 25, topic: 'Vektörler & Skaler/Vektörel Çarpım', ex: mods['fizik_mod1'].exercises[0], rubric: '+8 Puan: Norm ve birim vektörler, +10 Puan: Skaler çarpım ve açı hesabı, +7 Puan: Vektörel çarpım.' },
                    { num: 2, points: 25, topic: 'Dönen Sistemler & Poisson Bağıntısı', ex: mods['fizik_mod1'].exercises[1], rubric: '+8 Puan: Kartezyen projeksiyon, +10 Puan: Zamana göre türevler, +7 Puan: Poisson kuralı.' },
                    { num: 3, points: 25, topic: 'Kartezyen Kinematik & Frenet Tabanı', ex: mods['fizik_mod2'].exercises[1] || mods['fizik_mod2'].exercises[0], rubric: '+8 Puan: Hız vektörü ve normu, +10 Puan: Teğetsel ivme, +7 Puan: Normal ivme ve eğrilik.' },
                    { num: 4, points: 25, topic: 'Kutupsal Koordinatlarda Dairesel Hareket', ex: mods['fizik_mod2'].exercises[2] || mods['fizik_mod2'].exercises[0], rubric: '+8 Puan: Radyal ve teğetsel hız, +10 Puan: Merkezcil ivme, +7 Puan: Dinamik hareket denklemi.' }
                ];
            } else if (activeCourseKey === 'mat206_olasilik') {
                return [
                    { num: 1, points: 25, topic: 'Kombinatorik & Laplace Modeli', ex: mods['olasilik_mod1'].exercises[0], rubric: '+8 Puan: Örneklem uzayı $|\Omega| = \binom{12}{3}$, +10 Puan: İstenen olay kombinasyonu, +7 Puan: Sonuç olasılığı.' },
                    { num: 2, points: 25, topic: 'Kolmogorov Aksiyomları & Poincaré', ex: mods['olasilik_mod1'].exercises[1], rubric: '+10 Puan: Ayrık ayrışım ispatı, +10 Puan: Additivite aksiyomu, +5 Puan: Kesişim hesabı.' },
                    { num: 3, points: 25, topic: 'Toplam Olasılık Formülü', ex: mods['olasilik_mod2'].exercises[0], rubric: '+8 Puan: Tam olay sistemi tanımı, +10 Puan: Ağırlıklı toplam hesabı, +7 Puan: Nihai oran.' },
                    { num: 4, points: 25, topic: 'Bayes Teoremi & Tıbbi Dépistage', ex: mods['olasilik_mod2'].exercises[1], rubric: '+8 Puan: Koşullu olasılık ters çevirme, +10 Puan: Payda hesabı, +7 Puan: Gerçek hasta olasılığı.' }
                ];
            }

            // Default: mat204_grup
            const q1 = mods['modul1']?.exercises[0];
            const q2 = mods['modul2']?.exercises[0];
            const q3 = mods['modul3']?.exercises[1] || mods['modul3']?.exercises[0];
            const q4 = mods['modul4']?.exercises[1] || mods['modul4']?.exercises[0];
            const q5 = mods['modul5']?.exercises[4] || mods['modul6']?.exercises[0];

            return [
                { num: 1, points: 20, topic: 'Aritmetik ve Doğrusal Kombinasyon', ex: q1, rubric: '+5 Puan: Hipotez tanımı, +10 Puan: Doğrusal kombinasyon hesabı, +5 Puan: Sonuç ve d=±1.' },
                { num: 2, points: 20, topic: 'Denklik Bağıntısı ve Sınıflar', ex: q2, rubric: '+5 Puan: Yansıma, +5 Puan: Simetri, +5 Puan: Geçişme, +5 Puan: Denklik sınıfı.' },
                { num: 3, points: 20, topic: 'Devirli Grup ve Mertebe Bağıntısı ($g^n=e \\iff m \\mid n$)', ex: q3, rubric: '+6 Puan: (<=) Tek yönlü gerektirme, +10 Puan: (=>) Kalanlı bölme algoritması, +4 Puan: Minimalite ve r=0 sonucu.' },
                { num: 4, points: 20, topic: 'Devirli Grupların Alt Grup Yapısı (Théorème Fondamental)', ex: q4, rubric: '+6 Puan: Bölünebilirlik ve üreteç tespiti, +8 Puan: Her bölen için tek alt grup, +6 Puan: Alt grup elemanları.' },
                { num: 5, points: 20, topic: 'Permütasyonlar / $\\mathcal{S}_4$ ve Morfizmler', ex: q5, rubric: '+6 Puan: Ayrık döngü ayrışımı, +8 Puan: Mertebe (EKOK) hesabı, +6 Puan: İmza kuralı.' }
            ];
        }

        function loadMockExamView() {
            currentViewMode = 'special';
            currentSpecialView = 'mock-exam';
            setActiveNav('nav-mock-exam');
            const main = document.getElementById('main-content');
            if (!currentMockExam) {
                currentMockExam = generateMockExam();
            }

            renderMockExamUI();
            saveAppState();
        }

        function renderMockExamUI() {
            const main = document.getElementById('main-content');
            const minutes = Math.floor(mockTimeRemaining / 60);
            const seconds = mockTimeRemaining % 60;
            const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            let questionsHTML = '';
            currentMockExam.forEach(qItem => {
                questionsHTML += `
                    <div class="mock-question-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <span style="font-size: 0.84rem; font-weight: 700; color: var(--accent-blue); ">
                                Soru ${qItem.num} • ${qItem.topic}
                            </span>
                            <span style="font-weight: 700; color: var(--accent-emerald); font-size: 0.95rem;">
                                [${qItem.points} Puan]
                            </span>
                        </div>
                        <div class="question-statement" style="font-size: 1.15rem; margin-bottom: 14px;">
                            ${qItem.ex.enonce}
                        </div>
                        <div class="print-answer-space"></div>

                        <details style="margin-top: 14px; cursor: pointer;">
                            <summary style="font-weight: 600; color: var(--accent-indigo); outline: none;">
                                ${window.ICONS ? window.ICONS.listTodo : ""} Model Çözümü ve Puan Baremini Göster
                            </summary>
                            <div style="margin-top: 14px; padding: 18px 22px; background: var(--bg-paper); border: 1px solid var(--border-subtle); border-radius: 10px;">
                                <div style="font-family: 'Newsreader', serif; font-size: 1.14rem; line-height: 1.8;">
                                    ${qItem.ex.solution}
                                </div>
                                <div class="mock-rubric-box">
                                    <strong style="color: var(--accent-emerald);">${window.ICONS ? window.ICONS.target : ""} Puanlama Baremi (Barème):</strong> ${qItem.rubric}
                                </div>
                            </div>
                        </details>
                    </div>
                `;
            });

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${COURSES_DB[activeCourseKey].code} > Sınav ve Çalışma Araçları > Vize Deneme Sınavı</div>
                        <h1 class="content-title">${window.ICONS ? window.ICONS.target : ""} ${COURSES_DB[activeCourseKey].code} Vize Deneme Sınavı (100 Puan)</h1>
                    </div>
                </div>

                <div class="exam-timer-bar">
                    <div>
                        <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Kalan Sınav Süresi</div>
                        <div class="timer-display" id="mock-timer-display">${timeFormatted}</div>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <button class="btn-stepper ${isMockTimerRunning ? '' : 'primary'}" onclick="toggleMockTimer()">
                            ${isMockTimerRunning ? (window.ICONS ? window.ICONS.pause : "") + " Sayacı Duraklat" : (window.ICONS ? window.ICONS.play : "") + " 90 Dk Sayacı Başlat"}
                        </button>
                        <button class="btn-stepper" onclick="resetMockTimer()">
                            ${window.ICONS ? window.ICONS.refresh : ""} Sayacı Sıfırla
                        </button>
                        <button class="btn-stepper secondary" onclick="newMockExam()">
                            ${window.ICONS ? window.ICONS.dice : ""} Yeni Deneme Sınavı Üret
                        </button>
                        <button class="btn-stepper" onclick="printMockExam(false)" style="margin-left: auto;">
                            ${window.ICONS ? window.ICONS.printer : ""} Boş Sınav Kağıdı Yazdır
                        </button>
                        <button class="btn-stepper" onclick="printMockExam(true)">
                            ${window.ICONS ? window.ICONS.printer : ""} Çözümlü Not Baremi Yazdır
                        </button>
                    </div>
                </div>

                <div class="print-exam-header">
                    <h2>Galatasaray Üniversitesi • Fen-Edebiyat Fakültesi</h2>
                    <div class="sub">${COURSES_DB[activeCourseKey].code} — ${COURSES_DB[activeCourseKey].title} Vize Deneme Sınavı (Süre: 90 Dakika • 100 Puan)</div>
                    <div class="print-meta-grid">
                        <div><strong>Adı Soyadı:</strong> __________________</div>
                        <div><strong>Numara:</strong> __________________</div>
                        <div><strong>Tarih:</strong> ___ / ___ / 2026</div>
                    </div>
                </div>

                <div style="background: rgba(37, 99, 235, 0.05); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; font-size: 0.95rem; color: var(--text-main);">
                    <strong>Sınav Yönergesi:</strong> Boş bir kağıt ve kalem alarak 90 dakikalık süreyi başlatınız. Soruları akademik sınav formatına (<em>Soit... Par conséquent...</em>) uygun biçimde adım adım çözünüz. Süre tamamlandığında model çözümü ve puanlama baremini açarak kağıdınızı 100 üzerinden değerlendiriniz.
                </div>

                ${questionsHTML}
            `;

            renderMath();
        }

        function toggleMockTimer() {
            if (isMockTimerRunning) {
                clearInterval(mockTimerInterval);
                isMockTimerRunning = false;
            } else {
                isMockTimerRunning = true;
                mockTimerInterval = setInterval(() => {
                    if (mockTimeRemaining > 0) {
                        mockTimeRemaining--;
                        const display = document.getElementById('mock-timer-display');
                        if (display) {
                            const minutes = Math.floor(mockTimeRemaining / 60);
                            const seconds = mockTimeRemaining % 60;
                            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                        }
                    } else {
                        clearInterval(mockTimerInterval);
                        isMockTimerRunning = false;
                        alert('⏰ 90 Dakikalık Sınav Süresi Doldu! Şimdi kağıdınızı puanlama baremine göre değerlendirebilirsiniz.');
                    }
                }, 1000);
            }
            renderMockExamUI();
        }

        function resetMockTimer() {
            clearInterval(mockTimerInterval);
            isMockTimerRunning = false;
            mockTimeRemaining = 90 * 60;
            renderMockExamUI();
        }

        function newMockExam() {
            currentMockExam = generateMockExam();
            resetMockTimer();
        }


        
        // ================= MOBILE DRAWER CONTROLS =================
        function toggleMobileSidebar() {
            const aside = document.querySelector('aside');
            const backdrop = document.getElementById('mobile-backdrop');
            if (!aside) return;

            const isOpen = aside.classList.toggle('mobile-open');
            if (backdrop) {
                backdrop.classList.toggle('active', isOpen);
            }
            if (isOpen) {
                document.body.style.overflow = 'hidden'; // prevent background scroll
            } else {
                document.body.style.overflow = '';
            }
        }

        function closeMobileSidebar() {
            const aside = document.querySelector('aside');
            const backdrop = document.getElementById('mobile-backdrop');
            if (aside) aside.classList.remove('mobile-open');
            if (backdrop) backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Auto-close mobile sidebar when user clicks a nav item on small screen
        const originalSetActiveNav = setActiveNav;
        setActiveNav = function(navId) {
            originalSetActiveNav(navId);
            if (window.innerWidth <= 900) {
                closeMobileSidebar();
            }
        };

        // Also close when jumpToExercise or switchExercise is called on mobile
        const origJumpToExercise = jumpToExercise;
        jumpToExercise = function(modKey, exIdx) {
            origJumpToExercise(modKey, exIdx);
            if (window.innerWidth <= 900) {
                closeMobileSidebar();
            }
        };


        
        // ================= MULTI-COURSE MANAGEMENT =================
        function toggleCourseDropdown() {
            const menu = document.getElementById('course-dropdown-menu');
            if (menu) menu.classList.toggle('open');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const container = document.querySelector('.course-dropdown-container');
            if (container && !container.contains(e.target)) {
                const menu = document.getElementById('course-dropdown-menu');
                if (menu) menu.classList.remove('open');
            }
        });

        async function switchActiveCourse(courseKey) {
            const manifest = (typeof COURSES_MANIFEST !== 'undefined') ? COURSES_MANIFEST[courseKey] : null;
            if (!manifest && (!window.COURSES_DB || !window.COURSES_DB[courseKey])) return;

            await ensureCourseLoaded(courseKey);
            activeCourseKey = courseKey;
            try {
                localStorage.setItem('gs_active_course', courseKey);
            } catch(e) {}
            modulesDB = COURSES_DB[activeCourseKey].modules;

            // Close dropdown
            const menu = document.getElementById('course-dropdown-menu');
            if (menu) menu.classList.remove('open');

            // Try restoring saved state for this course or default to first module
            let restored = false;
            try {
                const savedStateStr = localStorage.getItem('gs_portal_state_' + activeCourseKey);
                if (savedStateStr) {
                    const st = JSON.parse(savedStateStr);
                    if (st.viewMode === 'special' && st.specialView) {
                        currentViewMode = 'special';
                        currentSpecialView = st.specialView;
                        restored = true;
                    } else if (st.moduleKey && modulesDB[st.moduleKey]) {
                        currentViewMode = 'module';
                        currentSpecialView = null;
                        currentModuleKey = st.moduleKey;
                        currentTrack = st.track || 'theory';
                        currentExerciseIdx = parseInt(st.exerciseIdx, 10) || 0;
                        currentTheoryPageIdx = parseInt(st.theoryPageIdx, 10) || 0;
                        showAllTheoryPages = !!st.showAllTheoryPages;
                        restored = true;
                    }
                }
            } catch(e) {}

            if (!restored) {
                currentViewMode = 'module';
                currentSpecialView = null;
                const firstModKey = Object.keys(modulesDB)[0];
                currentModuleKey = firstModKey;
                currentTrack = 'theory';
                currentExerciseIdx = 0;
                currentTheoryPageIdx = 0;
                showAllTheoryPages = false;
            }

            currentStepIdx = 1;
            showAllStepsMode = false;
            currentMockExam = null;
            currentCardIdx = 0;

            updateCourseHeaderUI();
            renderSidebarNav();
            updateProgressUI();
            renderCurrentView();
            saveAppState();
        }

        function updateCourseHeaderUI() {
            const manifest = (typeof COURSES_MANIFEST !== 'undefined') ? COURSES_MANIFEST[activeCourseKey] : null;
            const c = (window.COURSES_DB && window.COURSES_DB[activeCourseKey]) || manifest;
            if (!c) return;
            const dot = document.getElementById('header-course-dot');
            const code = document.getElementById('header-course-code');
            const title = document.getElementById('header-course-title');

            if (dot) dot.style.background = c.color;
            if (code) {
                code.textContent = c.code;
                code.style.color = c.color;
            }
            if (title) title.textContent = c.title;

            // Also update mobile topbar
            const mobCode = document.querySelector('.mobile-course-badge');
            const mobTitle = document.querySelector('.mobile-page-name');
            if (mobCode) {
                mobCode.textContent = c.code;
                mobCode.style.background = c.color;
            }
            if (mobTitle) mobTitle.textContent = c.title;

            // Update dropdown options active state
            const menu = document.getElementById('course-dropdown-menu');
            if (menu) {
                let optsHTML = '';
                const fullList = window.COURSES_MANIFEST || COURSES_DB;
                Object.keys(fullList).forEach(key => {
                    const item = fullList[key];
                    const isActive = key === activeCourseKey;
                    const modCount = item.moduleList ? item.moduleList.length : (item.modules ? Object.keys(item.modules).length : 0);
                    const facultyInfo = item.faculty ? (item.faculty.includes('•') ? item.faculty.split('•')[1] : item.faculty) : '';
                    optsHTML += `
                        <div class="course-option ${isActive ? 'active' : ''}" onclick="switchActiveCourse('${key}')">
                            <span style="display: inline-flex; align-items: center;">${window.getIcon ? (window.getIcon(item.icon) || item.icon) : item.icon}</span>
                            <div>
                                <div class="course-opt-name">${item.code} — ${item.title}</div>
                                <div class="course-opt-sub">${modCount} Modül • ${facultyInfo}</div>
                            </div>
                            ${isActive ? '<span style="margin-left: auto; color: var(--accent-emerald); font-weight: 700;">✓</span>' : ''}
                        </div>
                    `;
                });
                menu.innerHTML = optsHTML;
            }
        }

        function renderSidebarNav() {
            const topicNav = document.querySelector('.topic-nav');
            if (!topicNav) return;
            const c = COURSES_DB[activeCourseKey];

            let navModulesHTML = `<div class="nav-section-title">${c.code} Müfredatı (Tüm Modüller)</div>`;
            Object.keys(modulesDB).forEach((modKey, idx) => {
                const mod = modulesDB[modKey];
                const isActive = modKey === currentModuleKey ? 'active' : '';
                navModulesHTML += `
                    <div class="nav-item ${isActive}" id="nav-${modKey}" onclick="loadModule('${modKey}')">
                        <div class="nav-item-left">
                            <span>${idx + 1}</span>
                            <span>${mod.title.split(':')[0]}</span>
                        </div>
                        <span class="nav-count-badge" id="badge-${modKey}">0/${mod.exercises.length} ✓</span>
                    </div>
                `;
            });

            // Keep exam tools
            const toolsSection = `
                <div class="nav-section-title" style="margin-top: 14px;">Sınav ve Çalışma Araçları</div>

                <div class="nav-item" id="nav-starred" onclick="openStarredPool()">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.starFilled : ""}
                        <span>Yıldızlı &amp; Önemli Sorularım</span>
                    </div>
                    <span class="nav-count-badge" id="badge-starred-count" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-amber);">0 Kayıt</span>
                </div>

                <div class="nav-item" id="nav-mock-exam" onclick="loadMockExamView()">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.target : ""}
                        <span>${c.code} Vize Deneme Sınavı</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(37, 99, 235, 0.2); color: var(--accent-blue);">90 Dk</span>
                </div>

                <div class="nav-item" id="nav-pitfalls" onclick="loadPitfallsView()">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.alertTriangle : ""}
                        <span>Sık Yapılan Hatalar &amp; Sınav Uyarıları</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">Dikkat</span>
                </div>

                <div class="nav-item" id="nav-unresolved" onclick="openUnresolvedPool()">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.compass : ""}
                        <span>Kalan &amp; Çözülecek Sorular</span>
                    </div>
                    <span class="nav-count-badge" id="badge-unresolved-count" style="background: rgba(251, 191, 36, 0.2); color: var(--accent-amber);">Pratik</span>
                </div>
                
                <div class="nav-item" id="nav-flashcards" onclick="openFlashcardArena()">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.flashcards : ""}
                        <span>Kavram &amp; Formül Kartları</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(244, 63, 94, 0.2); color: var(--accent-rose);">Pratik</span>
                </div>

                <div class="nav-item" id="nav-ispatlar" onclick="loadSpecialView('ispatlar')">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.book : ""}
                        <span>Kritik Teorem İspatları</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(139, 92, 246, 0.18); color: var(--accent-purple);">İspat</span>
                </div>

                <div class="nav-item" id="nav-fransizca" onclick="loadSpecialView('fransizca')">
                    <div class="nav-item-left">
                        <span class="badge-lang-tag">FR</span>
                        <span>Fransızca Matematiksel İfadeler</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(59, 130, 246, 0.18); color: var(--accent-blue);">Kılavuz</span>
                </div>

                <div class="nav-item" id="nav-hesaplayici" onclick="loadSpecialView('hesaplayici')">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.calculator : ""}
                        <span>${getCalculatorTitle(activeCourseKey)}</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(16, 185, 129, 0.18); color: var(--accent-emerald);">Araç</span>
                </div>
            `;

            topicNav.innerHTML = navModulesHTML + toolsSection;
        }


        window.onload = async function() {
            initTheme();
            await ensureCourseLoaded(activeCourseKey);
            await restoreAppState();
            updateCourseHeaderUI();
            renderSidebarNav();
            updateProgressUI();
            renderCurrentView();
            saveAppState();
            fetchFromCloud(true);
        };

        // Otomatik Bulut Senkronizasyonu: Kullanıcı sekmeye her döndüğünde (telefonda soru işaretleyip bilgisayara geçince)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                fetchFromCloud(false);
            }
        });

        window.addEventListener('online', function() {
            updateSyncStatusUI('syncing', 'Bağlantı Kuruldu');
            fetchFromCloud(false);
        });

        window.addEventListener('offline', function() {
            updateSyncStatusUI('offline', 'Çevrimdışı (PWA)');
        });


        window.addEventListener('hashchange', async function() {
            if (await restoreAppState()) {
                updateCourseHeaderUI();
                renderSidebarNav();
                updateProgressUI();
                renderCurrentView();
            }
        });


        // Global Keyboard Navigation for Study Mode & Flashcards
        document.addEventListener('keydown', function(e) {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;

            if (currentViewMode === 'module' && currentTrack === 'exercises') {
                if (e.key === 'ArrowRight' && !e.shiftKey) {
                    e.preventDefault();
                    nextStep();
                } else if (e.key === 'ArrowLeft' && !e.shiftKey) {
                    e.preventDefault();
                    if (currentStepIdx > 1) {
                        currentStepIdx--;
                        renderModuleView();
                    } else if (currentExerciseIdx > 0) {
                        switchExercise(currentExerciseIdx - 1);
                    }
                } else if (e.key === 's' || e.key === 'S') {
                    const mod = modulesDB[currentModuleKey];
                    if (mod && mod.exercises[currentExerciseIdx]) {
                        toggleStar(mod.exercises[currentExerciseIdx].id);
                    }
                } else if (e.key === 'h' || e.key === 'H') {
                    toggleHint();
                } else if (e.key === 'c' || e.key === 'C') {
                    const mod = modulesDB[currentModuleKey];
                    if (mod && mod.exercises[currentExerciseIdx]) {
                        const ex = mod.exercises[currentExerciseIdx];
                        const isSolved = getSolvedExercises().includes(ex.id);
                        setExerciseSolved(ex.id, !isSolved);
                    }
                }
            } else if (currentViewMode === 'special' && currentSpecialView === 'flashcards') {
                if (e.key === ' ' || e.code === 'Space') {
                    e.preventDefault();
                    flipCard();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextCard();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevCard();
                } else if (e.key === '1') {
                    markCardMastery(false);
                } else if (e.key === '2') {
                    markCardMastery(true);
                }
            }
        });

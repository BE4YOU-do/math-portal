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
                const res = await fetch(`data/courses/${courseKey}.json?v=25`);
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
            await loadScriptAsync(`data/courses/${courseKey}.js?v=25`);
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

        let nt = {};
        try {
            const ntRaw = localStorage.getItem(cKey + '_user_notes');
            if (ntRaw) nt = JSON.parse(ntRaw);
        } catch(e) {}

        courses[cKey] = {
            starred: st,
            completed: sol,
            completedTheory: th,
            notes: nt
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

                // Personal exam notes merge
                const cloudNotes = (cloudC.notes && typeof cloudC.notes === 'object') ? cloudC.notes : {};
                const localNotes = (localC.notes && typeof localC.notes === 'object') ? localC.notes : {};
                const mergedNotes = Object.assign({}, cloudNotes, localNotes);
                if (Object.keys(mergedNotes).length !== Object.keys(localNotes).length) {
                    try { localStorage.setItem(cKey + '_user_notes', JSON.stringify(mergedNotes)); } catch(e) {}
                    localChanged = true;
                }
                if (Object.keys(mergedNotes).length !== Object.keys(cloudNotes).length) needsUpload = true;
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
            if (window.innerWidth <= 900 || (aside && aside.classList.contains('mobile-open'))) {
                closeMobileSidebar();
                return;
            }
            if (!aside) return;
            const isCollapsed = aside.classList.toggle('collapsed');
            document.body.classList.toggle('sidebar-is-collapsed', isCollapsed);
            try {
                localStorage.setItem('portal_desktop_sidebar_collapsed', isCollapsed ? '1' : '0');
            } catch(e) {}
        }

        // Check stored sidebar state (desktop only)
        (function initSidebarState() {
            try {
                localStorage.removeItem('mat204_sidebar_collapsed');
                if (window.innerWidth > 900 && localStorage.getItem('portal_desktop_sidebar_collapsed') === '1') {
                    document.addEventListener('DOMContentLoaded', () => {
                        const aside = document.querySelector('aside');
                        if (aside && window.innerWidth > 900) {
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
            syncMobileNavTabs(currentTrack);
            saveAppState();
        }

        function switchTrack(trackName) {
            currentTrack = trackName;
            currentStepIdx = 1;
            showAllStepsMode = false;
            isHintVisible = false;
            renderModuleView();
            syncMobileNavTabs(trackName);
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

            // Preserve horizontal scroll position of pills bars before DOM replacement
            const prevPillsBar = main.querySelector('.exercise-pills-bar');
            const savedPillsScrollLeft = prevPillsBar ? prevPillsBar.scrollLeft : null;
            const prevTheoryNav = main.querySelector('.theory-pages-nav');
            const savedTheoryNavScrollLeft = prevTheoryNav ? prevTheoryNav.scrollLeft : null;

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
                let pages = mod.theoryPages;
                if (!pages || !pages.length) {
                    if (mod.theoryContent) {
                        pages = [{ title: 'Tam Konu Anlatımı', html: mod.theoryContent }];
                    } else {
                        pages = [];
                    }
                }

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
                if (showAllTheoryPages) {
                    currentContentHTML = mod.theoryContent || pages.map(p => `<div class="theory-page-block"><h2 class="book-sec-title" style="color: var(--accent-blue); margin-top: 24px; margin-bottom: 12px;">${p.title}</h2>${p.html}</div>`).join('<hr style="margin: 30px 0; border: none; border-top: 1px dashed var(--border-subtle);">');
                } else if (pages.length > 0) {
                    const currentPage = pages[currentTheoryPageIdx] || pages[0];
                    currentContentHTML = currentPage ? (currentPage.html || '') : (mod.theoryContent || '');
                } else {
                    currentContentHTML = mod.theoryContent || '<div style="padding: 28px; text-align: center; color: var(--text-muted); background: var(--bg-surface); border-radius: 8px;">📖 Bu modül için konu anlatımı hazırlanmaktadır. Doğrudan <strong>İnteraktif TD Soru Bankası</strong> sekmesine geçebilirsiniz.</div>';
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
                                        Bu Modülün TD Sorularına Geç (${mod.exercises ? mod.exercises.length : 0} Soru) ${window.ICONS ? window.ICONS.arrowRight : ""}
                                    </button>
                                `}
                            </div>
                        </div>
                    `;
                }

                const breadcrumbText = mod.breadcrumb || (currentCourse ? `${currentCourse.code} > ${mod.shortTitle || mod.title}` : (mod.shortTitle || mod.title));

                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">${breadcrumbText} > Kapsamlı Ders Kitabı &amp; Teori</div>
                            <h1 class="content-title">${mod.title}</h1>
                        </div>
                    </div>

                    ${luxurySwitcherHTML}

                    ${pagesNavHTML}

                    <div class="academic-card">
                        ${renderConceptChipsBar(mod.concepts || [], "Bu Bölümdeki Kritik Teorem & Kavramlar (Tıkla & Hatırla):")}
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
                    const noteBadge = getExerciseNote(item.id) ? '<span title="Kişisel sınav notu var" style="font-size: 0.72rem; margin-left: 3px;">📝</span>' : '';
                    const tip = (item.subtitle || item.name || '').replace(/"/g, '&quot;');
                    pillsHTML += `<button class="pill-btn ${activeClass}" onclick="switchExercise(${idx})" title="${tip}">${checkIcon} ${item.name}${noteBadge}</button>`;
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

                        ${ex.subtitle ? `<div style="font-size: 1.02rem; font-weight: 700; color: var(--accent-indigo); margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px dashed var(--border-subtle);">${ex.name} — ${ex.subtitle}</div>` : ''}

                        <div class="question-statement" style="font-size: 1.18rem; margin-bottom: 18px; line-height: 1.7;">
                            ${ex.enonce}
                        </div>

                        <div id="question-hint-box" class="hint-callout-box" style="display: ${isHintVisible ? 'block' : 'none'};">
                            <strong>${window.ICONS ? window.ICONS.compass : ""} Sınav Taktik İpucu:</strong> ${ex.hint}
                        </div>

                        ${renderConceptChipsBar(ex.concepts || [], "Bu Soruda Kullanılan Teorem & Hatırlatmalar (Tıkla & Hatırla):")}

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

                        <details style="margin-top: 16px; background: var(--bg-paper); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 10px 14px;" ${getExerciseNote(ex.id) ? 'open' : ''}>
                            <summary style="cursor: pointer; font-size: 0.86rem; font-weight: 600; color: var(--text-secondary); user-select: none;">
                                ${window.ICONS ? window.ICONS.penTool : "📝"} Kişisel Sınav Notum ${getExerciseNote(ex.id) ? '<span style="color: var(--accent-emerald); margin-left: 6px;">(Not Kayıtlı ✓)</span>' : '<span style="color: var(--text-muted); font-weight: 400; margin-left: 6px;">(Bu soru için kendinize ipucu veya hatırlatma ekleyin)</span>'}
                            </summary>
                            <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                                <textarea id="user-note-input-${ex.id}" rows="2" placeholder="Örn: Sınavda bu soruda önce e ∈ H olduğunu yazmayı unutma, sonra xy⁻¹ ∈ H göster..." style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 10px 12px; color: var(--text-main); font-family: inherit; font-size: 0.9rem; resize: vertical;">${getExerciseNote(ex.id)}</textarea>
                                <div style="display: flex; justify-content: flex-end; gap: 8px;">
                                    <button class="btn-stepper primary" style="padding: 6px 14px; font-size: 0.82rem;" onclick="saveExerciseNote('${ex.id}')">Notu Kaydet</button>
                                </div>
                            </div>
                        </details>
                    </div>
                `;

                const newPillsBar = main.querySelector('.exercise-pills-bar');
                if (newPillsBar) {
                    const activePill = newPillsBar.querySelector('.pill-btn.active');
                    if (savedPillsScrollLeft !== null) {
                        newPillsBar.scrollLeft = savedPillsScrollLeft;
                        if (activePill) {
                            const pillLeft = activePill.offsetLeft;
                            const pillRight = pillLeft + activePill.offsetWidth;
                            const viewLeft = newPillsBar.scrollLeft;
                            const viewRight = viewLeft + newPillsBar.clientWidth;
                            if (pillLeft < viewLeft) {
                                newPillsBar.scrollLeft = Math.max(0, pillLeft - 12);
                            } else if (pillRight > viewRight) {
                                newPillsBar.scrollLeft = pillRight - newPillsBar.clientWidth + 12;
                            }
                        }
                    } else if (activePill) {
                        const targetScroll = activePill.offsetLeft - (newPillsBar.clientWidth / 2) + (activePill.offsetWidth / 2);
                        newPillsBar.scrollLeft = Math.max(0, targetScroll);
                    }
                }
            }

            const newTheoryNav = main.querySelector('.theory-pages-nav');
            if (newTheoryNav && savedTheoryNavScrollLeft !== null) {
                newTheoryNav.scrollLeft = savedTheoryNavScrollLeft;
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
                        ${window.getIcon ? (window.getIcon(c.icon) || c.icon) : c.icon} ${c.code} (${countsPerCourse[cKey] || 0})
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
                <div class="content-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <div class="breadcrumbs">${COURSES_DB[activeCourseKey]?.code || 'Portal'} > Sınav Araçları > Çözülecek Sorular</div>
                        <h1 class="content-title">${window.ICONS ? window.ICONS.compass : ""} ${headerTitle} (${displayedCount} Soru Kaldı)</h1>
                    </div>
                    ${displayedCount > 0 ? `<button class="btn-stepper primary" onclick="jumpToRandomUnresolved('${activeFilter}')">${window.ICONS ? window.ICONS.dice : "🎲"} Rastgele Bir Soruya Git</button>` : ''}
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

        function jumpToRandomUnresolved(filterKey = null) {
            const courseKeys = Object.keys(COURSES_DB);
            const activeFilter = filterKey === 'all' ? 'all' : (filterKey || activeCourseKey);
            const coursesToScan = activeFilter === 'all' ? courseKeys : [activeFilter];
            const candidates = [];
            coursesToScan.forEach(cKey => {
                const c = COURSES_DB[cKey];
                if (!c) return;
                let solved = [];
                try {
                    const raw = localStorage.getItem(cKey + '_solved_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_solved_ex') : null);
                    solved = raw ? JSON.parse(raw) : [];
                } catch(e) {}
                Object.keys(c.modules).forEach(modKey => {
                    c.modules[modKey].exercises.forEach((ex, idx) => {
                        if (!solved.includes(ex.id)) {
                            candidates.push({ cKey, modKey, idx });
                        }
                    });
                });
            });
            if (candidates.length === 0) return;
            const pick = candidates[Math.floor(Math.random() * candidates.length)];
            switchCourseAndJump(pick.cKey, pick.modKey, pick.idx);
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

        // ================= CONCEPT MODAL & INLINE REMINDER HELPERS =================
        function formatConceptMarkdown(str) {
            if (!str) return "";
            return str
                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br>");
        }

        function renderConceptChipsBar(conceptKeys, labelText = "Bu Soruda Kullanılan Teorem & Hatırlatmalar (Tıkla & İncele):") {
            if (!conceptKeys || !conceptKeys.length || typeof conceptsDB === "undefined") return "";
            const valid = conceptKeys.filter(k => conceptsDB[k]);
            if (!valid.length) return "";
            const chips = valid.map(k => {
                const c = conceptsDB[k];
                const shortName = c.title.split("(")[0].trim();
                return `<span class="term-link" onclick="openConceptModal('${k}')" title="${c.title.replace(/"/g, '&quot;')}" style="font-size: 0.82rem; padding: 4px 10px;">💡 ${shortName}</span>`;
            }).join("");
            return `
                <div class="concept-reminder-bar" style="margin: 14px 0 18px 0; padding: 12px 16px; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-left: 3px solid var(--term-link-color); border-radius: 8px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); margin-right: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        📌 ${labelText}
                    </span>
                    ${chips}
                </div>
            `;
        }

        function openConceptModal(conceptKey) {
            const c = conceptsDB[conceptKey];
            if (!c) return;

            const modalTitleEl = document.getElementById('modal-concept-title');
            const modalBodyEl = document.getElementById('modal-concept-body');
            const modalEl = document.getElementById('concept-modal');

            const badgeHTML = c.badge ? `<span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; background: var(--term-link-bg); color: var(--term-link-color); padding: 3px 8px; border-radius: 4px; margin-bottom: 6px; display: inline-block;">${c.badge}</span><br>` : "";
            modalTitleEl.innerHTML = `${badgeHTML}${c.title}`;

            const redactionBlock = c.redaction ? `
                <div style="margin-top: 12px; background: rgba(16, 185, 129, 0.06); padding: 12px 16px; border-radius: 8px; border-left: 3px solid var(--accent-emerald); font-family: 'Inter', sans-serif;">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                        <strong style="color: var(--accent-emerald); font-size: 0.86rem;">🇫🇷 Sınav Kağıdına Yazılacak Hazır Cümle (Rédaction):</strong>
                        <button class="btn-stepper secondary" style="padding: 3px 9px; font-size: 0.75rem;" onclick="copyTextToClipboard(conceptsDB['${conceptKey}'].redaction, '✓ Fransızca sınav cümlesi kopyalandı!')">📋 Cümleyi Kopyala</button>
                    </div>
                    <div style="font-family: 'Newsreader', serif; font-style: italic; font-size: 1.02rem; color: var(--text-main); line-height: 1.6;">"${c.redaction}"</div>
                </div>
            ` : "";

            modalBodyEl.innerHTML = `
                <div style="margin-bottom: 14px; font-family: 'Newsreader', serif; font-size: 1.12rem; color: var(--text-main); line-height: 1.75; background: var(--bg-paper); padding: 14px 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">${formatConceptMarkdown(c.definition)}</div>
                <div style="background: rgba(129, 140, 248, 0.08); padding: 14px 16px; border-radius: 8px; border-left: 3px solid var(--accent-indigo); font-family: 'Inter', sans-serif; line-height: 1.65;">
                    <strong style="color: var(--accent-indigo); display: block; margin-bottom: 5px;">💡 Türkçe Sınav Mantığı &amp; Taktik:</strong>
                    ${formatConceptMarkdown(c.intuition)}
                </div>
                ${redactionBlock}
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
            syncMobileNavTabs('flashcards');

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
            const prevCatPills = main ? main.querySelector('.flashcard-cat-pills') : null;
            const savedCatScrollLeft = prevCatPills ? prevCatPills.scrollLeft : null;
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

                    <div class="flashcard-arena" onclick="flipCard()" style="cursor: pointer;" title="Cevabı görmek için karta dokunabilirsiniz">
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

                            <div class="card-bottom-actions" onclick="event.stopPropagation()" style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 18px;">
                                <button class="btn-stepper" onclick="prevCard()" title="Önceki Kart (Sol Ok)">
                                    ${window.ICONS ? window.ICONS.arrowLeft : ""} Önceki
                                </button>
                                <button class="btn-stepper primary" id="btn-flip" onclick="flipCard()">
                                    Cevabı Göster <span class="kbd-hint">(Space)</span>
                                </button>
                                <button class="btn-stepper" onclick="nextCard()" title="Sıradaki Kart (Sağ Ok)">
                                    Sonraki ${window.ICONS ? window.ICONS.arrowRight : ""}
                                </button>
                            </div>

                            <div id="flashcard-mastery-actions" onclick="event.stopPropagation()" style="display: none; justify-content: center; gap: 12px; margin-top: 14px; border-top: 1px dashed var(--border-subtle); padding-top: 14px;">
                                <button class="btn-stepper flashcard-btn-review" onclick="markCardMastery(false)" title="Klavye: 1">
                                    ${window.ICONS ? window.ICONS.refresh : ""} Tekrar Edilecek <span class="kbd-hint">[1]</span>
                                </button>
                                <button class="btn-stepper flashcard-btn-known" onclick="markCardMastery(true)" title="Klavye: 2">
                                    ${window.ICONS ? window.ICONS.check : ""} Biliyorum <span class="kbd-hint">[2]</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="intuition-callout flashcard-keyboard-hints" style="text-align: center; margin-top: 18px;">
                        <span class="desktop-hint"><strong>Klavye Kısayolları:</strong> <code>Space</code> = Kartı Çevir &nbsp;•&nbsp; <code>Sağ/Sol Ok</code> = Kart Değiştir &nbsp;•&nbsp; <code>1</code> = Tekrar Et &nbsp;•&nbsp; <code>2</code> = Bildim</span>
                        <span class="mobile-hint" style="display: none;"><strong>İpucu:</strong> Kartın üstüne dokunarak cevabı çevirebilir, aşağıdaki tuşlarla çalışabilirsiniz.</span>
                    </div>
                </div>
            `;

            const newCatPills = main.querySelector('.flashcard-cat-pills');
            if (newCatPills && savedCatScrollLeft !== null) {
                newCatPills.scrollLeft = savedCatScrollLeft;
            }

            renderMath();
        }

        function flipCard() {
            const ans = document.getElementById('flashcard-answer');
            const btn = document.getElementById('btn-flip');
            const masteryBox = document.getElementById('flashcard-mastery-actions');
            if (!ans || !btn) return;
            if (ans.style.display === 'block') {
                ans.style.display = 'none';
                btn.innerHTML = 'Cevabı Göster <span class="kbd-hint">(Space)</span>';
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
                    },
                    {
                        title: "Théorème 4 : Règle de Cauchy (Critère de la Racine $n$-ième)",
                        stmt: "Soit $\\sum u_n$ une série à termes positifs telle que $\\lim_{n\\to\\infty} \\sqrt[n]{u_n} = L$. Si $L < 1$, la série converge ; si $L > 1$, elle diverge.",
                        proof: `Supposons $L < 1$ et fixons $q \\in ]L, 1[$. Par définition de la limite, il existe un entier $N$ tel que pour tout $n \\ge N$ :
$$ \\sqrt[n]{u_n} \\le q \\iff 0 \\le u_n \\le q^n $$
Puisque $0 < q < 1$, la série géométrique $\\sum q^n$ converge. Par le théorème de comparaison des séries à termes positifs, $\\sum u_n$ converge. Si $L > 1$, alors pour $n$ assez grand $\\sqrt[n]{u_n} > 1 \\implies u_n > 1 \\not\\to 0$, donc la série diverge grossièrement. $\\blacksquare$`
                    },
                    {
                        title: "Théorème 5 : Critère de Weierstrass (Convergence Normale $\\implies$ Uniforme)",
                        stmt: "Soit $\\sum f_n$ une série de fonctions sur $D$. S'il existe une suite numérique $(M_n)$ telle que $\\forall x \\in D, |f_n(x)| \\le M_n$ et $\\sum M_n < \\infty$, alors $\\sum f_n$ converge normalement donc uniformément sur $D$.",
                        proof: `Puisque la série numérique à termes positifs $\\sum M_n$ converge, son reste $R_N^{(M)} = \\sum_{n=N+1}^{+\\infty} M_n$ tend vers $0$ lorsque $N \\to +\\infty$.<br>
Pour tout $x \\in D$, par inégalité triangulaire :
$$ |R_N(x)| = \\left|\\sum_{n=N+1}^{+\\infty} f_n(x)\\right| \\le \\sum_{n=N+1}^{+\\infty} |f_n(x)| \\le \\sum_{n=N+1}^{+\\infty} M_n = R_N^{(M)} $$
En passant à la borne supérieure sur $D$ :
$$ 0 \\le \\sup_{x \\in D} |R_N(x)| \\le R_N^{(M)} \\xrightarrow[N \\to +\\infty]{} 0 $$
Par le théorème des gendarmes, $\\|R_N\\|_{\\infty, D} \\to 0$, donc $\\sum f_n$ converge uniformément sur $D$. $\\blacksquare$`
                    },
                    {
                        title: "Théorème 6 : Convergence Absolue $\\implies$ Convergence (par Critère de Cauchy)",
                        stmt: "Dans $\\mathbb{R}$ ou $\\mathbb{C}$, toute série absolument convergente est convergente.",
                        proof: `Supposons que $\\sum |u_n|$ converge. D'après le critère de Cauchy pour la série numérique $\\sum |u_n|$, pour tout $\\epsilon > 0$, il existe un rang $N \\in \\mathbb{N}$ tel que pour tous $m > n \\ge N$ :
$$ \\sum_{k=n+1}^m |u_k| < \\epsilon $$
Par l'inégalité triangulaire sur les sommes partielles $S_n = \\sum_{k=0}^n u_k$ :
$$ |S_m - S_n| = \\left|\\sum_{k=n+1}^m u_k\\right| \\le \\sum_{k=n+1}^m |u_k| < \\epsilon $$
La suite $(S_n)$ est donc une suite de Cauchy dans $\\mathbb{R}$ (ou $\\mathbb{C}$), qui est complet : la série $\\sum u_n$ converge. $\\blacksquare$`
                    }
                ];
            } else if (cKey === 'fiz101_fizik') {
                return [
                    {
                        title: "Théorème 1 : Formule de Poisson (Bour) pour les Repères Tournants",
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
                        title: "Théorème 2 : Dérivation de la Base de Frenet & Accélérations ($a_t, a_n$)",
                        stmt: "Dans le repère de Frenet $(\\vec{T}, \\vec{N})$, la vitesse est $\\vec{v} = v\\vec{T}$ et l'accélération vaut $\\vec{a} = \\frac{dv}{dt}\\vec{T} + \\frac{v^2}{R_c}\\vec{N}$.",
                        proof: `Soit $s(t)$ l'abscisse curviligne du point matériel $P$ sur sa trajectoire.  
Le vecteur vitesse est par définition : $\\vec{v} = \\frac{d\\vec{OP}}{dt} = \\frac{d\\vec{OP}}{ds} \\frac{ds}{dt} = v \\vec{T}$, où $\\vec{T}$ est le vecteur unitaire tangent.  
Dérivons la vitesse par rapport au temps :
$$ \\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d(v\\vec{T})}{dt} = \\frac{dv}{dt}\\vec{T} + v \\frac{d\\vec{T}}{dt} $$
Exprimons $\\frac{d\\vec{T}}{dt}$ en utilisant l'angle tangentiel $\\theta$ :
$$ \\frac{d\\vec{T}}{dt} = \\frac{d\\vec{T}}{d\\theta} \\frac{d\\theta}{ds} \\frac{ds}{dt} = \\vec{N} \\cdot \\frac{1}{R_c} \\cdot v = \\frac{v}{R_c}\\vec{N} $$
En réinjectant dans l'expression de l'accélération :
$$ \\mathbf{\\vec{a} = \\underbrace{\\frac{dv}{dt}\\vec{T}}_{\\vec{a}_t \\text{ (tangentielle)}} + \\underbrace{\\frac{v^2}{R_c}\\vec{N}}_{\\vec{a}_n \\text{ (normale / centripète)}}} \\quad \\blacksquare $$`
                    },
                    {
                        title: "Théorème 3 : Orthogonalité d'un Vecteur Unitaire et de sa Dérivée (DM-1)",
                        stmt: "Pour tout vecteur unitaire $\\vec{u}(t)$ (tel que $\\|\\vec{u}(t)\\| = 1$), son vecteur dérivé $\\frac{d\\vec{u}}{dt}$ est orthogonal à $\\vec{u}$.",
                        proof: `Puisque $\\vec{u}(t)$ est unitaire à tout instant $t$, son carré scalaire est constant et vaut $1$ :
$$ \\vec{u}(t) \\cdot \\vec{u}(t) = \\|\\vec{u}(t)\\|^2 = 1 $$
En dérivant cette égalité par rapport au temps $t$ (par bilinéarité et symétrie du produit scalaire) :
$$ \\frac{d}{dt}(\\vec{u} \\cdot \\vec{u}) = \\frac{d\\vec{u}}{dt} \\cdot \\vec{u} + \\vec{u} \\cdot \\frac{d\\vec{u}}{dt} = 2\\left(\\vec{u} \\cdot \\frac{d\\vec{u}}{dt}\\right) = 0 $$
On en déduit que $\\mathbf{\\vec{u} \\cdot \\frac{d\\vec{u}}{dt} = 0}$, c'est-à-dire $\\mathbf{\\frac{d\\vec{u}}{dt} \\perp \\vec{u}}$. $\\blacksquare$`
                    },
                    {
                        title: "Théorème 4 : Vitesse et Accélération en Coordonnées Polaires / Cylindriques (DM-2)",
                        stmt: "En coordonnées cylindriques $(\\rho, \\varphi, z)$, $\\vec{v} = \\dot{\\rho}\\vec{e}_\\rho + \\rho\\dot{\\varphi}\\vec{e}_\\varphi + \\dot{z}\\vec{e}_z$ et $a_\\rho = \\ddot{\\rho} - \\rho\\dot{\\varphi}^2$, $a_\\varphi = 2\\dot{\\rho}\\dot{\\varphi} + \\rho\\ddot{\\varphi}$.",
                        proof: `Partons du vecteur position $\\vec{OP} = \\rho\\vec{e}_\\rho + z\\vec{e}_z$. Sachant que $\\frac{d\\vec{e}_\\rho}{dt} = \\dot{\\varphi}\\vec{e}_\\varphi$ et $\\frac{d\\vec{e}_\\varphi}{dt} = -\\dot{\\varphi}\\vec{e}_\\rho$ :<br>
<strong>1. Vitesse :</strong> $\\vec{v} = \\frac{d\\vec{OP}}{dt} = \\dot{\\rho}\\vec{e}_\\rho + \\rho\\frac{d\\vec{e}_\\rho}{dt} + \\dot{z}\\vec{e}_z = \\mathbf{\\dot{\\rho}\\vec{e}_\\rho + \\rho\\dot{\\varphi}\\vec{e}_\\varphi + \\dot{z}\\vec{e}_z}$.<br>
<strong>2. Accélération :</strong> Dérivons $\\vec{v}$ une seconde fois par rapport au temps :
$$ \\vec{a} = \\ddot{\\rho}\\vec{e}_\\rho + \\dot{\\rho}(\\dot{\\varphi}\\vec{e}_\\varphi) + (\\dot{\\rho}\\dot{\\varphi} + \\rho\\ddot{\\varphi})\\vec{e}_\\varphi + \\rho\\dot{\\varphi}(-\\dot{\\varphi}\\vec{e}_\\rho) + \\ddot{z}\\vec{e}_z $$
En regroupant suivant $\\vec{e}_\\rho$ et $\\vec{e}_\\varphi$ :
$$ \\mathbf{\\vec{a} = (\\ddot{\\rho} - \\rho\\dot{\\varphi}^2)\\vec{e}_\\rho + (2\\dot{\\rho}\\dot{\\varphi} + \\rho\\ddot{\\varphi})\\vec{e}_\\varphi + \\ddot{z}\\vec{e}_z} \\quad \\blacksquare $$`
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
                    },
                    {
                        title: "Théorème 3 : Formule de König-Huygens pour la Variance",
                        stmt: "Soit $X$ une variable aléatoire admettant un moment d'ordre 2. Alors $V(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$.",
                        proof: `Notons $\\mu = E[X] \\in \\mathbb{R}$. Développons le carré $(X - \\mu)^2 = X^2 - 2\\mu X + \\mu^2$.<br>
Par linéarité de l'espérance mathématique :
$$\\begin{aligned}
V(X) &= E[X^2 - 2\\mu X + \\mu^2] \\\\
&= E[X^2] - 2\\mu E[X] + \\mu^2 \\\\
&= E[X^2] - 2\\mu^2 + \\mu^2 = \\mathbf{E[X^2] - (E[X])^2} \\quad \\blacksquare
\\end{aligned}$$`
                    },
                    {
                        title: "Théorème 4 : Inégalité de Markov & Inégalité de Bienaymé-Tchebychev",
                        stmt: "Pour toute v.a. $X$ de variance finie et tout $\\epsilon > 0$ : $P(|X - E[X]| \\ge \\epsilon) \\le \\frac{V(X)}{\\epsilon^2}$.",
                        proof: `<strong>1. Inégalité de Markov :</strong> Soit $Y \\ge 0$ et $a > 0$. Comme $a\\,\\mathbb{I}_{\\{Y \\ge a\\}} \\le Y$, par croissance et linéarité de l'espérance :
$$ a P(Y \\ge a) = E[a\\,\\mathbb{I}_{\\{Y \\ge a\\}}] \\le E[Y] \\implies P(Y \\ge a) \\le \\frac{E[Y]}{a} $$
<strong>2. Bienaymé-Tchebychev :</strong> Appliquons l'inégalité de Markov à la variable positive $Y = (X - E[X])^2$ avec $a = \\epsilon^2 > 0$ :
$$ P(|X - E[X]| \\ge \\epsilon) = P\\big((X - E[X])^2 \\ge \\epsilon^2\\big) \\le \\frac{E[(X - E[X])^2]}{\\epsilon^2} = \\mathbf{\\frac{V(X)}{\\epsilon^2}} \\quad \\blacksquare $$`
                    }
                ];
            }

            // Default: mat204_grup — 8 Essential GSU Exam Theorem Proofs
            return [
                {
                    title: "Théorème 1 : Lemme Fondamental de Divisibilité ($g^n = e \\iff m \\mid n$)",
                    stmt: "Soit $g \\in G$ d'ordre $m = o(g)$. Alors $g^n = e$ si et seulement si $m$ divise $n$.",
                    proof: `<strong>(⇐)</strong> Si $m \\mid n$, alors il existe $k \\in \\mathbb{Z}$ tel que $n = m \\cdot k$. D'où $g^n = (g^m)^k = e^k = e$.<br><br>
<strong>(⇒)</strong> Supposons $g^n = e$. Effectuons la division euclidienne de $n$ par $m$ :
<div class="math-callout">$$n = m \\cdot q + r \\quad \\text{avec} \\quad 0 \\leq r < m$$</div>
Alors $e = g^n = g^{mq+r} = (g^m)^q g^r = e^q g^r = g^r$.<br>
Si $r > 0$, cela contredit la minimalité de $m = o(g)$ (qui est le plus petit entier strictement positif tel que $g^m = e$).  
Donc nécessairement $\\mathbf{r = 0} \\implies n = mq \\implies \\mathbf{m \\mid n}$. $\\blacksquare$`
                },
                {
                    title: "Théorème 2 : Tout Sous-groupe d'un Groupe Cyclique est Cyclique",
                    stmt: "Soit $G = \\langle a \\rangle$ un groupe cyclique et $H \\leq G$ un sous-groupe. Alors $H$ est lui-même cyclique.",
                    proof: `Si $H = \\{e\\}$, $H = \\langle e \\rangle$ est trivialement cyclique.<br>
Supposons $H \\neq \\{e\\}$. L'ensemble $S = \\{ k \\in \\mathbb{N}^* \\mid a^k \\in H \\}$ est une partie non vide de $\\mathbb{N}^*$.  
Par le principe du bon ordre, posons $\\mathbf{m = \\min(S)}$. Montrons par double inclusion que $\\mathbf{H = \\langle a^m \\rangle}$ :<br>
1) L'inclusion $\\langle a^m \\rangle \\subseteq H$ est immédiate car $a^m \\in H$ et $H$ est un sous-groupe.<br>
2) Réciproquement, soit $h \\in H$. Comme $h \\in G = \\langle a \\rangle$, il existe $k \\in \\mathbb{Z}$ tel que $h = a^k$.  
Effectuons la division euclidienne de $k$ par $m$ :
$$ k = m \\cdot q + r \\quad \\text{avec} \\quad 0 \\leq r < m $$
On a alors : $a^r = a^{k - mq} = a^k \\cdot (a^m)^{-q} = h \\cdot (a^m)^{-q} \\in H$.  
Si $r > 0$, alors $r \\in S$ avec $r < m$, ce qui contredit la définition de $m = \\min(S)$.  
Donc $\\mathbf{r = 0}$, d'où $k = mq$ et $h = (a^m)^q \\in \\langle a^m \\rangle$.  
<div class="exam-conclusion"><strong>Conclusion :</strong> $H = \\langle a^m \\rangle$ est cyclique, engendré par la plus petite puissance strictement positive présente dans $H$. $\\blacksquare$</div>`
                },
                {
                    title: "Théorème 3 : Théorème de Lagrange ($|G| = [G:H] \\cdot |H|$) & Corollaires",
                    stmt: "Soit $G$ un groupe fini et $H \\leq G$ un sous-groupe. Alors $|H|$ divise $|G|$. En particulier, pour tout $x \\in G$, $o(x) \\mid |G|$ et $x^{|G|} = e$.",
                    proof: `Définissons sur $G$ la relation binaire : $x \\sim y \\iff x^{-1}y \\in H$.  
C'est une relation d'équivalence :
1) <strong>Réflexive :</strong> $x^{-1}x = e \\in H$.  
2) <strong>Symétrique :</strong> $x^{-1}y \\in H \\implies (x^{-1}y)^{-1} = y^{-1}x \\in H$.  
3) <strong>Transitive :</strong> $x^{-1}y \\in H$ et $y^{-1}z \\in H \\implies (x^{-1}y)(y^{-1}z) = x^{-1}z \\in H$.  
La classe d'équivalence de $x$ est la classe à gauche $\\bar{x} = xH = \\{ xh \\mid h \\in H \\}$.  
L'application $\\phi_x : H \\to xH, \\; h \\mapsto xh$ est bijective (d'inverse $y \\mapsto x^{-1}y$), donc $|xH| = |H|$.  
Puisque les classes d'équivalence forment une partition de $G$ en $k = [G:H]$ classes disjointes de même cardinal $|H|$ :
$$ |G| = \\sum_{i=1}^k |x_i H| = k \\cdot |H| = [G:H] \\cdot |H| $$
<strong>Corollaire :</strong> Pour $x \\in G$, le sous-groupe cyclique $H = \\langle x \\rangle$ est d'ordre $|H| = o(x)$, donc $o(x) \\mid |G|$, et $x^{|G|} = (x^{o(x)})^{|G|/o(x)} = e$. $\\blacksquare$`
                },
                {
                    title: "Théorème 4 : Produit de Deux Sous-groupes ($HK \\le G \\iff HK = KH$)",
                    stmt: "Soient $H, K \\le G$ deux sous-groupes d'un groupe $G$. Alors $HK = \\{hk \\mid h \\in H, k \\in K\\}$ est un sous-groupe de $G$ si et seulement si $HK = KH$.",
                    proof: `<strong>(⇒)</strong> Supposons $HK \\le G$.<br>
• Soit $kh \\in KH$. Son inverse est $(kh)^{-1} = h^{-1}k^{-1} \\in HK$. Comme $HK$ est un sous-groupe, il est stable par passage à l'inverse, donc $kh = ((kh)^{-1})^{-1} \\in HK$. D'où $KH \\subseteq HK$.<br>
• Réciproquement, soit $x \\in HK$. Comme $HK \\le G$, son inverse $x^{-1} \\in HK$, donc $x^{-1} = hk \\implies x = (hk)^{-1} = k^{-1}h^{-1} \\in KH$. D'où $HK \\subseteq KH$, et finalement $\\mathbf{HK = KH}$.<br><br>
<strong>(⇐)</strong> Supposons $HK = KH$. Vérifions le critère de sous-groupe :<br>
1) $e = e \\cdot e \\in HK$, donc $HK \\neq \\emptyset$.<br>
2) Soient $x = h_1 k_1 \\in HK$ et $y = h_2 k_2 \\in HK$. Alors :
$$ xy^{-1} = h_1 k_1 (h_2 k_2)^{-1} = h_1 (k_1 k_2^{-1}) h_2^{-1} $$
Or $(k_1 k_2^{-1}) h_2^{-1} \\in KH = HK$, donc il existe $h_3 \\in H, k_3 \\in K$ tels que $(k_1 k_2^{-1}) h_2^{-1} = h_3 k_3$.  
Alors $xy^{-1} = (h_1 h_3) k_3 \\in HK$. Par conséquent, $\\mathbf{HK \\le G}$. $\\blacksquare$`
                },
                {
                    title: "Théorème 5 : Tout Groupe Cyclique d'Ordre Premier $p$ est Simple",
                    stmt: "Soit $G$ un groupe d'ordre premier $p$ ($|G| = p$). Alors $G$ est cyclique et simple (ses seuls sous-groupes normaux sont $\\{e\\}$ et $G$).",
                    proof: `Soit $H \\le G$ un sous-groupe quelconque de $G$.  
D'après le Théorème de Lagrange, l'ordre $|H|$ divise l'ordre du groupe $|G| = p$.  
Puisque $p$ est un nombre premier, ses seuls diviseurs positifs sont $1$ et $p$ :
$$ |H| = 1 \\implies H = \\{e\\}, \\qquad |H| = p \\implies H = G $$
En particulier, pour tout élément $a \\in G \\setminus \\{e\\}$, on a $|\\langle a \\rangle| > 1$, donc $|\\langle a \\rangle| = p$ et $G = \\langle a \\rangle$ est cyclique (engendré par n'importe lequel de ses $p-1$ éléments non neutres).  
Comme $G$ ne possède aucun sous-groupe propre non trivial, ses seuls sous-groupes normaux sont $\\{e\\}$ et $G$ : $G$ est donc un <strong>groupe simple</strong>. $\\blacksquare$`
                },
                {
                    title: "Théorème 6 : Le Centre $Z(G)$ est un Sous-groupe Normal ($Z(G) \\triangleleft G$)",
                    stmt: "Pour tout groupe $G$, le centre $Z(G) = \\{ z \\in G \\mid \\forall x \\in G, \\; zx = xz \\}$ est un sous-groupe normal de $G$.",
                    proof: `1) <strong>Non-vacuité :</strong> Pour tout $x \\in G$, $ex = xe = x$, donc $e \\in Z(G)$ et $Z(G) \\neq \\emptyset$.<br>
2) <strong>Stabilité par produit et inverse :</strong> Soient $a, b \\in Z(G)$ et $x \\in G$ quelconque.<br>
Puisque $b \\in Z(G)$, on a $bx = xb$. En multipliant à gauche et à droite par $b^{-1}$, on obtient $\\mathbf{xb^{-1} = b^{-1}x}$.<br>
Calculons alors $(ab^{-1})x$ :
$$ (ab^{-1})x = a(b^{-1}x) = a(xb^{-1}) = (ax)b^{-1} = (xa)b^{-1} = x(ab^{-1}) $$
Ainsi $ab^{-1} \\in Z(G)$, ce qui prouve que $Z(G) \\le G$.<br>
3) <strong>Normalité :</strong> Pour tout $g \\in G$ et tout $z \\in Z(G)$, $gzg^{-1} = zgg^{-1} = z \\in Z(G)$, donc $\\mathbf{Z(G) \\triangleleft G}$. $\\blacksquare$`
                },
                {
                    title: "Théorème 7 : Tout Sous-groupe d'Indice 2 est Normal ($[G:H]=2 \\implies H \\triangleleft G$)",
                    stmt: "Soit $G$ un groupe et $H \\le G$ un sous-groupe d'indice $[G : H] = 2$. Alors $H$ est un sous-groupe normal de $G$ ($H \\triangleleft G$).",
                    proof: `Puisque $[G : H] = 2$, il existe exactement $2$ classes à gauche disjointes et $2$ classes à droite disjointes qui partitionnent $G$.<br>
La classe de l'élément neutre $e$ est $eH = He = H$.<br>
Soit $g \\in G$ quelconque :<br>
• <strong>Cas 1 ($g \\in H$) :</strong> Alors $gH = H = Hg$.<br>
• <strong>Cas 2 ($g \\notin H$) :</strong> La classe à gauche $gH$ est disjointe de $H$, et comme il n'y a que 2 classes formant une partition de $G$, la seconde classe est nécessairement le complémentaire de $H$ dans $G$ :
$$ gH = G \\setminus H $$
Par le même raisonnement sur la partition en classes à droite, $Hg$ est disjointe de $H$, donc :
$$ Hg = G \\setminus H $$
On en déduit que $\\mathbf{\\forall g \\in G, \\; gH = Hg}$, ce qui démontre que $\\mathbf{H \\triangleleft G}$. $\\blacksquare$`
                },
                {
                    title: "Théorème 8 : Injectivité par le Noyau ($\\ker f = \\{e_G\\}$) & 1er Théorème d'Isomorphisme",
                    stmt: "Soit $f : G \\to G'$ un morphisme de groupes. Alors $\\ker f \\triangleleft G$, et $f$ est injectif si et seulement si $\\ker f = \\{e_G\\}$. De plus, $G/\\ker f \\cong \\operatorname{Im} f$.",
                    proof: `<strong>1. Normalité du noyau :</strong> Pour tout $g \\in G$ et $x \\in \\ker f$, on a :
$$ f(gxg^{-1}) = f(g)f(x)f(g)^{-1} = f(g) e_{G'} f(g)^{-1} = e_{G'} \\implies gxg^{-1} \\in \\ker f \\implies \\mathbf{\\ker f \\triangleleft G} $$
<strong>2. Critère d'injectivité :</strong><br>
• <strong>(⇒)</strong> Si $f$ est injectif et $x \\in \\ker f$, alors $f(x) = e_{G'} = f(e_G) \\implies x = e_G$, d'où $\\ker f = \\{e_G\\}$.<br>
• <strong>(⇐)</strong> Supposons $\\ker f = \\{e_G\\}$. Soient $x, y \\in G$ tels que $f(x) = f(y)$. Alors :
$$ f(xy^{-1}) = f(x)f(y)^{-1} = e_{G'} \\implies xy^{-1} \\in \\ker f = \\{e_G\\} \\implies xy^{-1} = e_G \\implies x = y $$
Donc $f$ est injectif.<br>
<strong>3. Premier Théorème d'Isomorphisme :</strong> L'application quotient $\\bar{f} : G/\\ker f \\to \\operatorname{Im} f$ définie par $\\bar{f}(x\\ker f) = f(x)$ est un morphisme bien défini, surjectif par construction et injectif car $\\bar{f}(x\\ker f) = e_{G'} \\iff x \\in \\ker f \\iff x\\ker f = \\ker f$. D'où $\\mathbf{G/\\ker f \\cong \\operatorname{Im} f}$. $\\blacksquare$`
                }
            ];
        }

        function getFrenchPhrasesForCourse(cKey) {
            if (cKey === 'mat201_seriler') {
                return [
                    { fr: "Le terme général $u_n$ ne tend pas vers $0$, donc la série $\\sum u_n$ diverge grossièrement.", tr: "Genel terim 0'a gitmediğinden seri aşikar biçimde ıraksar (Condition nécessaire)." },
                    { fr: "C'est une série alternée de la forme $\\sum (-1)^n a_n$ avec $a_n > 0$. La suite $(a_n)$ est décroissante et tend vers $0$. D'après le critère de Leibniz, la série converge.", tr: "Leibniz alterne seri testi tam puan şablonu (Quiz Özeti)." },
                    { fr: "Puisque $\\lim_{n \\to +\\infty} \\frac{u_{n+1}}{u_n} = L < 1$, d'après le critère de d'Alembert, la série $\\sum u_n$ converge.", tr: "Faktöriyel ve üstel terimli serilerde D'Alembert oran testi sonuç cümlesi." },
                    { fr: "Puisque $\\lim_{n \\to +\\infty} \\sqrt[n]{u_n} = L < 1$, d'après le critère de Cauchy, la série $\\sum u_n$ converge.", tr: "n. kuvvet içeren serilerde Cauchy kök testi sonuç cümlesi." },
                    { fr: "Comme $u_n > 0$ et $u_n \\sim \\frac{1}{n^\\alpha}$ avec $\\alpha > 1$, par comparaison avec une série de Riemann convergente, $\\sum u_n$ converge.", tr: "Pozitif terimli serilerde asimptotik denklik ve Riemann karşılaştırması." },
                    { fr: "La série $\\sum |u_n|$ converge, donc $\\sum u_n$ est absolument convergente, et par suite convergente.", tr: "Mutlak yakınsaklıktan yakınsaklığa geçiş kalıbı." },
                    { fr: "La série $\\sum u_n$ converge par Leibniz mais $\\sum |u_n|$ diverge : elle est semi-convergente (conditionnellement convergente).", tr: "Şartlı yakınsaklık (semi-convergence) sonuç cümlesi." },
                    { fr: "Pour tout $n$, $f_n$ est continue sur $D$, or la limite simple $f$ est discontinue en $x_0$. Par contraposée du théorème de continuité, la convergence n'est pas uniforme sur $D$.", tr: "Süreksizlik üzerinden düzgün yakınsaklığı çürütme kalıbı." },
                    { fr: "Calculons la norme infinie $\\|f_n - f\\|_{\\infty, D} = \\sup_{x \\in D} |f_n(x) - f(x)|$ en étudiant les variations de $g_n = f_n - f$.", tr: "Türev ile tepe noktası (supremum) bularak düzgün yakınsaklık inceleme." },
                    { fr: "Il existe une suite $(x_n)$ dans $D$ telle que $|f_n(x_n) - f(x_n)| \\not\\to 0$, donc $(f_n)$ ne converge pas uniformément sur $D$.", tr: "Test dizisi (suite test, örn. x_n = 1/n) ile düzgün yakınsaklığı çürütme." },
                    { fr: "Pour tout $x \\in D$, $|u_n(x)| \\le M_n$ avec $\\sum M_n$ convergente. D'après le critère de Weierstrass, $\\sum u_n$ converge normalement (donc uniformément) sur $D$.", tr: "Weierstrass M-testi ile normal ve düzgün yakınsaklık ispatı." },
                    { fr: "La convergence est uniforme sur tout segment compact $[a, b] \\subset D$, bien qu'elle ne soit pas uniforme sur $D$ tout entier.", tr: "Açık aralığın her kompakt alt aralığında düzgün yakınsaklık vurgusu." }
                ];
            } else if (cKey === 'fiz101_fizik') {
                return [
                    { fr: "Le référentiel d'étude $R(O, \\vec{e}_x, \\vec{e}_y, \\vec{e}_z)$ est supposé fixe (et galiléen).", tr: "İnceleme yapılan R referans sistemi sabit (ve eylemsiz) kabul edilmiştir." },
                    { fr: "Pour obtenir l'équation cartésienne du support de la trajectoire, éliminons le paramètre temporel $t$ entre $x(t)$ et $y(t)$.", tr: "Yörünge denklemini bulmak için x(t) ve y(t) arasında zaman parametresi t'yi yok edelim (DM-2)." },
                    { fr: "Puisque les vecteurs $\\vec{u}_a, \\vec{u}_b, \\vec{u}_c$ ont un produit mixte (déterminant) non nul, ils sont non coplanaires et forment une base de l'espace.", tr: "Karma çarpım (determinant) sıfırdan farklı olduğundan üç vektör uzayda bir baz oluşturur (DM-1)." },
                    { fr: "Pour tout vecteur unitaire $\\vec{u}$, on a $\\vec{u} \\cdot \\vec{u} = 1 \\implies 2\\,\\vec{u} \\cdot \\frac{d\\vec{u}}{dt} = 0$, donc sa dérivée lui est orthogonale.", tr: "Birim vektörün türevi daima kendisine diktir (DM-1)." },
                    { fr: "En appliquant la formule de Bour (Poisson) pour un repère en rotation : $\\left[\\frac{d\\vec{A}}{dt}\\right]_R = \\left[\\frac{d\\vec{A}}{dt}\\right]_{R_{cyl}} + \\vec{\\Omega}_{R_{cyl}/R} \\times \\vec{A}$.", tr: "Dönen silindirik referans sisteminde vektörel türev (Poisson) bağıntısı." },
                    { fr: "Dans le repère tournant $R_{cyl}$, les vecteurs unitaires $\\vec{e}_\\rho$ et $\\vec{e}_\\varphi$ sont immobiles, donc leurs dérivées relatives sont nulles.", tr: "Dönen sistemdeki gözlemciye göre silindirik birim vektörler sabittir, bağıl türevleri sıfırdır." },
                    { fr: "Puisque $\\vec{a} \\cdot \\vec{v} > 0$ (soit $\\frac{d\\|\\vec{v}\\|}{dt} > 0$), la norme de la vitesse croît et le mouvement est accéléré.", tr: "Hız ve ivmenin skaler çarpımı pozitif olduğundan hareket hızlanandır (DM-2)." },
                    { fr: "La norme de la vitesse $\\|\\vec{v}_{P/R}\\|$ étant indépendante du temps, le mouvement est uniforme et l'accélération tangentielle est nulle ($a_t = 0$).", tr: "Sürat zamandan bağımsız (sabit) olduğundan hareket düzgündür ve teğetsel ivme sıfırdır (DM-2)." },
                    { fr: "Dans la base de Frenet $(\\vec{T}, \\vec{N})$, on a $\\|\\vec{a}\\|^2 = a_t^2 + a_n^2$, d'où $a_n = \\sqrt{\\|\\vec{a}\\|^2 - a_t^2} = \\frac{v^2}{R_c}$.", tr: "Frenet tabanında normal ivme ve eğrilik yarıçapı bağıntısı." },
                    { fr: "Projetons la relation fondamentale de la dynamique ($\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_{P/R}$) sur les axes de la base choisie.", tr: "Newton'un 2. yasasını (RFD) seçilen tabanın eksenleri üzerine iz düşürelim." }
                ];
            } else if (cKey === 'mat206_olasilik') {
                return [
                    { fr: "Soit $(\\Omega, \\mathcal{F}, P)$ un espace probabilisé associé à l'expérience aléatoire considérée.", tr: "İncelenen rastgele deneye bağlı olasılık uzayı olsun." },
                    { fr: "Le tirage étant simultané et les boules indiscernables au toucher, il y a équiprobabilité des issues : $P(A) = \\frac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$.", tr: "Eşzamanlı çekilişte eş-olasılık gerekçelendirmesi (Quiz Özeti)." },
                    { fr: "Passons par l'événement complémentaire $\\bar{A}$ (« aucun ... ») : $P(A) = 1 - P(\\bar{A})$.", tr: "«En az bir...» sorularında tümleyen olay üzerinden çözüm kalıbı." },
                    { fr: "La famille $(B_1, \\dots, B_n)$ forme un système complet d'événements de probabilités non nulles. D'après la formule des probabilités totales : $P(A) = \\sum_{i=1}^n P(A \\mid B_i)P(B_i)$.", tr: "Tam olasılık teoremi için tam puanlık resmi sınav kalıbı." },
                    { fr: "D'après la formule de Bayes, la probabilité a posteriori de $B_k$ sachant $A$ est donnée par $P(B_k \\mid A) = \\frac{P(A \\mid B_k)P(B_k)}{P(A)}$.", tr: "Bayes teoremi (nedenlerin olasılığı) resmi sınav kalıbı." },
                    { fr: "Puisque $P(A \\cap B) = P(A)P(B)$, les événements $A$ et $B$ sont indépendants (attention à ne pas confondre avec incompatibles $A \\cap B = \\emptyset$).", tr: "Olayların bağımsızlığı ve ayrıklık ile karıştırmama uyarısı." },
                    { fr: "On répète $n$ épreuves de Bernoulli identiques et indépendantes de paramètre $p$. La v.a. $X$ comptant le nombre de succès suit donc la loi binomiale $\\mathcal{B}(n, p)$.", tr: "Binom dağılımı modelini sınavda gerekçelendirme cümlesi." },
                    { fr: "D'après la formule de König-Huygens, la variance est donnée par $V(X) = E[X^2] - (E[X])^2$.", tr: "König-Huygens varyans hesaplama kalıbı." },
                    { fr: "La fonction $f$ est positive, continue par morceaux sur $\\mathbb{R}$ et $\\int_{-\\infty}^{+\\infty} f(x)\\,dx = 1$ : c'est donc bien une densité de probabilité.", tr: "Olasılık yoğunluk fonksiyonu (densité) doğrulama kalıbı." },
                    { fr: "D'après le Théorème Central Limite, la variable centrée réduite $Z_n = \\frac{S_n - n\\mu}{\\sigma\\sqrt{n}}$ converge en loi vers la loi normale standard $\\mathcal{N}(0, 1)$.", tr: "Merkezi Limit Teoremi (TCL) ile Gauss yaklaşımı kalıbı." }
                ];
            }

            // Default: mat204_grup — 16 High-Yield French Exam Redaction Sentences
            return [
                { fr: "Soient $a, b \\in G$ deux éléments quelconques du groupe $G$.", tr: "İspata başlarken: G grubundan alınan rastgele iki eleman olsun." },
                { fr: "Procédons par double implication ($\\implies$ et $\\impliedby$) / par double inclusion.", tr: "Çift yönlü gerektirme (⟺) veya çift yönlü kapsama (⊆ ve ⊇) ile ilerleyelim." },
                { fr: "Vérifions que $H$ est un sous-groupe de $G$ à l'aide du critère en une étape :", tr: "Tek adımlı alt grup testiyle H'nin G'nin alt grubu olduğunu doğrulayalım:" },
                { fr: "Puisque $e_G \\in H$, l'ensemble $H$ est non vide ($H \\neq \\emptyset$).", tr: "Birim eleman H'de olduğundan H kümesi boş küme değildir (Alt grup ispatının zorunlu 1. adımı!)." },
                { fr: "Soient $x, y \\in H$. Montrons que $xy^{-1} \\in H$ (ou $x - y \\in H$ en notation additive).", tr: "H'den alınan x, y için xy⁻¹ ∈ H (toplamsal grupta x - y ∈ H) olduğunu gösterelim." },
                { fr: "Effectuons la division euclidienne de $n$ par $m$ : $n = mq + r$ avec $0 \\le r < m$.", tr: "n'in m'ye Öklid kalanlı bölmesini yapalım: 0 ≤ r < m olmak üzere n = mq + r." },
                { fr: "Si $r > 0$, cela contredit la minimalité de $m = o(g)$ (ou $m = \\min S$). Donc $r = 0$.", tr: "Eğer r > 0 olsaydı m'in en küçük pozitif tam sayı olmasıyla çelişirdi. O halde r = 0'dır." },
                { fr: "D'après le théorème de Bézout, puisque $\\gcd(a, n) = 1$, il existe $u, v \\in \\mathbb{Z}$ tels que $au + nv = 1$.", tr: "Bézout teoremine göre gcd(a,n)=1 olduğundan au + nv = 1 sağlayan u, v ∈ Z tam sayıları vardır." },
                { fr: "D'après le théorème de Lagrange, l'ordre de tout sous-groupe (et de tout élément) divise $|G|$.", tr: "Lagrange teoremine göre her alt grubun (ve her elemanın) mertebesi grup mertebesi |G|'yi tam böler." },
                { fr: "Puisque $p$ est un nombre premier, ses seuls diviseurs positifs sont $1$ et $p$.", tr: "p asal bir sayı olduğundan pozitif bölenleri yalnızca 1 ve p'dir." },
                { fr: "Décomposons la permutation $\\sigma$ en produit de cycles à supports deux à deux disjoints.", tr: "σ permütasyonunu ikişer ikişer ayrık destekli döngülerin çarpımına ayıralım." },
                { fr: "Puisque les supports des cycles sont disjoints, ces cycles commutent et $o(\\sigma) = \\operatorname{ppcm}(\\ell_1, \\dots, \\ell_r)$.", tr: "Döngülerin destekleri ayrık olduğundan birbirleriyle değişmelidirler ve mertebe uzunlukların EKOK'udur." },
                { fr: "Montrons que $f : G \\to G'$ est un morphisme de groupes : pour tous $x, y \\in G$, calculons $f(xy)$.", tr: "f fonksiyonunun grup morfizması olduğunu gösterelim: her x, y ∈ G için f(xy)'yi hesaplayalım." },
                { fr: "Le morphisme $f$ est injectif si et seulement si son noyau est réduit au neutre : $\\ker(f) = \\{e_G\\}$.", tr: "f morfizması birebirdir (injektiftir) ancak ve ancak çekirdeği sadece birim elemandan oluşuyorsa." },
                { fr: "Puisque $[G : H] = 2$, les classes à gauche et à droite coïncident ($gH = G \\setminus H = Hg$), donc $H \\triangleleft G$.", tr: "İndeks [G:H]=2 olduğundan sol ve sağ yan kümeler çakışır, dolayısıyla H normal alt gruptur." },
                { fr: "D'après le premier théorème d'isomorphisme, on en conclut que $G / \\ker(f) \\cong \\operatorname{Im}(f)$.", tr: "Birinci İzomorfizma Teoremi gereğince G / ker(f) ≅ Im(f) olduğu sonucuna varılır." }
            ];
        }

        function getCalculatorTitle(cKey) {
            if (cKey === 'mat201_seriler') return 'Seri Yakınsaklık & Kısmi Toplam';
            if (cKey === 'fiz101_fizik') return '3B Vektörel Analiz & Çarpım';
            if (cKey === 'mat206_olasilik') return 'Bayes Teoremi & Tanı Simülatörü';
            return 'Grup Teorisi & Bézout Laboratuvarı';
        }

        function getExerciseNote(exId) {
            try {
                const raw = localStorage.getItem(activeCourseKey + '_user_notes');
                const map = raw ? JSON.parse(raw) : {};
                return map[exId] || '';
            } catch (e) {
                return '';
            }
        }

        function saveExerciseNote(exId) {
            const ta = document.getElementById('user-note-input-' + exId);
            if (!ta) return;
            try {
                const raw = localStorage.getItem(activeCourseKey + '_user_notes');
                const map = raw ? JSON.parse(raw) : {};
                const val = ta.value.trim();
                if (val) {
                    map[exId] = val;
                } else {
                    delete map[exId];
                }
                localStorage.setItem(activeCourseKey + '_user_notes', JSON.stringify(map));
                showPortalToast((window.ICONS ? window.ICONS.check : "✓") + " Kişisel sınav notunuz kaydedildi");
                fetch(SYNC_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'set_note', courseKey: activeCourseKey, exerciseId: exId, note: val })
                }).catch(() => {});
                renderModuleView();
            } catch (e) {}
        }

        function toggleSingleProofBody(idx) {
            const el = document.getElementById('proof-box-' + idx);
            if (!el) return;
            el.style.display = (el.style.display === 'none') ? 'block' : 'none';
        }

        function toggleAllProofBodies() {
            const boxes = document.querySelectorAll('.proof-toggle-box');
            if (!boxes.length) return;
            const anyVisible = Array.from(boxes).some(b => b.style.display !== 'none');
            boxes.forEach(b => {
                b.style.display = anyVisible ? 'none' : 'block';
            });
            showPortalToast(anyVisible ? "🎯 Kendini Test Et Modu: İspatlar gizlendi" : "👁️ Tüm model ispatlar gösterildi");
        }

        // ================= SPECIAL VIEWS =================
        function loadSpecialView(viewKey) {
            currentViewMode = 'special';
            currentSpecialView = viewKey;
            setActiveNav('nav-' + viewKey);

            const main = document.getElementById('main-content');
            const prevCatPills = main ? main.querySelector('.flashcard-cat-pills') : null;
            const savedCatScrollLeft = prevCatPills ? prevCatPills.scrollLeft : null;
            const c = COURSES_DB[activeCourseKey];

            if (viewKey === 'ispatlar') {
                const proofs = getProofsForCourse(activeCourseKey);
                let proofsHTML = '';
                proofs.forEach((p, idx) => {
                    proofsHTML += `
                        <div class="academic-card">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                                <div class="question-statement" style="margin-bottom: 6px;">${p.title}</div>
                                <button class="btn-stepper secondary" style="padding: 4px 10px; font-size: 0.78rem;" onclick="toggleSingleProofBody(${idx})">
                                    İspatı Gizle / Göster
                                </button>
                            </div>
                            <div style="font-size: 0.96rem; color: var(--text-secondary); margin-bottom: 14px; padding: 10px 14px; background: rgba(37,99,235,0.05); border-left: 3px solid var(--accent-blue); border-radius: 0 8px 8px 0;"><strong>Énoncé du Théorème :</strong> ${p.stmt}</div>
                            <div class="exam-sheet proof-toggle-box" id="proof-box-${idx}">
                                <div class="exam-sheet-header"><span class="exam-sheet-title">${window.ICONS ? window.ICONS.listTodo : ""} Resmi Sınav İspatı (Rédaction Complète)</span></div>
                                <div class="exam-sheet-body" style="font-family: 'Newsreader', serif; font-size: 1.14rem; line-height: 1.8;">
                                    ${p.proof}
                                </div>
                            </div>
                        </div>
                    `;
                });

                main.innerHTML = `
                    <div class="content-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                        <div>
                            <div class="breadcrumbs">${c.code} > Sınav Araçları > Kritik İspatlar (${proofs.length} Teorem)</div>
                            <h1 class="content-title">${window.ICONS ? window.ICONS.book : ""} ${c.code} Sınavında Çıkabilecek Kritik Teorem İspatları</h1>
                        </div>
                        <button class="btn-stepper primary" onclick="toggleAllProofBodies()">
                            ${window.ICONS ? window.ICONS.eye : "👁️"} Kendini Test Et: Tüm İspatları Gizle / Aç
                        </button>
                    </div>
                    ${proofsHTML}
                `;
            } else if (viewKey === 'fransizca') {
                const phrases = getFrenchPhrasesForCourse(activeCourseKey);
                let phrasesHTML = '';
                phrases.forEach((item, idx) => {
                    const safeCopy = item.fr.replace(/'/g, "\'");
                    phrasesHTML += `
                        <div class="math-callout" style="padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 220px;">
                                <div style="font-size: 1.02rem; color: var(--accent-blue); font-weight: 600; margin-bottom: 4px;">${idx + 1}. "${item.fr}"</div>
                                <div style="font-size: 0.88rem; color: var(--text-secondary);"><span style="color: var(--accent-emerald); font-weight: 700;">Türkçe Sınav Mantığı:</span> ${item.tr}</div>
                            </div>
                            <button class="btn-stepper secondary" style="padding: 4px 10px; font-size: 0.76rem; white-space: nowrap;" onclick="copyTextToClipboard('${safeCopy}', 'Fransızca ispat kalıbı kopyalandı ✓')">
                                ${window.ICONS ? window.ICONS.copy : ""} Kalıbı Kopyala
                            </button>
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
            } else if (viewKey === 'kaynaklar') {
                const resourcesByCourse = {
                    'mat204_grup': {
                        folder: 'dersler/MAT204_Grup_Teorisi',
                        items: [
                            { title: 'MAT204 Vize Master Özeti (PDF)', desc: 'Hafta 1–6 tüm teoremler, ispatlar ve çözüm şablonları', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/MAT204_Vize_Ozeti.pdf' },
                            { title: 'MAT204 Vize Master Özeti (Overleaf LaTeX)', desc: 'Overleaf kaynak kodu (.tex)', type: 'TEX', file: 'dersler/MAT204_Grup_Teorisi/MAT204_Vize_Ozeti.tex' },
                            { title: 'Grup Teorisi Kapsamlı Ders Notları (LaTeX)', desc: 'Tüm bölümler ve TD çözümleri tam LaTeX kitapçığı', type: 'TEX', file: 'dersler/MAT204_Grup_Teorisi/Grup_Teorisi_Ders_Notlari.tex' },
                            { title: 'Grup Teorisi 1. Hafta Ders Notu (PDF)', desc: 'Temel aritmetik ve grup aksiyomları ders föyü', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/Grup_Teorisi_Hafta_1.pdf' },
                            { title: 'Resmi Ders İzlencesi — Syllabus MAT204 (PDF)', desc: 'GSÜ Matematik Bölümü MAT204 resmi izlencesi', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/Syllabus_MAT204.pdf' },
                            { title: 'TD-1 Orijinal Soru Föyü (PDF)', desc: 'Tam Sayılarda Aritmetik, Bézout, Gauss ve Modüler Aritmetik', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/TD-1.pdf' },
                            { title: 'TD-2 Orijinal Soru Föyü (PDF)', desc: 'Karmaşık Sayılar, Denklik Bağıntıları, Gruplar ve Alt Gruplar (28 Soru)', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/TD-2.pdf' },
                            { title: 'TD-3 Orijinal Soru Föyü (PDF)', desc: 'Devirli Gruplar I & Birimin Kökleri (7 Soru)', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/TD-3.pdf' },
                            { title: 'TD-4 Orijinal Soru Föyü (PDF)', desc: 'Groupes Cycliques II, Üreteçler & Euler (6 Soru)', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/TD-4.pdf' },
                            { title: 'TD-5 Orijinal Soru Föyü (PDF)', desc: 'Simetrik Grup Sₙ, Döngüler ve İmza (6 Soru)', type: 'PDF', file: 'dersler/MAT204_Grup_Teorisi/TD-5.pdf' }
                        ]
                    },
                    'mat201_seriler': {
                        folder: 'dersler/MAT201_Seriler',
                        items: [
                            { title: 'MAT201 Quiz & Vize Master Özeti (Overleaf LaTeX)', desc: 'Sayısal & Fonksiyon Serileri Karar Ağaçları, 8 Arketip Soru ve 8 Vrai/Faux', type: 'TEX', file: 'dersler/MAT201_Seriler/Quiz_Ozeti_MAT201.tex' },
                            { title: 'Seriler & Analiz II Kapsamlı Ders Notları (LaTeX)', desc: 'Chapitre 1–3 tüm konu anlatımı ve TD 0–6 çözümleri (.tex)', type: 'TEX', file: 'dersler/MAT201_Seriler/Seriler_Ders_Notlari.tex' },
                            { title: 'Resmi Ders İzlencesi — Syllabus Analyse II (PDF)', desc: 'GSÜ MAT201 Analyse II haftalık ders izlencesi', type: 'PDF', file: 'dersler/MAT201_Seriler/Syllabus_MAT201.pdf' },
                            { title: 'TD-1 (Sept 16) Orijinal Soru Föyü (PDF)', desc: 'Rappels sur les Suites Numériques', type: 'PDF', file: 'dersler/MAT201_Seriler/TD-1.pdf' },
                            { title: 'TD-2 (Sept 23) Orijinal Soru Föyü (PDF)', desc: 'Premières Séries Numériques & Sommes Partielles', type: 'PDF', file: 'dersler/MAT201_Seriler/TD-2.pdf' },
                            { title: 'TD-3 (Sept 30) Orijinal Soru Föyü (PDF)', desc: 'Critères de Convergence (Comparaison, Équivalents, D\'Alembert)', type: 'PDF', file: 'dersler/MAT201_Seriler/TD-3.pdf' },
                            { title: 'TD-4 (Oct 7) Orijinal Soru Föyü (PDF)', desc: 'Séries à Termes Quelconques, Leibniz & Cauchy', type: 'PDF', file: 'dersler/MAT201_Seriler/TD-4.pdf' },
                            { title: 'TD-5 (Oct 14) Orijinal Soru Föyü (PDF)', desc: 'Séries Conditionnelles & Suites de Fonctions', type: 'PDF', file: 'dersler/MAT201_Seriler/TD-5.pdf' },
                            { title: 'TD-6 (Oct 21) Orijinal Soru Föyü (PDF)', desc: 'Suites et Séries de Fonctions, Continuité & Cauchy Uniforme', type: 'PDF', file: 'dersler/MAT201_Seriler/TD-6.pdf' }
                        ]
                    },
                    'fiz101_fizik': {
                        folder: 'dersler/FIZ101_Fizik_1',
                        items: [
                            { title: 'Fizik 1 DM-1 & DM-2 Tam Çözüm Kitapçığı (PDF)', desc: 'Derlenmiş tam LaTeX çözüm kitapçığı (14 sayfa PDF)', type: 'PDF', file: 'dersler/FIZ101_Fizik_1/Fizik_1_Tam_Cozumler.pdf' },
                            { title: 'DM-1 Orijinal Ödev Föyü (PDF)', desc: 'Produits de Vecteurs, Dérivation des Vecteurs Unitaires & Vitesse', type: 'PDF', file: 'dersler/FIZ101_Fizik_1/DM-1_Sorular.pdf' },
                            { title: 'DM-2 Orijinal Ödev Föyü (PDF)', desc: 'Cinématique du Point : Trajectoire, Frenet & Coordonnées Polaires', type: 'PDF', file: 'dersler/FIZ101_Fizik_1/DM-2_Sorular.pdf' },
                            { title: 'DM-1 Çözümleri ve Kavramsal Rehber (Overleaf LaTeX)', desc: 'Exercice 1, 2, 3 tüm alt şıklarıyla LaTeX kaynak dosyası', type: 'TEX', file: 'dersler/FIZ101_Fizik_1/DM1_Cozumler.tex' },
                            { title: 'DM-2 Çözümleri ve TikZ Diyagramları (Overleaf LaTeX)', desc: 'Exercice 1, 2 ve TikZ parabol/çember çizimleri LaTeX kaynak dosyası', type: 'TEX', file: 'dersler/FIZ101_Fizik_1/DM2_Cozumler.tex' },
                            { title: 'Fizik 1 Birleştirilmiş Tam Çözümler (Overleaf LaTeX)', desc: 'DM-1 + DM-2 birleştirilmiş ana LaTeX dosyası', type: 'TEX', file: 'dersler/FIZ101_Fizik_1/Fizik_1_Tam_Cozumler.tex' }
                        ]
                    },
                    'mat206_olasilik': {
                        folder: 'dersler/MAT206_Olasilik',
                        items: [
                            { title: 'MAT206 Olasılık Master Özeti (Overleaf LaTeX)', desc: 'Kombinatorik Karar Ağacı, Bayes, Kesikli & Sürekli Dağılımlar', type: 'TEX', file: 'dersler/MAT206_Olasilik/Quiz_Ozeti_MAT206.tex' },
                            { title: 'MAT206 Kapsamlı Ders Notları (Overleaf LaTeX)', desc: 'Bölüm 1–4 Olasılık Teorisi ders notları (.tex)', type: 'TEX', file: 'dersler/MAT206_Olasilik/Olasilik_Ders_Notlari.tex' },
                            { title: 'MAT206 Ders İzlencesi — Syllabus (Markdown)', desc: 'Haftalık müfredat ve modül içerikleri', type: 'MD', file: 'dersler/MAT206_Olasilik/Syllabus_MAT206.md' }
                        ]
                    }
                };
                const resData = resourcesByCourse[activeCourseKey] || resourcesByCourse['mat204_grup'];
                let cardsHTML = '';
                resData.items.forEach(item => {
                    const badgeBg = item.type === 'PDF' ? 'rgba(239, 68, 68, 0.14)' : 'rgba(16, 185, 129, 0.14)';
                    const badgeCol = item.type === 'PDF' ? '#ef4444' : 'var(--accent-emerald)';
                    cardsHTML += `
                        <div class="math-callout" style="padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 220px;">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                    <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: ${badgeBg}; color: ${badgeCol};">${item.type}</span>
                                    <strong style="font-size: 1rem; color: var(--text-main);">${item.title}</strong>
                                </div>
                                <div style="font-size: 0.86rem; color: var(--text-secondary);">${item.desc} • <code style="font-size: 0.78rem;">${item.file}</code></div>
                            </div>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <a href="${item.file}" target="_blank" rel="noopener" class="btn-stepper primary" style="padding: 6px 12px; font-size: 0.8rem; text-decoration: none;">
                                    ${item.type === 'PDF' ? '📄 PDF Aç' : '📝 Kaynağı Aç'}
                                </a>
                                <a href="${item.file}" download class="btn-stepper secondary" style="padding: 6px 12px; font-size: 0.8rem; text-decoration: none;">
                                    ⬇️ İndir
                                </a>
                            </div>
                        </div>
                    `;
                });

                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">${c.code} > Sınav Araçları > Ders Kaynakları &amp; Arşiv</div>
                            <h1 class="content-title">${window.ICONS ? window.ICONS.fileText : ""} ${c.code} Orijinal PDF Föyleri &amp; Overleaf LaTeX Arşivi</h1>
                        </div>
                    </div>
                    <div class="academic-card">
                        <div style="margin-bottom: 16px; padding: 12px 16px; border-radius: 8px; background: rgba(59,130,246,0.06); border: 1px solid var(--border-subtle); font-size: 0.9rem; color: var(--text-secondary);">
                            📂 <strong>Birleştirilmiş Workspace Klasörü:</strong> <code>/${resData.folder}/</code> — Tüm matematik lisans derslerinin (MAT204, MAT201, FIZ101, MAT206) orijinal TD/DM PDF föyleri ve Overleaf <code>.tex</code> notları tek çatı altında toplanmıştır.
                        </div>
                        ${cardsHTML}
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
                    // Default: mat204_grup — 3-Tab Group Theory & Arithmetic Laboratory
                    main.innerHTML = `
                        <div class="content-header">
                            <div>
                                <div class="breadcrumbs">${c.code} > Sınav ve Çalışma Araçları > İnteraktif Grup Teorisi Laboratuvarı</div>
                                <h1 class="content-title">${window.ICONS ? window.ICONS.calculator : ""} MAT204 Grup Teorisi &amp; Aritmetik Laboratuvarı</h1>
                            </div>
                        </div>

                        <div class="theory-pages-nav" style="margin-bottom: 18px;">
                            <button class="theory-page-btn active" id="lab-tab-btn-bezout" onclick="switchMat204LabTab('bezout')">
                                1. Bézout, Öklid &amp; Modüler Ters ($a^{-1} \\pmod n$)
                            </button>
                            <button class="theory-page-btn" id="lab-tab-btn-znun" onclick="switchMat204LabTab('znun')">
                                2. $\\mathbb{Z}_n$ ve $U(n)$ Grup &amp; Alt Grup Analizörü
                            </button>
                            <button class="theory-page-btn" id="lab-tab-btn-sn" onclick="switchMat204LabTab('sn')">
                                3. $\\mathcal{S}_n$ Permütasyon, Ayrık Döngü &amp; İmza ($\\varepsilon$)
                            </button>
                            <button class="theory-page-btn" id="lab-tab-btn-cayley" onclick="switchMat204LabTab('cayley')">
                                4. Cayley Tablosu &amp; Klasik Gruplar ($\\mathcal{D}_3, \\mathcal{D}_4, V_4, U(n)$)
                            </button>
                        </div>

                        <!-- TAB 1: BEZOUT & MODULAR INVERSE -->
                        <div class="academic-card" id="lab-panel-bezout">
                            <p style="color: var(--text-secondary); font-size: 0.94rem; margin-bottom: 14px;">
                                İki tam sayı için <strong>Öklid Algoritması (Divisions Euclidiennes)</strong>, geriye doğru yerine koyma ile <strong>Bézout Katsayıları ($au + nv = \\gcd(a,n)$)</strong> ve $\\mathbb{Z}_n$ içindeki <strong>Modüler Çarpımsal Ters ($\\bar{a}^{-1}$)</strong> adımlarını resmi sınav formatında üretir.
                            </p>
                            <div class="calc-box">
                                <div class="calc-input-wrapper">
                                    <label>Sayı ($a$):</label>
                                    <input type="number" id="calc-a" value="17">
                                </div>
                                <div class="calc-input-wrapper">
                                    <label>Mod / İkinci Sayı ($n$):</label>
                                    <input type="number" id="calc-n" value="43">
                                </div>
                                <button class="btn-stepper primary" style="margin-top: 18px;" onclick="runCalculator()">Adım Adım Sınav Çözümünü Üret</button>
                            </div>
                            <div id="calc-result-area" class="exam-sheet" style="padding: 20px; display: none;"></div>
                        </div>

                        <!-- TAB 2: Z_n & U(n) GROUP ANALYZER -->
                        <div class="academic-card" id="lab-panel-znun" style="display: none;">
                            <p style="color: var(--text-secondary); font-size: 0.94rem; margin-bottom: 14px;">
                                Seçilen $n$ ($2 \\le n \\le 60$) değeri için $(\\mathbb{Z}_n, +)$ ve $(U(n), \\times)$ gruplarının mertebesini ($\\varphi(n)$), her elemanın mertebesini ($o(x)$), üreteçlerini ve tüm devirli alt gruplarını eksiksiz hesaplar.
                            </p>
                            <div class="calc-box">
                                <div class="calc-input-wrapper">
                                    <label>Modül ($n$, $2 \\le n \\le 60$):</label>
                                    <input type="number" id="calc-group-n" value="12" min="2" max="60">
                                </div>
                                <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 18px;">
                                    <button class="btn-stepper primary" onclick="runZnUnAnalyzer()">$\\mathbb{Z}_n$ ve $U(n)$ Gruplarını Analiz Et</button>
                                    <button class="btn-stepper secondary" onclick="document.getElementById('calc-group-n').value=10; runZnUnAnalyzer();">Örnek: n=10</button>
                                    <button class="btn-stepper secondary" onclick="document.getElementById('calc-group-n').value=12; runZnUnAnalyzer();">Örnek: n=12</button>
                                    <button class="btn-stepper secondary" onclick="document.getElementById('calc-group-n').value=20; runZnUnAnalyzer();">Örnek: n=20</button>
                                    <button class="btn-stepper secondary" onclick="document.getElementById('calc-group-n').value=30; runZnUnAnalyzer();">Örnek: n=30</button>
                                </div>
                            </div>
                            <div id="calc-znun-result" class="exam-sheet" style="padding: 20px; display: none;"></div>
                        </div>

                        <!-- TAB 3: S_n PERMUTATION & SIGNATURE SOLVER -->
                        <div class="academic-card" id="lab-panel-sn" style="display: none;">
                            <p style="color: var(--text-secondary); font-size: 0.94rem; margin-bottom: 14px;">
                                Döngü notasyonuyla girilen $\\sigma$ ve $\\tau$ permütasyonlarının bileşkesini ($\\sigma \\circ \\tau$, sağdan sola!), ayrık döngü ayrışımını, mertebesini ($\\mathrm{ppcm}$), transpozisyon çarpımını ve imzasını ($\\varepsilon = \\pm 1$) hesaplar.
                            </p>
                            <div class="calc-box" style="align-items: flex-end;">
                                <div class="calc-input-wrapper" style="flex: 1; min-width: 180px;">
                                    <label>Permütasyon $\\sigma$ (Döngü yazılışı):</label>
                                    <input type="text" id="calc-perm-sigma" value="(1 2 3 4)" style="width: 100%;" placeholder="Örn: (1 2 3)(4 5)">
                                </div>
                                <div class="calc-input-wrapper" style="flex: 1; min-width: 180px;">
                                    <label>Permütasyon $\\tau$ (Döngü yazılışı):</label>
                                    <input type="text" id="calc-perm-tau" value="(1 3)(2 4)" style="width: 100%;" placeholder="Örn: (1 4 2)">
                                </div>
                                <div class="calc-input-wrapper">
                                    <label>Derece ($n$):</label>
                                    <input type="number" id="calc-perm-n" value="4" min="2" max="9" style="width: 80px;">
                                </div>
                                <button class="btn-stepper primary" onclick="runPermutationAnalyzer()">Permütasyonları Çözümle</button>
                            </div>
                            <div id="calc-sn-result" class="exam-sheet" style="padding: 20px; display: none;"></div>
                        </div>

                        <!-- TAB 4: CAYLEY TABLE & CLASSIC GROUPS EXPLORER -->
                        <div class="academic-card" id="lab-panel-cayley" style="display: none;">
                            <p style="color: var(--text-secondary); font-size: 0.94rem; margin-bottom: 14px;">
                                Sınavlarda en çok sorulan sonlu grupların ($\\mathcal{D}_4, \\mathcal{D}_3, V_4, U(8), U(10), U(12), \\mathbb{Z}_6$) <strong>Cayley çarpım tablosunu ($x \\star y$)</strong>, köşegen simetrisiyle <strong>Abelyenlik testini</strong>, her elemanın tersini ($x^{-1}$), mertebesini ($o(x)$) ve <strong>grup merkezini ($Z(G)$)</strong> oluşturur.
                            </p>
                            <div class="calc-box">
                                <div class="calc-input-wrapper" style="min-width: 260px;">
                                    <label>İncelenecek Klasik Grup ($G, \\star$):</label>
                                    <select id="calc-cayley-group" onchange="runCayleyExplorer()" style="padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-subtle); background: var(--bg-paper); color: var(--text-main); font-size: 0.95rem;">
                                        <option value="d4">D₄ — Kare Simetri Grubu (|D₄| = 8, Non-abélien)</option>
                                        <option value="d3">D₃ ≅ S₃ — Eşkenar Üçgen Grubu (|D₃| = 6, Non-abélien)</option>
                                        <option value="v4">V₄ = Z₂ × Z₂ — Klein 4-Grubu (|V₄| = 4, Abélien non-cyclique)</option>
                                        <option value="u8">U(8) = {1, 3, 5, 7} mod 8 (|U(8)| = 4, ≅ V₄)</option>
                                        <option value="u10">U(10) = {1, 3, 7, 9} mod 10 (|U(10)| = 4, Cyclique ≅ Z₄)</option>
                                        <option value="u12">U(12) = {1, 5, 7, 11} mod 12 (|U(12)| = 4, ≅ V₄)</option>
                                        <option value="z6">(Z₆, +) — Mod 6 Toplamsal Devirli Grup (|Z₆| = 6)</option>
                                    </select>
                                </div>
                                <button class="btn-stepper primary" style="margin-top: 18px;" onclick="runCayleyExplorer()">Cayley Tablosunu &amp; Yapıyı Göster</button>
                            </div>
                            <div id="calc-cayley-result" class="exam-sheet" style="padding: 20px; display: none;"></div>
                        </div>
                    `;
                    setTimeout(runCalculator, 80);
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

        // ================= MAT204 GROUP THEORY LABORATORY FUNCTIONS =================
        function switchMat204LabTab(tabName) {
            ['bezout', 'znun', 'sn', 'cayley'].forEach(t => {
                const btn = document.getElementById('lab-tab-btn-' + t);
                const panel = document.getElementById('lab-panel-' + t);
                if (btn) btn.classList.toggle('active', t === tabName);
                if (panel) panel.style.display = (t === tabName) ? 'block' : 'none';
            });
            if (tabName === 'bezout') runCalculator();
            if (tabName === 'znun') runZnUnAnalyzer();
            if (tabName === 'sn') runPermutationAnalyzer();
            if (tabName === 'cayley') runCayleyExplorer();
        }

        function runCayleyExplorer() {
            const sel = document.getElementById('calc-cayley-group');
            const out = document.getElementById('calc-cayley-result');
            if (!sel || !out) return;
            const gKey = sel.value || 'd4';
            out.style.display = 'block';

            let title = '';
            let elems = [];
            let opSymbol = '\\cdot';
            let multFn = null;

            if (gKey === 'd4') {
                title = '\\mathcal{D}_4 = \\langle r, s \\mid r^4 = e, s^2 = e, srs = r^{-1} \\rangle';
                elems = ['e', 'r', 'r^2', 'r^3', 's', 'sr', 'sr^2', 'sr^3'];
                // Represent as (sBit, rExp) where element is s^sBit * r^rExp
                const toPair = (idx) => [idx >= 4 ? 1 : 0, idx % 4];
                const fromPair = (sb, re) => (sb ? 4 : 0) + ((re % 4 + 4) % 4);
                multFn = (i, j) => {
                    const [s1, r1] = toPair(i);
                    const [s2, r2] = toPair(j);
                    // (s^s1 r^r1)(s^s2 r^r2): if s2 == 1, r^r1 s = s r^{-r1}
                    const newS = s1 ^ s2;
                    const newR = s2 === 1 ? (r2 - r1) : (r1 + r2);
                    return fromPair(newS, newR);
                };
            } else if (gKey === 'd3') {
                title = '\\mathcal{D}_3 \\cong \\mathcal{S}_3 = \\langle r, s \\mid r^3 = e, s^2 = e, srs = r^2 \\rangle';
                elems = ['e', 'r', 'r^2', 's', 'sr', 'sr^2'];
                const toPair = (idx) => [idx >= 3 ? 1 : 0, idx % 3];
                const fromPair = (sb, re) => (sb ? 3 : 0) + ((re % 3 + 3) % 3);
                multFn = (i, j) => {
                    const [s1, r1] = toPair(i);
                    const [s2, r2] = toPair(j);
                    const newS = s1 ^ s2;
                    const newR = s2 === 1 ? (r2 - r1) : (r1 + r2);
                    return fromPair(newS, newR);
                };
            } else if (gKey === 'v4') {
                title = 'V_4 = \\{e, a, b, c\\} \\cong \\mathbb{Z}_2 \\times \\mathbb{Z}_2';
                elems = ['e', 'a', 'b', 'c'];
                multFn = (i, j) => i ^ j;
            } else if (gKey === 'u8' || gKey === 'u10' || gKey === 'u12') {
                const modN = gKey === 'u8' ? 8 : (gKey === 'u10' ? 10 : 12);
                const rawUnits = gKey === 'u8' ? [1, 3, 5, 7] : (gKey === 'u10' ? [1, 3, 7, 9] : [1, 5, 7, 11]);
                title = `(U(${modN}), \\times \\pmod{${modN}})`;
                opSymbol = '\\times';
                elems = rawUnits.map(u => `\\overline{${u}}`);
                multFn = (i, j) => rawUnits.indexOf((rawUnits[i] * rawUnits[j]) % modN);
            } else {
                title = '(\\mathbb{Z}_6, + \\pmod 6)';
                opSymbol = '+';
                elems = ['\\bar{0}', '\\bar{1}', '\\bar{2}', '\\bar{3}', '\\bar{4}', '\\bar{5}'];
                multFn = (i, j) => (i + j) % 6;
            }

            const sz = elems.length;
            let isAbelian = true;
            const centerIndices = [];

            for (let i = 0; i < sz; i++) {
                let commutesWithAll = true;
                for (let j = 0; j < sz; j++) {
                    if (multFn(i, j) !== multFn(j, i)) {
                        isAbelian = false;
                        commutesWithAll = false;
                    }
                }
                if (commutesWithAll) centerIndices.push(i);
            }

            // Build Cayley Table HTML
            let headerCells = `<th style="padding: 8px 10px; background: rgba(37,99,235,0.12); border: 1px solid var(--border-subtle);">$${opSymbol}$</th>`;
            for (let j = 0; j < sz; j++) {
                headerCells += `<th style="padding: 8px 10px; background: rgba(125,125,125,0.1); border: 1px solid var(--border-subtle);">$${elems[j]}$</th>`;
            }

            let bodyRows = '';
            for (let i = 0; i < sz; i++) {
                let rowCells = `<th style="padding: 8px 10px; background: rgba(125,125,125,0.1); border: 1px solid var(--border-subtle);">$${elems[i]}$</th>`;
                for (let j = 0; j < sz; j++) {
                    const p = multFn(i, j);
                    const isNeutral = (p === 0);
                    const bg = isNeutral ? 'background: rgba(16, 185, 129, 0.14); font-weight: 700; color: var(--accent-emerald);' : '';
                    rowCells += `<td style="padding: 7px 10px; border: 1px solid var(--border-subtle); text-align: center; ${bg}">$${elems[p]}$</td>`;
                }
                bodyRows += `<tr>${rowCells}</tr>`;
            }

            // Compute orders & inverses
            let elemDetailsRows = '';
            let hasGenerator = false;
            for (let i = 0; i < sz; i++) {
                let invIdx = 0;
                for (let j = 0; j < sz; j++) {
                    if (multFn(i, j) === 0) { invIdx = j; break; }
                }
                let cur = i;
                let ord = 1;
                const subElems = [elems[i]];
                while (cur !== 0 && ord <= sz) {
                    cur = multFn(cur, i);
                    ord++;
                    if (!subElems.includes(elems[cur])) subElems.push(elems[cur]);
                }
                if (ord === sz) hasGenerator = true;
                elemDetailsRows += `
                    <tr>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle); font-weight: 700;">$${elems[i]}$</td>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle);">$${elems[invIdx]}$</td>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle); font-weight: 700; color: var(--accent-blue);">$o(${elems[i]}) = ${ord}$</td>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle);">$\\langle ${elems[i]} \\rangle = \\{ ${subElems.join(', ')} \\}$</td>
                    </tr>
                `;
            }

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 10px;">1. Yapısal Özet &amp; Merkez $Z(G)$ Analizi : $${title}$</h3>
                <div class="math-callout">
                    <p>• <strong>Grup Mertebesi :</strong> $|G| = ${sz}$ &nbsp;|&nbsp; <strong>Birim Eleman (Neutre) :</strong> $${elems[0]}$.</p>
                    <p>• <strong>Abelyenlik (Değişmelilik) :</strong> ${isAbelian ? '<span style="color: var(--accent-emerald); font-weight: 700;">ABELYEN GRUP ✓</span> (Cayley tablosu asal köşegene göre simetriktir: $x \\star y = y \\star x$).' : '<span style="color: var(--accent-rose); font-weight: 700;">ABELYEN DEĞİLDİR (Non-abélien)!</span> (Cayley tablosu köşegene göre simetrik değildir; örn. $r \\cdot s \\neq s \\cdot r$).'}</p>
                    <p>• <strong>Devirlilik (Cyclicité) :</strong> ${hasGenerator ? '<span style="color: var(--accent-emerald); font-weight: 700;">DEVİRLİ GRUP ✓</span> ($o(x) = ' + sz + '$ olan üreteci mevcuttur).' : '<span style="color: var(--accent-amber); font-weight: 700;">DEVİRLİ DEĞİLDİR!</span> (Hiçbir elemanın mertebesi $' + sz + '$ değerine ulaşmaz).'}</p>
                    <p>• <strong>Grubun Merkezi $Z(G)$ :</strong> $\\mathbf{Z(G) = \\{ ${centerIndices.map(idx => elems[idx]).join(', ')} \\}}$ ($|Z(G)| = ${centerIndices.length}$).</p>
                </div>

                <h3 style="color: var(--accent-blue); margin: 16px 0 10px;">2. Cayley Çarpım Tablosu (Yeşil Hücreler = Birim Eleman $\\implies$ Ters Elemanlar)</h3>
                <div style="overflow-x: auto; margin-bottom: 18px;">
                    <table style="border-collapse: collapse; font-size: 0.92rem; min-width: 360px;">
                        <thead><tr>${headerCells}</tr></thead>
                        <tbody>${bodyRows}</tbody>
                    </table>
                </div>

                <h3 style="color: var(--accent-blue); margin: 16px 0 10px;">3. Elemanların Tersleri ($x^{-1}$), Mertebeleri ($o(x)$) ve Ürettikleri Alt Gruplar ($\\langle x \\rangle$)</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left;">
                        <thead>
                            <tr style="background: rgba(125,125,125,0.1);">
                                <th style="padding: 8px 10px;">Eleman $x$</th>
                                <th style="padding: 8px 10px;">Tersi $x^{-1}$</th>
                                <th style="padding: 8px 10px;">Mertebe $o(x)$</th>
                                <th style="padding: 8px 10px;">Devirli Alt Grup $\\langle x \\rangle$</th>
                            </tr>
                        </thead>
                        <tbody>${elemDetailsRows}</tbody>
                    </table>
                </div>
            `;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
            }
        }

        function gcdInt(a, b) {
            a = Math.abs(a);
            b = Math.abs(b);
            while (b !== 0) {
                const t = b;
                b = a % b;
                a = t;
            }
            return a;
        }

        function lcmInt(a, b) {
            if (a === 0 || b === 0) return 0;
            return Math.abs((a * b) / gcdInt(a, b));
        }

        function runCalculator() {
            const aInput = document.getElementById('calc-a');
            const nInput = document.getElementById('calc-n');
            const out = document.getElementById('calc-result-area');
            if (!aInput || !nInput || !out) return;

            let a = parseInt(aInput.value, 10);
            let n = parseInt(nInput.value, 10);
            if (isNaN(a) || isNaN(n) || n <= 1) {
                out.style.display = 'block';
                out.innerHTML = `<p style="color: var(--accent-rose);">Lütfen geçerli tam sayılar giriniz ($n \\ge 2$).</p>`;
                return;
            }
            out.style.display = 'block';

            const aOrig = a;
            const nOrig = n;
            let A = Math.abs(a);
            let B = Math.abs(n);
            const steps = [];
            let r0 = A, r1 = B;
            let s0 = 1, s1 = 0;
            let t0 = 0, t1 = 1;

            while (r1 !== 0) {
                const q = Math.floor(r0 / r1);
                const r2 = r0 - q * r1;
                const s2 = s0 - q * s1;
                const t2 = t0 - q * t1;
                steps.push({ dividend: r0, divisor: r1, q, r: r2, s: s2, t: t2 });
                r0 = r1; r1 = r2;
                s0 = s1; s1 = s2;
                t0 = t1; t1 = t2;
            }

            const d = r0;
            const u = (a < 0) ? -s0 : s0;
            const v = (n < 0) ? -t0 : t0;

            let euclidLines = steps.map(st => `${st.dividend} &= ${st.divisor} \\times ${st.q} + ${st.r}`).join(' \\\\\n');
            let inverseHTML = '';
            if (d === 1) {
                const inv = ((u % nOrig) + nOrig) % nOrig;
                inverseHTML = `
                    <div class="exam-conclusion" style="margin-top: 14px;">
                        <strong>Modüler Ters Sonucu ($U(${nOrig})$) :</strong><br>
                        $\\gcd(${aOrig}, ${nOrig}) = 1$ olduğundan $\\overline{${aOrig}}$ sınıfı $\\mathbb{Z}_{${nOrig}}$ içinde terslenebilirdir ($\\overline{${aOrig}} \\in U(${nOrig})$).<br>
                        Bézout eşitliği mod ${nOrig}'de indirgendiğinde :
                        $$ ${aOrig} \\times (${u}) + ${nOrig} \\times (${v}) = 1 \\implies ${aOrig} \\times (${u}) \\equiv 1 \\pmod{${nOrig}} $$
                        Kanonic temsilci : $\\mathbf{\\overline{${aOrig}}^{-1} = \\overline{${inv}} \\pmod{${nOrig}}}$ &nbsp; (Kontrol: $${aOrig} \\times ${inv} = ${aOrig * inv} \\equiv 1 \\pmod{${nOrig}}$).
                    </div>
                `;
            } else {
                inverseHTML = `
                    <div class="hint-callout-box" style="margin-top: 14px;">
                        <strong>Terslenemezlik Sonucu ($\\overline{${aOrig}} \\notin U(${nOrig})$) :</strong><br>
                        $\\gcd(${aOrig}, ${nOrig}) = ${d} \\neq 1$ olduğundan $\\overline{${aOrig}}$ elemanı $\\mathbb{Z}_{${nOrig}}$ halkasında <strong>sıfır bölenidir</strong> ve çarpımsal tersi <strong>YOKTUR</strong>.
                    </div>
                `;
            }

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 10px;">1. Algorithme d'Euclide (Ardışık Kalanlı Bölmeler)</h3>
                <div class="math-callout">
                    $$\\begin{aligned}
                    ${euclidLines}
                    \\end{aligned}$$
                    <p style="margin-top: 8px;">Son sıfır olmayan kalan : $\\mathbf{\\gcd(${aOrig}, ${nOrig}) = ${d}}$.</p>
                </div>

                <h3 style="color: var(--accent-blue); margin: 16px 0 10px;">2. Identité de Bézout ($au + nv = \\gcd(a,n)$)</h3>
                <div class="math-callout">
                    $$ \\mathbf{${aOrig} \\times (${u}) + ${nOrig} \\times (${v}) = ${d}} $$
                    <p style="margin-top: 6px; font-size: 0.92rem; color: var(--text-secondary);">Bézout katsayı çifti : $(u, v) = (${u}, ${v}) \\in \\mathbb{Z}^2$.</p>
                </div>
                ${inverseHTML}
            `;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
            }
        }

        function runZnUnAnalyzer() {
            const nInput = document.getElementById('calc-group-n');
            const out = document.getElementById('calc-znun-result');
            if (!nInput || !out) return;
            const n = Math.min(60, Math.max(2, parseInt(nInput.value, 10) || 12));
            nInput.value = n;
            out.style.display = 'block';

            // Divisors of n
            const divisors = [];
            for (let d = 1; d <= n; d++) {
                if (n % d === 0) divisors.push(d);
            }

            // Elements of U(n)
            const units = [];
            for (let k = 1; k < n; k++) {
                if (gcdInt(k, n) === 1) units.push(k);
            }
            const phi = units.length;

            // Subgroups of (Z_n, +)
            let znSubgroupsHTML = '';
            divisors.forEach(d => {
                const gen = (n / d) % n;
                const elems = [];
                for (let j = 0; j < d; j++) elems.push(`\\overline{${(j * (n / d)) % n}}`);
                znSubgroupsHTML += `<li><strong>Ordre $d = ${d}$ :</strong> $H_{${d}} = \\langle \\overline{${gen}} \\rangle = \\{ ${elems.join(', ')} \\}$</li>`;
            });

            // Orders in U(n)
            let unRowsHTML = '';
            const unGenerators = [];
            units.forEach(u => {
                let cur = u % n;
                let ord = 1;
                const powers = [`${u}^1 \\equiv ${cur}`];
                while (cur !== 1 && ord <= n) {
                    cur = (cur * u) % n;
                    ord++;
                    if (ord <= 6 || cur === 1) powers.push(`${u}^{${ord}} \\equiv ${cur}`);
                }
                if (ord === phi) unGenerators.push(u);
                unRowsHTML += `
                    <tr>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle); font-weight: 700;">$\\overline{${u}}$</td>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle);">$${powers.join(', \\; ')}$</td>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle); font-weight: 700; color: var(--accent-blue);">$o(\\overline{${u}}) = ${ord}$</td>
                        <td style="padding: 6px 10px; border-bottom: 1px solid var(--border-subtle);">${ord === phi ? '<span style="color: var(--accent-emerald); font-weight: 700;">Üreteç (Générateur) ✓</span>' : `Alt grup mertebesi ${ord}`}</td>
                    </tr>
                `;
            });

            const isUnCyclic = unGenerators.length > 0;

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 10px;">1. Toplamsal Devirli Grup $(\\mathbb{Z}_{${n}}, +)$ Analizi</h3>
                <div class="math-callout">
                    <p>• <strong>Grup Mertebesi :</strong> $|\\mathbb{Z}_{${n}}| = ${n}$ &nbsp;|&nbsp; <strong>Üreteç Sayısı :</strong> $\\varphi(${n}) = ${phi}$.</p>
                    <p>• <strong>$(\\mathbb{Z}_{${n}}, +)$ Üreteçleri :</strong> $\\{ ${units.map(u => '\\overline{' + u + '}').join(', ')} \\}$.</p>
                    <p style="margin-top: 8px;">• <strong>Tüm Devirli Alt Grupları (${divisors.length} adet, $d \\mid ${n}$) :</strong></p>
                    <ul style="margin-left: 20px; margin-top: 4px; line-height: 1.75;">${znSubgroupsHTML}</ul>
                </div>

                <h3 style="color: var(--accent-blue); margin: 18px 0 10px;">2. Çarpımsal Grup $(U(${n}), \\times)$ ve Eleman Mertebeleri</h3>
                <div class="math-callout">
                    <p>• <strong>Grup Tanımı ve Mertebesi :</strong> $U(${n}) = \\{ ${units.join(', ')} \\}$, $|U(${n})| = \\varphi(${n}) = \\mathbf{${phi}}$.</p>
                    <p>• <strong>Devirlilik Durumu :</strong> ${isUnCyclic ? `<span style="color: var(--accent-emerald); font-weight: 700;">$U(${n})$ DEVİRLİ BİR GRUPTUR</span> ($U(${n}) \\cong \\mathbb{Z}_{${phi}}$). Üreteçleri: $\\{ ${unGenerators.join(', ')} \\}$.` : `<span style="color: var(--accent-rose); font-weight: 700;">$U(${n})$ DEVİRLİ DEĞİLDİR!</span> Hiçbir elemanın mertebesi $|U(${n})| = ${phi}$ değerine ulaşmaz.`}</p>
                </div>

                <div style="overflow-x: auto; margin-top: 12px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left;">
                        <thead>
                            <tr style="background: rgba(125,125,125,0.1);">
                                <th style="padding: 8px 10px;">Eleman $x \\in U(${n})$</th>
                                <th style="padding: 8px 10px;">Mod ${n}'de Kuvvetleri</th>
                                <th style="padding: 8px 10px;">Mertebe $o(x)$</th>
                                <th style="padding: 8px 10px;">Grup İçi Rolü</th>
                            </tr>
                        </thead>
                        <tbody>${unRowsHTML}</tbody>
                    </table>
                </div>
            `;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
            }
        }

        function parseCycleNotation(str, n) {
            const map = {};
            for (let i = 1; i <= n; i++) map[i] = i;
            if (!str || !str.trim() || str.trim().toLowerCase() === 'id') return map;

            const cycleMatches = str.match(/\(([^)]+)\)/g);
            if (!cycleMatches) return map;

            // Apply cycles from right to left so even non-disjoint cycle products work!
            for (let cIdx = cycleMatches.length - 1; cIdx >= 0; cIdx--) {
                const raw = cycleMatches[cIdx].slice(1, -1).trim();
                const nums = raw.split(/[\s,]+/).map(x => parseInt(x, 10)).filter(x => !isNaN(x) && x >= 1 && x <= n);
                if (nums.length >= 2) {
                    const nextMap = Object.assign({}, map);
                    for (let i = 1; i <= n; i++) {
                        const imageInCurrent = map[i];
                        const pos = nums.indexOf(imageInCurrent);
                        if (pos !== -1) {
                            nextMap[i] = nums[(pos + 1) % nums.length];
                        }
                    }
                    Object.assign(map, nextMap);
                }
            }
            return map;
        }

        function decomposeDisjointCycles(map, n) {
            const visited = {};
            const cycles = [];
            for (let i = 1; i <= n; i++) {
                if (!visited[i]) {
                    const cyc = [];
                    let cur = i;
                    while (!visited[cur]) {
                        visited[cur] = true;
                        cyc.push(cur);
                        cur = map[cur];
                    }
                    if (cyc.length > 1) cycles.push(cyc);
                }
            }
            return cycles;
        }

        function formatCyclesLatex(cycles) {
            if (!cycles || cycles.length === 0) return '\\mathrm{id}';
            return cycles.map(c => '(' + c.join('\\,') + ')').join('');
        }

        function runPermutationAnalyzer() {
            const sInput = document.getElementById('calc-perm-sigma');
            const tInput = document.getElementById('calc-perm-tau');
            const nInput = document.getElementById('calc-perm-n');
            const out = document.getElementById('calc-sn-result');
            if (!sInput || !tInput || !nInput || !out) return;

            const n = Math.min(9, Math.max(2, parseInt(nInput.value, 10) || 4));
            nInput.value = n;
            out.style.display = 'block';

            const sigma = parseCycleNotation(sInput.value, n);
            const tau = parseCycleNotation(tInput.value, n);

            // Composition comp = sigma o tau: comp(x) = sigma(tau(x))
            const comp = {};
            const invSigma = {};
            const traceSteps = [];
            for (let i = 1; i <= n; i++) {
                comp[i] = sigma[tau[i]];
                invSigma[sigma[i]] = i;
                traceSteps.push(`${i} \\xrightarrow{\\tau} ${tau[i]} \\xrightarrow{\\sigma} ${comp[i]}`);
            }

            const cycSigma = decomposeDisjointCycles(sigma, n);
            const cycTau = decomposeDisjointCycles(tau, n);
            const cycComp = decomposeDisjointCycles(comp, n);
            const cycInv = decomposeDisjointCycles(invSigma, n);

            const calcOrder = (cycles) => cycles.reduce((acc, c) => lcmInt(acc, c.length), 1);
            const calcTranspositions = (cycles) => {
                const trans = [];
                cycles.forEach(c => {
                    for (let i = c.length - 1; i >= 1; i--) {
                        trans.push(`(${c[0]}\\,${c[i]})`);
                    }
                });
                return trans;
            };

            const ordSigma = calcOrder(cycSigma);
            const ordTau = calcOrder(cycTau);
            const ordComp = calcOrder(cycComp);

            const transComp = calcTranspositions(cycComp);
            const signComp = (transComp.length % 2 === 0) ? '+1' : '-1';

            const topRow = Array.from({length: n}, (_, i) => i + 1).join(' & ');
            const botComp = Array.from({length: n}, (_, i) => comp[i + 1]).join(' & ');

            out.innerHTML = `
                <h3 style="color: var(--accent-blue); margin-bottom: 10px;">1. Bileşke Hesabı ($\\sigma \\circ \\tau$ — Sağdan Sola Uygulama)</h3>
                <div class="math-callout">
                    <p>Elemanların $\\tau$ ardından $\\sigma$ altındaki izi ($\n(\\sigma \\circ \\tau)(x) = \\sigma(\\tau(x))$) :</p>
                    $$ ${traceSteps.join(', \\qquad ')} $$
                    $$ \\sigma \\circ \\tau = \\begin{pmatrix} ${topRow} \\\\ ${botComp} \\end{pmatrix} = \\mathbf{${formatCyclesLatex(cycComp)}} $$
                </div>

                <h3 style="color: var(--accent-blue); margin: 16px 0 10px;">2. Ayrık Döngü, Mertebe ($o$), Ters ve İmza ($\\varepsilon$) Tablosu</h3>
                <div class="math-callout">
                    <ul style="margin-left: 20px; line-height: 1.85;">
                        <li><strong>$\\sigma$ Ayrık Döngü Yapısı :</strong> $${formatCyclesLatex(cycSigma)}$ &nbsp;|&nbsp; <strong>Mertebe :</strong> $o(\\sigma) = \\mathbf{${ordSigma}}$ &nbsp;|&nbsp; <strong>Tersi :</strong> $\\sigma^{-1} = ${formatCyclesLatex(cycInv)}$.</li>
                        <li><strong>$\\tau$ Ayrık Döngü Yapısı :</strong> $${formatCyclesLatex(cycTau)}$ &nbsp;|&nbsp; <strong>Mertebe :</strong> $o(\\tau) = \\mathbf{${ordTau}}$.</li>
                        <li><strong>$\\sigma \\circ \\tau$ Ayrık Döngü Yapısı :</strong> $\\mathbf{${formatCyclesLatex(cycComp)}}$ &nbsp;|&nbsp; <strong>Mertebe :</strong> $o(\\sigma \\circ \\tau) = \\mathrm{ppcm}(${cycComp.length ? cycComp.map(c => c.length).join(',') : '1'}) = \\mathbf{${ordComp}}$.</li>
                        <li><strong>$\\sigma \\circ \\tau$ Transpozisyon Çarpımı :</strong> $${transComp.length ? transComp.join('') : '\\mathrm{id} \\text{ (0 transpozisyon)}'}$ (${transComp.length} transpozisyon).</li>
                        <li><strong>İmza ve Parite :</strong> $\\mathbf{\\varepsilon(\\sigma \\circ \\tau) = (-1)^{${transComp.length}} = ${signComp}}$ $\\implies$ ${signComp === '+1' ? `<span style="color: var(--accent-emerald); font-weight: 700;">Çift Permütasyon ($\\sigma \\circ \\tau \\in \\mathcal{A}_{${n}}$)</span>` : `<span style="color: var(--accent-rose); font-weight: 700;">Tek Permütasyon ($\\sigma \\circ \\tau \\notin \\mathcal{A}_{${n}}$)</span>`}.</li>
                    </ul>
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

            const activeFilter = (filterCourseKey === 'all' || filterCourseKey === 'notes') ? filterCourseKey : (filterCourseKey || activeCourseKey);

            let poolHTML = '';
            let displayedCount = 0;

            const coursesToScan = (activeFilter === 'all' || activeFilter === 'notes') ? courseKeys : [activeFilter];

            coursesToScan.forEach(cKey => {
                const c = COURSES_DB[cKey];
                if (!c) return;
                let starredForThis = [];
                let notesForThis = {};
                try {
                    const raw = localStorage.getItem(cKey + '_starred_ex') || (cKey === 'mat204_grup' ? localStorage.getItem('mat204_starred_ex') : null);
                    starredForThis = raw ? JSON.parse(raw) : [];
                } catch(e) {}
                try {
                    const nRaw = localStorage.getItem(cKey + '_user_notes');
                    notesForThis = nRaw ? JSON.parse(nRaw) : {};
                } catch(e) {}

                Object.keys(c.modules).forEach(modKey => {
                    const mod = c.modules[modKey];
                    mod.exercises.forEach((ex, idx) => {
                        const isStar = starredForThis.includes(ex.id);
                        const userNote = notesForThis[ex.id] || '';
                        const shouldShow = (activeFilter === 'notes') ? Boolean(userNote) : isStar;
                        if (shouldShow) {
                            displayedCount++;
                            const cleanPreview = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '';
                            const subTitleText = ex.subtitle ? ` — <span style="color: var(--accent-indigo); font-weight: 600;">${ex.subtitle}</span>` : '';
                            const noteCallout = userNote ? `<div style="margin-top: 8px; padding: 6px 10px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); border-radius: 4px; font-size: 0.84rem; color: var(--text-main);"><strong>📝 Kişisel Notunuz:</strong> ${userNote}</div>` : '';
                            poolHTML += `
                                <div class="pool-item" onclick="switchCourseAndJump('${cKey}', '${modKey}', ${idx})">
                                    <div>
                                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                            <span style="font-size: 0.72rem; font-weight: 700; color: ${c.color}; border: 1px solid ${c.color}; padding: 1px 6px; border-radius: 4px;">${c.code}</span>
                                            <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-amber); text-transform: uppercase;">${isStar ? '⭐ ' : ''}${mod.title.split(':')[0]}</span>
                                            <span style="font-size: 0.75rem; color: var(--text-muted);">${ex.tag || ''}</span>
                                        </div>
                                        <h4 style="color: var(--text-main); margin-top: 6px;">${ex.name}${subTitleText}</h4>
                                        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 4px;">${cleanPreview}</p>
                                        ${noteCallout}
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
            let totalNotesCount = 0;
            courseKeys.forEach(ck => {
                try {
                    const nr = localStorage.getItem(ck + '_user_notes');
                    if (nr) totalNotesCount += Object.keys(JSON.parse(nr)).length;
                } catch(e) {}
            });

            let tabsHTML = `
                <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color);">
                    <button class="btn-stepper ${activeFilter === 'all' ? 'primary' : 'secondary'}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openStarredPool('all')">
                        ⭐ Tüm Yıldızlılar (${totalStarredAcrossAll})
                    </button>
                    <button class="btn-stepper ${activeFilter === 'notes' ? 'primary' : 'secondary'}" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openStarredPool('notes')">
                        📝 Not Aldıklarım (${totalNotesCount})
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
            if (window.innerWidth <= 900) {
                closeMobileSidebar();
            }
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
                    const conceptCourse = c.course || 'mat204_grup';
                    if (effectiveCourseFilter !== 'all' && effectiveCourseFilter !== conceptCourse) {
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
                            const matchSub = ex.subtitle && ex.subtitle.toLowerCase().includes(q);
                            const matchEnonce = ex.enonce && ex.enonce.toLowerCase().includes(q);
                            const matchTag = ex.tag && ex.tag.toLowerCase().includes(q);

                            if (!q || matchName || matchSub || matchEnonce || matchTag) {
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
            syncMobileNavTabs('pitfalls');
            const main = document.getElementById('main-content');
            const prevCatPills = main ? main.querySelector('.flashcard-cat-pills') : null;
            const savedCatScrollLeft = prevCatPills ? prevCatPills.scrollLeft : null;
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
                        title: "1. Bağımsızlık (Indépendance) ile Ayrıklığı (Incompatibilité) Karıştırmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "İki olay bağımsız olduğunda $A \cap B = \emptyset$ sanmak veya $A \cap B = \emptyset$ olunca 'bağımsızdır' demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "$A \cap B = \emptyset$ olması olayların **ayrık (incompatible)** olduğu anlamına gelir. Eğer $P(A)>0$ ve $P(B)>0$ ise, ayrık iki olay **ASLA bağımsız olamaz**! Çünkü bağımsızlık $P(A \cap B) = P(A)P(B) > 0$ gerektirir, oysa ayrık olaylarda kesişim sıfırdır."
                    },
                    {
                        title: "2. Bayes Teoreminde Önsel Olasılığı (P(M)) Hesaba Katmamak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "Kanser testi %99 güvenilir çıktığında, testi pozitif olan birinin hasta olma olasılığına doğrudan %99 demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Hastalık toplumda çok nadirse ($P(M) = 0.0001$), yalancı pozitifler hasta olanlardan kat kat fazla çıkar! Kağıda mutlaka tam olaylar sistemi $\{M, M^c\}$ üzerinden Bayes formülünü yazın: $P(M \mid T) = \frac{P(T \mid M)P(M)}{P(T \mid M)P(M) + P(T \mid M^c)P(M^c)} \approx 0.98\%$."
                    },
                    {
                        title: "3. Süreklilik Belirtmeden Y = -X için 1 - F(-y) Yazmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-8 Puan):</span>`,
                        wrongDesc: "$F_Y(y) = P(-X \le y) = P(X \ge -y) = 1 - F(-y)$ yazıp geçmek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Genel durumda $P(X \ge -y) = 1 - P(X < -y) = 1 - F((-y)^-)$'dir! $1 - F(-y)$ eşitliğinin geçerli olması için kağıda açıkça **« Comme X est une variable aléatoire continue, $P(X = -y) = 0$, d'où $P(X < -y) = P(X \le -y) = F(-y)$ »** gerekçesi yazılmalıdır (2024 DS Soru 6)."
                    },
                    {
                        title: "4. Çift Sayımda (Double Comptage) Cebirsel Açılım Yapmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "$\sum \binom{n}{k} k^2$ veya $\binom{2n}{n}$ eşitliğini türev alarak veya binom katsayılarını cebirsel çarparak çözmeye çalışmak.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "Hoca açıkça **« par argument combinatoire »** ister. Eşitliğin sol tarafının önce komiteyi seçip sonra liderleri atadığını, sağ tarafının ise önce liderleri (aynı kişi mi farklı mı?) seçip sonra komiteyi tamamladığını iki ayrı paragrafta anlatın (2024 DS Soru 9)."
                    },
                    {
                        title: "5. İkişerli Bağımsızlığı (Deux à Deux) Mutlak Bağımsız Sanmak",
                        wrongText: `<span class="badge-pitfall-wrong">${window.ICONS ? window.ICONS.x : ""} Hatalı Yaklaşım (-10 Puan):</span>`,
                        wrongDesc: "$P(A \cap B) = P(A)P(B)$, $P(A \cap C) = P(A)P(C)$ ve $P(B \cap C) = P(B)P(C)$ bulunca 'O halde A, B, C bağımsızdır' demek.",
                        rightText: `<span class="badge-pitfall-right">${window.ICONS ? window.ICONS.check : ""} Doğru Matematiksel İfade (Tam Puan):</span>`,
                        rightDesc: "İkişerli bağımsızlık (indépendance deux à deux) **mutlak bağımsızlığı gerektirmez**! Mutlak bağımsızlık için 4. şart olan $P(A \cap B \cap C) = P(A)P(B)P(C)$ mutlaka ayrıca gösterilmelidir (Bernstein karşı-örneği)."
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
                    { num: 4, points: 20, topic: 'Alterne Seriler & Leibniz Kriteri', ex: (mods['seriler_mod4'] ? mods['seriler_mod4'].exercises[1] : (mods['seriler_mod3'] ? mods['seriler_mod3'].exercises[0] : null)), rubric: '+6 Puan: Terim pozitifliği ve azalanlık, +8 Puan: Limit sıfır koşulu, +6 Puan: Leibniz sonucu.' },
                    { num: 5, points: 20, topic: 'Fonksiyon Dizileri & Düzgün Yakınsaklık', ex: (mods['seriler_mod6'] ? mods['seriler_mod6'].exercises[1] : (mods['seriler_mod5'] ? mods['seriler_mod5'].exercises[0] : null)), rubric: '+6 Puan: Noktasal limit hesabı, +8 Puan: Süreklilik aktarımı çelişkisi, +6 Puan: Supremum normu.' }
                ];
            } else if (activeCourseKey === 'fiz101_fizik') {
                return [
                    { num: 1, points: 25, topic: 'Vektörler & Skaler/Vektörel Çarpım', ex: mods['fizik_mod1'].exercises[0], rubric: '+8 Puan: Norm ve birim vektörler, +10 Puan: Skaler çarpım ve açı hesabı, +7 Puan: Vektörel çarpım.' },
                    { num: 2, points: 25, topic: 'Dönen Sistemler & Poisson Bağıntısı', ex: mods['fizik_mod1'].exercises[1], rubric: '+8 Puan: Kartezyen projeksiyon, +10 Puan: Zamana göre türevler, +7 Puan: Poisson kuralı.' },
                    { num: 3, points: 25, topic: 'Kartezyen Kinematik & Frenet Tabanı', ex: mods['fizik_mod2'].exercises[1] || mods['fizik_mod2'].exercises[0], rubric: '+8 Puan: Hız vektörü ve normu, +10 Puan: Teğetsel ivme, +7 Puan: Normal ivme ve eğrilik.' },
                    { num: 4, points: 25, topic: 'Kutupsal Koordinatlarda Dairesel Hareket', ex: mods['fizik_mod2'].exercises[2] || mods['fizik_mod2'].exercises[0], rubric: '+8 Puan: Radyal ve teğetsel hız, +10 Puan: Merkezcil ivme, +7 Puan: Dinamik hareket denklemi.' }
                ];
            } else if (activeCourseKey === 'mat206_olasilik') {
                const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
                const m1 = mods['olasilik_mod1']?.exercises || [];
                const m2 = mods['olasilik_mod2']?.exercises || [];
                const m3 = mods['olasilik_mod3']?.exercises || [];
                const m4 = mods['olasilik_mod4']?.exercises || [];
                const m5 = mods['olasilik_mod5']?.exercises || [];

                const q1 = pick(m1) || m1[0];
                const q2 = pick(m2) || m2[0];
                const q3 = pick(m3) || m3[0];
                const q4 = pick(m4) || m4[0];
                const q5 = pick(m5) || m5[0];

                return [
                    { num: 1, points: 20, topic: 'Kombinatorik Sayma & Özdeşlikler (Double Comptage)', ex: q1, rubric: '+6 Puan: Örneklem uzayı ve modellerin doğru tanımı, +8 Puan: İki yönlü sayım/bölme adımları, +6 Puan: Özdeşliğin ispatı.' },
                    { num: 2, points: 20, topic: 'Olaylar Cebri, Aksiyomlar & Küme Olasılığı', ex: q2, rubric: '+6 Puan: Ayrık ayrışım ve Kolmogorov aksiyomları, +8 Puan: Koşullu olasılık / bağımsızlık analizi, +6 Puan: Nihai oran.' },
                    { num: 3, points: 20, topic: 'Tam Olasılık & Bayes Teoremi (Dépistage & Usine)', ex: q3, rubric: '+6 Puan: Système complet d\'événements tanımı, +8 Puan: Payda toplam olasılık hesabı, +6 Puan: Bayes a posteriori sonucu.' },
                    { num: 4, points: 20, topic: 'Bağımsız Denemeler, Pascal & Ruine du Joueur', ex: q4, rubric: '+6 Puan: İlk atışa göre koşullandırma ve rekürans, +8 Puan: İndüksiyon veya fark denklemi çözümü, +6 Puan: Tam çözüm.' },
                    { num: 5, points: 20, topic: 'Rastgele Değişkenler, Dağılım Fonksiyonu & Gauss', ex: q5, rubric: '+6 Puan: Dağılım fonksiyonu $F(x)$ tanımı ve integrali, +8 Puan: Değişken dönüşümü ara adımları, +6 Puan: Yoğunluk/olasılık hesabı.' }
                ];
            }

            // Default: mat204_grup — Randomized balanced GSU Midterm Exam
            const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
            const m1Pool = mods['modul1']?.exercises || [];
            const m2Pool = mods['modul2']?.exercises || [];
            const m34Pool = [...(mods['modul3']?.exercises || []), ...(mods['modul4']?.exercises || [])];
            const m5Pool = mods['modul5']?.exercises || [];
            const m6Pool = mods['modul6']?.exercises || [];

            const q1 = pickRandom(m1Pool) || m1Pool[0];
            const q2 = pickRandom(m2Pool) || m2Pool[0];
            const q3 = pickRandom(m34Pool) || m34Pool[0];
            const q4 = pickRandom(m5Pool) || m5Pool[0];
            const q5 = pickRandom(m6Pool) || m6Pool[0];

            return [
                { num: 1, points: 20, topic: 'Aritmetik, Bézout ve Modüler Aritmetik', ex: q1, rubric: '+5 Puan: Hipotez ve modüler/bölünebilme tanımı, +10 Puan: Algoritma / tümevarım ara işlemleri, +5 Puan: Nihai sonuç.' },
                { num: 2, points: 20, topic: 'Grup Yapısı, Alt Gruplar ve Eleman Mertebesi', ex: q2, rubric: '+5 Puan: Birim eleman ve boş olmama ($e \\in H$), +10 Puan: Kapalılık ve ters eleman ($xy^{-1} \\in H$), +5 Puan: Sonuç.' },
                { num: 3, points: 20, topic: 'Devirli Gruplar, Üreteçler ve $\\mathbb{Z}_n / U(n)$', ex: q3, rubric: '+6 Puan: Mertebe ve bölünebilme bağıntısı, +8 Puan: Alt grup / üreteç ($\varphi(n)$) hesabı, +6 Puan: Tam liste.' },
                { num: 4, points: 20, topic: 'Simetrik Grup $\\mathcal{S}_n$, Ayrık Döngüler ve İmza', ex: q4, rubric: '+6 Puan: Ayrık döngülere ayrışım, +8 Puan: Mertebe ($\\mathrm{ppcm}$) ve alt grup analizi, +6 Puan: İmza ve sonuç.' },
                { num: 5, points: 20, topic: 'Grup Morfizmaları, Çekirdek ($\\ker f$) ve İzomorfizma', ex: q5, rubric: '+6 Puan: Morfizma özelliğinin ($f(xy)=f(x)f(y)$) gösterimi, +8 Puan: $\\ker f$ ve $\\mathrm{Im}\\,f$ hesabı, +6 Puan: İzomorfizma sonucu.' }
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
                const exSteps = (qItem.ex.steps && qItem.ex.steps.length)
                    ? qItem.ex.steps.map((s, idx) => `
                        <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed var(--border-subtle);">
                            <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 4px;">Adım ${idx + 1} — ${s.title}</div>
                            <div>${s.content}</div>
                        </div>
                    `).join('')
                    : qItem.ex.solution;

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
                                    ${exSteps}
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
            const menuTab = document.getElementById('tab-menu');
            if (!aside) return;

            const isOpen = aside.classList.toggle('mobile-open');
            if (backdrop) {
                backdrop.classList.toggle('active', isOpen);
            }
            if (menuTab) {
                menuTab.classList.toggle('active', isOpen);
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
            const menuTab = document.getElementById('tab-menu');
            if (aside) aside.classList.remove('mobile-open');
            if (backdrop) backdrop.classList.remove('active');
            if (menuTab) menuTab.classList.remove('active');
            document.body.style.overflow = '';
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const aside = document.querySelector('aside');
                if (aside && aside.classList.contains('mobile-open')) {
                    closeMobileSidebar();
                }
            }
        });

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

        // ================= MOBILE BOTTOM NAVIGATION HANDLERS =================
        function handleMobileTab(tabKey) {
            closeMobileSidebar();
            if (tabKey === 'theory') {
                if (currentViewMode !== 'module') {
                    loadModule(currentModuleKey || 'modul1');
                }
                switchTrack('theory');
            } else if (tabKey === 'exercises') {
                if (currentViewMode !== 'module') {
                    loadModule(currentModuleKey || 'modul1');
                }
                switchTrack('exercises');
            } else if (tabKey === 'flashcards') {
                openFlashcardArena();
            } else if (tabKey === 'pitfalls') {
                loadPitfallsView();
            }
            syncMobileNavTabs(tabKey);
        }

        function syncMobileNavTabs(activeKey) {
            const tabs = {
                'theory': 'tab-theory',
                'exercises': 'tab-exercises',
                'flashcards': 'tab-flashcards',
                'pitfalls': 'tab-pitfalls'
            };
            document.querySelectorAll('.mobile-nav-tab').forEach(tab => {
                if (tab.id !== 'tab-menu') tab.classList.remove('active');
            });
            const tabId = tabs[activeKey];
            if (tabId) {
                const el = document.getElementById(tabId);
                if (el) el.classList.add('active');
            }
        }



        
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
            if (window.innerWidth <= 900) {
                closeMobileSidebar();
            }

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
                const shortLabel = mod.shortTitle || (mod.title.includes(':') ? mod.title.split(':').slice(1).join(':').trim() : mod.title);
                navModulesHTML += `
                    <div class="nav-item ${isActive}" id="nav-${modKey}" onclick="loadModule('${modKey}')">
                        <div class="nav-item-left">
                            <span>${idx + 1}</span>
                            <span>${shortLabel}</span>
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

                <div class="nav-item" id="nav-kaynaklar" onclick="loadSpecialView('kaynaklar')">
                    <div class="nav-item-left">
                        ${window.ICONS ? window.ICONS.fileText : ""}
                        <span>Ders Kaynakları (PDF &amp; LaTeX)</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(59, 130, 246, 0.18); color: var(--accent-blue);">Arşiv</span>
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

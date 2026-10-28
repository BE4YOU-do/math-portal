let activeCourseKey = localStorage.getItem('gs_active_course') || 'mat204_grup';
        let modulesDB = COURSES_DB[activeCourseKey].modules;;

                // ================= FLASHCARDS REPOSITORY =================

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
                    badge.textContent = `${modSolved}/${mod.exercises.length} ✓`;
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
            if (starBadge) starBadge.textContent = `${starList.length} ⭐`;

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

        // ================= STATE MANAGEMENT =================
        let currentModuleKey = 'modul1';
        let currentTrack = 'theory'; // 'theory' (Konu Anlatımı & Teori Kitabı) or 'exercises'
        let currentExerciseIdx = 0;
        let currentStepIdx = 1;
        let showAllStepsMode = false;
        let isHintVisible = false;
        let currentTheoryPageIdx = 0; // for paginated theory
        let showAllTheoryPages = false;
        let currentCardIdx = 0;

        function setActiveNav(navId) {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            if (navId) {
                const target = document.getElementById(navId);
                if (target) target.classList.add('active');
            }
        }

        function loadModule(modKey) {
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
        }

        function switchTrack(trackName) {
            currentTrack = trackName;
            currentStepIdx = 1;
            showAllStepsMode = false;
            isHintVisible = false;
            renderModuleView();
        }

        function switchExercise(exIdx) {
            currentExerciseIdx = exIdx;
            currentStepIdx = 1;
            showAllStepsMode = false;
            isHintVisible = false;
            renderModuleView();
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
        }

        function toggleAllTheoryPages() {
            showAllTheoryPages = !showAllTheoryPages;
            renderModuleView();
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
                        <span class="track-icon">📖</span>
                        <div class="track-text-group">
                            <span class="track-main-label">Konu Anlatımı &amp; Teori Kitabı</span>
                            <span class="track-sub-label">Sayfa sayfa anlatım + İçiçe çözümlü örnekler</span>
                        </div>
                    </button>
                    <button class="luxury-track-btn ${currentTrack === 'exercises' ? 'active' : ''}" onclick="switchTrack('exercises')">
                        <span class="track-icon">✍️</span>
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
                        pagesNavHTML += `<button class="theory-page-btn ${activeClass}" onclick="switchTheoryPage(${idx})">📄 Sayfa ${idx+1}: ${p.title.split(':')[0]}</button>`;
                    });
                    pagesNavHTML += `<button class="theory-page-btn ${showAllTheoryPages ? 'active' : ''}" onclick="toggleAllTheoryPages()">📚 Tüm Kitabı Tek Sayfada Gör</button>`;
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
                                        ⬅️ Önceki Sayfa (${pages[currentTheoryPageIdx - 1].title.split(':')[0]})
                                    </button>
                                ` : '<span></span>'}
                            </div>
                            <span style="font-size: 0.86rem; color: var(--text-muted); font-weight: 600;">
                                Sayfa ${currentTheoryPageIdx + 1} / ${pages.length}
                            </span>
                            <div>
                                ${currentTheoryPageIdx + 1 < pages.length ? `
                                    <button class="btn-stepper primary" onclick="switchTheoryPage(${currentTheoryPageIdx + 1})">
                                        Sonraki Sayfaya Geç (${pages[currentTheoryPageIdx + 1].title.split(':')[0]}) ➡️
                                    </button>
                                ` : `
                                    <button class="btn-stepper primary" onclick="switchTrack('exercises')">
                                        Bu Modülün TD Sorularını Çözmeye Başla (${mod.exercises.length} Soru) ➔
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
                                        ✓ Bu Modülün Konu Anlatımını Bitirdim (+Progress)
                                    </button>
                                ` : `
                                    <button class="btn-stepper completed-state">
                                        ✓ Konu Anlatımı Tamamlandı Olarak Kayıtlı
                                    </button>
                                    <button class="btn-stepper" onclick="setTheoryCompleted('${mod.id}', false)" style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">
                                        İşareti Kaldır
                                    </button>
                                `}
                            </div>
                            <button class="btn-stepper primary" onclick="switchTrack('exercises')">
                                Bu Modülün TD Sorularını Çözmeye Başla (${mod.exercises.length} Soru) ➔
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
                                👉 ${currentStepIdx}. Adımı Yazdım, Sıradaki Adıma Geç (${currentStepIdx + 1}/${steps.length}) ➔
                            </button>
                            <button class="btn-stepper" onclick="toggleAllSteps()" style="font-size: 0.85rem;">
                                👁️ Tüm Çözümü Tek Seferde Gör
                            </button>
                            <button class="btn-stepper hint-btn" onclick="toggleHint()">
                                💡 Sınav İpucunu Göster
                            </button>
                        </div>
                    `;
                } else {
                    stepperActionsHTML = `
                        <div class="step-complete-celebration">
                            <span class="celebrate-icon">🎉</span>
                            <div>
                                <strong>Tüm Adımlar Açıldı!</strong> Kağıdına resmi sınav formatında not aldıysan bu soruyu "Çözüldü" olarak işaretleyebilirsin.
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                            ${!isSolved ? `
                                <button class="btn-stepper success" onclick="setExerciseSolved('${ex.id}', true)">
                                    ✓ Bu Soruyu Çözdüm &amp; Anladım Olarak İşaretle (+Progress)
                                </button>
                            ` : `
                                <button class="btn-stepper completed-state">
                                    ✓ Bu Soru Çözüldü &amp; Kaydedildi
                                </button>
                                <button class="btn-stepper" onclick="setExerciseSolved('${ex.id}', false)" style="font-size: 0.8rem; color: var(--text-muted);">
                                    İşareti Kaldır
                                </button>
                            `}
                            ${currentExerciseIdx + 1 < mod.exercises.length ? `
                                <button class="btn-stepper primary" onclick="switchExercise(${currentExerciseIdx + 1})">
                                    Sıradaki Soruya Geç (${currentExerciseIdx + 2}/${mod.exercises.length}) ➔
                                </button>
                            ` : ''}
                            <button class="btn-stepper" onclick="resetSteps()" style="font-size: 0.82rem; color: var(--text-muted);">
                                🔄 Başa Dön (1. Adımdan Başla)
                            </button>
                            <button class="btn-stepper hint-btn" onclick="toggleHint()">
                                💡 Sınav İpucu
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
                                    ${getStarredExercises().includes(ex.id) ? '⭐ Yıldızlı' : '☆ Yıldıza Ekle'}
                                </button>
                            </div>
                            <span style="font-size: 0.82rem; font-weight: 600; color: ${isSolved ? 'var(--accent-emerald)' : 'var(--text-muted)'};">
                                ${isSolved ? '✓ Çözüldü Olarak İşaretlendi' : '○ Henüz Çözülmedi'}
                            </span>
                        </div>

                        <div class="question-statement" style="font-size: 1.18rem; margin-bottom: 18px; line-height: 1.7;">
                            ${ex.enonce}
                        </div>

                        <div id="question-hint-box" class="hint-callout-box" style="display: ${isHintVisible ? 'block' : 'none'};">
                            <strong>💡 Sınav Püf Noktası (Taktik):</strong> ${ex.hint}
                        </div>

                        <div class="exam-sheet">
                            <div class="exam-sheet-header">
                                <span class="exam-sheet-title">📄 Resmi Sınav Çözümü &amp; Adım Adım Rehber</span>
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
        function openUnresolvedPool() {
            setActiveNav('nav-unresolved');

            const main = document.getElementById('main-content');
            const solved = getSolvedExercises();
            let poolHTML = '';
            let unresolvedCount = 0;

            Object.keys(modulesDB).forEach(modKey => {
                const mod = modulesDB[modKey];
                mod.exercises.forEach((ex, idx) => {
                    if (!solved.includes(ex.id)) {
                        unresolvedCount++;
                        const cleanPreview = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '';
                        poolHTML += `
                            <div class="pool-item" onclick="jumpToExercise('${modKey}', ${idx})">
                                <div>
                                    <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase;">${mod.title.split(':')[0]}</span>
                                    <h4 style="color: var(--text-main); margin-top: 2px;">${ex.name}</h4>
                                    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 4px;">${cleanPreview}</p>
                                </div>
                                <button class="btn-stepper primary" style="padding: 6px 14px; font-size: 0.82rem; white-space: nowrap;">Şimdi Çöz ➔</button>
                            </div>
                        `;
                    }
                });
            });

            if (unresolvedCount === 0) {
                poolHTML = `
                    <div style="text-align: center; padding: 60px 20px;">
                        <span style="font-size: 3rem;">🎉</span>
                        <h2 style="color: var(--accent-emerald); margin-top: 10px;">Tebrikler Hamza!</h2>
                        <p style="color: var(--text-secondary); margin-top: 6px;">Tüm modüllerdeki TD sorularını başarıyla çözüp kaydettin! Vizeye %100 hazırsın!</p>
                    </div>
                `;
            }

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${COURSES_DB[activeCourseKey].code} > Sınav Araçları > Çözülmemiş Sorular</div>
                        <h1 class="content-title">⚡ ${COURSES_DB[activeCourseKey].code} Çözülmemiş Sorular Havuzu (${unresolvedCount} Soru Kaldı)</h1>
                    </div>
                </div>

                <div class="academic-card">
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
                        Burada henüz "Çözüldü" olarak işaretlemediğin tüm TD soruları listelenir. Herhangi birine tıklayarak doğrudan o soruya gidebilir ve resmi sınav çözümünü inceleyip işaretleyebilirsin.
                    </p>
                    ${poolHTML}
                </div>
            `;

            renderMath();
        }

        
        function switchCourseAndJump(cKey, modKey, exIdx) {
            if (activeCourseKey !== cKey) {
                switchActiveCourse(cKey);
            }
            jumpToExercise(modKey, exIdx);
        }

        function jumpToExercise(modKey, exIdx) {
            currentModuleKey = modKey;
            currentTrack = 'exercises';
            currentExerciseIdx = exIdx;
            currentStepIdx = 1;

            setActiveNav('nav-' + modKey);
            renderModuleView();
        }

        // ================= CONCEPT MODAL =================
        function openConceptModal(conceptKey) {
            const c = conceptsDB[conceptKey];
            if (!c) return;

            const modalTitleEl = document.getElementById('modal-concept-title');
            const modalBodyEl = document.getElementById('modal-concept-body');
            const modalEl = document.getElementById('concept-modal');

            modalTitleEl.innerHTML = `💡 ${c.title}`;
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

        // ================= FLASHCARDS ARENA =================
        function openFlashcardArena() {
            setActiveNav('nav-flashcards');

            currentCardIdx = 0;
            renderFlashcard();
        }

        function getActiveFlashcards() {
            return FLASHCARDS_BY_COURSE[activeCourseKey] || FLASHCARDS_BY_COURSE['mat204_grup'];
        }

        function renderFlashcard() {
            const cards = getActiveFlashcards();
            if (currentCardIdx >= cards.length) currentCardIdx = 0;
            const card = cards[currentCardIdx];
            const main = document.getElementById('main-content');
            const c = COURSES_DB[activeCourseKey];

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${c.code} > İnteraktif Sınav Araçları > Sınav Kartları</div>
                        <h1 class="content-title">🃏 ${c.code} Sınav Kartı Çekmece & Antrenman</h1>
                    </div>
                </div>

                <div class="flashcard-arena">
                    <div class="flashcard-inner">
                        <div class="card-top">
                            <span class="card-category">🏷️ ${card.category}</span>
                            <span class="card-counter">${currentCardIdx + 1} / ${cards.length}</span>
                        </div>

                        <div class="card-prompt">
                            ${card.prompt}
                        </div>

                        <div class="card-answer-box" id="flashcard-answer">
                            ${card.answer}
                        </div>

                        <div class="card-bottom-actions">
                            <button class="btn-stepper primary" id="btn-flip" onclick="flipCard()">Cevabı Çevir / Formülü Gör</button>
                            <button class="btn-stepper" onclick="nextCard()">Rastgele Sıradaki Kartı Çek ➔</button>
                        </div>
                    </div>
                </div>

                <div class="intuition-callout" style="text-align: center;">
                    Soru ekrana geldiğinde önce kendi zihninde formülü hatırla, sonra <strong>"Cevabı Çevir"</strong> butonuna basarak kendini test et!
                </div>
            `;

            renderMath();
        }

        function flipCard() {
            const ans = document.getElementById('flashcard-answer');
            const btn = document.getElementById('btn-flip');
            if (ans.style.display === 'block') {
                ans.style.display = 'none';
                btn.textContent = 'Cevabı Çevir / Formülü Gör';
            } else {
                ans.style.display = 'block';
                btn.textContent = 'Cevabı Gizle';
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
            currentCardIdx = (currentCardIdx + 1) % getActiveFlashcards().length;
            renderFlashcard();
        }

        // ================= SPECIAL VIEWS =================
        function loadSpecialView(viewKey) {
            setActiveNav('nav-' + viewKey);

            const main = document.getElementById('main-content');

            if (viewKey === 'ispatlar') {
                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">MAT204 > Sınav Araçları > Banko İspatlar</div>
                            <h1 class="content-title">📜 Vizenin 2 Büyük Teoremi</h1>
                        </div>
                    </div>

                    <div class="academic-card">
                        <div class="question-statement">Théorème 1 : $g^n = e \\iff m \\mid n$ (où $m = o(g)$)</div>
                        <div class="exam-sheet">
                            <div class="exam-sheet-header"><span class="exam-sheet-title">📄 Resmi İspat</span></div>
                            <div class="exam-sheet-body">
                                <strong>(⇐)</strong> Si $m \\mid n$, alors $n = m \\cdot k$. D'où $g^n = (g^m)^k = e^k = e$.<br><br>
                                <strong>(⇒)</strong> Supposons $g^n = e$. Effectuons la division euclidienne de $n$ par $m$ :
                                <div class="math-callout">$$n = m \\cdot q + r \\quad \\text{avec} \\quad 0 \\leq r < m$$</div>
                                Alors $e = g^n = g^{mq+r} = (g^m)^q g^r = e^q g^r = g^r$.<br>
                                Si $r > 0$, cela contredit la minimalité de $m = o(g)$. Donc $\\mathbf{r = 0} \\implies \\mathbf{m \\mid n}$. $\\blacksquare$
                            </div>
                        </div>
                    </div>

                    <div class="academic-card">
                        <div class="question-statement">Théorème 2 : Tout sous-groupe d'un groupe cyclique est cyclique</div>
                        <div class="exam-sheet">
                            <div class="exam-sheet-header"><span class="exam-sheet-title">📄 Resmi İspat</span></div>
                            <div class="exam-sheet-body">
                                Soit $G = \\langle a \\rangle$ et $H \\leq G$. Si $H = \\{e\\}$, trivial.<br>
                                Sinon, soit $S = \\{ k \\in \\mathbb{N}^* \\mid a^k \\in H \\} \\neq \\emptyset$. Posons $\\mathbf{m = \\min(S)}$.<br>
                                Soit $h = a^k \\in H$. Division euclidienne : $k = mq + r$ avec $0 \\leq r < m$.<br>
                                $a^r = a^{k-mq} = h \\cdot (a^m)^{-q} \\in H$. Par minimalité de $m$, $\\mathbf{r = 0} \\implies h = (a^m)^q \\in \\langle a^m \\rangle$.<br>
                                <div class="exam-conclusion"><strong>Conclusion :</strong> $H = \\langle a^m \\rangle$ est cyclique. $\\blacksquare$</div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (viewKey === 'fransizca') {
                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">MAT204 > Sınav Araçları > Fransızca</div>
                            <h1 class="content-title">🇫🇷 Sınav Fransızcası Kalıpları</h1>
                        </div>
                    </div>
                    <div class="academic-card">
                        <div style="display: grid; gap: 14px;">
                            <div class="math-callout">• <strong>"Soient $a, b \\in G$ deux éléments arbitraires..."</strong> (İspata başlarken: G'den rastgele alınan iki eleman olsun)</div>
                            <div class="math-callout">• <strong>"Procédons par double implication ($\\implies$ et $\\impliedby$)..."</strong> (Çift yönlü gerektirmeyle ilerleyelim)</div>
                            <div class="math-callout">• <strong>"Effectuons la division euclidienne de $n$ par $m$..."</strong> (n'in m'ye kalanlı bölmesini yapalım)</div>
                            <div class="math-callout">• <strong>"Puisque les supports sont disjoints, ces cycles commutent."</strong> (Destekleri ayrık olduğundan bu döngüler değişmelidir)</div>
                            <div class="math-callout">• <strong>"Ce qui contredit la minimalité de $m$. Absurde."</strong> (m'in en küçük olmasıyla çelişir. Çelişki!)</div>
                            <div class="math-callout">• <strong>"Par conséquent / On en conclut que..."</strong> (Dolayısıyla / Sonuç olarak...)</div>
                        </div>
                    </div>
                `;
            } else if (viewKey === 'hesaplayici') {
                main.innerHTML = `
                    <div class="content-header">
                        <div>
                            <div class="breadcrumbs">MAT204 > Sınav Araçları > Hesaplayıcı</div>
                            <h1 class="content-title">🧮 Canlı Bézout / Ters Motoru</h1>
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
                            <button class="btn-stepper primary" style="margin-top: 18px;" onclick="runCalculator()">Resmi Çözümü Üret</button>
                        </div>
                        <div id="calc-result-area" class="exam-sheet" style="padding: 20px; display: none;"></div>
                    </div>
                `;
                setTimeout(runCalculator, 100);
            }

            renderMath();
        }

        function runCalculator() {
            const a = parseInt(document.getElementById('calc-a').value);
            const n = parseInt(document.getElementById('calc-n').value);
            const out = document.getElementById('calc-result-area');
            if (!out) return;
            out.style.display = 'block';

            if (isNaN(a) || isNaN(n) || a <= 0 || n <= 0) {
                out.innerHTML = '<span style="color: var(--accent-amber);">Lütfen geçerli pozitif sayılar giriniz.</span>';
                return;
            }

            let r0 = n, r1 = a;
            let s0 = 1, s1 = 0;
            let t0 = 0, t1 = 1;

            let html = '<span class="step-heading">Divisions Euclidiennes successives :</span><div class="math-callout">$$\\begin{aligned}';
            while (r1 !== 0) {
                let q = Math.floor(r0 / r1);
                let r2 = r0 % r1;
                html += `${r0} &= ${r1} \\times ${q} + ${r2} \\\\ `;
                r0 = r1; r1 = r2;
                let s2 = s0 - q * s1;
                let t2 = t0 - q * t1;
                s0 = s1; s1 = s2;
                t0 = t1; t1 = t2;
            }
            html += '\\end{aligned}$$</div>';

            if (r0 !== 1) {
                html += `<p style="color: var(--accent-amber);"><strong>Conclusion :</strong> $\\operatorname{pgcd}(${n}, ${a}) = ${r0} \\neq 1$. L'élément $\\bar{${a}}$ n'est <strong>pas inversible</strong> dans $\\mathbb{Z}_{${n}}$.</p>`;
            } else {
                let inv = (t0 % n + n) % n;
                html += `
                    Puisque $\\operatorname{pgcd}(${n}, ${a}) = 1$, $\\bar{${a}}$ est inversible.<br>
                    <span class="step-heading">Identité de Bézout :</span>
                    <div class="math-callout">$$${n} \\times (${s0}) + ${a} \\times (${t0}) = 1$$</div>
                    Modulo ${n} indirgendiğinde:
                    <div class="math-callout">$$${a} \\times (${t0}) \\equiv 1 \\pmod{${n}}$$</div>
                    <div class="exam-conclusion">
                        <strong>Conclusion :</strong> L'inverse de $\\bar{${a}}$ dans $\\mathbb{Z}_{${n}}^*$ est $\\mathbf{\\bar{${a}}^{-1} = \\bar{${inv}}}$.
                    </div>
                `;
            }

            out.innerHTML = html;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(out, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError: false
                });
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
                    icon.textContent = '☀️';
                    text.textContent = 'Aydınlık Mod';
                } else {
                    icon.textContent = '🌙';
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
            if (list.includes(exId)) {
                list = list.filter(id => id !== exId);
            } else {
                list.push(exId);
            }
            try {
                localStorage.setItem(activeCourseKey + '_starred_ex', JSON.stringify(list));
            } catch(e) {}
            updateProgressUI();
            renderModuleView();
        }

        function openStarredPool() {
            setActiveNav('nav-starred');
            const main = document.getElementById('main-content');
            const starred = getStarredExercises();
            let poolHTML = '';
            let count = 0;

            Object.keys(modulesDB).forEach(modKey => {
                const mod = modulesDB[modKey];
                mod.exercises.forEach((ex, idx) => {
                    if (starred.includes(ex.id)) {
                        count++;
                        const cleanPreview = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 140) + '...' : '';
                        poolHTML += `
                            <div class="pool-item" onclick="jumpToExercise('${modKey}', ${idx})">
                                <div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 0.76rem; font-weight: 700; color: var(--accent-amber); text-transform: uppercase;">⭐ ${mod.title.split(':')[0]}</span>
                                        <span style="font-size: 0.75rem; color: var(--text-muted);">${ex.tag || ''}</span>
                                    </div>
                                    <h4 style="color: var(--text-main); margin-top: 4px;">${ex.name}</h4>
                                    <p style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 4px;">${cleanPreview}</p>
                                </div>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <button class="btn-stepper primary" style="padding: 6px 14px; font-size: 0.82rem; white-space: nowrap;">Çöz &amp; İncele ➔</button>
                                </div>
                            </div>
                        `;
                    }
                });
            });

            if (count === 0) {
                poolHTML = `
                    <div style="text-align: center; padding: 60px 20px;">
                        <span style="font-size: 3rem;">⭐</span>
                        <h2 style="color: var(--accent-amber); margin-top: 10px;">Henüz Yıldızlı Sorun Yok</h2>
                        <p style="color: var(--text-secondary); margin-top: 6px; max-width: 500px; margin-left: auto; margin-right: auto;">
                            TD sorularını çözerken zorlandığın veya vizeden önceki Pazar gecesi tekrar bakmak istediğin soruların üzerindeki <strong>"☆ Yıldıza Ekle"</strong> butonuna basarak buraya kaydedebilirsin!
                        </p>
                    </div>
                `;
            }

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">MAT204 > Sınav Araçları > Yıldızlı Sorular</div>
                        <h1 class="content-title">⭐ Yıldızlı &amp; Zorlandığım Sorular (${count} Soru)</h1>
                    </div>
                </div>

                <div class="academic-card">
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
                        Burada senin özel olarak işaretlediğin zor sorular yer alır. Sınava girmeden önce sadece bu listeyi baştan sona çözerek en kritik açıklarını kapatabilirsin.
                    </p>
                    ${poolHTML}
                </div>
            `;

            renderMath();
        }

        // ================= SPOTLIGHT / SEARCH =================
        function openSearchModal() {
            const modal = document.getElementById('spotlight-modal');
            const input = document.getElementById('spotlight-input');
            if (modal) {
                modal.style.display = 'flex';
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
            if (!resultsBox) return;
            const q = query.trim().toLowerCase();

            let conceptsHTML = '';
            let exercisesHTML = '';

            // Search concepts
            Object.keys(conceptsDB).forEach(key => {
                const c = conceptsDB[key];
                if (!q || c.title.toLowerCase().includes(q) || c.definition.toLowerCase().includes(q) || c.intuition.toLowerCase().includes(q)) {
                    conceptsHTML += `
                        <div class="spotlight-item" onclick="closeSearchModal(); openConceptModal('${key}')">
                            <div>
                                <div class="spotlight-item-title">💡 ${c.title}</div>
                                <div class="spotlight-item-sub">${c.intuition.slice(0, 100)}...</div>
                            </div>
                            <span style="font-size: 0.72rem; color: var(--accent-indigo); font-weight: 700; text-transform: uppercase;">Teorem / Tanım</span>
                        </div>
                    `;
                }
            });

            // Search exercises across ALL courses in the platform
            let exCount = 0;
            Object.keys(COURSES_DB).forEach(cKey => {
                const c = COURSES_DB[cKey];
                Object.keys(c.modules).forEach(modKey => {
                    const mod = c.modules[modKey];
                    mod.exercises.forEach((ex, idx) => {
                        if (exCount < 25 && (!q || ex.name.toLowerCase().includes(q) || ex.enonce.toLowerCase().includes(q) || (ex.tag && ex.tag.toLowerCase().includes(q)))) {
                            exCount++;
                            const cleanSnippet = ex.enonce ? ex.enonce.replace(/<[^>]+>/g, '').slice(0, 95) : '';
                            exercisesHTML += `
                                <div class="spotlight-item" onclick="closeSearchModal(); switchCourseAndJump('${cKey}', '${modKey}', ${idx})">
                                    <div>
                                        <div class="spotlight-item-title">${c.icon} ${c.code} • ${mod.title.split(':')[0]} • ${ex.name}</div>
                                        <div class="spotlight-item-sub">${cleanSnippet}...</div>
                                    </div>
                                    <span style="font-size: 0.72rem; color: ${c.color}; font-weight: 700; text-transform: uppercase; border: 1px solid ${c.color}; padding: 2px 6px; border-radius: 4px;">${c.code}</span>
                                </div>
                            `;
                        }
                    });
                });
            });

            let fullHTML = '';
            if (conceptsHTML) {
                fullHTML += '<div class="spotlight-group-title">Teoremler ve Temel Tanımlar</div>' + conceptsHTML;
            }
            if (exercisesHTML) {
                fullHTML += '<div class="spotlight-group-title">TD Soruları ve İspatlar</div>' + exercisesHTML;
            }
            if (!fullHTML) {
                fullHTML = '<div style="text-align: center; padding: 30px; color: var(--text-muted);">Eşleşen sonuç bulunamadı.</div>';
            }

            resultsBox.innerHTML = fullHTML;
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(resultsBox, {
                    delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}],
                    throwOnError: false
                });
            }
        }

        // Global shortcut for Cmd+K or Ctrl+K or /
        document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openSearchModal();
            } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                openSearchModal();
            } else if (e.key === 'Escape') {
                closeSearchModal();
            }
        });

        // ================= COMMON PITFALLS (HOCA NEREDEN PUAN KIRAR?) =================
        function loadPitfallsView() {
            setActiveNav('nav-pitfalls');
            const main = document.getElementById('main-content');
            const c = COURSES_DB[activeCourseKey];

            let traps = [];

            if (activeCourseKey === 'mat201_seriler') {
                traps = [
                    {
                        title: "1. Alterne Serilerde Eşdeğerlik ($u_n \sim v_n$) Tuzağı",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "İşareti değişen veya alterne serilerde $\\frac{(-1)^n}{\\sqrt{n} + (-1)^n} \\sim \\frac{(-1)^n}{\\sqrt{n}}$ yazıp 'Leibniz ile yakınsar' demek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Asimptotik eşdeğerlik ($u_n \\sim v_n$) kuralı **YALNIZCA sabit işaretli (pozitif)** serilerde geçerlidir! Alterne serilerde Taylor açılımı yaparak $u_n = \\frac{(-1)^n}{\\sqrt{n}} - \\frac{1}{n} + o(1/n)$ şeklinde iki serinin toplamı olarak incelemek zorundasın."
                    },
                    {
                        title: "2. Genel Terim Sıfıra Gidince 'Seri Yakınsaktır' Demek",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "$\\lim_{n \\to \\infty} u_n = 0$ bulunca 'O halde seri yakınsaktır' yazıp soruyu bitirmek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "$\\lim u_n = 0$ yakınsaklık için yalnızca bir **GEREK ŞARTTIR**, yeter şart değildir! Karşıt örnek: $\\sum \\frac{1}{n}$ serisinde $1/n \\to 0$ fakat seri sonsuza ıraksar."
                    },
                    {
                        title: "3. D'Alembert Oranında $L = 1$ Çıkınca Karar Vermek",
                        wrongText: "❌ Hatalı Yaklaşım (-5 Puan):",
                        wrongDesc: "$\\lim \\frac{u_{n+1}}{u_n} = 1$ çıkınca seriye yakınsak ya da ıraksak demek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "$L = 1$ durumunda D'Alembert testi **tamamen kararsızdır**. Bu durumda Riemann serisiyle karşılaştırma veya Raabe-Duhamel testine geçilmelidir."
                    },
                    {
                        title: "4. Düzgün Yakınsaklık Olmadan İntegral ve Türev Kaydırmak",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "Sadece noktasal yakınsaklık varken $\\lim \\int_0^1 f_n(x)dx = \\int_0^1 \\lim f_n(x)dx$ eşitliğini doğrudan uygulamak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "İntegral veya türevin limit ile yer değiştirebilmesi için $(f_n)$ dizisinin ya da $\\sum u_n$ serisinin o aralıkta **DÜZGÜN YAKINSAK (Convergence Uniforme)** olduğunu ispatlamak şarttır."
                    },
                    {
                        title: "5. Fonksiyon Dizilerinde Supremum Normunu Yanlış Hesaplamak",
                        wrongText: "❌ Hatalı Yaklaşım (-8 Puan):",
                        wrongDesc: "$\\|f_n - f\\|_\\infty$ yerine $x$'e sabit bir sayı (örneğin $x=1/2$) koyup limitin sıfıra gittiğini göstererek 'düzgün yakınsaktır' demek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Düzgün yakınsaklık tüm tanım kümesindeki **en kötü noktaya (supremum)** bakar. Türev alarak $f_n'(x) = 0$ tepe noktasını ($x_n$) bulmalı ve $|f_n(x_n) - f(x_n)|$ değerinin sıfıra gidip gitmediği incelenmelidir."
                    },
                    {
                        title: "6. Riemann Serisinde $\\alpha = 1$ Durumu",
                        wrongText: "❌ Hatalı Yaklaşım (-5 Puan):",
                        wrongDesc: "$\\sum \\frac{1}{n^\\alpha}$ serisinin $\\alpha \\ge 1$ için yakınsadığını yazmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Riemann serisi sadece ve sadece **$\\alpha > 1$** için yakınsar! $\\alpha = 1$ harmonik seridir ve ıraksar."
                    }
                ];
            } else if (activeCourseKey === 'fiz101_fizik') {
                traps = [
                    {
                        title: "1. Frenet Tabanında Normal (Merkezcil) İvmeyi Atlamak",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "İvmeyi sadece hız büyüklüğünün türevi sanıp $\\vec{a} = \\frac{dv}{dt} \\vec{T}$ yazmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Eğri bir yörüngede hızın büyüklüğü sabit olsa bile doğrultusu değişir! İvmenin normal bileşeni mutlaka eklenmelidir: $\\vec{a} = \\frac{dv}{dt} \\vec{T} + \\frac{v^2}{\\rho} \\vec{N}$."
                    },
                    {
                        title: "2. Kutupsal Taban Vektörlerinin Türevini Sıfır Almak",
                        wrongText: "❌ Hatalı Yaklaşım (-8 Puan):",
                        wrongDesc: "$\\vec{r} = r \\vec{u}_r$ türevini alırken $\\vec{v} = \\dot{r} \\vec{u}_r$ yazmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Kutupsal taban vektörleri dönen vektörlerdir! $\\frac{d\\vec{u}_r}{dt} = \\dot{\\theta}\\vec{u}_\\theta$ olduğundan hız $\\vec{v} = \\dot{r}\\vec{u}_r + r\\dot{\\theta}\\vec{u}_\\theta$ şeklindedir."
                    },
                    {
                        title: "3. Dönen Referans Sisteminde Poisson Bağıntısını Unutmak",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "Sabit repere göre türevi hareketli repere göre türeve doğrudan eşitlemek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Poisson formülü uygulanmalıdır: $\\left(\\frac{d\\vec{A}}{dt}\\right)_{R_0} = \\left(\\frac{d\\vec{A}}{dt}\\right)_{R'} + \\vec{\\Omega} \\times \\vec{A}$."
                    },
                    {
                        title: "4. Sürtünme Kuvvetini Daima $f = \\mu N$ Almak",
                        wrongText: "❌ Hatalı Yaklaşım (-6 Puan):",
                        wrongDesc: "Cisim henüz kaymazken (statik dengedeyken) sürtünmeyi doğrudan $\\mu_s N$ olarak hesaplamak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Statik sürtünme bir eşitsizliktir: $f_s \\le \\mu_s N$. Değeri uygulanan net kuvvete göre denge denkleminden bulunur; sadece kayma anında maksimuma ($f_{s,\\max} = \\mu_s N$) ulaşır."
                    }
                ];
            } else if (activeCourseKey === 'mat206_olasilik') {
                traps = [
                    {
                        title: "1. Bağımsızlık ile Ayrıklığı Karıştırmak",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "İki olay bağımsız olduğunda $A \\cap B = \\emptyset$ sanmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Ayrıklık (disjoints) kesişimin boş olması demektir ($P(A \\cap B) = 0$). Bağımsızlık ise $P(A \\cap B) = P(A)P(B)$ demektir. Pozitif olasılıklı iki olay hem ayrık hem bağımsız OLAMAZ!"
                    },
                    {
                        title: "2. Bayes Formülünün Paydasını Eksik Açmak",
                        wrongText: "❌ Hatalı Yaklaşım (-8 Puan):",
                        wrongDesc: "Bayes formülünde paydadaki $P(B)$'yi açarken tümleyen durumu ($P(\\bar{A})P(B \\mid \\bar{A})$) unutmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Payda toplam olasılık formülüdür: $P(B) = P(A)P(B \\mid A) + P(\\bar{A})P(B \\mid \\bar{A})$. Özellikle tıbbi test sorularında sağlam popülasyon terimi sonucu belirler."
                    },
                    {
                        title: "3. İadesiz Çekilişte Olasılıkları Sabit Tutmak",
                        wrongText: "❌ Hatalı Yaklaşım (-5 Puan):",
                        wrongDesc: "Tirage sans remise (iadesiz çekiliş) yaparken ikinci çekiliş için paydayı $n$ olarak bırakmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Her çekilişte torbadaki bilye sayısı 1 azalır (payda $n-1$). İadeli ise bağımsızdır ve payda sabit kalır."
                    }
                ];
            } else {
                // Default: mat204_grup
                traps = [
                    {
                        title: "1. Permütasyon Bileşke Sırası (Convention Française)",
                        wrongText: "❌ Hatalı Yaklaşım (-5 Puan):",
                        wrongDesc: "$(\\sigma \\circ \\tau)(x)$ işleminde soldan sağa doğru giderek elemanın görüntüsünü bulmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Bileşke fonksiyon gibi değerlendirilir: **Sağdaki $\\tau$'dan başlanıp sola $\\sigma$'ya gidilir**: $(\\sigma \\circ \\tau)(x) = \\sigma(\\tau(x))$."
                    },
                    {
                        title: "2. Alt Grup İspatında Birim Elemanı ($e \\in H$) Unutmak",
                        wrongText: "❌ Hatalı Yaklaşım (-6 Puan):",
                        wrongDesc: "Doğrudan $\\forall x, y \\in H, xy^{-1} \\in H$ yazmak ama kümenin boş küme olmadığını ($H \\neq \\emptyset$) göstermemek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "İspata daima 'Puisque $e \\in H$, $H \\neq \\emptyset$' cümlesiyle başla. Hoca $H \\neq \\emptyset$ kontrolünü görmezse alt grup kriteri puanının yarısını kırar!"
                    },
                    {
                        title: "3. Lagrange Teoreminin Tersinin Her Zaman Doğru Olduğunu Sanmak",
                        wrongText: "❌ Hatalı Yaklaşım (-10 Puan):",
                        wrongDesc: "'$d$ böler $|G|$ ise $G$'nin mertebesi $d$ olan kesin bir alt grubu vardır' demek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Lagrange teoreminin tersi genel gruplarda **DOĞRU DEĞİLDİR**! Klasik karşıt örnek: $|\\mathcal{A}_4| = 12$ olup $6 \\mid 12$ olmasına rağmen $\\mathcal{A}_4$'ün mertebesi 6 olan hiçbir alt grubu yoktur!"
                    },
                    {
                        title: "4. Bézout Katsayılarında Eksi İşaretini Unutmak",
                        wrongText: "❌ Hatalı Yaklaşım (-4 Puan):",
                        wrongDesc: "Geriye doğru sararken $r = A - qB$ yerine $A + qB$ yazıp katsayı işaretlerini karıştırmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Her satırda parantezleri titizlikle koru: $au + bv = 1$ eşitliğinde katsayıların negatif olabileceğini unutma."
                    },
                    {
                        title: "5. Devirli Gruplarda Mertebe ile Bölünebilme Yönü",
                        wrongText: "❌ Hatalı Yaklaşım (-5 Puan):",
                        wrongDesc: "$g^n = e$ olduğunda hemen $o(g) = n$ demek.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "$g^n = e \\iff o(g) \\mid n$. Yani $n$, mertebenin bir katıdır; en küçük pozitif kat mertebedir."
                    },
                    {
                        title: "6. Diedral Grupta Yansıma ve Dönme Çarpımı ($D_n$)",
                        wrongText: "❌ Hatalı Yaklaşım (-5 Puan):",
                        wrongDesc: "$s \\cdot r^2 = r^2 \\cdot s$ sanmak.",
                        rightText: "✅ Resmi Fransız Kuralı (Tam Puan):",
                        rightDesc: "Yansıma $s$, saat yönündeki dönmeyi tersine çevirir: **$s \\cdot r^k = r^{-k} \\cdot s = r^{n-k} \\cdot s$**. $s$'yi sağa kaydırırken $r$'nin üssünün işaretini değiştirmeyi asla unutma!"
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
                        <div class="breadcrumbs">${c.code} > Sınav Taktikleri > Puan Kırma Noktaları</div>
                        <h1 class="content-title">⚠️ Hoca Nereden Puan Kırar? (${c.code} Vize Tuzakları)</h1>
                    </div>
                </div>

                <div class="academic-card">
                    <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.7;">
                        Fransızca matematik sınavlarında öğrenciler genelde sorunun mantığını bilse bile <strong>Fransız matematik notasyon kurallarından (rédaction)</strong> ve klasik tuzaklardan puan kaybeder. İşte <strong>${c.code} (${c.title})</strong> sınav kağıdında 20-30 puan kurtaracak kritik altın kurallar:
                    </p>

                    ${trapsHTML}
                </div>
            `;

            renderMath();
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
            const q1 = mods['modul1'].exercises[0];
            const q2 = mods['modul2'].exercises[0];
            const q3 = mods['modul3'].exercises[1];
            const q4 = mods['modul4'].exercises[1];
            const q5 = mods['modul5'].exercises[4] || mods['modul6'].exercises[0];

            return [
                { num: 1, points: 20, topic: 'Aritmetik ve Doğrusal Kombinasyon', ex: q1, rubric: '+5 Puan: Hipotez tanımı, +10 Puan: Doğrusal kombinasyon hesabı, +5 Puan: Sonuç ve d=±1.' },
                { num: 2, points: 20, topic: 'Denklik Bağıntısı ve Sınıflar', ex: q2, rubric: '+5 Puan: Yansıma, +5 Puan: Simetri, +5 Puan: Geçişme, +5 Puan: Denklik sınıfı.' },
                { num: 3, points: 20, topic: 'Diedral Simetriler ve $D_n$', ex: q3, rubric: '+6 Puan: Temel bağıntı s r = r^-1 s, +8 Puan: Alt grup elemanları, +6 Puan: Mertebe kontrolü.' },
                { num: 4, points: 20, topic: 'Eleman Mertebesi ve Devirli Grup', ex: q4, rubric: '+10 Puan: (<=) Tek yönlü gerektirme, +10 Puan: (=>) Kalanlı bölme ve minimalite çelişkisi.' },
                { num: 5, points: 20, topic: 'Permütasyonlar / $\mathcal{S}_4$ Yapısı', ex: q5, rubric: '+6 Puan: Ayrık döngü ayrışımı, +8 Puan: Mertebe (EKOK) hesabı, +6 Puan: İmza kuralı.' }
            ];
        }

        function loadMockExamView() {
            setActiveNav('nav-mock-exam');
            const main = document.getElementById('main-content');
            if (!currentMockExam) {
                currentMockExam = generateMockExam();
            }

            renderMockExamUI();
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

                        <details style="margin-top: 14px; cursor: pointer;">
                            <summary style="font-weight: 600; color: var(--accent-indigo); outline: none;">
                                📄 Resmi Sınav Kağıdı Çözümünü ve Not Baremini Aç ▾
                            </summary>
                            <div style="margin-top: 14px; padding: 18px 22px; background: var(--bg-paper); border: 1px solid var(--border-subtle); border-radius: 10px;">
                                <div style="font-family: 'Newsreader', serif; font-size: 1.14rem; line-height: 1.8;">
                                    ${qItem.ex.solution}
                                </div>
                                <div class="mock-rubric-box">
                                    <strong style="color: var(--accent-emerald);">🎯 Hoca Not Baremi (Barème):</strong> ${qItem.rubric}
                                </div>
                            </div>
                        </details>
                    </div>
                `;
            });

            main.innerHTML = `
                <div class="content-header">
                    <div>
                        <div class="breadcrumbs">${COURSES_DB[activeCourseKey].code} > Sınav Simülatörü > 1. Blok Vize</div>
                        <h1 class="content-title">🎯 ${COURSES_DB[activeCourseKey].code} Gerçek Vize Deneme Simülatörü (100 Puan)</h1>
                    </div>
                </div>

                <div class="exam-timer-bar">
                    <div>
                        <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Kalan Sınav Süresi</div>
                        <div class="timer-display" id="mock-timer-display">${timeFormatted}</div>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <button class="btn-stepper ${isMockTimerRunning ? '' : 'primary'}" onclick="toggleMockTimer()">
                            ${isMockTimerRunning ? '⏸️ Sayacı Duraklat' : '▶️ 90 Dk Sayacı Başlat'}
                        </button>
                        <button class="btn-stepper" onclick="resetMockTimer()">
                            🔄 Sayacı Sıfırla
                        </button>
                        <button class="btn-stepper secondary" onclick="newMockExam()">
                            🎲 Yeni Deneme Sınavı Üret
                        </button>
                    </div>
                </div>

                <div style="background: rgba(37, 99, 235, 0.05); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; font-size: 0.95rem; color: var(--text-main);">
                    <strong>💡 Sınav Talimatı:</strong> Masanın üzerine boş bir A4 kağıdı ve kalem al. Sayacı başlatıp 5 soruyu da Fransızca resmi sınav formatında (<em>Soit... Par conséquent...</em>) kendi elinle çöz. Süre bittiğinde "Resmi Çözümü ve Not Baremini Aç" diyerek kendi kağıdını 100 üzerinden puanla!
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
                        alert('⏰ 90 Dakikalık Sınav Süresi Doldu! Şimdi kağıdını not baremine göre değerlendirebilirsin.');
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

        function switchActiveCourse(courseKey) {
            if (!COURSES_DB[courseKey]) return;
            activeCourseKey = courseKey;
            try {
                localStorage.setItem('gs_active_course', courseKey);
            } catch(e) {}
            modulesDB = COURSES_DB[activeCourseKey].modules;

            // Close dropdown
            const menu = document.getElementById('course-dropdown-menu');
            if (menu) menu.classList.remove('open');

            // Reset current module to first module of new course
            const firstModKey = Object.keys(modulesDB)[0];
            currentModuleKey = firstModKey;
            currentTrack = 'theory';
            currentExerciseIdx = 0;
            currentStepIdx = 1;
            showAllStepsMode = false;
            currentTheoryPageIdx = 0;
            currentMockExam = null;
            currentCardIdx = 0;

            updateCourseHeaderUI();
            renderSidebarNav();
            updateProgressUI();
            renderModuleView();
        }

        function updateCourseHeaderUI() {
            const c = COURSES_DB[activeCourseKey];
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
                Object.keys(COURSES_DB).forEach(key => {
                    const item = COURSES_DB[key];
                    const isActive = key === activeCourseKey;
                    optsHTML += `
                        <div class="course-option ${isActive ? 'active' : ''}" onclick="switchActiveCourse('${key}')">
                            <span style="font-size: 1.2rem;">${item.icon}</span>
                            <div>
                                <div class="course-opt-name">${item.code} — ${item.title}</div>
                                <div class="course-opt-sub">${Object.keys(item.modules).length} Modül • ${item.faculty.split('•')[1] || ''}</div>
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
                <div class="nav-section-title" style="margin-top: 14px;">İnteraktif Sınav Araçları</div>

                <div class="nav-item" id="nav-starred" onclick="openStarredPool()">
                    <div class="nav-item-left">
                        <span>⭐</span>
                        <span>Yıldızlı / Zorlandığım Sorular</span>
                    </div>
                    <span class="nav-count-badge" id="badge-starred-count" style="background: rgba(245, 158, 11, 0.2); color: var(--accent-amber);">0 ⭐</span>
                </div>

                <div class="nav-item" id="nav-mock-exam" onclick="loadMockExamView()">
                    <div class="nav-item-left">
                        <span>🎯</span>
                        <span>${c.code} Gerçek Vize Simülatörü</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(37, 99, 235, 0.2); color: var(--accent-blue);">90 Dk</span>
                </div>

                <div class="nav-item" id="nav-pitfalls" onclick="loadPitfallsView()">
                    <div class="nav-item-left">
                        <span>⚠️</span>
                        <span>Hoca Nereden Puan Kırar? (Tuzaklar)</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">Kritik</span>
                </div>

                <div class="nav-item" id="nav-unresolved" onclick="openUnresolvedPool()">
                    <div class="nav-item-left">
                        <span>⚡</span>
                        <span>Çözülmemiş Sorular Havuzu</span>
                    </div>
                    <span class="nav-count-badge" id="badge-unresolved-count" style="background: rgba(251, 191, 36, 0.2); color: var(--accent-amber);">Pratik</span>
                </div>
                
                <div class="nav-item" id="nav-flashcards" onclick="openFlashcardArena()">
                    <div class="nav-item-left">
                        <span>🃏</span>
                        <span>Kart Çekmece Sınav Oyunu</span>
                    </div>
                    <span class="nav-count-badge" style="background: rgba(244, 63, 94, 0.2); color: var(--accent-rose);">Oyun</span>
                </div>

                <div class="nav-item" id="nav-ispatlar" onclick="loadSpecialView('ispatlar')">
                    <div class="nav-item-left">
                        <span>📜</span>
                        <span>Banko Teorem İspatları</span>
                    </div>
                </div>

                <div class="nav-item" id="nav-fransizca" onclick="loadSpecialView('fransizca')">
                    <div class="nav-item-left">
                        <span>🇫🇷</span>
                        <span>Sınav Fransızcası Kalıpları</span>
                    </div>
                </div>

                <div class="nav-item" id="nav-hesaplayici" onclick="loadSpecialView('hesaplayici')">
                    <div class="nav-item-left">
                        <span>🧮</span>
                        <span>Canlı Bézout / Ters Motoru</span>
                    </div>
                </div>
            `;

            topicNav.innerHTML = navModulesHTML + toolsSection;
        }


        window.onload = function() {
            initTheme();
            updateCourseHeaderUI();
            renderSidebarNav();
            updateProgressUI();
            renderModuleView();
        }

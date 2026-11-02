/**
 * Spanish Interactive Gamified Learning Engine (ESP101 - Aula Plus 1)
 * Galatasaray Üniversitesi Matematik & Yabancı Diller Hazırlık
 */

window.SpanishGame = (function() {
    let score = 0;
    let selectedTile = null;
    let matchedPairs = 0;

    function addScore(points = 10) {
        score += points;
        const badges = document.querySelectorAll('.spanish-score-badge');
        badges.forEach(b => {
            b.textContent = `Puan: ${score} 🏆`;
            b.classList.add('pulse');
            setTimeout(() => b.classList.remove('pulse'), 400);
        });
    }

    function checkChoice(btn, isCorrect, explanation) {
        const container = btn.closest('.game-card');
        if (!container) return;

        // Disable all sibling buttons in this group
        const group = btn.closest('.options-group');
        if (group) {
            const btns = group.querySelectorAll('button');
            btns.forEach(b => {
                b.disabled = true;
                b.style.pointerEvents = 'none';
            });
        }

        const feedback = container.querySelector('.game-feedback');
        if (isCorrect) {
            btn.classList.add('game-btn-correct');
            addScore(15);
            if (feedback) {
                feedback.innerHTML = `<div class="feedback-success">🎉 <strong>¡Excelente! (Harika!)</strong> ${explanation}</div>`;
                feedback.style.display = 'block';
            }
        } else {
            btn.classList.add('game-btn-wrong');
            if (feedback) {
                feedback.innerHTML = `<div class="feedback-error">⚠️ <strong>¡Cuidado! (Dikkat!)</strong> ${explanation}</div>`;
                feedback.style.display = 'block';
            }
        }
    }

    function handleTileClick(tile, pairId) {
        if (tile.classList.contains('matched')) return;

        if (!selectedTile) {
            selectedTile = { el: tile, pairId: pairId };
            tile.classList.add('selected');
        } else {
            if (selectedTile.el === tile) {
                tile.classList.remove('selected');
                selectedTile = null;
                return;
            }

            if (selectedTile.pairId === pairId) {
                // MATCH!
                selectedTile.el.classList.remove('selected');
                selectedTile.el.classList.add('matched');
                tile.classList.add('matched');
                addScore(20);
                selectedTile = null;
                matchedPairs++;
                
                const gameBoard = tile.closest('.matching-game-board');
                if (gameBoard) {
                    const totalPairs = parseInt(gameBoard.getAttribute('data-pairs') || '4', 10);
                    if (gameBoard.querySelectorAll('.matched').length >= totalPairs * 2) {
                        const winMsg = gameBoard.querySelector('.matching-win-msg');
                        if (winMsg) winMsg.style.display = 'block';
                    }
                }
            } else {
                // WRONG MATCH
                tile.classList.add('shake-wrong');
                selectedTile.el.classList.add('shake-wrong');
                const prev = selectedTile.el;
                setTimeout(() => {
                    tile.classList.remove('shake-wrong');
                    prev.classList.remove('shake-wrong', 'selected');
                }, 600);
                selectedTile = null;
            }
        }
    }

    function chooseDialogue(stepNum, nextStepId, isCorrect, replyText, explanation) {
        const currentStepEl = document.getElementById(`dialogue-step-${stepNum}`);
        if (!currentStepEl) return;

        const optionsBox = currentStepEl.querySelector('.dialogue-options');
        if (optionsBox) optionsBox.style.display = 'none';

        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble user-bubble';
        userBubble.innerHTML = `<div class="bubble-sender">Sen</div><div>${replyText}</div>`;
        currentStepEl.appendChild(userBubble);

        const expBox = document.createElement('div');
        expBox.className = isCorrect ? 'dialogue-note success' : 'dialogue-note error';
        expBox.innerHTML = isCorrect 
            ? `✓ <em>${explanation}</em>` 
            : `⚠️ <em>${explanation}</em>`;
        currentStepEl.appendChild(expBox);

        if (isCorrect) addScore(25);

        if (nextStepId) {
            const nextEl = document.getElementById(nextStepId);
            if (nextEl) {
                setTimeout(() => {
                    nextEl.style.display = 'block';
                    nextEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 600);
            }
        }
    }

    return {
        checkChoice: checkChoice,
        handleTileClick: handleTileClick,
        chooseDialogue: chooseDialogue,
        addScore: addScore
    };
})();

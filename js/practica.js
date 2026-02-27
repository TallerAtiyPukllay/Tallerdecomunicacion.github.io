/**
 * Módulo de Práctica: "El Camino del Saber" (Tablero Interactivo S-Shape)
 * Juego de tablero con 40 casillas (Inicio extra) y sorpresas!
 */

let currentPosition = 0; // Casilla 0 = Inicio
const FINAL_POSITION = 43; // 42 recuadros (1 al 42) + Inicio(0) = Fin(43)
let isRolling = false;
let boardSpecialCells = {}; // Almacena qué tipo de sorpresa hay en cada casilla

// Configuración Toast para notificaciones visuales flotantes
const GameToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

function initializePractica() {
    console.log('🎲 Inicializando Tablero de Práctica...');

    const boardGrid = document.getElementById('game-board-grid');
    const btnRollDesktop = document.getElementById('btn-roll-dice-desktop');
    const btnRollMobile = document.getElementById('btn-roll-dice-mobile');
    const fabContainer = document.getElementById('fab-dice-container');
    const btnReset = document.getElementById('btn-reset-board');
    const btnIniciar = document.getElementById('btn-iniciar-juego');
    const introScreen = document.getElementById('intro-practica');
    const gameScreen = document.getElementById('juego-practica');

    if (!boardGrid) return;

    // Lógica del Botón "Empezar a Jugar"
    if (btnIniciar) {
        btnIniciar.removeEventListener('click', initGameFlow);
        btnIniciar.addEventListener('click', initGameFlow);
    }

    // Funcionalidad extraída para iniciar el flujo del panel
    function initGameFlow() {
        if (introScreen && gameScreen) {
            introScreen.classList.add('d-none');
            gameScreen.classList.remove('d-none');
        }
        if (fabContainer) {
            fabContainer.classList.remove('d-none'); // Mostrar Botón flotante móvil
        }

        // Generar casillas trampa y ayuda de manera aleatoria
        generateSpecialCells();
        renderBoard(); // Dibujar el grid en forma de S

        currentPosition = 0;
        setTimeout(() => movePlayerTo(0), 100);

        if (document.getElementById('dice-visual-desktop')) document.getElementById('dice-visual-desktop').innerHTML = '?';
        if (document.getElementById('dice-visual-mobile')) document.getElementById('dice-visual-mobile').innerHTML = '?';
        if (btnRollDesktop) btnRollDesktop.disabled = false;
        if (btnRollMobile) btnRollMobile.disabled = false;

        if (window.innerWidth < 768) {
            GameToast.fire({
                icon: 'info',
                title: '¡Aventura iniciada!'
            });
        }
    }

    // Reposicionar en resize
    window.addEventListener('resize', () => {
        if (document.getElementById('pantalla-practica').classList.contains('active')) {
            if (introScreen && introScreen.classList.contains('d-none')) {
                renderBoard();
                movePlayerTo(currentPosition);
            }
        }
    });

    // 3. LISTENERS
    if (btnRollDesktop) {
        btnRollDesktop.removeEventListener('click', btnRollHandler);
        btnRollDesktop.addEventListener('click', btnRollHandler);
    }
    if (btnRollMobile) {
        btnRollMobile.removeEventListener('click', btnRollHandler);
        btnRollMobile.addEventListener('click', btnRollHandler);
    }

    // Botón de Salir/Abandonar Partida
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            Swal.fire({
                title: '¿Abandonar aventura?',
                text: "Perderás todo tu progreso.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e02424',
                cancelButtonColor: '#9ca3af',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Continuar Jugando'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (introScreen && gameScreen) {
                        gameScreen.classList.add('d-none');
                        introScreen.classList.remove('d-none');
                    }
                    if (fabContainer) {
                        fabContainer.classList.add('d-none');
                    }
                }
            });
        });
    }

    // Callback post-reto
    window.completarReto = function (exito) {
        const statusTextDesktop = document.getElementById('game-status-text-desktop');

        if (exito) {
            if (window.innerWidth < 768) GameToast.fire({ icon: 'success', title: '¡Reto superado! Buen trabajo.' });
            if (statusTextDesktop) statusTextDesktop.innerHTML = '<span class="text-success">¡Reto superado! Buen trabajo.</span>';
            playSuccessSoundCustom();
            setTimeout(() => checkSpecialCell(currentPosition), 800);
        } else {
            if (window.innerWidth < 768) GameToast.fire({ icon: 'error', title: '¡Oh no! Retrocedes 1 casilla.' });
            if (statusTextDesktop) statusTextDesktop.innerHTML = '<span class="text-danger">¡Oh no! Retrocedes 1 casilla.</span>';
            playErrorSoundCustom();
            if (currentPosition > 0) {
                // Retroceder animadamente por fallar
                animatePlayerMove(currentPosition, currentPosition - 1, () => {
                    checkSpecialCell(currentPosition);
                });
            } else {
                setTimeout(() => checkSpecialCell(currentPosition), 800);
            }
        }
    }
}

// ------------------------------------
// DIBUJADO DINÁMICO DEL TABLERO EN "S"
// ------------------------------------
function createCellElement(i) {
    const cell = document.createElement('div');
    cell.className = 'board-cell';
    cell.id = `cell-${i}`;

    if (i === 0) {
        cell.classList.add('start');
        cell.innerHTML = 'INICIO';
    } else if (i === FINAL_POSITION) {
        cell.classList.add('finish');
        cell.innerHTML = '🏆 FIN';
    } else {
        cell.innerHTML = i;
        cell.classList.add(`cell-type-${(i % 5) + 1}`);

        // Pintar casillas especiales
        if (boardSpecialCells[i]) {
            const type = boardSpecialCells[i].type;
            const icon = document.createElement('div');
            icon.className = 'special-icon';

            if (type === 'trap') {
                icon.innerHTML = '⚠️';
                cell.classList.add('trap-cell');
            } else {
                icon.innerHTML = '🎁';
                cell.classList.add('boost-cell');
            }

            cell.appendChild(icon);
        }
    }
    return cell;
}

function renderBoard() {
    const boardGrid = document.getElementById('game-board-grid');
    boardGrid.innerHTML = '';

    // Aumentamos drásticamente el número de casillas por fila para que ocupe todo el ancho
    // Tomando como base un tablero ancho
    let colsInRow = 10;
    if (window.innerWidth < 1200) colsInRow = 8;
    if (window.innerWidth < 992) colsInRow = 6;
    if (window.innerWidth < 768) colsInRow = 5;
    if (window.innerWidth < 480) colsInRow = 4;

    const totalCells = FINAL_POSITION + 1; // 43 casillas reales (0 al 42)
    let currentCellIndex = 0;
    let isLeftToRight = true;

    while (currentCellIndex < totalCells) {
        // --- 1. Fila Principal Horizontal ---
        const mainRow = document.createElement('div');
        mainRow.className = 'board-row main-row';
        if (!isLeftToRight) {
            mainRow.classList.add('reverse-row');
        }

        let cellsAdded = 0;
        for (let c = 0; c < colsInRow; c++) {
            if (currentCellIndex >= totalCells) {
                // Rellenar con cuadros invisibles para mantener la estructura Flexbox a pesar de no dibujar mas casillas validas.
                const spacer = document.createElement('div');
                spacer.className = 'board-cell invisible-cell';
                mainRow.appendChild(spacer);
            } else {
                mainRow.appendChild(createCellElement(currentCellIndex));
                currentCellIndex++;
            }
            cellsAdded++;
        }
        boardGrid.appendChild(mainRow);

        if (currentCellIndex >= totalCells) break; // Terminó en fila horizontal!

        // --- 2. Fila Conectora (El "codo" de la S) ---
        const connectorRow = document.createElement('div');
        connectorRow.className = 'board-row connector-row';

        let hasVisibleConnector = false; // Flag para saber si se agregó una casilla real en el codo

        for (let c = 0; c < cellsAdded; c++) {
            // Si la fila dibuja de Izq a Der, el conector real va a la extrema DERECHA
            if (isLeftToRight && c === cellsAdded - 1) {
                if (currentCellIndex < totalCells) {
                    connectorRow.appendChild(createCellElement(currentCellIndex));
                    currentCellIndex++;
                    hasVisibleConnector = true;
                } else {
                    const spacer = document.createElement('div');
                    spacer.className = 'board-cell invisible-cell';
                    connectorRow.appendChild(spacer);
                }
            }
            // Si dibuja Der a Izq, el conector real va a la extrema IZQUIERDA
            else if (!isLeftToRight && c === 0) {
                if (currentCellIndex < totalCells) {
                    connectorRow.appendChild(createCellElement(currentCellIndex));
                    currentCellIndex++;
                    hasVisibleConnector = true;
                } else {
                    const spacer = document.createElement('div');
                    spacer.className = 'board-cell invisible-cell';
                    connectorRow.appendChild(spacer);
                }
            }
            // Rellenar con cuadros invisibles para mantener el Grid estructural intacto
            else {
                const spacer = document.createElement('div');
                spacer.className = 'board-cell invisible-cell';
                connectorRow.appendChild(spacer);
            }
        }

        // ¡Magia! Solo inserta "la bajada / el codo" si realmente hay una casilla allí.
        // Esto evita que salga un espacio grandísimo vacío al puro final o esquinas raras.
        if (hasVisibleConnector) {
            boardGrid.appendChild(connectorRow);
        }

        isLeftToRight = !isLeftToRight;
    }
}

function generateSpecialCells() {
    boardSpecialCells = {};

    // El tablero tiene 42 casillas válidas para jugar (1 a 42).
    // Dividimos en 3 tramos (terciles) para asegurar distribución uniforme.
    const tramos = [
        { min: 3, max: 13 },   // Tercil 1
        { min: 16, max: 27 },  // Tercil 2
        { min: 30, max: 40 }   // Tercil 3 (Evitamos poner en el 41 o 42 para no arruinar el final)
    ];

    tramos.forEach((tramo, index) => {
        let posibles = [];
        for (let i = tramo.min; i <= tramo.max; i++) posibles.push(i);

        // Mezclar las opciones
        posibles.sort(() => Math.random() - 0.5);

        // Asignar 1 Trampa por tercil (retrocede de 1 a 3)
        let posTrampa = posibles.pop();
        let valTrampa = Math.floor(Math.random() * 3) + 1;
        boardSpecialCells[posTrampa] = { type: 'trap', value: -valTrampa, info: `Retrocedes ${valTrampa}` };

        // Asignar 1 Ayuda por tercil (avanza de 1 a 3)
        let posAyuda = posibles.pop();
        let valAyuda = Math.floor(Math.random() * 3) + 1;
        boardSpecialCells[posAyuda] = { type: 'boost', value: valAyuda, info: `Avanzas ${valAyuda}` };
    });

    console.log("Distribución Equilibrada de trampas/ayudas:", boardSpecialCells);
}


// ------------------------------------
// DADO NORMAL (1-6) Y MOVIMIENTO
// ------------------------------------
function btnRollHandler() {
    if (isRolling) return;

    if (currentPosition >= FINAL_POSITION) {
        Swal.fire('¡Ya Ganaste!', 'Pulsa el botón de reiniciar para jugar de nuevo.', 'success');
        return;
    }

    isRolling = true;
    const btnRollDesktop = document.getElementById('btn-roll-dice-desktop');
    const btnRollMobile = document.getElementById('btn-roll-dice-mobile');
    const diceVisualDesktop = document.getElementById('dice-visual-desktop');
    const diceVisualMobile = document.getElementById('dice-visual-mobile');
    const statusTextDesktop = document.getElementById('game-status-text-desktop');

    if (btnRollDesktop) btnRollDesktop.disabled = true;
    if (btnRollMobile) btnRollMobile.disabled = true;
    if (diceVisualDesktop) diceVisualDesktop.classList.add('rolling');
    if (diceVisualMobile) diceVisualMobile.classList.add('rolling');

    if (statusTextDesktop) statusTextDesktop.innerHTML = '🎲 Lanzando dado...';
    if (window.innerWidth < 768) {
        GameToast.fire({
            icon: 'info',
            title: '🎲 Lanzando dado...'
        });
    }

    playDiceSound();

    setTimeout(() => {
        // Dado legal y estándar del 1 al 6
        const rollResult = Math.floor(Math.random() * 6) + 1;

        if (diceVisualDesktop) diceVisualDesktop.classList.remove('rolling');
        if (diceVisualMobile) diceVisualMobile.classList.remove('rolling');

        const caras = ['?', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        if (diceVisualDesktop) diceVisualDesktop.innerHTML = caras[rollResult];
        if (diceVisualMobile) diceVisualMobile.innerHTML = caras[rollResult];

        if (statusTextDesktop) statusTextDesktop.innerHTML = `¡Sacaste un ${rollResult}! Saltando...`;
        if (window.innerWidth < 768) {
            GameToast.fire({
                icon: 'success',
                title: `¡Sacaste un ${rollResult}! Saltando...`
            });
        }

        // Calcular avance
        let newPosition = currentPosition + rollResult;
        if (newPosition >= FINAL_POSITION) {
            newPosition = FINAL_POSITION;
        }

        // Llamar a la animación de saltos consecutivos
        animatePlayerMove(currentPosition, newPosition, () => {
            isRolling = false;
            // No habilitamos btnRoll acá porque le saldrá un mini reto

            if (currentPosition === FINAL_POSITION) {
                lanzarVictoria();
            } else {
                lanzarMiniReto(currentPosition);
            }
        });

    }, 800);
}

function movePlayerTo(pos) {
    const wrapper = document.querySelector('.game-board-wrapper');
    const cell = document.getElementById(`cell-${pos}`);
    const token = document.getElementById('player-token');

    if (!wrapper || !cell || !token) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();

    // Calcular el top/left relativo al contenedor
    const top = cellRect.top - wrapperRect.top + (cellRect.height / 2) - (token.offsetHeight / 2);
    const left = cellRect.left - wrapperRect.left + (cellRect.width / 2) - (token.offsetWidth / 2);

    token.style.transform = `translate(${left}px, ${top}px)`;

    // Iluminar camino
    cell.classList.add('active-path');
}

// Nueva función de animación asíncrona para moverse de casilla en casilla
async function animatePlayerMove(startPos, endPos, onFinish = null) {
    const token = document.getElementById('player-token');

    // Aceleramos la transición temporalmente para que el salto sea picadito y fluido
    token.style.transition = 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)';

    // Si retrocede (casilla trampa), el paso es -1
    let step = startPos < endPos ? 1 : -1;

    for (let i = startPos + step; step > 0 ? (i <= endPos) : (i >= endPos); i += step) {
        currentPosition = i;
        movePlayerTo(currentPosition);

        // Pequeño sonido de impacto 
        playStepSoundCustom();

        // Espera de 400ms por cada casilla
        await new Promise(r => setTimeout(r, 400));
    }

    // Restaurar transición normal suavizada
    token.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';

    if (onFinish) onFinish();
}

function checkSpecialCell(pos) {
    const btnRollDesktop = document.getElementById('btn-roll-dice-desktop');
    const btnRollMobile = document.getElementById('btn-roll-dice-mobile');
    const statusTextDesktop = document.getElementById('game-status-text-desktop');

    // Si la celda es especial, aplicar efecto extra
    if (boardSpecialCells[pos]) {
        const data = boardSpecialCells[pos];
        const isTrap = data.type === 'trap';

        if (statusTextDesktop) {
            statusTextDesktop.innerHTML = isTrap ? `<span class="text-danger"><i class="bi bi-exclamation-triangle-fill"></i> ¡Trampa! ${data.info}</span>` : `<span class="text-success"><i class="bi bi-gift-fill"></i> ¡Premio! ${data.info}</span>`;
        }

        Swal.fire({
            title: isTrap ? '¡Oh no! Casilla Trampa ⚠️' : '¡Que suerte! Casilla Mágica 🎁',
            text: isTrap ? `Tropezaste. ${data.info} casillas.` : `Obtuviste impulso. ${data.info} casillas.`,
            icon: isTrap ? 'error' : 'success',
            confirmButtonText: 'Continuar',
            allowOutsideClick: false
        }).then(() => {
            let targetPos = currentPosition + data.value;
            // Asegurar límites
            if (targetPos < 0) targetPos = 0;
            if (targetPos >= FINAL_POSITION) targetPos = FINAL_POSITION;

            // Animar el deslizamiento a consecuencia de la casilla
            animatePlayerMove(currentPosition, targetPos, () => {
                if (currentPosition === FINAL_POSITION) {
                    setTimeout(lanzarVictoria, 800);
                } else {
                    // LLAMADA RECURSIVA: ¿Caímos en otro atrapa/comodín diferente?
                    if (boardSpecialCells[currentPosition]) {
                        checkSpecialCell(currentPosition);
                    } else {
                        if (btnRollDesktop) btnRollDesktop.disabled = false;
                        if (btnRollMobile) btnRollMobile.disabled = false;
                        if (statusTextDesktop) statusTextDesktop.innerHTML = '<span class="text-secondary">¡Sigue avanzando!</span>';
                    }
                }
            });
        });
    } else {
        // Fin del turno normal
        if (btnRollDesktop) btnRollDesktop.disabled = false;
        if (btnRollMobile) btnRollMobile.disabled = false;
    }
}


// ------------------------------------
// SISTEMA DE 5 MINI-RETOS DIFERENTES
// ------------------------------------

function lanzarMiniReto(casilla) {
    const tipoReto = Math.floor(Math.random() * 5) + 1;

    console.log(`Abriendo Mini-Reto Tipo ${tipoReto} para la casilla ${casilla}`);

    Swal.fire({
        title: `Reto de la Casilla ${casilla}`,
        text: `Estamos construyendo el reto número ${tipoReto}. ¡Por ahora, superas la casilla mágicamente!`,
        icon: 'info',
        confirmButtonText: '¡Genial!'
    }).then(() => {
        window.completarReto(true); // Simulando éxito temporal
    });
}

function lanzarVictoria() {
    if (typeof window.lanzarConfeti === 'function') window.lanzarConfeti(100);
    const btnRollDesktop = document.getElementById('btn-roll-dice-desktop');
    const btnRollMobile = document.getElementById('btn-roll-dice-mobile');
    if (btnRollDesktop) btnRollDesktop.disabled = true; // El juego terminó
    if (btnRollMobile) btnRollMobile.disabled = true;

    Swal.fire({
        title: '¡Llegaste a la meta! 🏆',
        text: 'Has demostrado gran maestría en los signos de puntuación.',
        icon: 'success',
        confirmButtonColor: '#22c55e',
        confirmButtonText: '¡Genial!'
    });
}

// Sonidos Simulados
function playDiceSound() {
    try {
        const audio = new Audio('https://www.soundjay.com/misc/sounds/dice-roll-1.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => console.log('Sin audio de dado.'));
    } catch (e) { }
}

function playSuccessSoundCustom() {
    try {
        if (window.audioContext && window.audioContext.state === 'running') {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, window.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, window.audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, window.audioContext.currentTime + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, window.audioContext.currentTime + 0.5);

            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            oscillator.start();
            oscillator.stop(window.audioContext.currentTime + 0.5);
        }
    } catch (e) { }
}

function playErrorSoundCustom() {
    try {
        if (window.audioContext && window.audioContext.state === 'running') {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(300, window.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, window.audioContext.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, window.audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.3);

            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            oscillator.start();
            oscillator.stop(window.audioContext.currentTime + 0.3);
        }
    } catch (e) { }
}

function playStepSoundCustom() {
    try {
        if (window.audioContext && window.audioContext.state === 'running') {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, window.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, window.audioContext.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, window.audioContext.currentTime + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, window.audioContext.currentTime + 0.1);

            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            oscillator.start();
            oscillator.stop(window.audioContext.currentTime + 0.1);
        }
    } catch (e) { }
}

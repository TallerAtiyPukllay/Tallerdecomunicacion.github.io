/**
 * Módulo de Práctica (Drag & Drop y Tap-to-Select)
 * Maneja la lógica de la pantalla de práctica.
 */

let signoSeleccionado = null; // Para la lógica de "tocar y colocar"
let draggedSign = null;       // Para la lógica de "arrastrar y soltar"

function initializePractica() {
    console.log('Iniciando módulo de práctica...');

    // Referencias al DOM
    const draggables = document.querySelectorAll('.signo-draggable');
    const dropZones = document.querySelectorAll('.drop-zone');
    const verifyBtn = document.getElementById('verify-btn');
    const resetBtn = document.getElementById('reset-btn');
    const feedbackDiv = document.getElementById('feedback-practica');

    // 1. Configurar Draggables (Signos en la caja de herramientas)
    draggables.forEach(draggable => {
        // Eventos de Arrastre (Solo Desktop >= 1400px)
        draggable.addEventListener('dragstart', (e) => {
            // Si es pantalla menor a 1400px, prevenir arrastre (usar tap)
            if (window.innerWidth < 1400 || ('ontouchstart' in window)) {
                e.preventDefault();
                return;
            }
            draggedSign = draggable.getAttribute('data-signo');
            e.dataTransfer.setData('text/plain', draggedSign);
            e.dataTransfer.effectAllowed = 'copy';
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            draggedSign = null;
        });

        // Eventos de Touch/Click (Menor a 1400px - Tap to Select)
        draggable.addEventListener('click', (e) => {
            // Si es Desktop grande (>= 1400px), ignorar click para seleccionar (forzar drag)
            if (window.innerWidth >= 1400 && !('ontouchstart' in window)) {
                return;
            }
            handleSignSelection(draggable);
        });
    });

    // 2. Configurar Drop Zones (Espacios en blanco)
    dropZones.forEach(zone => {
        // Permitir soltar (Desktop >= 1400px)
        zone.addEventListener('dragover', (e) => {
            if (window.innerWidth < 1400) return; // Ignorar en pantallas < 1400px
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            if (window.innerWidth < 1400) return;
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            if (window.innerWidth < 1400) return;
            e.preventDefault();
            zone.classList.remove('drag-over');
            const signo = e.dataTransfer.getData('text/plain');
            colocarSigno(zone, signo);
        });

        // Evento Click (Pantallas < 1400px - Para colocar el signo seleccionado)
        zone.addEventListener('click', () => {
            // Ignorar en Desktop grande
            if (window.innerWidth >= 1400 && !('ontouchstart' in window)) return;

            if (signoSeleccionado) {
                colocarSigno(zone, signoSeleccionado);
                deseleccionarSigno(); // Auto-deseleccionar después de colocar (opcional pero buena UX móvil)
            } else if (zone.textContent !== '____') {
                // Limpiar si se toca una zona llena (corrección rápida)
                limpiarZona(zone);
            }
        });
    });

    // 3. Botones de Acción
    if (verifyBtn) verifyBtn.addEventListener('click', verificarRespuestas);
    if (resetBtn) resetBtn.addEventListener('click', reiniciarPractica);
}

// Función para manejar la selección visual de un signo (Tap-to-Select)
function handleSignSelection(element) {
    const signo = element.getAttribute('data-signo');

    // Si ya estaba seleccionado, lo deseleccionamos
    if (signoSeleccionado === signo) {
        deseleccionarSigno();
        return;
    }

    // Deseleccionar cualquier otro
    deseleccionarSigno();

    // Seleccionar el nuevo
    signoSeleccionado = signo;
    element.classList.add('selected-active');

    // Feedback visual (opcional: vibración en móvil)
    if (navigator.vibrate) navigator.vibrate(20);
}

function deseleccionarSigno() {
    signoSeleccionado = null;
    document.querySelectorAll('.signo-draggable').forEach(el => {
        el.classList.remove('selected-active');
    });
}

// Función para colocar un signo en una zona
function colocarSigno(zone, signo) {
    zone.textContent = signo;
    zone.setAttribute('data-filled', signo);
    zone.classList.add('filled');
    zone.classList.remove('empty');

    // Resetear estados de validación previos
    zone.classList.remove('correct-answer', 'incorrect-answer');

    // Sonido suave de "pop" o colocación
    playClickSound();
}

function limpiarZona(zone) {
    zone.textContent = '____';
    zone.removeAttribute('data-filled');
    zone.classList.remove('filled', 'correct-answer', 'incorrect-answer', 'empty-answer');
    zone.classList.add('empty');
}

function verificarRespuestas() {
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedbackDiv = document.getElementById('feedback-practica');
    let aciertos = 0;
    let total = dropZones.length;
    let errores = 0;

    dropZones.forEach(zone => {
        const respuestaUsuario = zone.getAttribute('data-filled');
        const respuestaCorrecta = zone.getAttribute('data-correct');

        if (!respuestaUsuario) {
            zone.classList.remove('start-state', 'correct-answer', 'incorrect-answer');
            zone.classList.add('empty-answer');
            errores++;
        } else if (respuestaUsuario === respuestaCorrecta) {
            zone.classList.remove('start-state', 'incorrect-answer', 'empty-answer');
            zone.classList.add('correct-answer');
            aciertos++;
        } else {
            zone.classList.remove('start-state', 'correct-answer', 'empty-answer');
            zone.classList.add('incorrect-answer');
            errores++;
        }
    });

    // Mostrar feedback
    feedbackDiv.classList.remove('d-none', 'alert-success', 'alert-warning', 'alert-danger');

    if (aciertos === total) {
        feedbackDiv.classList.add('alert-success');
        feedbackDiv.innerHTML = `<strong>¡Excelente! 🎉</strong> Has completado todas las oraciones correctamente.`;
        playSuccessSound();
    } else if (aciertos > 0) {
        feedbackDiv.classList.add('alert-warning');
        feedbackDiv.innerHTML = `<strong>Buen intento.</strong> Tienes ${aciertos} aciertos y ${errores} errores/vacíos. Revisa e inténtalo de nuevo.`;
        playErrorSound();
    } else {
        feedbackDiv.classList.add('alert-danger');
        feedbackDiv.innerHTML = `<strong>No te rindas.</strong> Revisa la teoría y vuelve a intentar.`;
        playErrorSound();
    }
}

function reiniciarPractica() {
    const dropZones = document.querySelectorAll('.drop-zone');
    const feedbackDiv = document.getElementById('feedback-practica');

    dropZones.forEach(zone => {
        limpiarZona(zone);
    });

    deseleccionarSigno();
    feedbackDiv.classList.add('d-none');
}

// Sonidos simples (usando la API de Audio de main si está disponible, o fallback)
function playClickSound() {
    // Implementación simple o llamada a sounds.js si existe
    if (window.audioContext) {
        // ... usar sounds.js
    }
}

function playSuccessSound() {
    // ...
}

function playErrorSound() {
    // ...
}

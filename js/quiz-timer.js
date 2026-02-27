// ============================================
// MÓDULO DE TEMPORIZADOR (Solución Definitiva)
// ============================================

// Variables GLOBALES para el reloj
let intervaloReloj = null;
let segundosTotales = 0;

// Elemento visualizador
function obtenerVisualizador() {
    return document.getElementById('quiz-timer-text');
}

// Función PUBLICA para iniciar el reloj (llamada desde main.js)
window.iniciarTimerQuiz = function () {
    console.log("🚀 [RELOJ INTEGRADO] Iniciando cuenta...");

    // 1. Limpieza previa
    window.detenerTimerQuiz();

    // 2. Resetear variables
    segundosTotales = 0;
    const visualizador = obtenerVisualizador();
    if (visualizador) visualizador.textContent = "00:00";

    // 3. Iniciar el intervalo (cada 1000ms = 1 segundo)
    intervaloReloj = setInterval(() => {
        segundosTotales++;

        // Cálculos matemáticos simples
        const minutos = Math.floor(segundosTotales / 60);
        const segundos = segundosTotales % 60;

        // Formato con ceros
        const minTexto = minutos.toString().padStart(2, '0');
        const segTexto = segundos.toString().padStart(2, '0');

        // Actualizar HTML si existe
        const visor = obtenerVisualizador();
        if (visor) {
            visor.innerText = `${minTexto}:${segTexto}`;
        }
    }, 1000);
};

// Función PUBLICA para obtener tiempo formateado string
window.obtenerTiempoFormateado = function () {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = segundosTotales % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
};

// Función PUBLICA para detener el reloj y mostrar resultado
window.detenerTimerQuiz = function () {
    // Detener el intervalo si existe
    if (intervaloReloj) {
        clearInterval(intervaloReloj);
        intervaloReloj = null;
        console.log("🛑 [RELOJ INTEGRADO] Detenido.");
    }

    // SIEMPRE actualizar el tiempo final al detener (incluso si ya estaba detenido)
    const tiempoFinalTexto = window.obtenerTiempoFormateado();
    console.log("⏱️ Tiempo final capturado:", tiempoFinalTexto);

    const elementoFinal = document.getElementById('time-final');
    if (elementoFinal) {
        elementoFinal.textContent = tiempoFinalTexto;
    } else {
        console.error("❌ No se encontró el elemento #time-final");
    }
};

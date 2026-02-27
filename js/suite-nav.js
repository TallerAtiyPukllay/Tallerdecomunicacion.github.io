// ============================================
// NAVEGACIÓN DE LA SUITE - CONTROL DE PANTALLAS
// ============================================

/**
 * Muestra la pantalla solicitada ocultando las demás
 * @param {string} pantalla - ID de la pantalla a mostrar
 */
function mostrarPantalla(pantalla) {
    // Evitar recarga de página y propagar el evento
    event?.preventDefault();

    // Obtener todas las pantallas
    const pantallas = document.querySelectorAll('.pantalla');

    // Ocultar todas las pantallas
    pantallas.forEach(p => {
        p.classList.remove('active');
    });

    // Resetear altura del contenedor principal si venía de resultados
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        appContainer.classList.remove('app-short-height');
    }

    // Mostrar la pantalla solicitada
    const pantallaSolicitada = document.getElementById('pantalla-' + pantalla);
    if (pantallaSolicitada) {
        pantallaSolicitada.classList.add('active');
        console.log(`✓ Pantalla mostrada: ${pantalla}`);

        // Guardar ubicación en memoria para recargas
        sessionStorage.setItem('atiy_last_screen', pantalla);

        // Actualizar datos específicos cuando se abre Progreso
        if (pantalla === 'progreso') {
            if (typeof actualizarEstadisticas === 'function') {
                actualizarEstadisticas();
                console.log('✓ Estadísticas locales actualizadas');
            }
            // NUEVO: Cargar Ranking de la Nube automáticamente (con reintento)
            if (typeof window.cargarRankingCloud === 'function') {
                console.log('☁️ Cargando ranking de la nube...');
                window.cargarRankingCloud();
            } else {
                console.warn('☁️ Módulo de nube aún no listo. Reintentando en 500ms...');
                setTimeout(() => {
                    if (typeof window.cargarRankingCloud === 'function') {
                        window.cargarRankingCloud();
                    }
                }, 500);
            }
        }
    } else {
        console.error(`✗ Pantalla no encontrada: pantalla-${pantalla}`);
    }

    // Scroll al inicio
    window.scrollTo(0, 0);
}

// Escuchar clics en los enlaces del navbar
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Extraer el ID de la pantalla del href (ej: onclick="mostrarPantalla('biblioteca')")
            const href = link.getAttribute('href');
            // Ya se maneja con onclick, pero este listener añade seguridad
        });
    });
});

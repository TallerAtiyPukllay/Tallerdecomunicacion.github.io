/**
 * Simple Confetti Animation
 * Crea un efecto de confeti ligero y festivo utilizando Canvas.
 */

const Confetti = (function () {
    let canvas;
    let ctx;
    let W, H;
    let particles = [];
    let animationId = null;
    let isActive = false;

    // Colores festivos
    const colors = [
        "#f44336", "#e91e63", "#9c27b0", "#673ab7",
        "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
        "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
        "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"
    ];

    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    class Particle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H - H;
            this.r = randomFromTo(5, 20); // Radio/Tamaño
            this.d = Math.random() * W / 2 + 10; // Densidad
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.tilt = Math.floor(Math.random() * 10) - 10;
            this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
            this.tiltAngle = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
            return ctx.stroke();
        }
    }

    function init() {
        // Crear canvas si no existe
        canvas = document.getElementById("confetti-canvas");
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = "confetti-canvas";
            canvas.style.position = "fixed";
            canvas.style.top = "0";
            canvas.style.left = "0";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.pointerEvents = "none"; // Permitir clic a través
            canvas.style.zIndex = "9999";
            document.body.appendChild(canvas);
        }

        ctx = canvas.getContext("2d");
        resize();
        window.addEventListener("resize", resize);
    }

    function resize() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    }

    function update() {
        if (!isActive && particles.length === 0) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, W, H);
            return;
        }

        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

            // Reiniciar partícula si sale de la pantalla y sigue activo
            if (p.y > H) {
                if (isActive) {
                    p.x = Math.random() * W;
                    p.y = -10;
                } else {
                    // Si ya no está activo, eliminar partícula
                    particles.splice(i, 1);
                    i--;
                    continue;
                }
            }

            p.draw();
        }

        animationId = requestAnimationFrame(update);
    }

    return {
        start: function (duration = 5000) {
            if (!canvas) init();
            isActive = true;
            particles = [];

            // Cantidad de partículas
            const mp = 150;
            for (let i = 0; i < mp; i++) {
                particles.push(new Particle());
            }

            update();

            // Detener generación automática después de 'duration'
            if (duration > 0) {
                setTimeout(() => {
                    isActive = false; // Dejarán de regenerarse y caerán
                }, duration);
            }
        },
        stop: function () {
            isActive = false;
        }
    };
})();

// Exponer función global simple
function lanzarConfeti() {
    console.log("🎉 Lluvia de confeti!");
    Confetti.start(5000); // 5 segundos de confeti
}

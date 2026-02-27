# 🎓 Atiy Pukllay - Suite Educativa v1.0

![Estado](https://img.shields.io/badge/Estado-Desarrollo%20Activo-success) ![Versión](https://img.shields.io/badge/Versi%C3%B3n-1.0-blue) ![Licencia](https://img.shields.io/badge/Licencia-Educativa-orange)

**Atiy Pukllay** (del quechua "El poder de jugar") es una **suite educativa interactiva** diseñada para dominar los **signos de puntuación** en español. Combina teoría detallada, práctica gamificada y evaluaciones rigurosas en una interfaz moderna, accesible y totalmente responsiva.

---

## ✨ Características Principales

### 📚 1. Biblioteca de Conocimiento
Una guía teórica completa e interactiva sobre el uso correcto de los signos de puntuación.
- **Navegación Intuitiva**: Menú lateral para acceder rápidamente a cada signo.
- **Contenido Estructurado**: Explicaciones claras, reglas de uso, ejemplos "incorrecto vs correcto" y secciones de "Zona de Peligro" para errores comunes.
- **Diseño Visual**: Tarjetas de información, iconos y tipografía legible (Merriweather y Lato).

### ✏️ 2. Taller de Práctica Adaptativo
Ejercicios prácticos para reforzar el aprendizaje mediante la acción.
- **Mecánicas Responsivas**:
  - 🖱️ **Escritorio (>1400px)**: Interfaz **Drag & Drop** (arrastrar y soltar) para una experiencia inmersiva.
  - 📱 **Móviles y Tablets (<1400px)**: Interfaz **Tap-to-Select** (tocar para seleccionar y colocar) optimizada para pantallas táctiles.
- **Feedback Inmediato**: Verificación instantánea de respuestas con explicaciones detalladas.

### 📝 3. Evaluación Gamificada (Quiz)
Pon a prueba tus conocimientos con un sistema de preguntas desafiante.
- **3 Niveles de Dificultad**:
  - 🟢 **Básico**: 5 preguntas fundamentales.
  - 🔵 **Intermedio**: 10 preguntas de complejidad media.
  - 🔴 **Avanzado**: 15 preguntas para expertos.
- **Sistema de Rachas**: Gana puntos extra por respuestas correctas seguidas.
- **Temporizador**: Control de tiempo para añadir emoción (opcional).

### 📊 4. Progreso y Estadísticas
Seguimiento detallado de tu evolución en el aprendizaje.
- **Dashboard Visual**: Gráficos interactivos (Chart.js) que muestran tu historial de puntajes.
- **Métricas Clave**: Promedio, mejor puntaje, nivel favorito y total de pruebas realizadas.
- **Persistencia**: Tus datos se guardan localmente para que no pierdas tu progreso.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto ha sido construido utilizando estándares web modernos y buenas prácticas de desarrollo:

- **Core**:
  - **HTML5**: Estructura semántica y accesible.
  - **CSS3**: Diseño responsivo, Grid, Flexbox y animaciones suaves.
  - **JavaScript (ES6+)**: Lógica modular, POO (Programación Orientada a Objetos) y manipulación del DOM.

- **Frameworks y Librerías**:
  - **Bootstrap 5**: Sistema de rejilla (Grid System) y componentes UI.
  - **Bootstrap Icons**: Iconografía vectorial escalable.
  - **Chart.js**: Visualización de datos y estadísticas.
  - **Confetti.js**: Efectos visuales de celebración.
  - **Google Fonts**: Tipografías *Merriweather* (títulos) y *Lato* (cuerpo).

- **Audio API**:
  - **Web Audio API**: Efectos sonoros sintetizados en tiempo real (sin archivos de audio pesados) para una experiencia auditiva ligera y satisfactoria.

---

## 🚀 Instalación y Uso

No requiere instalación compleja ni bases de datos. Es una aplicación puramente **Client-Side**.

1. **Clonar o Descargar**:
   Obtén este repositorio en tu computadora.

2. **Ejecutar**:
   - Abre el archivo `index.html` directamente en tu navegador web moderno (Chrome, Edge, Firefox, Safari).
   - O utiliza un servidor local (recomendado) como Live Server de VS Code o Python (`python -m http.server`).

3. **Navegación**:
   - Utiliza la barra de navegación superior o el menú lateral para moverte entre la **Biblioteca**, **Práctica**, **Evaluación** y **Progreso**.

---

## 📂 Estructura del Proyecto

```text
Atiy-Pukllay/
├── assets/             # Recursos estáticos (imágenes, datos JSON)
│   └── data/           # Archivos de datos (preguntas.json, teoria.json)
├── css/                # Hojas de estilo
│   ├── bootstrap.min.css   # Framework CSS
│   ├── styles.css          # Estilos principales personalizados
│   ├── responsive-utils.css # Ajustes específicos de responsividad
│   └── scroll-mobile.css   # Optimizaciones de scroll para móviles
├── js/                 # Lógica de la aplicación (JavaScript)
│   ├── main.js             # Controlador principal y orquestador
│   ├── biblioteca-render.js# Renderizado de la sección de teoría
│   ├── practica.js         # Lógica del taller de práctica (Drag & Drop / Tap)
│   ├── quiz-timer.js       # Gestión del tiempo en evaluaciones
│   ├── sounds.js           # Sintetizador de audio (Web Audio API)
│   ├── data.js             # Base de datos de contenido teórico
│   └── ...                 # Otros módulos de utilidad
├── index.html          # Punto de entrada de la aplicación
└── README.md           # Documentación del proyecto
```

---

## 👥 Créditos

**Autora y Desarrolladora Principal:**
- **Nohimy Edith Carrasco Paredes**

**Contribuciones:**
- Diseño de interfaz y experiencia de usuario (UI/UX).
- Implementación de lógica educativa y gamificación.

---

## 📄 Licencia

Este proyecto está bajo una licencia educativa abierta. Eres libre de usarlo, modificarlo y compartirlo con fines de aprendizaje y enseñanza, siempre atribuyendo la autoría original.

---

<p align="center">
  <sub>Desarrollado con ❤️ para la educación. 2026.</sub>
</p>

function renderBiblioteca(signoKey) {
    const data = libraryData[signoKey];
    if (!data) return;

    const contentDiv = document.getElementById('bib-content');
    let html = '';

    // 1. BANNER PRINCIPAL (HERO) - Personalizado para la Coma o Genérico
    if (data.heroStyle) {
        html += `
        <div class="mb-5 p-5 text-white text-center rounded-3 shadow" style="${data.heroStyle}">
            <h1 class="display-4 fw-bold mb-3">${data.nombreCompleto} <span class="opacity-75">(${data.simbolo})</span></h1>
            <p class="lead mx-auto" style="max-width: 800px; font-weight: 500; background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; backdrop-filter: blur(5px);">
                ${data.definicion}
            </p>
        </div>`;
    } else {
        // Estilo Default para otros signos
        html += `
        <div class="bib-content-header mb-4 text-center">
            <h2>${data.nombreCompleto} <span style="color: #4361ee; font-weight: 800;">( <span style="color: #FF6B6B;">${data.simbolo}</span> )</span></h2>
        </div>
        <div class="mb-5 p-4 bg-light rounded border-start border-5" style="border-color: #FF6B6B;">
            <h5 class="mb-3">📖 Definición</h5>
            <p class="mb-0" style="line-height: 1.8;">${data.definicion}</p>
        </div>`;
    }

    // -----------------------------------------------------
    // NUEVA LÓGICA: Renderizado por Bloques (Estructura Flexible)
    // -----------------------------------------------------
    if (data.bloques && data.bloques.length > 0) {
        data.bloques.forEach(bloque => {
            html += `<div class="mb-5">
                <h4 class="mb-4 fw-bold pb-2 border-bottom text-dark">${bloque.titulo}</h4>`;

            // TIPO: CARDS-GRID (Íconos específicos y bordes de color)
            if (bloque.tipo === 'cards-grid') {
                html += `<div class="row g-4 justify-content-center">`;
                bloque.contenido.forEach(item => {
                    html += `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm border-0 border-top border-4" style="border-color: ${item.colorBorde} !important;">
                            <div class="card-body text-center">
                                <div class="mb-3">
                                    <i class="bi ${item.icono} display-4" style="color: ${item.colorBorde};"></i>
                                </div>
                                <h5 class="card-title fw-bold mb-3">${item.nombre}</h5>
                                <p class="card-text small text-muted mb-3">${item.desc}</p>
                                <div class="bg-light p-2 rounded">
                                    ${item.ejemplos.map(ej => `<span class="d-block text-dark fw-bold fst-italic" style="font-size: 0.9em;">"${ej}"</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
                html += `</div>`;
            }

            // TIPO: TABLE-COLORFUL (Tabla para Conectores)
            else if (bloque.tipo === 'table-colorful') {
                html += `<div class="table-responsive shadow-sm rounded">
                            <table class="table table-hover mb-0 align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col" style="width: 25%">Tipo</th>
                                        <th scope="col" style="width: 40%">Regla / Uso</th>
                                        <th scope="col" style="width: 35%">Ejemplo</th>
                                    </tr>
                                </thead>
                                <tbody>`;
                const rowColors = ['table-primary', 'table-success', 'table-warning', 'table-info'];
                bloque.contenido.forEach((item, idx) => {
                    const rowClass = rowColors[idx % rowColors.length];
                    html += `
                                    <tr class="${rowClass} bg-opacity-10">
                                        <td class="fw-bold text-dark">${item.nombre}</td>
                                        <td>${item.desc}</td>
                                        <td>${item.ejemplos.map(ej => `<span class="badge bg-white text-dark border border-secondary shadow-sm text-wrap text-start d-block mb-1 fst-italic" style="font-weight: normal; font-size: 0.9em;">${ej}</span>`).join('')}</td>
                                    </tr>`;
                });
                html += `       </tbody>
                            </table>
                        </div>`;
            }

            // TIPO: POST-IT (Nota Curiosa)
            else if (bloque.tipo === 'post-it') {
                html += `<div class="p-4 bg-warning bg-opacity-10 border border-warning rounded shadow position-relative" style="transform: rotate(-1deg);">
                            <i class="bi bi-pin-angle-fill position-absolute top-0 start-50 translate-middle text-danger fs-3"></i>
                            <h5 class="fw-bold text-warning-emphasis mb-3 mt-2"><i class="bi bi-lightbulb-fill me-2"></i>${bloque.contenido[0].titulo || 'Nota'}</h5>
                            <p class="mb-0 text-dark opacity-75 fs-5">${bloque.contenido[0].desc}</p>
                            ${bloque.contenido[0].ejemplos.length > 0 ? `<div class="mt-3 text-center fw-bold fs-4 text-dark fst-italic">${bloque.contenido[0].ejemplos[0]}</div>` : ''}
                          </div>`;
            }

            // TIPO: CARDS (Tarjetas Originales Coloridas)
            else if (bloque.tipo === 'cards') {
                const colores = ['border-primary', 'border-info', 'border-success', 'border-warning', 'border-danger'];
                const colorMap = {
                    'border-primary': '#0d6efd',
                    'border-info': '#0dcaf0',
                    'border-success': '#198754',
                    'border-warning': '#ffc107',
                    'border-danger': '#dc3545'
                };

                html += `<div class="row g-4">`;
                bloque.contenido.forEach((item, idx) => {
                    const colorClass = colores[idx % colores.length];
                    const hexColor = colorMap[colorClass] || '#6c757d';

                    html += `
                    <div class="col-12 col-md-4">
                        <div class="card h-100 border-top border-4 shadow-sm" style="border-color: ${hexColor} !important;">
                            <div class="card-body">
                                <h6 class="card-title fw-bold mb-3" style="color: ${hexColor}">${item.nombre || item.titulo}</h6>
                                <p class="card-text mb-3">${item.desc}</p>`;

                    if (item.ejemplos && item.ejemplos.length > 0) {
                        html += `<div class="bg-light p-2 rounded" style="border-left: 3px solid ${hexColor};">
                                    <small class="d-block fw-bold mb-2" style="color: ${hexColor};">📝 Ejemplo:</small>`;
                        item.ejemplos.forEach(ej => {
                            html += `<small class="d-block mb-1 fst-italic text-dark" style="font-size: 0.9em;">${ej}</small>`;
                        });
                        html += `</div>`;
                    }
                    html += `</div></div></div>`;
                });
                html += `</div>`; // Closing the row for cards
            }

            // TIPO: DIDACTIC (Estilo Pedagógico Diferente al de Reglas)
            else if (bloque.tipo === 'didactic') {
                html += `<div class="col-12">`;
                bloque.contenido.forEach((item, idx) => {
                    const styles = [
                        { border: 'border-primary', bg: 'bg-primary', icon: 'bi-book-half', color: 'text-primary' },
                        { border: 'border-info', bg: 'bg-info', icon: 'bi-lightbulb-fill', color: 'text-info' }
                    ];
                    const style = styles[idx % styles.length];

                    html += `
                    <div class="mb-4 p-4 border rounded shadow-sm position-relative overflow-hidden">
                        <div class="position-absolute top-0 start-0 w-100 h-100 opacity-10 ${style.bg}" style="z-index: 0;"></div>
                        <div class="d-flex align-items-center mb-3 position-relative" style="z-index: 1;">
                            <i class="bi ${style.icon} fs-3 me-3 ${style.color}"></i>
                            <h5 class="fw-bold mb-0 ${style.color}">${item.titulo || item.nombre}</h5>
                        </div>
                        <p class="mb-3 position-relative lead fs-6" style="z-index: 1;">${item.desc}</p>`;

                    if (item.ejemplos && item.ejemplos.length > 0) {
                        html += `<div class="bg-white p-3 rounded border-start border-4 ${style.border} position-relative" style="z-index: 1;">
                                    <small class="d-block fw-bold mb-2 text-uppercase text-muted" style="font-size: 0.75rem; letter-spacing: 1px;">Ejemplo:</small>`;
                        item.ejemplos.forEach(ej => {
                            html += `<div class="d-flex align-items-baseline mb-1">
                                        <i class="bi bi-caret-right-fill me-2 small text-muted"></i>
                                        <span class="fst-italic">${ej}</span>
                                      </div>`;
                        });
                        html += `</div>`;
                    }
                    html += `</div>`;
                });
                html += `</div>`;
            }

            // TIPO: ACCORDION (Acordeón de Bootstrap)
            else if (bloque.tipo === 'accordion') {
                const uniqueId = 'accordion-' + Math.random().toString(36).substr(2, 9);
                html += `<div class="accordion" id="${uniqueId}">`;
                bloque.contenido.forEach((item, idx) => {
                    const itemId = uniqueId + '-item-' + idx;
                    const collapseId = uniqueId + '-collapse-' + idx;
                    const isExpanded = idx === 0 ? 'true' : 'false';
                    const showClass = idx === 0 ? 'show' : '';
                    const collapsedClass = idx === 0 ? '' : 'collapsed';

                    html += `
                    <div class="accordion-item border-0 mb-3 shadow-sm rounded overflow-hidden">
                        <h2 class="accordion-header" id="${itemId}">
                            <button class="accordion-button ${collapsedClass} fw-bold text-dark bg-white py-3" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isExpanded}" aria-controls="${collapseId}">
                                <i class="bi ${item.icono || 'bi-chevron-right'} me-3 fs-5 text-primary"></i>
                                ${item.nombre || item.titulo}
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse ${showClass}" aria-labelledby="${itemId}" data-bs-parent="#${uniqueId}">
                            <div class="accordion-body bg-light">
                                <p class="mb-3">${item.desc}</p>`;

                    if (item.ejemplos && item.ejemplos.length > 0) {
                        html += `<div class="p-3 rounded border-start border-4 border-primary bg-white bg-opacity-50">
                                    <small class="d-block fw-bold mb-2 text-primary">📝 Ejemplo:</small>`;
                        item.ejemplos.forEach(ej => {
                            html += `<small class="d-block mb-1 fst-italic text-dark">${ej}</small>`;
                        });
                        html += `</div>`;
                    }

                    html += `</div></div></div>`;
                });
                html += `</div>`;
            }

            // TIPO: REGLAS (Cajas Verdes - Estilo Clásico)
            else if (bloque.tipo === 'reglas') {
                html += `<div class="col-12">`;
                bloque.contenido.forEach(item => {
                    html += `
                    <div class="mb-3 p-3 border-start border-5 border-success bg-white rounded shadow-sm">
                        <div class="d-flex gap-3">
                            <div class="flex-shrink-0">
                                <i class="bi bi-check-circle-fill text-success fs-4"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="fw-bold mb-2 text-success">${item.titulo || item.nombre}:</h6>
                                <p class="mb-2" style="line-height: 1.6;">${item.desc}</p>`;
                    if (item.ejemplos && item.ejemplos.length > 0) {
                        html += `<div class="bg-light p-2 rounded mt-2">
                                    <small class="d-block fw-bold mb-1" style="color: #198754;">📝 Ejemplo:</small>`;
                        item.ejemplos.forEach(ej => {
                            if (ej.includes('Incorrecto:') || ej.includes('Correcto:')) {
                                // Split by <br> or newline to handle multiple lines in one string
                                const lines = ej.split(/<br>|\n/);
                                html += `<div class="d-flex flex-column gap-1">`;
                                lines.forEach(line => {
                                    if (line.trim().toLowerCase().startsWith('incorrecto:')) {
                                        const cleanText = line.trim().replace(/^incorrecto:/i, '').trim();
                                        html += `<div class="d-flex align-items-start text-danger" style="font-size: 0.95em;">
                                                    <i class="bi bi-x-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                                    <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Incorrecto: </span><span class="opacity-75">${cleanText}</span></span>
                                                </div>`;
                                    } else if (line.trim().toLowerCase().startsWith('correcto:')) {
                                        const cleanText = line.trim().replace(/^correcto:/i, '').trim();
                                        html += `<div class="d-flex align-items-start text-success" style="font-size: 0.95em;">
                                                    <i class="bi bi-check-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                                    <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Correcto: </span><span class="fw-bold">${cleanText}</span></span>
                                                </div>`;
                                    } else if (line.trim()) {
                                        html += `<small class="d-block mb-1 fst-italic ps-4" style="font-size: 0.9em;">${line.trim()}</small>`;
                                    }
                                });
                                html += `</div>`;
                            } else {
                                // Default rendering (split by <br> if present for lists)
                                const parts = ej.split('<br>');
                                parts.forEach(part => {
                                    html += `<small class="d-block mb-1 fst-italic">${part.trim()}</small>`;
                                });
                            }
                        });
                        html += `</div>`;
                    }
                    html += `</div></div></div>`;
                });
                html += `</div>`;
            }

            // TIPO: LIST-BLUE (Lista con bi-dot azul)
            else if (bloque.tipo === 'list-blue') {
                html += `<div class="col-12"><ul class="list-unstyled">`;
                bloque.contenido.forEach(item => {
                    html += `
                     <li class="mb-3 d-flex align-items-start">
                        <i class="bi bi-dot text-primary fs-3 me-2" style="line-height: 0.7;"></i>
                        <div>
                            <strong class="d-block text-dark mb-1">${item.nombre}</strong>
                            <span class="text-secondary small" style="line-height: 1.4; display:block;">${item.desc}</span>
                        </div>
                     </li>`;
                });
                html += `</ul></div>`;
            }

            // TIPO: DANGER / WARNING / INFO (Alertas)
            else if (['danger', 'warning', 'info'].includes(bloque.tipo)) {
                const alertType = bloque.tipo === 'danger' ? 'alert-danger' : (bloque.tipo === 'warning' ? 'alert-warning' : 'alert-info');
                const icon = bloque.tipo === 'danger' ? '⚠️' : (bloque.tipo === 'warning' ? '⚙️' : '💡');

                html += `<div class="col-12">`;
                bloque.contenido.forEach(item => {
                    html += `
                        <div class="alert ${alertType} mb-3 shadow-sm" role="alert">
                            <h6 class="alert-heading fw-bold">${icon} ${item.titulo || item.nombre}</h6>
                            <p class="mb-2">${item.desc}</p>`;

                    if (item.ejemplos && item.ejemplos.length > 0) {
                        html += `<div class="bg-white p-2 rounded border-start border-4 border-secondary bg-opacity-10">`;
                        item.ejemplos.forEach(ej => {
                            // Renderizado inteligente de ejemplos (Incorrecto/Correcto)
                            if (ej.includes('Incorrecto:') || ej.includes('Correcto:')) {
                                const lines = ej.split(/<br>|\n/); // Split by <br> or newline
                                lines.forEach(p => {
                                    if (p.trim().startsWith('Incorrecto:')) {
                                        const text = p.replace('Incorrecto:', '').trim();
                                        html += `<div class="small"><span class="text-dark fw-bold">Incorrecto: </span><span class="text-danger">${text}</span></div>`;
                                    }
                                    else if (p.trim().startsWith('Correcto:')) {
                                        const text = p.replace('Correcto:', '').trim();
                                        html += `<div class="small"><span class="text-dark fw-bold">Correcto: </span><span class="text-success">${text}</span></div>`;
                                    }
                                    else if (p.trim()) {
                                        html += `<div class="small fst-italic text-dark">${p}</div>`;
                                    }
                                });
                            } else {
                                html += `<small class="d-block mb-1 fst-italic text-dark">${ej}</small>`;
                            }
                        });
                        html += `</div>`;
                    }
                    html += `</div>`;
                });
                html += `</div>`;
            }

            html += `</div></div>`; // Cierre de row y container mb-5
        });
    }
    // -----------------------------------------------------
    // LÓGICA LEGACY (Para signos antiguos como 'punto')
    // -----------------------------------------------------
    else if (data.tipos && data.tipos.length > 0) {
        html += `<div class="mb-5">
            <h4 class="mb-4 fw-bold pb-2 border-bottom text-dark">🎯 Tipos de punto</h4>
            <div class="row g-4">`;

        const colores = ['border-primary', 'border-info', 'border-success', 'border-warning', 'border-danger'];
        const colorMap = {
            'border-primary': '#0d6efd',
            'border-info': '#0dcaf0',
            'border-success': '#198754',
            'border-warning': '#ffc107',
            'border-danger': '#dc3545'
        };

        data.tipos.forEach((tipo, idx) => {
            const colorClass = colores[idx % colores.length];
            const hexColor = colorMap[colorClass] || '#6c757d';

            html += `
            <div class="col-12 col-md-4">
                <div class="card h-100 border-top border-4 shadow-sm" style="border-color: ${hexColor} !important;">
                    <div class="card-body">
                        <h6 class="card-title fw-bold mb-3" style="color: ${hexColor}">${tipo.nombre}</h6>
                        <p class="card-text mb-3">${tipo.desc}</p>`;

            if (tipo.ejemplos && tipo.ejemplos.length > 0) {
                html += `<div class="bg-light p-2 rounded" style="border-left: 3px solid ${hexColor};">
                            <small class="d-block fw-bold mb-2" style="color: ${hexColor};">📝 Ejemplo:</small>`;

                tipo.ejemplos.forEach(ej => {
                    // Logic for 'Punto y aparte' (special visual separation)
                    if (tipo.nombre === 'Punto y aparte' && ej.includes('<br><br>')) {
                        const parts = ej.split('<br><br>');
                        html += `<small class="d-block mb-1 fst-italic text-dark">${parts[0]}</small>
                                 <div style="border-top: 1px dashed ${hexColor}; margin: 8px 0; opacity: 0.3;"></div>
                                 <small class="d-block mb-1 fst-italic text-dark ps-4 border-start border-2" style="border-color: ${hexColor} !important;">${parts[1]}</small>`;
                    }
                    else {
                        html += `<small class="d-block mb-1 fst-italic text-dark" style="font-size: 0.9em;">${ej}</small>`;
                    }
                });
                html += `</div>`;
            }
            html += `</div></div></div>`;
        });
        html += `</div></div>`;
    }

    // Renderizar Reglas de Oro
    if (data.reglasDeOro && data.reglasDeOro.length > 0) {
        html += `<div class="mb-5">
            <h4 class="mb-4 fw-bold pb-2 border-bottom text-dark">📝 Reglas de oro</h4>`;

        data.reglasDeOro.forEach(regla => {
            const titulo = typeof regla === 'string' ? regla : regla.titulo;
            const desc = typeof regla === 'string' ? '' : regla.desc;
            const ejemplos = typeof regla === 'string' ? [] : (regla.ejemplos || []);

            html += `
                <div class="mb-3 p-3 border-start border-5 border-success bg-white rounded">
                    <div class="d-flex gap-3">
                        <div class="flex-shrink-0">
                            <svg class="text-success" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-2">${titulo}:</h6>
                            <p class="mb-2" style="line-height: 1.6;">${desc}</p>
            `;

            if (ejemplos.length > 0) {
                html += `<div class="bg-light p-2 rounded mt-2">
                            <small class="d-block fw-bold mb-1" style="color: #198754;">📝 Ejemplo:</small>`;
                // Renderizador inteligente de ejemplos
                ejemplos.forEach(ej => {
                    if (ej.includes('Incorrecto:') || ej.includes('Correcto:')) {
                        const lines = ej.split('\n');
                        html += `<div class="d-flex flex-column gap-1">`;
                        lines.forEach(line => {
                            if (line.trim().toLowerCase().startsWith('incorrecto:')) {
                                const cleanText = line.replace(/incorrecto:/i, '').trim();
                                html += `<div class="d-flex align-items-start text-danger" style="font-size: 0.95em;">
                                            <i class="bi bi-x-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Incorrecto: </span><span class="opacity-75">${cleanText}</span></span>
                                          </div>`;
                            } else if (line.trim().toLowerCase().startsWith('correcto:')) {
                                const cleanText = line.replace(/correcto:/i, '').trim();
                                html += `<div class="d-flex align-items-start text-success" style="font-size: 0.95em;">
                                            <i class="bi bi-check-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Correcto: </span><span class="fw-bold">${cleanText}</span></span>
                                          </div>`;
                            } else if (line.trim()) {
                                html += `<small class="d-block mb-1 fst-italic ps-4" style="font-size: 0.9em;">${line}</small>`;
                            }
                        });
                        html += `</div>`;
                    } else {
                        // Renderizar listas si hay múltiples líneas (no indentadas)
                        const items = [];
                        let current = '';
                        const lines = ej.split('\n');
                        lines.forEach(line => {
                            if (line.match(/^\s+/) && current) {
                                current += '\n' + line;
                            } else {
                                if (current) items.push(current);
                                current = line;
                            }
                        });
                        if (current) items.push(current);

                        if (items.length > 1) {
                            items.forEach(item => {
                                html += `<div class="d-flex align-items-start mb-1">
                                            <span class="me-2 text-secondary" style="font-size: 1.2rem; line-height: 1;">•</span>
                                            <small class="fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${item}</small>
                                         </div>`;
                            });
                        } else {
                            html += `<small class="d-block mb-1 fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${ej}</small>`;
                        }
                    }
                });
                html += `</div>`;
            }

            html += `</div></div></div>`;
        });
    }

    // Renderizar Casos Especiales
    if (data.casosEspeciales && data.casosEspeciales.length > 0) {
        html += `<div class="mb-5">
            <h4 class="mb-4 fw-bold pb-2 border-bottom text-dark">⚙️ Casos especiales y combinaciones</h4>`;

        data.casosEspeciales.forEach(caso => {
            html += `
                <div class="alert alert-warning mb-3" role="alert">
                    <h6 class="alert-heading fw-bold">${caso.titulo}</h6>
                    <p class="mb-2">${caso.desc}</p>
            `;

            if (caso.ejemplos && caso.ejemplos.length > 0) {
                html += `<div class="bg-light p-2 rounded">
                            <small class="d-block fw-bold mb-1">📝 Ejemplo:</small>`;
                // Renderizador inteligente de ejemplos
                caso.ejemplos.forEach(ej => {
                    if (ej.includes('Incorrecto:') || ej.includes('Correcto:')) {
                        const lines = ej.split('\n');
                        html += `<div class="d-flex flex-column gap-1">`;
                        lines.forEach(line => {
                            if (line.trim().toLowerCase().startsWith('incorrecto:')) {
                                const cleanText = line.replace(/incorrecto:/i, '').trim();
                                html += `<div class="d-flex align-items-start text-danger" style="font-size: 0.95em;">
                                            <i class="bi bi-x-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Incorrecto: </span><span class="opacity-75">${cleanText}</span></span>
                                          </div>`;
                            } else if (line.trim().toLowerCase().startsWith('correcto:')) {
                                const cleanText = line.replace(/correcto:/i, '').trim();
                                html += `<div class="d-flex align-items-start text-success" style="font-size: 0.95em;">
                                            <i class="bi bi-check-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Correcto: </span><span class="fw-bold">${cleanText}</span></span>
                                          </div>`;
                            } else if (line.trim()) {
                                html += `<small class="d-block mb-1 fst-italic ps-4" style="font-size: 0.9em;">${line}</small>`;
                            }
                        });
                        html += `</div>`;
                    } else {
                        // Renderizar listas si hay múltiples líneas (no indentadas)
                        const items = [];
                        let current = '';
                        const lines = ej.split('\n');
                        lines.forEach(line => {
                            if (line.match(/^\s+/) && current) {
                                current += '\n' + line;
                            } else {
                                if (current) items.push(current);
                                current = line;
                            }
                        });
                        if (current) items.push(current);

                        if (items.length > 1) {
                            items.forEach(item => {
                                html += `<div class="d-flex align-items-start mb-1">
                                            <span class="me-2 text-secondary" style="font-size: 1.2rem; line-height: 1;">•</span>
                                            <small class="fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${item}</small>
                                         </div>`;
                            });
                        } else {
                            html += `<small class="d-block mb-1 fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${ej}</small>`;
                        }
                    }
                });
                html += `</div>`;
            }

            html += `</div>`;
        });
        html += `</div>`;
    }

    // Renderizar Zona de Peligro
    if (data.zonasPeligro && data.zonasPeligro.length > 0) {
        html += `<div class="mb-5">
            <h4 class="mb-4 fw-bold pb-2 border-bottom text-dark">❌ Zona de peligro - errores frecuentes</h4>`;

        data.zonasPeligro.forEach(zona => {
            // Lógica especial: Si es 'Siglas', usar estilo azul (info), si no rojo (peligro)
            const isSiglas = zona.titulo === 'Siglas';
            const alertType = isSiglas ? 'alert-info' : 'alert-danger';
            const icon = isSiglas ? '💡' : '⚠️';

            html += `
                <div class="alert ${alertType} mb-3" role="alert">
                    <h6 class="alert-heading fw-bold">${icon} ${zona.titulo}</h6>
                    <p class="mb-2">${zona.desc}</p>
            `;

            if (zona.ejemplos && zona.ejemplos.length > 0) {
                html += `<div class="bg-light p-2 rounded">
                            <small class="d-block fw-bold mb-1">📝 Ejemplo:</small>`;
                // Renderizador inteligente de ejemplos
                zona.ejemplos.forEach(ej => {
                    if (ej.includes('Incorrecto:') || ej.includes('Correcto:')) {
                        const lines = ej.split('\n');
                        html += `<div class="d-flex flex-column gap-1">`;
                        lines.forEach(line => {
                            if (line.trim().toLowerCase().startsWith('incorrecto:')) {
                                const cleanText = line.replace(/incorrecto:/i, '').trim();
                                html += `<div class="d-flex align-items-start text-danger" style="font-size: 0.95em;">
                                            <i class="bi bi-x-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Incorrecto: </span><span class="opacity-75">${cleanText}</span></span>
                                          </div>`;
                            } else if (line.trim().toLowerCase().startsWith('correcto:')) {
                                const cleanText = line.replace(/correcto:/i, '').trim();
                                html += `<div class="d-flex align-items-start text-success" style="font-size: 0.95em;">
                                            <i class="bi bi-check-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <span class="fst-italic"><span class="text-dark fw-bold" style="font-style: normal;">Correcto: </span><span class="fw-bold">${cleanText}</span></span>
                                          </div>`;
                            } else if (line.trim()) {
                                html += `<small class="d-block mb-1 fst-italic ps-4" style="font-size: 0.9em;">${line}</small>`;
                            }
                        });
                        html += `</div>`;
                    } else {
                        // Renderizar listas si hay múltiples líneas (no indentadas)
                        const items = [];
                        let current = '';
                        const lines = ej.split('\n');
                        lines.forEach(line => {
                            if (line.match(/^\s+/) && current) {
                                current += '\n' + line;
                            } else {
                                if (current) items.push(current);
                                current = line;
                            }
                        });
                        if (current) items.push(current);

                        if (items.length > 1) {
                            items.forEach(item => {
                                html += `<div class="d-flex align-items-start mb-1">
                                            <span class="me-2 text-secondary" style="font-size: 1.2rem; line-height: 1;">•</span>
                                            <small class="fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${item}</small>
                                         </div>`;
                            });
                        } else {
                            html += `<small class="d-block mb-1 fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${ej}</small>`;
                        }
                    }
                });
                html += `</div>`;
            }

            html += `</div>`;
        });
        html += `</div>`;
    }

    // Renderizar Datos Curiosos (Ahora maneja 'Siglas' de forma especial si es necesario, aunque por defecto es info)
    if (data.datosCuriosos && data.datosCuriosos.length > 0) {
        html += `<div class="mb-5">
            <h4 class="mb-4 fw-bold pb-2 border-bottom text-dark">💡 Dato curioso</h4>`; // Added Title

        data.datosCuriosos.forEach(dato => {
            const titulo = typeof dato === 'string' ? dato : dato.titulo;
            const desc = typeof dato === 'string' ? '' : dato.desc;
            const ejemplos = typeof dato === 'string' ? [] : (dato.ejemplos || []);

            // Mantener estilo alert-info (celeste) por defecto para datos curiosos
            html += `
                <div class="alert alert-info mb-3" role="alert">
                    <h6 class="alert-heading fw-bold">💡 ${titulo}</h6>
            `;

            if (desc) {
                html += `<p class="mb-2">${desc}</p>`;
            }

            if (ejemplos.length > 0) {
                html += `<div class="bg-light p-2 rounded">
                            <small class="d-block fw-bold mb-1">📝 Ejemplo:</small>`;
                ejemplos.forEach(ej => {
                    html += `<small class="d-block mb-1 fst-italic" style="white-space: pre-wrap; font-size: 0.9em;">${ej}</small>`;
                });
                html += `</div>`;
            }

            html += `</div>`;
        });
        html += `</div>`;
    }

    contentDiv.innerHTML = html;
}

function initBiblioteca() {
    const menu = document.getElementById('bib-menu');
    if (!menu) return;

    const signos = ['punto', 'coma', 'puntocoma', 'dospuntos', 'puntos_suspensivos', 'comillas', 'parentesis', 'exclamacion', 'interrogacion'];

    signos.forEach((signo, index) => {
        const btn = document.createElement('button');
        btn.className = 'list-group-item list-group-item-action bib-menu-btn' + (index === 0 ? ' list-group-item-success' : '');
        btn.setAttribute('data-signo', signo);
        btn.type = 'button';

        // Mostrar solo símbolo en móvil, nombre completo con símbolo en desktop
        btn.innerHTML = `
            <span class="bib-menu-label-full">${libraryData[signo].nombreCompleto} <span style="color: #4361ee; font-weight: 800;">( <span style="color: #FF6B6B;">${libraryData[signo].simbolo}</span> )</span></span>
            <span class="d-md-none" style="color: #FF6B6B; font-weight: 800;">${libraryData[signo].simbolo}</span>
        `;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.bib-menu-btn').forEach(b => b.classList.remove('list-group-item-success'));
            btn.classList.add('list-group-item-success');
            renderBiblioteca(signo);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        menu.appendChild(btn);
    });

    // Renderizar primer signo por defecto
    renderBiblioteca('punto');
}

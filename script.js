document.addEventListener('DOMContentLoaded', () => {
    // ==================================================
    // 1. MOSTRAR / OCULTAR INDICE DE CONTENIDOS (TOC)
    // ==================================================
    const toggleTocLink = document.getElementById('toggle-toc');
    const tocList = document.getElementById('toc-list');

    if (toggleTocLink && tocList) {
        tocList.style.display = 'block'; // Asegurar visible por defecto
        
        toggleTocLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (tocList.style.display === 'none') {
                tocList.style.display = 'block';
                toggleTocLink.textContent = 'ocultar';
            } else {
                tocList.style.display = 'none';
                toggleTocLink.textContent = 'mostrar';
            }
        });
    }

    // ==================================================
    // 2. BUSCADOR ESTILO AUTOCOMPLETADO DE WIKIPEDIA
    // ==================================================
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Obtener los datos de las secciones del índice para las sugerencias
    const sections = Array.from(document.querySelectorAll('#toc-list a')).map(anchor => {
        const numSpan = anchor.querySelector('.tocnumber');
        const textSpan = anchor.querySelector('.toctext');
        return {
            id: anchor.getAttribute('href').substring(1),
            number: numSpan ? numSpan.textContent : '',
            title: textSpan ? textSpan.textContent : anchor.textContent
        };
    });

    // Crear el contenedor de sugerencias
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'search-suggestions-box';
    suggestionsContainer.style.position = 'absolute';
    suggestionsContainer.style.top = '100%';
    suggestionsContainer.style.left = '0';
    suggestionsContainer.style.width = '100%';
    suggestionsContainer.style.backgroundColor = '#ffffff';
    suggestionsContainer.style.border = '1px solid #a2a9b1';
    suggestionsContainer.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
    suggestionsContainer.style.zIndex = '999';
    suggestionsContainer.style.display = 'none';
    suggestionsContainer.style.maxHeight = '220px';
    suggestionsContainer.style.overflowY = 'auto';
    suggestionsContainer.style.fontSize = '11px';
    
    document.getElementById('simpleSearch').appendChild(suggestionsContainer);

    // Escuchar el tipeado
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsContainer.innerHTML = '';
        
        if (query.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const filtered = sections.filter(sec => sec.title.toLowerCase().includes(query));

        if (filtered.length === 0) {
            const noRes = document.createElement('div');
            noRes.style.padding = '6px 8px';
            noRes.style.color = '#72777d';
            noRes.style.fontStyle = 'italic';
            noRes.textContent = 'Sin coincidencias';
            suggestionsContainer.appendChild(noRes);
        } else {
            filtered.forEach(sec => {
                const sugg = document.createElement('div');
                sugg.className = 'search-sugg-item';
                sugg.style.padding = '6px 8px';
                sugg.style.cursor = 'pointer';
                sugg.style.borderBottom = '1px solid #f6f6f6';
                sugg.innerHTML = `<span style="color:#72777d; font-family:monospace; margin-right:4px;">${sec.number}</span><strong>${sec.title}</strong>`;
                
                // Efecto hover
                sugg.addEventListener('mouseover', () => {
                    sugg.style.backgroundColor = '#eaecf0';
                });
                sugg.addEventListener('mouseout', () => {
                    sugg.style.backgroundColor = '#ffffff';
                });

                // Clicar en la sugerencia
                sugg.addEventListener('click', () => {
                    // Scroll suave al artículo
                    const targetEl = document.getElementById(sec.id);
                    if (targetEl) {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    searchInput.value = sec.title;
                    suggestionsContainer.style.display = 'none';
                });
                suggestionsContainer.appendChild(sugg);
            });
        }
        
        suggestionsContainer.style.display = 'block';
    });

    // Cerrar sugerencias al hacer clic fuera del buscador
    document.addEventListener('click', (e) => {
        if (!document.getElementById('simpleSearch').contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Realizar la búsqueda al hacer clic en el botón de la lupa
    const executeSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) return;

        // Intentar coincidir de forma exacta
        const match = sections.find(sec => sec.title.toLowerCase() === query);
        if (match) {
            const targetEl = document.getElementById(match.id);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Coincidir con la primera que contenga la palabra
            const fuzzyMatch = sections.find(sec => sec.title.toLowerCase().includes(query));
            if (fuzzyMatch) {
                const targetEl = document.getElementById(fuzzyMatch.id);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                alert(`No se encontró ninguna sección con el nombre "${searchInput.value}"`);
            }
        }
        suggestionsContainer.style.display = 'none';
    };

    searchButton.addEventListener('click', executeSearch);

    // Permitir buscar apretando Enter en la caja de texto
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch();
        }
    });
});

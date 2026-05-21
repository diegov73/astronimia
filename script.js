document.addEventListener('DOMContentLoaded', () => {
    // ==================================================
    // 1. ALTERNANCIA DE PESTAÑAS (ARTÍCULO VS DISCUSIÓN)
    // ==================================================
    const tabArticle = document.getElementById('tab-article');
    const tabTalk = document.getElementById('tab-talk');
    
    const liArticle = document.getElementById('ca-nstab-main');
    const liTalk = document.getElementById('ca-talk');
    
    const articleWrapper = document.getElementById('article-content-wrapper');
    const talkWrapper = document.getElementById('talk-content-wrapper');

    const showArticle = (e) => {
        if (e) e.preventDefault();
        
        articleWrapper.style.display = 'block';
        talkWrapper.style.display = 'none';
        
        liArticle.classList.add('selected');
        liTalk.classList.remove('selected');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showTalk = (e) => {
        if (e) e.preventDefault();
        
        articleWrapper.style.display = 'none';
        talkWrapper.style.display = 'block';
        
        liTalk.classList.add('selected');
        liArticle.classList.remove('selected');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    tabArticle.addEventListener('click', showArticle);
    tabTalk.addEventListener('click', showTalk);

    // Si el enlace tiene un hash de discusión o queremos ir directo
    const handleHashChange = () => {
        if (window.location.hash.startsWith('#talk-')) {
            showTalk();
        }
    };
    window.addEventListener('hashchange', handleHashChange);

    // ==================================================
    // 2. MOSTRAR / OCULTAR INDICE DE CONTENIDOS (TOC)
    // ==================================================
    const toggleTocLink = document.getElementById('toggle-toc');
    const tocList = document.getElementById('toc-list');

    if (toggleTocLink && tocList) {
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
    // 3. BUSCADOR ESTILO AUTOCOMPLETADO DE WIKIPEDIA
    // ==================================================
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchform');
    
    // Obtener los datos de las secciones del índice para las sugerencias
    const sections = Array.from(document.querySelectorAll('#toc-list a')).map(anchor => {
        const numSpan = anchor.querySelector('.tocnumber');
        const textSpan = anchor.querySelector('.toctext');
        return {
            id: anchor.getAttribute('href').substring(1),
            number: numSpan ? numSpan.textContent : '',
            title: textSpan ? textSpan.textContent : anchor.textContent,
            element: anchor
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
    suggestionsContainer.style.maxHeight = '280px';
    suggestionsContainer.style.overflowY = 'auto';
    suggestionsContainer.style.fontSize = '12px';
    
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
            noRes.style.padding = '8px 12px';
            noRes.style.color = '#72777d';
            noRes.style.fontStyle = 'italic';
            noRes.textContent = 'Sin sugerencias coincidentes';
            suggestionsContainer.appendChild(noRes);
        } else {
            filtered.forEach(sec => {
                const sugg = document.createElement('div');
                sugg.className = 'search-sugg-item';
                sugg.style.padding = '8px 12px';
                sugg.style.cursor = 'pointer';
                sugg.style.borderBottom = '1px solid #f6f6f6';
                sugg.innerHTML = `<span style="color:#72777d; font-family:monospace; margin-right:6px;">${sec.number}</span><strong>${sec.title}</strong>`;
                
                // Efecto hover
                sugg.addEventListener('mouseover', () => {
                    sugg.style.backgroundColor = '#eaecf0';
                });
                sugg.addEventListener('mouseout', () => {
                    sugg.style.backgroundColor = '#ffffff';
                });

                // Clicar en la sugerencia
                sugg.addEventListener('click', () => {
                    showArticle(); // Asegurar que estamos en el artículo
                    
                    // Scroll suave
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

    // Manejar envío del formulario
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        if (query.length === 0) return;

        // Intentar coincidir de forma exacta
        const match = sections.find(sec => sec.title.toLowerCase() === query);
        if (match) {
            showArticle();
            const targetEl = document.getElementById(match.id);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Coincidir con la primera que contenga la palabra
            const fuzzyMatch = sections.find(sec => sec.title.toLowerCase().includes(query));
            if (fuzzyMatch) {
                showArticle();
                const targetEl = document.getElementById(fuzzyMatch.id);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                alert(`No se encontró ninguna sección con el nombre "${searchInput.value}"`);
            }
        }
        suggestionsContainer.style.display = 'none';
    });
});

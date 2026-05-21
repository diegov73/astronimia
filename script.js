document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. MANEJO DE MENÚ MÓVIL (HAMBURGUESA)
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Cambiar icono de hamburguesa a cruz
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    };

    mobileToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Cerrar sidebar al hacer clic en un enlace de navegación (móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // ==========================================
    // 2. FUNCIONALIDAD DEL ACORDEÓN (INTERACCIONES)
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Por defecto, abrir el primer elemento del acordeón
    const firstAccordionItem = document.querySelector('.accordion-item');
    if (firstAccordionItem) {
        firstAccordionItem.classList.add('active');
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains('active');

            // Cerrar todos los elementos
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Si no estaba activo, abrir el seleccionado
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. BUSCADOR INTERACTIVO EN TIEMPO REAL
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const wikiSections = document.querySelectorAll('.wiki-section');
    const searchIcon = document.querySelector('.search-box i');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let matchCount = 0;

        // Cambiar icono si hay texto para permitir limpiar la búsqueda
        if (searchTerm.length > 0) {
            searchIcon.className = 'fa-solid fa-circle-xmark';
            searchIcon.style.cursor = 'pointer';
        } else {
            searchIcon.className = 'fa-solid fa-magnifying-glass';
            searchIcon.style.cursor = 'default';
        }

        wikiSections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const title = section.querySelector('h2').textContent.toLowerCase();
            const content = section.querySelector('.content-body').textContent.toLowerCase();
            const sidebarLink = document.getElementById(`link-${sectionId}`);

            // Buscar en el título o en el contenido del artículo
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                section.style.display = 'block'; // Mostrar sección
                if (sidebarLink) sidebarLink.parentElement.style.display = 'block'; // Mostrar en menú lateral
                matchCount++;
            } else {
                section.style.display = 'none'; // Ocultar sección
                if (sidebarLink) sidebarLink.parentElement.style.display = 'none'; // Ocultar en menú lateral
            }
        });

        // Manejar mensaje de no resultados si fuera necesario
        let noResultsMessage = document.getElementById('no-results-msg');
        if (matchCount === 0) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'no-results-msg';
                noResultsMessage.className = 'callout callout-warning';
                noResultsMessage.style.maxWidth = '800px';
                noResultsMessage.innerHTML = `
                    <div class="callout-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
                    <div class="callout-content">
                        <h4>No se encontraron resultados</h4>
                        <p>No pudimos encontrar secciones que coincidan con la búsqueda "<strong>${e.target.value}</strong>". Intenta con otros términos estelares como "Vía Láctea", "fusión", "gravedad" o "estrellas".</p>
                    </div>
                `;
                document.getElementById('content-area').insertBefore(noResultsMessage, document.getElementById('recursos'));
            } else {
                noResultsMessage.querySelector('strong').textContent = e.target.value;
                noResultsMessage.style.display = 'flex';
            }
        } else {
            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';
            }
        }
    });

    // Limpiar buscador al hacer clic en la "X"
    searchIcon.addEventListener('click', () => {
        if (searchIcon.classList.contains('fa-solid fa-circle-xmark')) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        }
    });

    // ==========================================
    // 4. RESALTADO AUTOMÁTICO DE SECCIÓN ACTIVA (SCROLL)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Activar cuando está en la zona central de lectura
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // Solo actua si las secciones están visibles (no filtradas por buscador)
            if (entry.isIntersecting && entry.target.style.display !== 'none') {
                const id = entry.target.getAttribute('id');
                
                // Desactivar todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Activar enlace correspondiente
                const activeLink = document.getElementById(`link-${id}`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Registrar todas las secciones en el observador
    wikiSections.forEach(section => {
        observer.observe(section);
    });
});

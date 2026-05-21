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
});

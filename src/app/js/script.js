// Agregar el evento para ocultar el spinner cuando la página cargue completamente
window.addEventListener('load', function() {
    const spinnerWrapper = document.querySelector('.spinner-wrapper');
    spinnerWrapper.style.opacity = '0';
    setTimeout(() => {
        spinnerWrapper.style.display = 'none';
    }, 200);
});
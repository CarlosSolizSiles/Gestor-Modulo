// Agregar el contenido del nav junto con el botón de modo oscuro
document.getElementById('nav').innerHTML = `
    <div class="modulo"></div>
    <h3 class="modulo-nombre">ABM</h3>
    <div class="contenedor-opciones"></div>
    <div class="modulo">
        <h3 class="modulo-nombre">ODI</h3>
        <div class="contenedor-opciones">
            <a href="index.html" class="opcion-nav" data-page="index.html">
                <p>Inicio</p>
            </a>
            <a href="herramientas-pedidas.html" class="opcion-nav" data-page="herramientas-pedidas.html">
                <p>Herramientas Pedidas</p>
            </a>
            <a href="tu-pedido.html" class="opcion-nav" data-page="tu-pedido.html">
                <p>Visualizar Pedidos</p>
            </a>
            <a href="chatbot/index.html" class="opcion-nav" data-page="chatbot">
                <p>ChatBot</p>
            </a>
            <a href="trash/panolero/cambiar-estado-pedido.html" class="opcion-nav" data-page="cambiar-estado-pedido.html">
                <p>Cambiar el estado del pedido</p>
            </a>
        </div>
    </div>
    <button id="dark-mode-toggle" class="dark-mode-btn" >Modo Oscuro</button>
`;

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || "index.html";
    localStorage.setItem('activePage', currentPage);

    document.querySelectorAll('.opcion-nav').forEach(opcion => {
        opcion.classList.remove('active');
        if (opcion.getAttribute('data-page') === currentPage) {
            opcion.classList.add('active');
        }
    });
}

setActiveLink();

document.querySelectorAll('.opcion-nav').forEach(opcion => {
    opcion.addEventListener('click', function () {
        document.querySelectorAll('.opcion-nav').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        localStorage.setItem('activePage', this.getAttribute('data-page'));
    });
});

// Función para alternar el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    document.getElementById('dark-mode-toggle').textContent = isDarkMode ? "Modo Claro" : "Modo Oscuro";
}

// Añadir el evento para el botón de modo oscuro
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

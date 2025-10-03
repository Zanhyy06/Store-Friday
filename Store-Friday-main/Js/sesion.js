class SessionUI {
    constructor({ navSelector = '.navegacion', linkSesionId = 'link-sesion', linkRegistroId = 'link-registro' } = {}) {
        this.navSelector = navSelector;
        this.linkSesionId = linkSesionId;
        this.linkRegistroId = linkRegistroId;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        const nav = document.querySelector(this.navSelector);
        const linkSesion = document.getElementById(this.linkSesionId);
        const linkRegistro = document.getElementById(this.linkRegistroId);

        if (!usuarioActivo || !nav || !linkSesion) return;

        const saludo = document.createElement('span');
        saludo.textContent = `👋 Hola, ${usuarioActivo.nombre}`;
        saludo.style.marginLeft = '1rem';
        saludo.style.fontWeight = 'bold';
        saludo.style.color = '#FFCE00';
        nav.appendChild(saludo);

        linkSesion.textContent = 'Cerrar Sesión';
        linkSesion.href = '#';
        if (linkRegistro) linkRegistro.style.display = 'none';

        linkSesion.addEventListener('click', () => {
            localStorage.removeItem('usuarioActivo');
            alert('Sesión cerrada correctamente.');
            window.location.href = 'index.html';
        });
    }
}

window.SessionUI = new SessionUI();


// =========================
// Registro de usuario (POO)
// =========================

class RegistrationForm {
    constructor({ formSelector = '.formulario-pro' } = {}) {
        this.formSelector = formSelector;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const form = document.querySelector(this.formSelector);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const documentoUsuario = document.getElementById('documento').value.trim();
        const nombreUsuario = document.getElementById('nombre').value.trim();
        const apellidoUsuario = document.getElementById('apellido').value.trim();
        const emailUsuario = document.getElementById('email').value.trim();

        if (!documentoUsuario || !nombreUsuario || !apellidoUsuario || !emailUsuario) {
            this.showError('Por favor, completa todos los campos.');
            return;
        }

        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExistente = usuariosRegistrados.some((user) => user.email === emailUsuario);
        if (usuarioExistente) {
            this.showError('Este correo ya está registrado. Usa otro.');
            return;
        }

        const nuevoUsuario = {
            nombre: nombreUsuario,
            apellido: apellidoUsuario,
            email: emailUsuario,
            documento: documentoUsuario,
            password: documentoUsuario
        };

        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

        this.showSuccess('Registro exitoso. Tu contraseña es tu número de documento.');
        window.location.href = 'Iniciar-sesion.html';
    }

    showError(mensaje) { alert('⚠️ ' + mensaje); }
    showSuccess(mensaje) { alert('✅ ' + mensaje); }
}

window.RegistrationForm = new RegistrationForm();

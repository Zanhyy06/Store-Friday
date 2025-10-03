
class LoginForm {
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
        const emailUsuario = document.getElementById('email').value.trim();
        const passwordUsuario = document.getElementById('password').value.trim();

        if (!emailUsuario || !passwordUsuario) { this.showError('Por favor, completa todos los campos.'); return; }

        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioValido = usuariosRegistrados.find((user) => user.email === emailUsuario && user.password === passwordUsuario);

        if (usuarioValido) {
            this.showSuccess(`Bienvenido ${usuarioValido.nombre} ${usuarioValido.apellido} 👋`);
            localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
            window.location.href = 'index.html';
        } else {
            this.showError('Credenciales incorrectas. Intenta de nuevo.');
        }
    }

    showError(mensaje) { alert('⚠️ ' + mensaje); }
    showSuccess(mensaje) { alert('✅ ' + mensaje); }
}

window.LoginForm = new LoginForm();

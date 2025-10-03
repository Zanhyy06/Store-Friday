// recuperar.js (POO)

class RecoveryForm {
    constructor({ formId = 'form-recuperar' } = {}) {
        this.formId = formId;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const form = document.getElementById(this.formId);
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const emailUsuario = document.getElementById('email').value;
        if (!emailUsuario) { this.showError('Por favor ingresa tu correo registrado'); return; }

        const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem('codigoRecuperacion', codigoRecuperacion);
        localStorage.setItem('correoRecuperacion', emailUsuario);

        this.showSuccess(`Se ha enviado un código de recuperación al correo: ${emailUsuario}\nCódigo temporal: ${codigoRecuperacion}`);
        window.location.href = 'verificar-codigo.html';
    }

    showError(mensaje) { alert('⚠️ ' + mensaje); }
    showSuccess(mensaje) { alert('✅ ' + mensaje); }
}

window.RecoveryForm = new RecoveryForm();

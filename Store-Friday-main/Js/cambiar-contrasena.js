
// =========================
// Cambio de contraseña (POO)
// =========================

class ChangePasswordForm {
    constructor({ formId = 'form-cambiar', messageId = 'mensaje-cambio' } = {}) {
        this.formId = formId;
        this.messageId = messageId;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const form = document.getElementById(this.formId);
        if (!form) return;
        form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
    }

    handleSubmit() {
        const nuevaContrasena = document.getElementById('nueva-contrasena').value;
        const confirmarContrasena = document.getElementById('confirmar-contrasena').value;

        if (nuevaContrasena.length < 6) { this.showError('La contraseña debe tener al menos 6 caracteres.'); return; }
        if (nuevaContrasena !== confirmarContrasena) { this.showError('Las contraseñas no coinciden.'); return; }

        const emailRecuperacion = localStorage.getItem('correoRecuperacion');
        if (!emailRecuperacion) { this.showError('No se encontró el correo para recuperar la contraseña.'); return; }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const idx = usuarios.findIndex(u => u.email === emailRecuperacion);
        if (idx === -1) { this.showError('No se encontró el usuario.'); return; }

        usuarios[idx].password = nuevaContrasena;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        this.showSuccess('Contraseña cambiada exitosamente.');
        setTimeout(() => { window.location.href = 'Iniciar-sesion.html'; }, 2000);
    }

    showError(mensaje) {
        const el = document.getElementById(this.messageId);
        if (el) el.innerHTML = `<p style='color:red;'>⚠️ ${mensaje}</p>`;
        else alert('⚠️ ' + mensaje);
    }

    showSuccess(mensaje) {
        const el = document.getElementById(this.messageId);
        if (el) el.innerHTML = `<p style='color:green;'>✅ ${mensaje}</p>`;
        else alert('✅ ' + mensaje);
    }
}

window.ChangePasswordForm = new ChangePasswordForm();

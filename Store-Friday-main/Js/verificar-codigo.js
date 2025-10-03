// ========================================
// Verificación de código de recuperación (POO)
// ========================================

class CodeVerifier {
    constructor({ formId = 'form-verificar', messageId = 'mensaje-verificacion' } = {}) {
        this.formId = formId;
        this.messageId = messageId;
        this.form = null;
        this.messageEl = null;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        this.form = document.getElementById(this.formId);
        this.messageEl = document.getElementById(this.messageId);
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const codigoIngresado = document.getElementById('codigo').value;
            const codigoGuardado = localStorage.getItem('codigoRecuperacion');

            if (codigoIngresado === codigoGuardado) {
                this.showSuccess('Código correcto. Puedes cambiar tu contraseña.');
                setTimeout(() => { window.location.href = 'cambiar-contraseña.html'; }, 1500);
            } else {
                this.showError('Código incorrecto. Intenta nuevamente.');
            }
        });
    }

    showError(mensaje) {
        if (this.messageEl) this.messageEl.innerHTML = `<p style='color:red;font-weight:bold;'>⚠️ ${mensaje}</p>`;
        else alert('⚠️ ' + mensaje);
    }

    showSuccess(mensaje) {
        if (this.messageEl) this.messageEl.innerHTML = `<p style='color:green;font-weight:bold;'>✅ ${mensaje}</p>`;
        else alert('✅ ' + mensaje);
    }
}

// Exponer instancia global para compatibilidad
window.CodeVerifier = new CodeVerifier();

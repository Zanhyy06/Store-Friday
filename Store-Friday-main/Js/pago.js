// Pago de la compra + Factura PDF (POO)

class PaymentForm {
    constructor({ formId = 'form-pago', instruccionesId = 'instrucciones-pago' } = {}) {
        this.formId = formId;
        this.instruccionesId = instruccionesId;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        document.querySelectorAll('input[name="pago"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const info = document.getElementById('financiera-info');
                if (['Nequi','Daviplata','Bancolombia'].includes(this.value)) info.style.display = 'block';
                else info.style.display = 'none';
            });
        });

        const form = document.getElementById(this.formId);
        if (!form) return;
        form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
    }

    handleSubmit() {
        const metodoPago = document.querySelector("input[name='pago']:checked")?.value;
        const instruccionesPago = document.getElementById(this.instruccionesId);
        let mensaje = '';

        if (["Nequi", "Daviplata", "Bancolombia"].includes(metodoPago)) {
            const titular = document.getElementById('titular').value.trim();
            const documento = document.getElementById('documento').value.trim();
            const cuenta = document.getElementById('cuenta').value.trim();
            let errores = [];
            if (!titular) errores.push('El nombre del titular es obligatorio.');
            if (!documento) errores.push('El documento de identidad es obligatorio.');
            if (!cuenta) errores.push('El número de cuenta o teléfono es obligatorio.');
            if (errores.length > 0) {
                instruccionesPago.innerHTML = `<div style='color:#d32f2f; font-size:1.4rem;'>${errores.join('<br>')}</div>`;
                instruccionesPago.setAttribute('aria-live','assertive');
                return;
            }
        }

        switch (metodoPago) {
            case 'Nequi': mensaje = '<h3>📲 Pago con Nequi</h3><p>Transfiere al número <strong>300 123 4567</strong>.</p>'; break;
            case 'Daviplata': mensaje = '<h3>📲 Pago con Daviplata</h3><p>Transfiere al número <strong>301 987 6543</strong>.</p>'; break;
            case 'Bancolombia': mensaje = '<h3>🏦 Bancolombia</h3><p>Cuenta de ahorros <strong>1234-5678-9012</strong>.</p>'; break;
            case 'Contra entrega': mensaje = '<h3>📦 Contra entrega</h3><p>Pagas en efectivo al recibir.</p>'; break;
        }

        if (instruccionesPago) instruccionesPago.innerHTML = mensaje;

        setTimeout(() => {
            this.generarFacturaPDF(metodoPago);
            this.showSuccess(`Tu pago con ${metodoPago} ha sido registrado exitosamente.\nGracias por tu compra.`);
            window.location.href = 'index.html';
        }, 3000);
    }

    generarFacturaPDF(metodoPago) {
        const { jsPDF } = window.jspdf || {};
        if (!jsPDF) return;
        const doc = new jsPDF();

        const titular = document.getElementById('titular')?.value || 'N/A';
        const documento = document.getElementById('documento')?.value || 'N/A';
        const cuenta = document.getElementById('cuenta')?.value || 'N/A';

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        doc.setFontSize(18);
        doc.text('Factura de Compra', 70, 20);
        doc.setFontSize(12);
        doc.text(`Cliente: ${titular}`, 20, 40);
        doc.text(`Documento: ${documento}`, 20, 50);
        doc.text(`Método de pago: ${metodoPago}`, 20, 60);
        if (['Nequi','Daviplata','Bancolombia'].includes(metodoPago)) doc.text(`Cuenta/Teléfono: ${cuenta}`, 20, 70);

        let y = 90;
        carrito.forEach((item, index) => {
            doc.text(`${index+1}. ${item.nombre} - Talla: ${item.talla} - Cant: ${item.cantidad}`, 20, y);
            doc.text(`Precio: $${item.precio.toLocaleString()} - Subtotal: $${(item.precio * item.cantidad).toLocaleString()}`, 20, y+10);
            y += 20;
        });

        doc.setFontSize(14);
        doc.text(`Total: $${total.toLocaleString()}`, 20, y+10);
        doc.save('Factura_Compra.pdf');
    }

    showSuccess(mensaje) { alert('✅ ' + mensaje); }
}

window.PaymentForm = new PaymentForm();

// =========================
// Carrito en la página carrito.html (POO)
// =========================

class CartPage {
    constructor({ storageKey = 'carrito', listId = 'carrito-lista', totalId = 'total-carrito', contadorId = 'contador-carrito' } = {}) {
        this.storageKey = storageKey;
        this.listEl = document.getElementById(listId);
        this.totalEl = document.getElementById(totalId);
        this.contadorId = contadorId;
        this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];

        document.addEventListener('DOMContentLoaded', () => {
            this.listEl = document.getElementById(listId);
            this.totalEl = document.getElementById(totalId);
            this.renderizarTablaCarrito();
            this.actualizarContadorCarrito();
        });
    }

    save() { localStorage.setItem(this.storageKey, JSON.stringify(this.items)); }

    renderizarTablaCarrito() {
        if (!this.listEl) return;
        this.listEl.innerHTML = '';
        let total = 0;

        if (this.items.length === 0) {
            this.listEl.innerHTML = "<tr><td colspan='6'>El carrito está vacío</td></tr>";
            if (this.totalEl) this.totalEl.textContent = 'Total: $0';
            this.actualizarContadorCarrito();
            return;
        }

        this.items.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.talla}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio.toLocaleString()}</td>
                <td>$${subtotal.toLocaleString()}</td>
                <td><button aria-label="Eliminar producto del carrito" data-index="${index}">❌</button></td>
            `;
            fila.querySelector('button')?.addEventListener('click', () => this.eliminarProductoDelCarrito(index));
            this.listEl.appendChild(fila);
        });

        if (this.totalEl) this.totalEl.textContent = `Total: $${total.toLocaleString()}`;
        this.actualizarContadorCarrito();
    }

    eliminarProductoDelCarrito(index) {
        this.items.splice(index, 1);
        this.save();
        this.renderizarTablaCarrito();
    }

    vaciarCarrito() {
        this.items = [];
        this.save();
        this.renderizarTablaCarrito();
    }

    actualizarContadorCarrito() {
        const contador = document.getElementById(this.contadorId);
        if (!contador) return;
        let cantidad = 0;
        this.items.forEach(item => { cantidad += Number(item.cantidad); });
        contador.textContent = cantidad;
    }
}

// Instancia global y funciones compatibles
window.CartPage = new CartPage();
window.eliminarProductoDelCarrito = (index) => window.CartPage.eliminarProductoDelCarrito(index);
window.vaciarCarrito = () => window.CartPage.vaciarCarrito();

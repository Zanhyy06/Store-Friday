
// =========================
// Carrito reescrito con POO (Product + Cart)
// =========================

const STORAGE_KEY = "carrito";

class Product {
    constructor(nombre, precio, talla, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.talla = talla;
        this.cantidad = cantidad;
    }

    equals(other) {
        return other && this.nombre === other.nombre && this.talla === other.talla;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.load();
    }

    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            this.items = raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Error cargando carrito desde localStorage:", e);
            this.items = [];
        }
        // Mantener compatibilidad global con código existente
        window.carrito = this.items;
    }

    save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
        } catch (e) {
            console.error("Error guardando carrito en localStorage:", e);
        }
        // Mantener compatibilidad global con código existente
        window.carrito = this.items;
    }

    addFromForm(form) {
        const nombreProducto = form.dataset.nombre;
        const precioProducto = parseFloat(form.dataset.precio);
        const tallaInput = form.querySelector(".talla");
        const cantidadInput = form.querySelector(".cantidad");

        const tallaSeleccionada = tallaInput ? tallaInput.value : "";
        const cantidadSeleccionada = cantidadInput ? parseInt(cantidadInput.value) : 1;

        if (!tallaSeleccionada) {
            this.showError("Debes seleccionar una talla");
            return;
        }
        if (!Number.isInteger(cantidadSeleccionada) || cantidadSeleccionada < 1) {
            this.showError("La cantidad debe ser al menos 1");
            return;
        }

        const newProduct = new Product(nombreProducto, precioProducto, tallaSeleccionada, cantidadSeleccionada);
        this.addProduct(newProduct);
        this.save();
        this.updateCounter();
        this.showSuccess(`${cantidadSeleccionada} ${nombreProducto} (talla ${tallaSeleccionada}) agregado(s) al carrito`);
    }

    addProduct(product) {
        const existente = this.items.find(item => item.nombre === product.nombre && item.talla === product.talla);
        if (existente) {
            existente.cantidad = (parseInt(existente.cantidad) || 0) + product.cantidad;
        } else {
            // Guardamos como objeto plano para facilitar serialización
            this.items.push({ nombre: product.nombre, precio: product.precio, talla: product.talla, cantidad: product.cantidad });
        }
    }

    getTotalQuantity() {
        return this.items.reduce((acc, item) => acc + (parseInt(item.cantidad) || 0), 0);
    }

    updateCounter() {
        const contador = document.getElementById("contador-carrito");
        if (contador) {
            contador.textContent = this.getTotalQuantity();
        }
    }

    showError(mensaje) {
        // Implementación accesible mínima; se puede mejorar con un live region
        alert("⚠️ " + mensaje);
    }

    showSuccess(mensaje) {
        alert("✅ " + mensaje);
    }
}

// Instancia singleton del carrito
const carritoInst = new Cart();

// Exponer referencias globales (compatibilidad con código existente)
window.Carrito = carritoInst;
window.carrito = carritoInst.items;

// Inicialización: asocia eventos y actualiza contador
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".agregar-carrito").forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            carritoInst.addFromForm(form);
        });
    });
    carritoInst.updateCounter();
});

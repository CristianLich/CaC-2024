// Variables globales para el carrito
let carrito = [];
const container = document.getElementById('container');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Función para obtener y mostrar los juegos desde el servidor
function fetchJuegos() {
    fetch('/juegos')
        .then(response => response.json())
        .then(juegos => {
            console.log(juegos.data,"hice click");
            const juegosTotales = juegos.length; // Total de juegos disponibles
            const juegosPorFila = [4, 3, 4, 3]; // Patrón de juegos por fila

            let currentItem = 0;
            let patternIndex = 0;

            while (currentItem < juegosTotales) {
                const row = document.createElement('div');
                row.classList.add('row');

                const juegosEnFila = juegosPorFila[patternIndex];

                for (let i = 0; i < juegosEnFila && currentItem < juegosTotales; i++) {
                    const juego = juegos[currentItem];
                    const item = createItem(juego);
                    row.appendChild(item);
                    currentItem++;
                }

                container.appendChild(row);
                patternIndex = (patternIndex + 1) % juegosPorFila.length;
            }
        })
        .catch(error => console.error('Error al obtener los juegos:', error));
}

// Función para crear una tarjeta de juego con su parte frontal y trasera
function createItem(juego) {
    const item = document.createElement('div');
    item.classList.add('item');

    // Parte frontal de la tarjeta
    const front = document.createElement('div');
    front.classList.add('item-front');
    front.innerHTML = `
        <img src="${juego.URL_imagen}" alt="${juego.Titulo}" class="item-image" />
        <div class="item-footer">
            <div class="price-button-container">
                <span id="price-${juego.ID_juego}" class="price">$${juego.Precio}</span>
                <a href="#" class="buy-button" onclick="addToCart(event, ${juego})">Comprar</a>
            </div>
        </div>
    `;

    // Parte trasera de la tarjeta
    const back = document.createElement('div');
    back.classList.add('item-back');
    back.innerHTML = `
        <h3>${juego.Titulo}</h3>
        <p><strong>Género:</strong> ${juego.Categoria}</p>
        <p><strong>Descripción:</strong> ${juego.Descripcion}</p>
    `;

    item.appendChild(front);
    item.appendChild(back);

    // Agregar evento de click para el flip desde la parte frontal y trasera
    [front, back].forEach(side => {
        side.addEventListener('click', (event) => {
            if (!event.target.closest('.price-button-container')) {
                item.classList.toggle('flip');
            }
        });
    });

    return item;
}

// Función para agregar un juego al carrito
function addToCart(event, juego) {
    event.preventDefault();
    const existingItem = carrito.find(item => item.ID_juego === juego.ID_juego);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        juego.quantity = 1;
        carrito.push(juego);
    }

    updateCart();
}

// Función para eliminar un juego del carrito
function removeFromCart(juegoID) {
    carrito = carrito.filter(item => item.ID_juego !== juegoID);
    updateCart();
}

// Función para reducir la cantidad de un juego en el carrito
function reduceQuantity(juegoID) {
    const item = carrito.find(item => item.ID_juego === juegoID);

    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(juegoID);
    }

    updateCart();
}

// Función para actualizar el carrito en la interfaz
function updateCart() {
    cartItems.innerHTML = '';

    carrito.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.Titulo} x${item.quantity}</span>
            <button onclick="reduceQuantity(${item.ID_juego})">-</button>
            <button onclick="removeFromCart(${item.ID_juego})">Remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    const totalPrice = carrito.reduce((total, item) => total + item.Precio * item.quantity, 0);
    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Función para finalizar la compra
function checkout() {
    fetch('/compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrito)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Compra realizada:', data);
        carrito = [];
        updateCart();
        alert('Compra realizada con éxito!');
    })
    .catch(error => console.error('Error en la compra:', error));
}

// Obtener los juegos al cargar la página
document.addEventListener('DOMContentLoaded', fetchJuegos);

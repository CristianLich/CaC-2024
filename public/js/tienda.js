let cart = [];
let totalPrice = 0;

document.getElementById('cart-button').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'block';
});

document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'none';
});

// Función para actualizar el contador del carrito en el header
function updateCartCount() {
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Función para cambiar el texto del botón de compra
function updateBuyButton(juegoID) {
    const button = document.querySelector(`.buy-button[data-id="${juegoID}"]`);
    if (button) {
        button.textContent = cart.find(item => item.juegoID === juegoID) ? 'Añadido' : 'Comprar';
    }
}

// Función para añadir un juego al carrito
function addToCart(event, juegoID, titulo, precio) {
    event.preventDefault();

    const existingGame = cart.find(item => item.juegoID === juegoID);

    if (existingGame) {
        existingGame.quantity++;
    } else {
        const juego = { juegoID, titulo, precio, quantity: 1 };
        cart.push(juego);
    }

    updateCart();
    updateCartCount();
    updateBuyButton(juegoID);
}

// Función para quitar un juego del carrito
function removeFromCart(juegoID) {
    const gameIndex = cart.findIndex(item => item.juegoID === juegoID);

    if (gameIndex > -1) {
        cart[gameIndex].quantity--;

        if (cart[gameIndex].quantity <= 0) {
            cart.splice(gameIndex, 1);
        }
    }

    updateCart();
    updateCartCount();
    updateBuyButton(juegoID);
}

// Función para actualizar el carrito y el total
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    totalPrice = 0;

    cart.forEach(juego => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
            <p>${juego.titulo} - $${juego.precio.toFixed(2)} x ${juego.quantity}</p>
            <button class="delete-button" data-id="${juego.juegoID}" onclick="removeFromCart(${juego.juegoID})">Eliminar</button>
        `;
        cartItemsContainer.appendChild(item);

        totalPrice += juego.precio * juego.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function mostrarFormulario() {
    const formulario = document.getElementById('compra-form');
    formulario.style.display = 'block';
}

const compraForm = document.getElementById('compra-form');

if (compraForm) {
    compraForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cliente: {
                        Nombre: nombre,
                        Apellido: apellido,
                        Email: email
                    },
                    detallesCompra: cart.map(item => ({
                        ID_juego: item.juegoID,
                        cantidad: item.quantity
                    }))
                })
            });

            if (response.ok) {
                const compraCreada = await response.json();
                console.log('Compra creada exitosamente:', compraCreada);
                // Aquí puedes mostrar un mensaje de éxito al usuario o redirigirlo a una página de confirmación
                cart = []; // Limpiar el carrito después de la compra exitosa
                updateCart(); // Actualizar la visualización del carrito
                document.getElementById('compra-form').reset(); // Reiniciar el formulario
                document.getElementById('cart-popup').style.display = 'none'; // Ocultar el popup del carrito
                alert('¡Compra realizada con éxito!');
            } else {
                console.error('Error al crear compra:', response.statusText);
                // Mostrar mensaje de error al usuario según sea necesario
                alert('Hubo un problema al procesar la compra. Por favor, inténtalo nuevamente más tarde.');
            }
        } catch (error) {
            console.error('Error en la solicitud fetch:', error.message);
            // Mostrar mensaje de error al usuario según sea necesario
            alert('Hubo un problema de red al procesar la compra. Por favor, verifica tu conexión e inténtalo nuevamente.');
        }
    });
} else {
    console.error('Formulario de compra no encontrado.');
}

// Función para obtener y mostrar los juegos desde el servidor
function fetchJuegos() {
    fetch('/juegos')
        .then(response => response.json())
        .then(juegos => {
            console.log(juegos.data);
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

    // Asegurarse de que el precio sea un número
    const precio = Number.parseFloat(juego.Precio);

    // Formatear el precio con dos decimales
    const precioFormateado = precio.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Parte frontal de la tarjeta
    const front = document.createElement('div');
    front.classList.add('item-front');
    front.innerHTML = `
        <img src="${juego.URL_imagen}" alt="${juego.Titulo}" class="item-image" />
        <div class="item-footer">
            <div class="price-button-container">
                <span id="price-${juego.ID_juego}" class="price">$${precioFormateado}</span>
                <a href="#" class="buy-button" data-id="${juego.ID_juego}" onclick="addToCart(event, ${juego.ID_juego}, '${juego.Titulo}', ${precio})">Comprar</a>
            </div>
        </div>
    `;

    // Parte trasera de la tarjeta
    const back = document.createElement('div');
    back.classList.add('item-back');
    back.innerHTML = `
        <h3>${juego.Titulo}</h3>
        <p><strong>Género:</strong> ${juego.Categoria}</p>
        <p>${juego.Descripcion}</p>
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

// Obtener los juegos al cargar la página
document.addEventListener('DOMContentLoaded', fetchJuegos);






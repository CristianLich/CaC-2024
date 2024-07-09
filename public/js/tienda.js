// codigo de la tienda


function fetchJuegos() {
    fetch('/juegos')
        .then(response => response.json())
        .then(juegos => {
            const tbody = document.getElementById('juegosTable').querySelector('tbody');
            tbody.innerHTML = '';

            juegos.forEach(juego => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${juego.Titulo}</td>
                    <td>${juego.Categoria}</td>
                    <td>${juego.Plataforma}</td>
                    <td>
                        <button onclick="editarJuego(${juego.ID_juego})">Editar</button>
                        <button onclick="eliminarJuego(${juego.ID_juego})">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener los juegos:', error));
}




async function fetchClientes() {
    try {
        const response = await fetch('/clientes');
        const clientes = await response.json();
        const tbody = document.getElementById('clientesTable').querySelector('tbody');

        tbody.innerHTML = '';
        clientes.forEach(cliente => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${cliente.Nombre}</td>
                <td>${cliente.Apellido}</td>
                <td>${cliente.Direccion}</td>
                <td>${cliente.Telefono}</td>
                <td>${cliente.Email}</td>
            `;

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
    }
}


// LOGICA DE LAS TARJETAS Y EL CONTENEDOR DE LOS JUEGOS.

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const items = 14; // Acá definimos los items en total para el contenedor, sencillo de modificar.
    const itemsPerRowPattern = [4, 3, 4, 3]; // Patrón de items por fila.

    let currentItem = 1;
    let patternIndex = 0;

    while (currentItem <= items) {
        const row = document.createElement('div');
        row.classList.add('row');

        const itemsInRow = itemsPerRowPattern[patternIndex];

        for (let i = 0; i < itemsInRow && currentItem <= items; i++) {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <p>${currentItem}</p>
                <div class="item-footer">
                    <div class="price-button-container">
                        <span id="price-${currentItem}" class="price">$${currentItem * 10}</span>
                        <a href="#" class="buy-button" onclick="addToCart(${currentItem})">Comprar</a>
                    </div>
                </div>
            `;
            row.appendChild(item);
            currentItem++;
        }

        container.appendChild(row);
        patternIndex = (patternIndex + 1) % itemsPerRowPattern.length;
    }
});

function addToCart(itemId) {
    // Acá la lógica para linkear el producto al carrito.
    console.log(`Haz agregado ${itemId} al carrito`);
    // DEBERIA SEÑALAR EL TITULO NO EL ID.
    
}

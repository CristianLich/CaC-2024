// codigo de la tienda


function fetchJuegos() {
    fetch('/juegos')
        .then(response => response.json())
        .then(juego => {
            console.log(juego.data);
            const container = document.getElementById('container');
            const juegos = juego.length; // Acá definimos los juegos en total para el contenedor, sencillo de modificar.
            const juegosPerRowPattern = [4, 3, 4, 3]; // Patrón de juegos por fila.

            let currentItem = 1;
            let patternIndex = 0;

            while (currentItem <= juegos) {
                const row = document.createElement('div');
                row.classList.add('row');

                const juegosInRow = juegosPerRowPattern[patternIndex];

                for (let i = 0; i < juegosInRow && currentItem <= juegos; i++) {
                    const item = document.createElement('div');
                    item.classList.add('item');
                    item.innerHTML = `
                        <p>${juego[currentItem-1].Titulo}</p>
                        <div class="item-footer">
                            <div class="price-button-container">
                                <span id="price-${juego[currentItem-1].Precio}" class="price">$${juego[currentItem-1].Precio }</span>
                                <a href="#" class="buy-button" onclick="addToCart(${juego[currentItem-1]})">Comprar</a>
                            </div>
                        </div>
                    `;
                    row.appendChild(item);
                    currentItem++;
                }

                container.appendChild(row);
                patternIndex = (patternIndex + 1) % juegosPerRowPattern.length;
            }
        })
        .catch(error => console.error('Error al obtener los juegos:', error));
}




// async function fetchClientes() {
//     try {
//         const response = await fetch('/clientes');
//         const clientes = await response.json();
//         const tbody = document.getElementById('clientesTable').querySelector('tbody');

//         tbody.innerHTML = '';
//         clientes.forEach(cliente => {
//             const row = document.createElement('tr');

//             row.innerHTML = `
//                 <td>${cliente.Nombre}</td>
//                 <td>${cliente.Apellido}</td>
//                 <td>${cliente.Direccion}</td>
//                 <td>${cliente.Telefono}</td>
//                 <td>${cliente.Email}</td>
//             `;

//             tbody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Error al obtener los clientes:', error);
//     }
// }

async function editarCliente(id) {
    // Aquí podrías mostrar un formulario para editar el cliente.
    const nuevoNombre = prompt('Ingresa el nuevo nombre:');
    if (nuevoNombre) {
        try {
            const response = await fetch(`/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Nombre: nuevoNombre })
            });

            if (response.ok) {
                alert('Cliente actualizado exitosamente.');
                fetchClientes();
            } else {
                alert('Error al actualizar el cliente.');
            }
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
        }
    }
}

async function eliminarCliente(email) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        try {
            const response = await fetch(`/clientes/${email}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Cliente eliminado exitosamente.');
                fetchClientes();
            } else {
                alert('Error al eliminar el cliente.');
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    }
}
document.addEventListener('DOMContentLoaded', fetchClientes);
document.addEventListener('DOMContentLoaded', fetchJuegos);




function addToCart(itemId) {
    // Acá la lógica para linkear el producto al carrito.
    console.log(`Haz agregado ${itemId} al carrito`);
    // DEBERIA SEÑALAR EL TITULO NO EL ID.
    
}
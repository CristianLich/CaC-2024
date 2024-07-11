// import DataTable from 'datatables.net-dt';
let tablaClientes = new DataTable('#tablaClientes', {
    ajax: {
        url: '/clientes',
        dataSrc: function (data) {
            return data
        },
        error: function(xhr, error, thrown) {
            console.error('Error fetching data:', error, thrown)
        }
    },
    columns:[
        {data: 'Nombre'},        
        {data: 'Apellido'},
        {data: 'Email'},
    ]
})

let tablaJuegos = new DataTable('#tablaJuegos', {
    ajax: {
        url: '/juegos',
        dataSrc: function (data) {
            return data
        },
        error: function(xhr, error, thrown) {
            console.error('Error fetching data:', error, thrown)
        }
    },
    columns:[
        {data: 'Titulo'},        
        {data: 'Categoria'},
        {data: 'Precio'},
        {//data-bs-toggle="modal"
            data: null,
            defaultContent: '<span  data-bs-target="#M-Editar" class="material-symbols-outlined table-toggle">manage_accounts</span>',
            orderable: false
        },
        {
            data: null,
            defaultContent: '<span class="material-symbols-outlined table-toggle" data-bs-target="#EliminarJuego">delete</span>',
            orderable: false
        }
    ],
    layout: {
        topStart: function(){
            let btn = document.createElement('button');
            btn.textContent = 'Añadir Juego';
            btn.classList.add('btn', 'btn-primary');
            btn.id = 'btnCrear'

            // btn.addEventListener('click', function(){

            // })
            return btn;
        }
    }
})
  // Añadir manejadores de eventos
$('#tablaJuegos tbody').on('click', 'span[data-bs-target="#M-Editar"]', function() {
    var data = tablaJuegos.row($(this).parents('tr')).data();
    console.log('Editar:', data);
    // Aquí puedes abrir el modal y pasar los datos necesarios
});

$('#tablaJuegos tbody').on('click', 'span[data-bs-target="#EliminarJuego"]', function() {
    var data = tablaJuegos.row($(this).parents('tr')).data();
    console.log('Eliminar:', data);
    // Aquí puedes manejar la eliminación del cliente
});



// let listaClientes;


// //#region CRUD CLIENTES
// function getAll_Clients() {
//     function handleResponse(response)  {
//         if (!response.ok){
//             return Promise.reject(response);
//         }
//         else{
//             return response.json();
//         }
//     }
//     fetch('/clientes')
//         .then(response => handleResponse(response))
//         .then(
//             (dataClientes) => {
//                 listaClientes = dataClientes;
//                 let miTablaClientes = $('#tablaClientes').DataTable();

//                 miTablaClientes.clear();
              
//                 //Agrego las filas a la tabla
//                 dataClientes.forEach(cliente => { 
                //     const fila = [cliente.Nombre, cliente.Apellido , cliente.Email];
                //    fila.push(`<td><span data-bs-toggle="modal" data-bs-target="#M-Editar" class="material-symbols-outlined table-toggle">manage_accounts</span></td>`)
                //     fila.push(`<td><span class="material-symbols-outlined table-toggle" data-bs-target="#EliminarCliente">delete</span></td>`)
//                     miTablaClientes.row.add(fila).draw();
//                 });                
//             }
//         )
//         .catch(error => {
//             console.log(error.message);
//         })
//         .finally(() => {
//             console.log("Promesa finalizada (resuelta o rechazada)");
//         });
// }



// document.addEventListener('DOMContentLoaded', getAll_Clients);





// codigo para DataTable
// $(document).ready(function() {
//     // $('#example').DataTable(); // para inicializar datatables más simple
//     $('#tablaClientes').DataTable({
//         // para cambiar el lenguaje a español
//         "language": {
//             "lengthMenu": "Mostrar _MENU_ registros",
//             "zeroRecords": "No se encontraron resultados",
//             "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
//             "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
//             "infoFiltered": "(filtrado de un total de _MAX_ registros)",
//             "sSearch": "Buscar",
//             "oPaginate": {
//                 "sFirst": "Primero",
//                 "sLast": "Último",
//                 "sNext": "Siguiente",
//                 "sPrevious": "Anterior"
//             },
//             "processing": "Procesando..."
//         }
//     });
// });
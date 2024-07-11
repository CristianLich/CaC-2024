// import DataTable from 'datatables.net-dt';
let tablaClientes = new DataTable("#tablaClientes", {
  ajax: {
    url: "/clientes",
    dataSrc: function (data) {
      return data;
    },
    error: function (xhr, error, thrown) {
      console.error("Error fetching data:", error, thrown);
    },
  },
  columns: [{ data: "Nombre" }, { data: "Apellido" }, { data: "Email" }],
});

// TABLA JUEGOS

let tablaJuegos = new DataTable("#tablaJuegos", {
  select: true,

  ajax: {
    url: "/juegos",
    dataSrc: function (data) {
      return data;
    },
    error: function (xhr, error, thrown) {
      console.error("Error fetching data:", error, thrown);
    },
  },
  columns: [
    { data: "Titulo" ,
        createdCell: function (td, cellData, rowData, row, col) {
            $(td).attr('title', cellData);
        }},
    { data: "Categoria" },
    { data: "Precio" },
    { data: "Desarrollador" },
    { data: "Descripcion",
        createdCell: function (td, cellData, rowData, row, col) {
            $(td).attr('title', cellData);
        }
     },
    { data: "Plataforma" ,
        createdCell: function (td, cellData, rowData, row, col) {
            $(td).attr('title', cellData);
        }},
    { data: "Publicador" },
    { data: "Fecha_lanzamiento" },
  ],
  layout: {
    topStart: [
      function () {
        let btn = document.createElement("button");
        btn.textContent = "Añadir";
        btn.classList.add("btn", "btn-primary", "m-2");
        btn.id = "btnCrear";
        btn.setAttribute("data-bs-toggle", 'modal')
        btn.setAttribute("data-bs-target", '#crearModal')
        return btn;
      },
      function () {
        return `<button
                        class="btn btn-primary m-2"
                        data-bs-toggle='modal'
                        data-bs-target='#editModal'
                        id="btnEditar"
                        disabled
                    >
                        Editar
                    </button>`;
      },
      function () {
        return `<button
                        class="btn btn-danger m-2"
                        id="btnEliminar"
                        disabled
                    >
                        Desactivar
                    </button>`;
      },
    ],
  },
});

//----------------------------------------------------------------
let selectedData = null;

tablaJuegos
  .on("select", function (e, dt, type, indexes) {
    if (type === "row") {
      selectedData = tablaJuegos.rows(indexes).data().toArray()[0];
      console.log(selectedData)
      document.getElementById("btnEditar").disabled = false;
      document.getElementById("btnEliminar").disabled = false;
    }
  })
  .on("deselect", function (e, dt, type, indexes) {
    if (type === "row") {
      selectedData = null;
      document.getElementById("btnEditar").disabled = true;
      document.getElementById("btnEliminar").disabled = true;
    }
  });

  //aca rellenamos los campos del modal de editar
document.getElementById("btnEditar").addEventListener("click", function () {
  if (selectedData) {
    populateModal(selectedData);
  }
});


//Creacion del objeto que se va a mandar con el fetch
document.getElementById("saveChanges").addEventListener("click", function () {
  let formData = new FormData(document.getElementById("editForm"));
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  // Aquí se tiene q hacer un fetch para enviar los datos al servidor y guardar en la base de datos
  console.log("Datos a guardar:", data);
  $("#editModal").modal("hide");
});


function populateModal(data) {
  document.getElementById("EditarID_juego").value = data.ID_juego; //este valor no se ve
  document.getElementById("EditarTitulo").value = data.Titulo;
  document.getElementById("EditarDescripcion").value = data.Descripcion;
  document.getElementById("EditarDesarrollador").value = data.Desarrollador;
  document.getElementById("EditarPublicador").value = data.Publicador;
  document.getElementById("EditarCategoria").value = data.Categoria;
  document.getElementById("EditarFechaLanzamiento").value = data.Fecha_Lanzamiento;
  document.getElementById("EditarPrecio").value = data.Precio;
  document.getElementById("EditarPlataforma").value = data.Plataforma;
  document.getElementById("EditarURLImagen").value = data.URL_imagen;
}






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
//                 let miTablaClientes = $('#tablaClientes').DatatablaJuegos();

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

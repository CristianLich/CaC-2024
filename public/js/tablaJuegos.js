// ///////////////////////////TABLA JUEGOS

let tablaJuegos = new DataTable("#tablaJuegos", {
    select: true,
  
    ajax: {
      url: "/juegos",
      dataSrc: function(data) {
        return data;
      },
      error: function(xhr, error, thrown) {
        console.error("Error fetching data:", error, thrown);
      },
    },
  
    columns: [
      {
        data: "Titulo",
        createdCell: function(td, cellData, rowData, row, col) {
          $(td).attr("title", cellData);
        },
      },
      { data: "Categoria" },
      { data: "Precio" },
      { data: "Desarrollador" },
      {
        data: "Descripcion",
        createdCell: function(td, cellData, rowData, row, col) {
          $(td).attr("title", cellData);
        },
      },
      {
        data: "Plataforma",
        createdCell: function(td, cellData, rowData, row, col) {
          $(td).attr("title", cellData);
        },
      },
      { data: "Publicador" },
      {
        data: "Estado",
        render: function(data, type, row) {
          if (data == 1) {
            return '<span class="estado-activo">Activo</span>';
          } else {
            return '<span class="estado-inactivo">Inactivo</span>';
          }
        },
      },
    ],
  
    layout: {
      topStart: [
        function() {
          let btn = document.createElement("button");
          btn.textContent = "Añadir";
          btn.classList.add("btn", "btn-primary", "m-2");
          btn.id = "btnCrear";
          btn.setAttribute("data-bs-toggle", "modal");
          btn.setAttribute("data-bs-target", "#crearModal");
          return btn;
        },
        function() {
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
        function() {
          return `<button
                          class="btn btn-danger m-2"
                          id="btnDesactivar"
                          disabled
                      >
                          Desactivar
                      </button>`;
        },
        function() {
          return `<button
                          class="btn btn-success m-2"
                          id="btnActivar"
                          disabled
                          hidden
                      >
                          Activar
                      </button>`;
        },
      ],
    },
  });
  
  //----------------------------------------------------------------
  let selectedData = null;
  
  tablaJuegos
    .on("select", function(e, dt, type, indexes) {
      if (type === "row") {
        selectedData = tablaJuegos.rows(indexes).data().toArray()[0];
        console.log(selectedData);
        document.getElementById("btnEditar").disabled = false;
        if(selectedData.Estado === 1){
            document.getElementById("btnDesactivar").disabled = false;
            document.getElementById("btnActivar").hidden = true;
            document.getElementById("btnDesactivar").hidden = false;
        } else {
          document.getElementById("btnDesactivar").hidden = true;
          document.getElementById("btnActivar").hidden = false;
          document.getElementById("btnActivar").disabled = false;
        }
  
      }
    })
    .on("deselect", function(e, dt, type, indexes) {
      if (type === "row") {
        selectedData = null;
        document.getElementById("btnEditar").disabled = true;
        document.getElementById("btnDesactivar").disabled = true;
        document.getElementById("btnDesactivar").hidden = false;
        document.getElementById("btnActivar").hidden = true;
        document.getElementById("btnActivar").disabled = true;
      }
    });
  
  
  //CREAR JUEGOS
  document.getElementById("crearJuego").addEventListener("click", function() {
    let form = document.getElementById("crearForm");
    let formData = new FormData(form);
    let data = {};
  
    // Validar que todos los campos requeridos están completos
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
      formData.forEach((value, key) => {
          if (key === "Precio") {
              data[key] = parseFloat(value);;
          }else {
              data[key] = value;
          }
      });
      console.log(data);
  
      fetch(`/juegos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("ERROR EN LA RESPUESTA.",response.message ,response.status);
        })
        .then((responseData) => {
          console.log("Datos guardados exitosamente:", responseData);
          $("#crearModal").modal("hide");
          document.getElementById("crearForm").reset();
          tablaJuegos.ajax.reload();
          alert("Juego creado correctamente");
        })
        .catch((error) => {
          console.error("Hubo un problema con la petición Fetch:", error);
        });
    });
    
  
  
  
  
  
  
  
  
  
  //EDITAR JUEGOS
  
  //aca rellenamos los campos del modal de editar
  document.getElementById("btnEditar").addEventListener("click", function() {
    if (selectedData) {
      populateModal(selectedData);
    }
  });
  
  //Creacion del objeto que se va a mandar con el fetch
  document.getElementById("guardarCambios").addEventListener("click", function() {
    let formData = new FormData(document.getElementById("editForm"));
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    fetch(`/juegos/${data.ID_juego}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("ERROR EN LA RESPUESTA.");
      })
      .then((responseData) => {
        console.log("Datos guardados exitosamente:", responseData);
        $("#editModal").modal("hide");
        tablaJuegos.ajax.reload();
        alert("Juego actualizado correctamente");
      })
      .catch((error) => {
        console.error("Hubo un problema con la petición Fetch:", error);
      });
  });
  
  function populateModal(data) {
    document.getElementById("EditarID_juego").value = data.ID_juego; //este valor no se ve
    document.getElementById("EditarTitulo").value = data.Titulo;
    document.getElementById("EditarDescripcion").value = data.Descripcion;
    document.getElementById("EditarDesarrollador").value = data.Desarrollador;
    document.getElementById("EditarPublicador").value = data.Publicador;
    document.getElementById("EditarCategoria").value = data.Categoria;
    document.getElementById("EditarPrecio").value = data.Precio;
    document.getElementById("EditarPlataforma").value = data.Plataforma;
    document.getElementById("EditarURLImagen").value = data.URL_imagen;
  }
  
  
  
  document.getElementById("btnDesactivar").addEventListener("click", function(){
      if(selectedData) {
          console.log(selectedData.ID_juego);
          fetch(`/juegos/${selectedData.ID_juego}/desactivar`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              }
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("ERROR EN LA RESPUESTA.");
              })
              .then((responseData) => {
                console.log("Estado actualizado exitosamente:", responseData);
                document.getElementById("btnDesactivar").disabled = true;
                tablaJuegos.ajax.reload();
              })
              .catch((error) => {
                console.error("Hubo un problema con la petición Fetch:", error.message);
              });
      }
  })
  document.getElementById("btnActivar").addEventListener("click", function(){
      if(selectedData) {
          console.log(selectedData.ID_juego);
          fetch(`/juegos/${selectedData.ID_juego}/activar`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              }
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                alert('ERROR AL INTENTAR CREAR EL JUEGO')
                throw new Error("ERROR EN LA RESPUESTA.");
              })
              .then((responseData) => {
                console.log("Estado actualizado exitosamente:", responseData);
                document.getElementById("btnActivar").disabled = true;
                tablaJuegos.ajax.reload();
              })
              .catch((error) => {
                console.error("Hubo un problema con la petición Fetch:", error.message);
              });
      }
  })
  
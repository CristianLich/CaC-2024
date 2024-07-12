///////////////////////////////// TABLA CLIENTES
let tablaClientes = new DataTable("#tablaClientes", {
    ajax: {
      url: "/clientes",
      dataSrc: function(data) {
        return data;
      },
      error: function(xhr, error, thrown) {
        console.error("Error fetching data:", error, thrown);
      },
    },
    columns: [
        { data: "Nombre" }, 
        { data: "Apellido" }, 
        { data: "Email" }],
  });
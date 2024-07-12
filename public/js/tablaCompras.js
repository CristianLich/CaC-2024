///////////////////////////////// TABLA COMPRAS
let tablaCompras = new DataTable("#tablaCompras", {
    ajax: {
      url: "/compras",
      dataSrc: function(data) {
        // Mapea los datos de las compras para incluir el nombre del cliente
        return data.map(compra => {
          return {
            ID_cliente: compra.Cliente.Nombre, // Ajusta según el nombre del atributo que tengas
            Fecha_compra: compra.Fecha_compra,
            Total: compra.Total
          };
        });
      },
      error: function(xhr, error, thrown) {
        console.error("Error fetching data:", error, thrown);
      },
    },
    columns: [
        { data: "ID_cliente" }, 
        { data: "Fecha_compra" },
        { data: "Total" }
    ],
  });

    
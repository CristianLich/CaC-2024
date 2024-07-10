// Función para mostrar el panel correspondiente según la opción seleccionada
function mostrarPanel(accion) {
    // Ocultar todos los paneles
    document.querySelectorAll('.panel').forEach(function(panel) {
        panel.style.display = 'none';
    });

    // Mostrar el panel correspondiente
    if (accion === 'crear') {
        document.getElementById('panel-crear').style.display = 'block';
    } else if (accion === 'modificar') {
        document.getElementById('panel-modificar').style.display = 'block';
    } else if (accion === 'borrar') {
        document.getElementById('panel-borrar').style.display = 'block';
    }
}

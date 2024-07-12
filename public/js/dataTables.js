//FUNCIONES GENERALES

function resetForm(){
  document.getElementById("crearForm").reset();
}
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.sidebar-l');

  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Obtener el ID de la sección a mostrar
          const sectionId = this.getAttribute('data-section');

          // Mostrar la sección correspondiente y ocultar las demás
          const sections = document.querySelectorAll('.container');
          sections.forEach(section => {
              if (section.id === sectionId) {
                  section.removeAttribute('hidden');
              } else {
                  section.setAttribute('hidden', '');
              }
          });
      });
  });
});



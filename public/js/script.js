//--------------- SECTION CONTACTANOS - FORMULARIO ---------------

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessage.innerHTML = '';

        const name = form.name.value.trim();
        const lastname = form.lastname.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!isValidName(name)) {
            errorMessage.innerHTML = 'Por favor ingresá un nombre válido (solo letras).';
            return;
        }

        if (!isValidName(lastname)) {
            errorMessage.innerHTML = 'Por favor ingresá un apellido válido (solo letras).';
            return;
        }

        if (email === '') {
            errorMessage.innerHTML = 'Por favor ingresá tu correo electrónico.';
            return;
        }

        if (!isValidEmail(email)) {
            errorMessage.innerHTML = 'Por favor ingresá un correo electrónico válido.';
            return;
        }

        if (message === '') {
            errorMessage.innerHTML = 'Por favor ingresá tu mensaje.';
            return;
        }

        alert('¡Formulario enviado correctamente! Te responderemos a la brevedad');
        form.reset();
    });

    // Agregar eventos para limpiar el mensaje de error cuando el usuario modifique cualquier campo del formulario
    const fields = [form.name, form.lastname, form.email, form.message];
    fields.forEach(field => {
        field.addEventListener('input', function() {
            errorMessage.innerHTML = '';
        });
    });

    function isValidName(name) {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});


// SECTION CONTENIDO


document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        slides.forEach(slide => slide.style.display = 'none');
        slides[currentSlide].style.display = 'flex';
    }

    function changeSlide(direction) {
        currentSlide += direction;
        showSlide(currentSlide);
    }

    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));

    document.addEventListener('DOMContentLoaded', () => {
        showSlide(currentSlide);
    });
});


// BOTÓN IR ARRIBA

document.addEventListener("DOMContentLoaded", function() {
    
    
    // ... Oculta el botón de "Ir arriba" al cargar la página
    document.getElementById("boton-arriba").style.display = "none";

    // Mostrar u ocultar el botón de "Ir arriba" al hacer scroll
    window.addEventListener("scroll", function() {
        var botonArriba = document.getElementById("boton-arriba");
        var seccionInicio = document.getElementById("inicio");
        var scrollY = window.scrollY || window.pageYOffset;

        // Si el scroll está más abajo de la sección de inicio, mostrar el botón :D
        if (scrollY > seccionInicio.offsetHeight) {
            botonArriba.style.display = "block";
        } else {
            botonArriba.style.display = "none";
        }
    });
});



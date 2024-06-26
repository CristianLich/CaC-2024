
//--------------- Sección CONTACTANOS - FORMULARIO

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


//--------------------------------------------------------------------------

    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const totalSlides = slides.length;

    function showSlides(n) {
        slideIndex = (n + totalSlides) % totalSlides;
        slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    function changeSlide(n) {
        showSlides(slideIndex + n);
        resetAutoSlide();
    }

    function autoSlide() {
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 4000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }

    let autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);

    showSlides(slideIndex);
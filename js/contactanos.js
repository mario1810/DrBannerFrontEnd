const inputEmail = document.getElementById("validarMail");
const inputTelefono = document.getElementById("validarTelefono");
const inputNombre = document.getElementById("validarNombre");

inputEmail.addEventListener("keyup", () => {
    corroborarMail();
  });

inputNombre.addEventListener("keyup", () => {
    corroborarNombre();
  });

inputTelefono.addEventListener("keyup", () => {
    corroborarTelefono();
  });
  
  function corroborarNombre() {
    clear(inputNombre);
    let regex = /^[a-zA-ZÀ-ÿ\s]{1,50}$/ ;//1 a 50 caracteres
    if (regex.test(inputNombre.value)) {
      inputNombre.classList.add("is-valid");
    } else {
      inputNombre.classList.add("is-invalid");
    }
  }
  function corroborarMail() {
    clear(inputEmail);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(inputEmail.value)) {
      inputEmail.classList.add("is-valid");
    } else {
      inputEmail.classList.add("is-invalid");
    }
  }
  function corroborarTelefono() {
    clear(inputTelefono);
    let regex = /^\d{10,14}$/;//10 a 14 num
    if (regex.test(inputTelefono.value)) {
      inputTelefono.classList.add("is-valid");
    } else {
      inputTelefono.classList.add("is-invalid");
    }
  }
    
  function clear(elemento) {
    if (elemento.classList.contains("is-valid")) {
      elemento.classList.remove("is-valid");
    }
    if (elemento.classList.contains("is-invalid")) {
      elemento.classList.remove("is-invalid");
    }
  }

  const formSignin = document.getElementById('form-signin');

  // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
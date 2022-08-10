//Validación
//Log in


function mostrarContra() {
  const visible = document.getElementById("psw");
  if (visible.type === "password") {
    visible.type = "text";
  } else {
    visible.type = "password";
  }
}

const inputEmail = document.getElementById("validarMail");

inputEmail.addEventListener("keyup", () => {
    corroborarMail();
  });

  function corroborarMail() {
    clear(inputEmail);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(inputEmail.value)) {
      inputEmail.classList.add("is-valid");
    } else {
      inputEmail.classList.add("is-invalid");
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


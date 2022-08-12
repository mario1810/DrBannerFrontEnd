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

  const formSignin = document.getElementById('form-signin'); 
 
  formSignin.addEventListener('submit', (event) => { 
      event.preventDefault(); 
      //enviar request para  iniciar sesion en el backend; 
   
      const sessionId = Date.now();// solo para probar, esto debe venir del backend 
       //code - success  
      setCookie('session_id', sessionId, 3); // cookie name, valor, numero de dias para expirar 
      let redirectTo = document.referrer;// de donde venias caso 1 
      if (getCookie('post_login_redirect') ) { //caso2 
          redirectTo = getCookie('post_login_redirect'); 
          deleteCookie('post_login_redirect'); 
      } 
      window.location.href = redirectTo; 
      //code - success 
  })
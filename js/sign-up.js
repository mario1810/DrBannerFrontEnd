//Validación

//Sign In
const inputNombre = document.getElementById("validarNombre");
const inputApellido = document.getElementById("validarApellido");
const inputEmail = document.getElementById("validarEmail");
const inputContra = document.querySelector("#psw");
const btnRegistrarme = document.getElementById("btnRegistrarme");

//-------------------------------------------------------------

inputNombre.addEventListener("keydown", (event) => {
  filtroNombre(event);
});
inputNombre.addEventListener("keyup", () => {
  corroborarNombre();
});

//-----------------------------------------------------------------------
inputApellido.addEventListener("keydown", (event) => {
  filtroApellido(event);
});

inputApellido.addEventListener("keyup", () => {
  corroboraApellido();
});
//-----------------------------------------------------------------------

/* inputEmail.addEventListener("keydown", (event) => {
  filtroEmail(event);
}); */
inputEmail.addEventListener("keyup", () => {
  corroborarEmail();
});

btnRegistrarme.addEventListener("click", ()=>{btnRegistro()
});

function btnRegistro(){
  if (
    inputNombre.classList.contains("is-valid") &&
    inputApellido.classList.contains("is-valid") &&
    inputContra.classList.contains("is-valid") &&
   inputEmail.classList.contains("is-valid")
  ) {
    //Post
    localStorage.setItem('userId', '22');
    window.location.assign("/html/perfil.html");

  } else {
    if (!inputNombre.classList.contains("is-valid")) {
      clear(inputNombre);
      inputNombre.classList.add("is-invalid");
    }
  if (!inputApellido.classList.contains("is-valid")) {
    clear(inputApellido);
    inputApellido.classList.add("is-invalid");
  } 
  if (!inputEmail.classList.contains("is-valid")) {
    clear(inputEmail);
    inputEmail.classList.add("is-invalid");
  } 
  if (!inputContra.classList.contains("is-valid")) {
    clear(inputContra);
    inputContra.classList.add("is-invalid");
  } 
} } 
//-------------------------------------------------------------------


/* inputContra.addEventListener("keydown",(event)=>{
  filtroContra(event)});  */
inputContra.addEventListener("keyup", () => {
  corroborarContra();
});

//Nombre
function filtroNombre(event) {
  let regex = /^[a-zA-ZÀ-ÿ ]+$/;
  if (regex.test(event.key)) {
    return;
  } else {
    event.preventDefault();
  }
}
//Apellido
function filtroApellido(event) {
  let regex = /^[a-zA-ZÀ-ÿ ]+$/;

  if (regex.test(event.key)) {
    return;
  } else {
    event.preventDefault();
  }
}

/*  function filtroContra(event) {
   let regex = /[^A-Za-z0-9]+/;
  if (regex.test(event.key)) {
    return;
  } else {
    event.preventDefault();
  } 
}  */

function corroborarNombre() {
  clear(inputNombre);
  inputNombre.value.length <= 3
    ? inputNombre.classList.add("is-invalid")
    : inputNombre.classList.add("is-valid");
}

function corroboraApellido() {
  clear(inputApellido);
  inputApellido.value.length <= 3
    ? inputApellido.classList.add("is-invalid")
    : inputApellido.classList.add("is-valid");
}

function corroborarEmail() {
  clear(inputEmail);
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(inputEmail.value)) {
    inputEmail.classList.add("is-valid");
  } else {
    inputEmail.classList.add("is-invalid");
  }
}



function corroborarContra() {
  clear(inputContra);
  //Validate lowercase letters
  const lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  const upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  const numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
  if (
    letter.classList.contains("valid") &&
    capital.classList.contains("valid") &&
    number.classList.contains("valid") &&
   length.classList.contains("valid")

  ) {
    
    inputContra.classList.add("is-valid");
  } else {
    inputContra.classList.add("is-invalid");
    
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

let myInput = document.getElementById("psw");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "contents";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
  document.getElementById("message").style.display = "none";
};


function mostrarContraseña() {
  const visible = document.getElementById("psw");
  if (visible.type === "password") {
    visible.type = "text";
  } else {
    visible.type = "password";
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
// Declaracion constantes 

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputFecha = document.getElementById("fecha");
const selectPaquete = document.getElementById("paquete");
const selectTipoPaquete = document.getElementById("tipoPaquete");
const textaraDireccion = document.getElementById("direccion");
const buttunPagar = document.getElementById("pago");




//eventos de ingreso de texto (despues de que el valor ha llegado al input)
inputNombre.addEventListener("keyup", (event) => { corroborarNombre() });
inputApellido.addEventListener("keyup", (event) => { corroborarApellido() });
inputCorreo.addEventListener("keyup", (event) => { corroborarCorreo() });
inputTelefono.addEventListener("keyup", (event) => { corroborarTelefono() });
inputFecha.addEventListener("keyup", (event) => { corroborarFecha() });
selectPaquete.addEventListener("keyup", (event) => { corroborarPaquete() });
selectTipoPaquete.addEventListener("keyup", (event) => { corroborartipoPaquete() });
textaraDireccion.addEventListener("keyup", (event) => { corroborarDireccion() });


//eventos de ingreso de texto (antes de que el valor llegue al input)
inputNombre.addEventListener("keydown", (event) => { filtroNombre(event) });
inputApellido.addEventListener("keydown", (event) => { filtroApellido(event) });
inputCorreo.addEventListener("keydown", (event) => { filtroCorreo(event) });
inputTelefono.addEventListener("keydown", (event) => { filtroTelefono(event) });
inputFecha.addEventListener("keydown", (event) => { filtroFecha(event) });
selectPaquete.addEventListener("keydown", (event) => { filtroPaquete(event) });
selectTipoPaquete.addEventListener("keydown", (event) => { filtrotipoPaquete(event) });
textaraDireccion.addEventListener("keydown", (event) => { filtroDireccion(event) });

//Eventos de botones
buttunPagar.addEventListener("click", () => { window.location.assign("/html/carrito.html"); });

function clear(elemento) {
    if (elemento.classList.contains("is-valid")) {
      elemento.classList.remove("is-valid");
    }
    if (elemento.classList.contains("is-invalid")) {
      elemento.classList.remove("is-invalid");
    }
  }
  

//---------------------------





    function filtroNombre(event) {
     let regex = /^[a-zA-ZÀ-ÿ ]+$/;  
      
        if (regex.test(event.key)) {
          return;
        } else {
          event.preventDefault();
        }
      }
      
   




// -------------------


function filtroApellido(e) {
    let regex = /^[a-zA-ZÀ-ÿ ]+$/;  
      
        if (regex.test(event.key)) {
          return;
        } else {
          event.preventDefault();
        }

}

//---------------

function filtroCorreo(e) {
    clear(inputCorreo);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(inputCorreo.value)) {
      inputCorreo.classList.add("is-valid");
    } else {
      inputCorreo.classList.add("is-invalid");
    }

}

// ------------------
function filtroTelefono(e) {

}

// ------------------

function filtroFecha(e) {

}

// ------------------

function filtroPaquete(e) {

}

// ------------------

function filtrotipoPaquete(e) {

}

// ------------------

function filtroDireccion(e) {

}




// funciones corroborar datos 

function corroborarNombre() {
    
        clear(inputNombre);
        inputNombre.value.length <= 3 
          ? inputNombre.classList.add("is-invalid")
          : inputNombre.classList.add("is-valid");
      
      

    
}

// ------------------


function corroborarApellido() {
    clear(inputApellido);
<<<<<<< HEAD
        inputApellido.value.length <= 3 
          ? inputApellido.classList.add("is-invalid")
          : inputApellido.classList.add("is-valid");
=======
    inputApellido.value.length <= 3 
      ? inputApellido.classList.add("is-invalid")
      : inputApellido.classList.add("is-valid");
  
>>>>>>> subirjs
}

//---------------

function corroborarCorreo() {
    
    clear(inputCorreo);
    inputCorreo.value.length <= 3 
      ? inputCorreo.classList.add("is-invalid")
      : inputCorreo.classList.add("is-valid");
  

}

// ------------------
function corroborarTelefono() {

}

// ------------------

function corroborarFecha() {

}

// ------------------

function corroborarPaquete() {

}

// ------------------

function corroborartipoPaquete() {

}

// ------------------

function corroborarDireccion() {

}

window.addEventListener('DOMContentLoaded', () => { 
<<<<<<< HEAD
    if(isUserLogged() === false) { 
=======
    if(isUserLogged() ===false) { 
>>>>>>> subirjs
        document.getElementById('formulario-citas').classList.remove('d-none') 
        return; 
    } 
    window.location.href = window.location.origin + '/html/login.html' 
});












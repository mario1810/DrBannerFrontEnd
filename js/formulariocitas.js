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
inputNombre.addEventListener("Keydown", (event) => { filtroNombre(event) });
inputApellido.addEventListener("Keydown", (event) => { filtroApellido(event) });
inputCorreo.addEventListener("Keydown", (event) => { filtroCorreo(event) });
inputTelefono.addEventListener("Keydown", (event) => { filtroTelefono(event) });
inputFecha.addEventListener("Keydown", (event) => { filtroFecha(event) });
selectPaquete.addEventListener("Keydown", (event) => { filtroPaquete(event) });
selectTipoPaquete.addEventListener("Keydown", (event) => { filtrotipoPaquete(event) });
textaraDireccion.addEventListener("Keydown", (event) => { filtroDireccion(event) });

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

}

//---------------

function filtroCorreo(e) {

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
}

//---------------

function corroborarCorreo() {

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
    if(isUserLogged() === true) { 
        document.getElementById('formulario-citas').classList.remove('d-none') 
        return; 
    } 
    window.location.href = window.location.origin + '/html/login.html' 
});












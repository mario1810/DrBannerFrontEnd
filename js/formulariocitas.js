// Declaracion decontantes 

const inputNombre=document.getElementById("nombre");
const inputApellido=document.getElementById("apellido");
const inputCorreo=document.getElementById("correo");
const inputTelefono=document.getElementById("telefono");
const inputFecha=document.getElementById("fecha");
const selectPaquete=document.getElementById("paquete");
const selectTipoPaquete=document.getElementById("tipoPaquete");
const textaraDireccion=document.getElementById("direccion");
const buttunPagar=document.getElementById("pago");




//eventos de ingreso de texto (despues de que el valor ha llegado al input)
inputNombre.addEventListener("keyup",(event)=>{corroborarNombre()});
inputApellido.addEventListener("keyup",(event)=>{corroborarApellido()});
inputCorreo.addEventListener("keyup",(event)=>{corroborarCorreo()});
inputTelefono.addEventListener("keyup",(event)=>{corroborarTelefono(event)});
inputFecha.addEventListener("keyup",(event)=>{corroborarFecha()});
selectPaquete.addEventListener("keyup",(event)=>{corroborarPaquete()});
selectTipoPaquete.addEventListener("keyup",(event)=>{corroborartipoPaquete()});
textaraDireccion.addEventListener("keyup",(event)=>{corroborarDireccion()});


//eventos de ingreso de texto (antes de que el valor llegue al input)
inputNombre.addEventListener("Keydown",(event)=>{filtroNombre()});
inputApellido.addEventListener("Keydown",(event)=>{filtroApellido()});
inputCorreo.addEventListener("Keydown",(event)=>{filtroCorreo()});
inputTelefono.addEventListener("Keydown",(event)=>{filtroTelefono(event)});
inputFecha.addEventListener("Keydown",(event)=>{filtroFecha()});
selectPaquete.addEventListener("Keydown",(event)=>{filtroPaquete()});
selectTipoPaquete.addEventListener("Keydown",(event)=>{filtrotipoPaquete()});
textaraDireccion.addEventListener("Keydown",(event)=>{filtroDireccion()});

//Eventos de botones
buttunPagar.addEventListener("click",()=>{window.location.assign("/html/carrito.html"); });











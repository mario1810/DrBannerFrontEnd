// Declaracion decontantes 

const inputNombre=document.getElementById("nombre");
const inputApellido=document.getElementById("apellido");
const inputCorreo=document.getElementById("correo");
const inputTelefono=document.getElementById("telefono");
const inputFecha=document.getElementById("fecha");
const selectPaquete=document.getElementById("paquete");
const selectTipoPaquete=document.getElementById("tipoPaquete");
const textaraDireccion=document.getElementById("direccion");


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
inputNombre.addEventListener("Keydown",(event)=>{corroborarNombre()});
inputApellido.addEventListener("Keydown",(event)=>{corroborarApellido()});
inputCorreo.addEventListener("Keydown",(event)=>{corroborarCorreo()});
inputTelefono.addEventListener("Keydown",(event)=>{corroborarTelefono(event)});
inputFecha.addEventListener("Keydown",(event)=>{corroborarFecha()});
selectPaquete.addEventListener("Keydown",(event)=>{corroborarPaquete()});
selectTipoPaquete.addEventListener("Keydown",(event)=>{corroborartipoPaquete()});
textaraDireccion.addEventListener("Keydown",(event)=>{corroborarDireccion()});






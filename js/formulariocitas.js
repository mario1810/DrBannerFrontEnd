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
inputTarjeta.addEventListener("keyup",(event)=>{corroborarApellido()});
inputMes.addEventListener("keyup",(event)=>{corroborarCorreo()});
inputYear.addEventListener("keyup",(event)=>{corroborarTelefono(event)});
inputCVV.addEventListener("keyup",(event)=>{corroborarFecha()});
inputCVV.addEventListener("keyup",(event)=>{corroborarPaquete()});
inputCVV.addEventListener("keyup",(event)=>{corroborartipoPaquete()});
inputCVV.addEventListener("keyup",(event)=>{corroborarDireccion()});




const USER_INFO_GET_URL = "/assets/json/pagoInfoUserGet.json";
const SERVICE_TYPE = "Json";

/**
 * 
 *                                                                      SOLICITUD FETCH GET
 * 
 */

// GET request for remote image in node.js
async function adquirirDatos(proveedor = "Fetch", direccionhttp) {
    if (proveedor == "Fetch") {
        return new Promise((resolve, reject) => {
        fetch(direccionhttp)
          .then((responseJSON) =>{ return responseJSON.json()})
          .then((usuarioObject) => {
            resolve(usuarioObject.usuario)
          })
          .catch((error) => {
            //console.log(error);
            //reject(error);
            reject(null);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        fetch(direccionhttp)
          .then((responseJSON) => { return responseJSON.json()})
          .then((usuarioObject) => {
                resolve(usuarioObject.usuario)}
            )
          .catch((error) => {
            //console.log(error);
            //reject(error);
            reject(null);
          });
      });
    }
  }
  
 async function solicitudDatosForm() {
    let usuario = await adquirirDatos(SERVICE_TYPE,USER_INFO_GET_URL);
    
    if(usuario!=null){ // Si el fetcjh se realizó de manera correcta 
        //Relleno los campos de mi formulario.
        inputNombre.value=usuario.nombre+" "+usuario.apellido;
        console.log(usuario.tarjeta.numeroTarjeta);
        inputTarjeta.value=usuario.tarjeta.numeroTarjeta;
        inputMes.value=usuario.tarjeta.mes;
        inputYear.value=usuario.tarjeta.anio;
        if(usuario.tarjeta.tipo=="debito"){
            rbTC.checked=false;
            inputGroupMeses.disabled=true;
            rbTD.checked=true;
        }else{
            rbTD.checked=false;
            inputGroupMeses.disabled=false;
            rbTC.checked=true;
        } 
        totPagar.value=usuario.total;

    }
  }


window.addEventListener('load', function() {
    solicitudDatosForm();
});

/**
 * 
 * 
 *              FUNCIONES DE INGRESO DE INFORMACIÓN
 * 
 */

/**
 * Esta función  realiza un filtro sobre que acaracteres aparecerán en el input nombre
 * @param {event} e Es el evento que disparo esta función 
 */
function filtroTexto(e){
    //Expresión regular para comprobar si solo hay letras, letras acentuadas y espacios con JavaScript
    let regex = /^[a-zA-ZÀ-ÿ ]+$/;
    //test es un método de la expresión regular (como length) para comprobar si tiene un caracter fuera de la expresión regulr o no
    if(regex.test(e.key)){
        //El caracter es una letra, mayus o minus, con o sin acento, o un espacio: llegará al input
    }else{
        /**
         Una llamada a preventDefault() del evento keydown impide la emisión del consiguiente evento keypress
         //En otras palabras, el input no notará que se ha presionado una tecla, y por tanto no aparece
         */
        e.preventDefault();
    }
}


/**
 * Esta función  realiza un filtro para solo aceptar números, no pongo  type="number" en html para
 * no mostrar el incrementador (botones para incrementar en una unidad) por defecto que muestra el el elemento Input cuando son números. Además 
 * evito que el usuario meta números negativos
 * @param {event} e Es el evento que disparo esta función 
 */
function filtroNumeroTarjeta(e){

//Si el caracter es back space lo dejamos pasar al input
    if(e.key.charCodeAt(0)==66) 
    {
        let len=inputTarjeta.value.length-1;
        //Una posición antes de la que quiero eliminar
        if(len>3 && inputTarjeta.value[(len-1)]==" "){
            inputTarjeta.value=inputTarjeta.value.slice(0,len);
            //Borro un elemento, el espacio lo borrará con la tecla que se presionó
        }
        return;
    }
    else{

        //Expresión regular 
        let regex = /^[0-9]+$/;
        //Número de caracteres en el input + 1 (la tecla que presiono)
        //Expresión regular para quitar los espacios y obtener la longitud sin espacios
        let contenidoInputLen=inputTarjeta.value.replace(/ /g, "").length+1;
        //Compruebo que sólo sean números y que haya máximo 16 caracteres
        if(regex.test(e.key) && contenidoInputLen<=16){
             //Agregar ceros cada cuatro digitos
            if((contenidoInputLen-1)%4==0 && contenidoInputLen<=16){
                inputTarjeta.value=inputTarjeta.value+" ";
            }
            //El caracter llegará al input
        }else{
            /**
             Una llamada a preventDefault() del evento keydown impide la emisión del consiguiente evento keypress
            //En otras palabras, el input no notará que se ha presionado una tecla, y por tanto no aparece
            */
            e.preventDefault();
        }
    }
}

/**
 *  Sólo dejaraá parasar el backspace y los números 1-12 (2 digitos).no pongo  type="number" en html para
 * no mostrar el incrementador (botones para incrementar en una unidad) por defecto que muestra el el elemento Input cuando son números.
 * @param {evento} e Es el evento que disparó esta función
 */

function filtroNumeroMes(e){


    //Si el caracter es back space lo dejamos pasar al input
    if(e.key.charCodeAt(0)==66) 
    {
        return;
    }
    else{
        //Expresión regular 
        let regex = /^[0-9]+$/;
        //Compruebo que sólo sean números
        if(regex.test(e.key)){
            //Número de caracteres en el input + 1 (la tecla que presiono)
            let contenidoInputLen=inputMes.value.length+1;
            //Compruebo que hayan máximo 2 caracteres
            if(contenidoInputLen<=2){ 
                    //Valor númerico de la entrada
                    let valorNumerico;
                    //¿Es el primer número que se introduce?
                    if(inputMes.value==""){ 
                        valorNumerico=parseInt(e.key);
                    }else{
                        // No es el primer número que se introduce
                        valorNumerico=parseInt(inputMes.value);
                        if(valorNumerico==0 && parseInt(e.key)==0){
                            e.preventDefault();    
                        }
                        valorNumerico=valorNumerico*10+parseInt(e.key);
                        
                    }
                    if(valorNumerico>=0 && valorNumerico<13){
                        //Dejamos llegar el caracter al input, saliendonos de la función
                        return; 
                    }
                    else{
                        e.preventDefault();
                    }
                    
            }else{
                e.preventDefault();
            }
        }else{
            /**
             Una llamada a preventDefault() del evento keydown impide la emisión del consiguiente evento keypress
            //En otras palabras, el input no notará que se ha presionado una tecla, y por tanto no aparece
            */
            e.preventDefault();
        }
    }
}


/**
 *  Sólo dejaraá parasar el backspace y los números 1-99 (2 digitos).no pongo  type="number" en html para
 * no mostrar el incrementador (botones para incrementar en una unidad) por defecto que muestra el el elemento Input cuando son números.
 * @param {evento} e Es el evento que disparó esta función
 */

 function filtroNumeroYear(e){
        //Si el caracter es back space lo dejamos pasar al input
        if(e.key.charCodeAt(0)==66) 
        {
            return;
        }
        else{
            //Expresión regular 
            let regex = /^[0-9]+$/;
            //Compruebo que sólo sean números
            if(regex.test(e.key)){
                //Número de caracteres en el input + 1 (la tecla que presiono)
                let contenidoInputLen=inputYear.value.length+1;
                //Compruebo que hayan máximo 2 caracteres
                if(contenidoInputLen<=2){ 
                    //En esta parte coprobare el año de caducidad de la tarjeta
                    //Valor númerico de la entrada
                    let valorNumerico;
                    //¿Es el primer número que se introduce? (2-9)
                    if(inputYear.value==""){ 
                        valorNumerico=parseInt(e.key);
                        if(valorNumerico>=Math.trunc((parseInt(new Date().getFullYear())-2000)/10) && valorNumerico<=9){
                            //Dejamos llegar el caracter al input, saliendonos de la función
                            return; 
                        }
                        else{
                            e.preventDefault();
                        }
                    }else{
                        // No es el primer número que se introduce
                       valorNumerico=parseInt(inputYear.value);
                       valorNumerico=valorNumerico*10+parseInt(e.key);                       
                        if(valorNumerico>=(parseInt(new Date().getFullYear())-2000) && valorNumerico<=99){
                       //Dejamos llegar el caracter al input, saliendonos de la función
                            return;  
                        }
                        else{
                            e.preventDefault();
                        }

                    }

                }else{
                    e.preventDefault();
                }
            }else{
                /**
                 Una llamada a preventDefault() del evento keydown impide la emisión del consiguiente evento keypress
                //En otras palabras, el input no notará que se ha presionado una tecla, y por tanto no aparece
                */
                e.preventDefault();
            }
        }
    }
    
/**
 *  Sólo dejará parasar el backspace y los números 0-9 (3 digitos).no pongo  type="number" en html para
 * no mostrar el incrementador (botones para incrementar en una unidad) por defecto que muestra el el elemento Input cuando son números.
 * @param {evento} e Es el evento que disparó esta función
 */

 function filtroNumeroCVV(e){

    //Si el caracter es back space lo dejamos pasar al input
    if(e.key.charCodeAt(0)==66) 
    {
        return;
    }
    else{
        //Expresión regular 
        let regex = /^[1-9]+$/;
        //Número de caracteres en el input + 1 (la tecla que presiono)
        let contenidoInputLen=inputCVV.value.length+1;
        //Compruebo que sólo sean números y que haya al final máximo 3 caracteres
        if(regex.test(e.key) && contenidoInputLen<=3){
            //El caracter llegará al input
        }else{
            /**
             Una llamada a preventDefault() del evento keydown impide la emisión del consiguiente evento keypress
            //En otras palabras, el input no notará que se ha presionado una tecla, y por tanto no aparece
            */
            e.preventDefault();
        }
    }
}


/***
 * 
 *                                          FUNCIONES AUXILIARES
 * 
 */

function clear(elemento){

    if(elemento.classList.contains("is-valid")){
        elemento.classList.remove("is-valid");
    }
    if(elemento.classList.contains("is-invalid")){
        elemento.classList.remove("is-invalid");   
    }
}

/**
 * 
 * 
 *                                       FUNCIONES DE FORMATO (Fuera de foco)
 * 
 */

 function  addCeroMes(){
    clear(inputMes);
    let len=inputMes.value;
    if(len.length==1){
        if(inputMes.value=="0"){
            inputMes.value=inputMes.value+"1";
        }
        else{
            inputMes.value="0"+inputMes.value;
        }
    }
    len=inputMes.value;
    if(len.length<2){
        inputMes.classList.add("is-invalid");
    }
    else{
        inputMes.classList.add("is-valid");
                
    }
 }

 function  addCeroYear(){
    clear(inputYear)
    let val=inputYear.value;
    if(val.length==1){
        if(val==Math.trunc((parseInt(new Date().getFullYear())-2000)/10)){ // Si es el año actual 22 (decena correcta)
            inputYear.value=(parseInt(new Date().getFullYear())-2000);
        }else{ 
            inputYear.value=inputYear.value+"0";
        }
    }
    val=inputYear.value;
    if(val.length<2){
        inputYear.classList.add("is-invalid");
    }else{
        inputYear.classList.add("is-valid");
    }
 }

 function focusCVV(){
    clear(inputCVV)
    if(inputCVV.value.length==3){
        inputCVV.classList.add("is-valid");
    }
    else{
        inputCVV.classList.add("is-invalid");
    }
 }

 function focusTarjeta(){
    clear(inputTarjeta)
    if(inputTarjeta.value.replace(/ /g, "").length==16){
        inputTarjeta.classList.add("is-valid");
    }else{
        inputTarjeta.classList.add("is-invalid");
    }
 }

 function focusNombre(){
        clear(inputNombre);
        const nombres=inputNombre.value.split(" ");
        if(nombres.length>=2){
            if(nombres[0].length>0 && nombres[1].length>0){
                inputNombre.classList.add("is-valid");
                return;
            }
        }
        inputNombre.classList.add("is-invalid");  
}
/**
 * 
 *                                      FUNCIONES DE BOTONES
 * 
 * 
 */

function corroborarNombre(flag){
    clear(inputNombre);
    const nombres=inputNombre.value.split(" ");
    if(nombres.length>=2){
        if(nombres[0].length>0 && nombres[1].length>0){
            inputNombre.classList.add("is-valid");
            return flag;
        }
    }
    inputNombre.classList.add("is-invalid");  
    return false;
}

function corroborarTarjeta(flag){
    clear(inputTarjeta);
    if(inputTarjeta.value.replace(/ /g, "").length<16){
        inputTarjeta.classList.add("is-invalid");
        return false;
    }else{
        inputTarjeta.classList.add("is-valid");
        return flag;
    }
}
function corroborarCVV(flag){
    clear(inputCVV);
    if(inputCVV.value.length<3){
        inputCVV.classList.add("is-invalid");
        return false;
    }else{
        inputCVV.classList.add("is-valid");
        return flag;
    }
}

function corroborarMes(flag){
     //Comporbación de fecha de caducidad a lo más igual a la actual
     clear(inputMes);
     let fecha =new Date();
     let mes=parseInt(fecha.getMonth())+1;
     let anio=parseInt(fecha.getFullYear())-2000;
     if(inputMes.value.length<2 || (parseInt(inputMes.value)<mes && parseInt(inputYear.value)==anio)){
         inputMes.classList.add("is-invalid");
         return false;
     }
     else{
        inputMes.classList.add("is-valid");
        return flag
     }
}
function corroborarYear(flag){
    clear(inputYear);
    if(inputYear.value.length<=1){
        inputYear.classList.add("is-invalid");
         return false;
    }else{
        inputYear.classList.add("is-valid");
        return flag;
    }
}

function procesoPago(){
    myModal.show();
    spinner.style.display="none";
    messageC.innerHTML="El pago se ha realizado con éxito. Gracias por tu compra."
    checkC.style.display="inline-block";
    btnFinCompra.style.visibility="visible";
}

 function corroborarCampos(){
    if(buttonComprar.classList.contains("data-bs-toggle")){
        buttonComprar.classList.remove("data-bs-toggle");    
    }
    if(buttonComprar.classList.contains("data-bs-target")){
        buttonComprar.classList.remove("data-bs-target");    
    }
    let flag=true; // Bandera para saber si todo esta bien
        //Comprobacion de campo nombre (Que haya al menos un espacio y dos caracteres)
        flag=corroborarNombre(flag);
        //Comporbación de  numero de tarjeta (que sean 16 digitos)
        flag=corroborarTarjeta(flag);
        //Comprobación de CVV (Que sean tres digitos)
        flag=corroborarCVV(flag);
        //Comprobación de mes  
        flag=corroborarMes(flag);        
        //Comprobación año (Que sean dos digitos)
        flag=corroborarYear(flag);
        
        if(flag==false){
            //Algo fallo, no proseguimos
            return;
        }

        //Realizamos el Post
       procesoPago();
 }


 

//Obtención de elementos
const inputNombre=document.getElementById("fullName");
const inputTarjeta=document.getElementById("cardNumber");
const inputMes=document.getElementById("cardMonth");
const inputYear=document.getElementById("cardYear");
const inputCVV=document.getElementById("cvvNumber");
const buttonCancelar=document.getElementById("bCancelar");
const buttonComprar=document.getElementById("bComprar");
const formPago=document.getElementById("formPago");
const inputGroupMeses=document.getElementById("inputGroupMeses");
const rbTC=document.getElementById("TC");
const rbTD=document.getElementById("TD");
const totPagar=document.getElementById("totalPagar");
//Elemento modal
let myModal = new bootstrap.Modal(document.getElementById('myModal'));

//Elementos dentro del modal
const btnFinCompra=document.getElementById("botonFinCompra");
const spinner=document.getElementById("checkProceso");
const checkC= document.getElementById("checkCompra");
const messageC=document.getElementById("mensajeCompra");
//Envento de boton de compra finalizada
btnFinCompra.addEventListener("click",()=>{window.location.assign("/index.html"); });

//eventos de ingreso de texto
inputNombre.addEventListener("keydown",(event)=>{filtroTexto(event)});
inputTarjeta.addEventListener("keydown",(event)=>{filtroNumeroTarjeta(event)});
inputMes.addEventListener("keydown",(event)=>{filtroNumeroMes(event)});
inputYear.addEventListener("keydown",(event)=>{filtroNumeroYear(event)});
inputCVV.addEventListener("keydown",(event)=>{filtroNumeroCVV(event)});


//Eventos de formato
inputMes.addEventListener("focusout",()=>{addCeroMes()});
inputYear.addEventListener("focusout",()=>{addCeroYear()});
inputCVV.addEventListener("focusout",()=>{focusCVV()});
inputTarjeta.addEventListener("focusout",()=>{focusTarjeta()});
inputNombre.addEventListener("focusout",()=>{focusNombre()});

//Eventos de botones
buttonComprar.addEventListener("click",()=>{corroborarCampos()});
buttonCancelar.addEventListener("click",()=>{window.location.assign("/html/carrito.html"); });


//Evento RAdio Button
rbTC.addEventListener("click",()=>{
    if(rbTC.checked){
        inputGroupMeses.disabled=false;
    }
});
rbTD.addEventListener("click",()=>{
    if(rbTD.checked){
        inputGroupMeses.disabled=true;;
    }    
});







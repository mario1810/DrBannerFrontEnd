const USER_INFO_GET_URL = "/assets/json/pagoInfoUserGet.json";
const USER_INFO_POST_URL = "https://a75973a6-cd56-4429-816a-7f6527bc347e.mock.pstmn.io";
const SERVICE_TYPE = "Json";
const SIMULAR_POST=true;
const PAGO_EXITOSO=true;

let idUser=0; //temporalmente global 

//Obtención de elementos
const inputNombre=document.getElementById("Name");
//const inputApellido=document.getElementById("lastName");
const inputTarjeta=document.getElementById("cardNumber");
const inputMesMsj=document.getElementById("messageMonth");
const inputMes=document.getElementById("cardMonth");
const inputYear=document.getElementById("cardYear");
const inputCVV=document.getElementById("cvvNumber");
const buttonCancelar=document.getElementById("bCancelar");
const buttonComprar=document.getElementById("bComprar");
const formPago=document.getElementById("formPago");
//const inputGroupMeses=document.getElementById("inputGroupMeses");
const rbTC=document.getElementById("TC");
const rbTD=document.getElementById("TD");
const totPagar=document.getElementById("totalPagar");
//Elemento modal
myModal = new bootstrap.Modal(document.getElementById('myModal')); // Para poder llamar el metodo show del modal
myModal2 = document.getElementById('myModal'); // Para poder acceder a los eventos del modal
myModal2.addEventListener("shown.bs.modal",()=>{pagoEnvioPost();});
//Elementos dentro del modal
const btnFinCompra=document.getElementById("botonFinCompra");
const spinner=document.getElementById("checkProceso");
const checkC= document.getElementById("checkCompra");
const messageC=document.getElementById("mensajeCompra");
//Envento de boton de compra finalizada
//btnFinCompra.addEventListener("click",()=>{window.location.assign("/index.html"); });
const guardarTarjeta=document.getElementById("Check3");

/**
 * 
 *                                                                      SOLICITUD FETCH GET
 * 
 */

/**
 * Función que realiza un GET para obtener los datos del usuario
 */
async function requestGet(proveedor = "Fetch", direccionhttp) {
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
  

  //Función que llama requetGet para obtener los datos del usuario y los despliega en el formulario
 async function solicitudDatosForm() {
    let usuario = await requestGet(SERVICE_TYPE,USER_INFO_GET_URL);
    
    if(usuario!=null){ // Si el fetcjh se realizó de manera correcta 
        //Relleno los campos de mi formulario.
        //idUser=usuario.id;
        inputNombre.value=usuario.nombre+" "+usuario.apellido;
        //inputApellido.value=usuario.apellido;
        inputTarjeta.value=addSpacesNumeroTarjeta(usuario.tarjeta.numeroTarjeta);
        //Tipo de tarjeta
        if(usuario.tarjeta.tipo=="debito"){
            rbTC.checked=false;
            //inputGroupMeses.disabled=true;
            rbTD.checked=true;
        }else{
            rbTD.checked=false;
           // inputGroupMeses.disabled=false;
            rbTC.checked=true;
        } 
        //Total a pagar
        totPagar.value=Number.parseFloat(usuario.total).toFixed(2);
        //Comprobación de campos que se autorellenaron
        corroborarAutorrelleno();
    }
  }



//Evento que llama a la función SolicitudDatosForm cuando  se carga la página, para desplegar info en el formulario 
window.addEventListener('DOMContentLoaded', ()=> {
    solicitudDatosForm();
});



//Función para agregar espacios cada cuatro digitos
function addSpacesNumeroTarjeta(numero){
    let newNumero="";
    for(let i=0; i<numero.length;i++){
        if(i>0 && i%4==0){
            newNumero+=" ";    
        }
        newNumero+=numero.charAt(i);
    }
    return newNumero;
}

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
                        valorNumerico=parseInt(inputMes.value); // Cual es el valor que ya estaba en el input
                        if(valorNumerico==0 && parseInt(e.key)==0){ 
                            e.preventDefault();    //no envio nada
                        }
                        valorNumerico=valorNumerico*10+parseInt(e.key); // Obtenemos el valor conactenado
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
    if(e.key.charCodeAt(0)==66 || e.key=='ArrowLeft' || e.key=='ArrowRight') 
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
/**
 * Limpia las clases  que indican si la entrada es correcta o no, al añadir la clase de bootstrap is-valid o is-invalid
 * @param {*} elemento 
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

/**Función que agrega un cero cuando sólo hay un digito del mes  y está entre 1-9 */
 function  addCeroMes(){
    //clear(inputMes);
    let len=inputMes.value;
    if(len.length==1){
        if(inputMes.value=="0"){
            inputMes.value=inputMes.value+"1";
        }
        else{
            inputMes.value="0"+inputMes.value;
        }
    }
    corroborarMes(true);
    /*
    len=inputMes.value;
    if(len.length<2){
        //inputMes.classList.add("is-invalid");
    }
    else{
        //inputMes.classList.add("is-valid");         
    }*/
 }

 /**Función que agrega un cero al final cuando sólo hay un digito del año  y está entre 3-9 */
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
    corroborarYear(true);
    
 }
/*
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
}*/
/**
 * 
 *                                      FUNCIONES DE COMPROBACIÓN  DE INPUTS
 * 
 * 
 */


/**
 * Función que compruba que los input, que se autorrellenaron con  fetch, tienen información válida
 */
function corroborarAutorrelleno(){
    //corroborarTexto(true,inputNombre);
    //corroborarTexto(true,inputApellido);
    corroborarNombre(true);
    corroborarNumTarjeta(true);
}




/**
 * Función que corroborá que el texto ingresado tenga una longitud mayor a 2
 * @param {*} flag "Bandera para acarrear e resultado de una validación anterior cuando se realizan en serie"
 * @param {*} elemento  "Input sobre el cual realiza la corroboración"
 * @returns  flag, si longitud de texto es mayor o igual 2, false caso contrario
 */
 function corroborarTexto(flag, elemento){
    clear(elemento);
    const texto=elemento.value;
    if(texto.length>=2){
        elemento.classList.add("is-valid");
        return flag;
    }
    elemento.classList.add("is-invalid");  
    return false;
}

/**
 * Función que corroborá que el texto ingresado tenga  minimo dos caracteres+espacio´dos caracteres
 * @param {*} flag "Bandera para acarrear e resultado de una validación anterior cuando se realizan en serie"
 * @param {*} elemento  "Input sobre el cual realiza la corroboración"
 * @returns  flag, si longitud de texto es mayor o igual 2, false caso contrario
 */
function corroborarNombre(flag){
    clear(inputNombre);
    const nombres=inputNombre.value.split(" ");
    if(nombres.length>=2){
        if(nombres[0].length>1 && nombres[1].length>1){
            inputNombre.classList.add("is-valid");
            return flag;
        }
    }
    inputNombre.classList.add("is-invalid");  
    return false;
}


/*
//Corrobora el texto ya ingresado
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

//Corrobora conforme se ingresa el texto
function corroborarNombreRT(){
    clear(inputNombre);
    const nombres=inputNombre.value.split(" ");
    if(nombres.length>=2){
        if(nombres[0].length>0 && nombres[1].length>0){
            inputNombre.classList.add("is-valid");
            return;
        }
    }
    inputNombre.classList.add("is-invalid");  
    return;
}
*/

/**
 * Función que corroborá que el número de la tarjeta sea de 16 digitos
 * @param {*} flag "Bandera para acarrear e resultado de una validación anterior cuando se realizan en serie"
 * @returns  flag, si longitud es correcta, false caso contrario
 */
function corroborarNumTarjeta(flag){
    clear(inputTarjeta);
    if(inputTarjeta.value.replace(/ /g, "").length==16){
        inputTarjeta.classList.add("is-valid");
        return flag
    }
    else{
        inputTarjeta.classList.add("is-invalid");
        return false;
    }
}

/*
//Corrobora conforme se ingresa el texto
function corroborarTarjetaRT(){
    clear(inputTarjeta);
    if(inputTarjeta.value.replace(/ /g, "").length<16){
        inputTarjeta.classList.add("is-invalid");
        return;
    }else{
        inputTarjeta.classList.add("is-valid");
    }
}*/

/**
 * Función que corroborá que el número  CVV de la tarjeta sea de 3 digitos
 * @param {*} flag "Bandera para acarrear e resultado de una validación anterior cuando se realizan en serie"
 * @returns  flag, si longitud es correcta, false caso contrario
 */
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

/*
//Corrobora conforme se ingresa el texto
function corroborarCVVRT(){
    clear(inputCVV);
    if(inputCVV.value.length<3){
        inputCVV.classList.add("is-invalid");
        return;
    }else{
        inputCVV.classList.add("is-valid");
        return;
    }
}*/

/**
 * Función que corroborá que el mes  tarjeta de la tarjeta sea de 2 digitos, 1-12
 * @param {*} flag "Bandera para acarrear e resultado de una validación anterior cuando se realizan en serie"
 * @returns  flag, si longitud es correcta, false caso contrario
 */
/*
function corroborarMes1(flag){
     //Comporbación de fecha de caducidad a lo más igual a la actual
     clear(inputMes);
     let fecha =new Date();
     let mes=parseInt(fecha.getMonth())+1;
     let anio=parseInt(fecha.getFullYear())-2000;
     if(inputMes.value.length<2 || (parseInt(inputMes.value)<mes && parseInt(inputYear.value)==anio)){
        //alert("Fecha de tarjeta invalida");
        inputMes.classList.add("is-invalid");
        return false;
     }else{
        inputMes.classList.add("is-valid");
        return flag;
     }
}*/
//Corrobora conforme se ingresa el texto
function corroborarMes(flag){
    //Comprobación de la longitud de entrada
    clear(inputMes);
    if(inputMes.value.length!=2){
        inputMes.classList.add("is-invalid");
        inputMesMsj.innerHTML="Deben ser dos digitos";
        return false; 
    }
    else{
       inputMes.classList.add("is-valid");
    }
    //Comporbación de fecha de caducidad  de la terjeta a lo más igual a la actual
    if(inputYear.value.length>=2){
        clear(inputMes);
        let fecha =new Date();
        let mes=parseInt(fecha.getMonth())+1;
        let anio=parseInt(fecha.getFullYear())-2000;
        if(parseInt(inputMes.value)<mes && parseInt(inputYear.value)==anio){
           inputMes.classList.add("is-invalid");
           inputMesMsj.innerHTML="Tarjeta ha expirado.";
           return false;
        }else{
           inputMes.classList.add("is-valid");
        }
    }
    return flag;
}

/*
//Corrobora el texto ya ingresado
function corroborarYear1(flag){
    clear(inputYear);
    let fecha =new Date();
    let anio=parseInt(fecha.getFullYear())-2000;

    if(inputYear.value.length<=1 || parseInt(inputYear.value)<anio){
        inputYear.classList.add("is-invalid");
         return false;
    }else{
        inputYear.classList.add("is-valid");
        return flag;
    }
}
*/
//Corrobora conforme se ingresa el texto
function corroborarYear(flag){
    clear(inputYear);
    if(inputYear.value.length!=2) {
        inputYear.classList.add("is-invalid");
        return false;
    }else{
        let fecha =new Date();
        let anio=parseInt(fecha.getFullYear())-2000;
        if(parseInt(inputYear.value)<anio){
            inputYear.classList.add("is-invalid");
            return false;
        }else{
            inputYear.classList.add("is-valid");
            flag=corroborarMes(flag);
        }
    }
    return flag;
}

//Corrobora campos antes de proseguir con la compra(fecha de caducidad de la tarjeta)
function corroborarCamposFormPago(){
    if(buttonComprar.classList.contains("data-bs-toggle")){
        buttonComprar.classList.remove("data-bs-toggle");    
    }
    if(buttonComprar.classList.contains("data-bs-target")){
        buttonComprar.classList.remove("data-bs-target");    
    }
    let flag=true; // Bandera para saber si todo esta bien
        //Comprobacion de campo nombre (Que haya al menos dos letras)
        //flag=corroborarTexto(flag,inputNombre);
        //Comprobacion de campo apellido (Que haya al menos dos letras)
        //flag=corroborarTexto(flag,inputApellido);
        //Corroborar el nombre completo
        flag=corroborarNombre(flag);
        //Comporbación de  numero de tarjeta (que sean 16 digitos)
        flag=corroborarNumTarjeta(flag);
        //Comprobación de CVV (Que sean tres digitos)
        flag=corroborarCVV(flag);
        //Comprobación de mes  
        flag=corroborarMes(flag);     
        //Comprobación año (Que sean dos digitos)
        flag=corroborarYear(flag);
        return flag;
 }

/**
 * 
 *                                              POST
 * 
 */

 /**
  *     FUnción que realiza un post a la api
  * @param {*} direccionhttp  // dirección de la API
  * @param {*} data  // JSON que se adjunta en el post
  */
 //Si el servidor, responde sólo con el código de estado
async function requestPost(direccionhttp, data){
    return new Promise((resolve, reject) => {
      fetch(direccionhttp, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
      })
      .then(response =>{ //Opcional
          if(response.ok){
            //console.log("HTTP request successful");
            return resolve(true);
          }else{
            //console.log("HTTP request unsuccessful");
            return resolve(false);
          }
      }) 
      .catch(err =>{
        //console.log(err);
        reject(false);});
  });
  }



//Función para obtener el idi de usuario 
function getUserId(){
    return localStorage.getItem('userId');
}

/**
 * 
 *                                              PROCESO DE PAGO
 * 
 */

/**
 * Función que realiza un post a la API para almacenar la información
 * @returns Valor booleano indicando si la información se envio a la API o no (Si la compra se realizó o no)
 */
 async function pagoEnvioPost(){
    let tT=null;
    //let tMeses=inputGroupMeses.value;
    if(rbTC.checked){
        tT=rbTC.value;
    }else{
        tT=rbTD.value;
    }

    //Creamos un objeto con la información a enviar
    let user = {
        id: Number(getUserId()),
        nombre: String(inputNombre.value),
        tarjeta:{
            numeroTarjeta:String(inputTarjeta.value.replace(/ /g, "")),
            mes:Number(inputMes.value),
            anio:Number(inputYear.value),
            cvv:Number(inputCVV),
            tipo:String(tT),
            guardar:guardarTarjeta.checked
        },
        //Ya está el costo total en la base de datos
        //total: Number(totPagar.value),
        pagar:"true"
    };
    let flag=PAGO_EXITOSO;
    if(SIMULAR_POST){
        console.log(JSON.stringify(user));
    }else{
        let flag = await requestPost(USER_INFO_POST_URL,user);
    }
    //Retraso para ver la aimación
    syncDelay(5000);
    //Actualizamos el modal despues de hacer el pago
    resultadoPago(flag);
}


//Funcion para ssimular un tiempo de espera. (temporal)
function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}
/**
 * Función que actualiza el modal, para indicar que la compra se realizó con exito o no
 */
function resultadoPago(flag){
    //Compra se realizó con exito
    if(flag){ 
        spinner.style.display="none";
        messageC.innerHTML="El pago se ha realizado con éxito. Gracias por tu compra.";
        checkC.style.display="inline-block";
        
    }else{
        //Compra no realizó con exito
        spinner.style.display="none";
        messageC.innerHTML="El pago no se puedo concretar. Lamentamos las molestias";
    }
    btnFinCompra.style.visibility="visible";
    btnFinCompra.addEventListener("click",()=>{
        if(flag){
            window.location.assign("/index.html"); 
        }else{
            myModal.hide();
        }
        
    });
}


/*Función que se llama cuando se presiona el botón de pago*/
 function btnPagoPresionado(){
    let flag=corroborarCamposFormPago();
    if(flag){
        //Realizamos el Post
        //el evento de despliegue del modal, encadena la llamada pagoEnvioPost
        myModal.show();
    }
    // No se puede realizar el proceso, porque hay un campo mal
 }


//eventos de ingreso de texto (despues de que el valor ha llegado al input)
inputNombre.addEventListener("keyup",(event)=>{corroborarNombre(true)});
//inputApellido.addEventListener("keyup",(event)=>{corroborarTexto(true,inputApellido)});
inputTarjeta.addEventListener("keyup",(event)=>{corroborarNumTarjeta(true)});
inputMes.addEventListener("keyup",(event)=>{corroborarMes(true)});
inputYear.addEventListener("keyup",(event)=>{corroborarYear(true)});
inputCVV.addEventListener("keyup",(event)=>{corroborarCVV(true)});




//eventos de ingreso de texto (antes de que el valor llegue al input)
inputNombre.addEventListener("keydown",(event)=>{filtroTexto(event)});
//inputApellido.addEventListener("keydown",(event)=>{filtroTexto(event)});
inputTarjeta.addEventListener("keydown",(event)=>{filtroNumeroTarjeta(event)});
inputMes.addEventListener("keydown",(event)=>{filtroNumeroMes(event)});
inputYear.addEventListener("keydown",(event)=>{filtroNumeroYear(event)});
inputCVV.addEventListener("keydown",(event)=>{filtroNumeroCVV(event)});


//Eventos de formato
inputMes.addEventListener("focusout",()=>{addCeroMes()});
inputYear.addEventListener("focusout",()=>{addCeroYear()});
//inputCVV.addEventListener("focusout",()=>{focusCVV()});
//inputTarjeta.addEventListener("focusout",()=>{focusTarjeta()});
//inputNombre.addEventListener("focusout",()=>{focusNombre()});

//Eventos de botones
buttonComprar.addEventListener("click",()=>{btnPagoPresionado()});
buttonCancelar.addEventListener("click",()=>{window.location.assign("/html/carrito.html"); });


/*
//Evento Radio Button
rbTC.addEventListener("click",()=>{
    if(rbTC.checked){
      //  inputGroupMeses.disabled=false;
    }
});
rbTD.addEventListener("click",()=>{
    if(rbTD.checked){
       // inputGroupMeses.disabled=true;;
    }    
});
*/








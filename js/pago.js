const USER_INFO_GET_URL = "/assets/json/pagoInfoUserGet.json";
const USER_INFO_POST_URL = "https://a75973a6-cd56-4429-816a-7f6527bc347e.mock.pstmn.io";
const SERVICE_TYPE = "Json";
const SIMULAR_POST=true;
const PAGO_EXITOSO=true;

let idUser=0; //temporalmente global xD

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
        idUser=usuario.id;
        inputNombre.value=usuario.nombre+" "+usuario.apellido;
        inputTarjeta.value=addSpacesTarjeta(usuario.tarjeta.numeroTarjeta);
        inputMes.value=usuario.tarjeta.mes;
        addCeroMes();
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
        totPagar.value=Number.parseFloat(usuario.total).toFixed(2);
        corroborarCampos();
    }
  }


window.addEventListener('load', function() {
    solicitudDatosForm();
});

//FUnción para agregar espacios cada cuatro digitos
function addSpacesTarjeta(numero){
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
 * Limpia las clases  que indican si la entrada es correcta o no
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
 *                                      FUNCIONES DE BOTONES
 * 
 * 
 */

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


//Corrobora el texto ya ingresado
function corroborarTarjeta(flag){
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

//Corrobora conforme se ingresa el texto
function corroborarTarjetaRT(){
    clear(inputTarjeta);
    if(inputTarjeta.value.replace(/ /g, "").length<16){
        inputTarjeta.classList.add("is-invalid");
        return;
    }else{
        inputTarjeta.classList.add("is-valid");
    }
}

//Corrobora el texto ya ingresado
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
}

//Corrobora el texto ya ingresado
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
}
//Corrobora conforme se ingresa el texto
function corroborarMes(){
    //Comporbación de fecha de caducidad a lo más igual a la actual
    clear(inputMes);
    if(inputMes.value.length<2){
        inputMes.classList.add("is-invalid");
        return;
    }
    else{
       inputMes.classList.add("is-valid");
       return;
    }
}

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

//Corrobora conforme se ingresa el texto
function corroborarYear(){
    clear(inputYear);
    if(inputYear.value.length<2) {
        inputYear.classList.add("is-invalid");
         return;
    }else{
        inputYear.classList.add("is-valid");
        return;
    }
}

//Corrobora campos antes de proseguir con la compra(fecha de caducidad de la tarjeta)
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
        flag=corroborarMes1(flag);     
        //Comprobación año (Que sean dos digitos)
        flag=corroborarYear1(flag);
        return flag;
 }

/**
 * 
 *                                              PROCESO DE PAGO
 * 
 */

 /**
  *     FUnción que realiza un post a la api
  * @param {*} direccionhttp  // dirección de la API
  * @param {*} json  // JSON que se adjunta en el post
  */
  async function enviarDatos(direccionhttp, data){
        return new Promise((resolve, reject) => {
          fetch(direccionhttp,{
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }

          }).then((responseJSON) =>{responseJSON.json()})
            .catch((error) => {
              console.log(error);
              reject(false);
            })
            .then((response) => {
                console.log('Success:', response);
                resolve(true);
              })
        });
  }

/**
 * Función que realiza un post a la API para almacenar la información
 * @returns Valor booleano indicando si la información se envio a la API o no (Si la compra se realizó o no)
 */
 async function pagoEnvioPost(){
    let tT="";
    let tMeses=inputGroupMeses.value;
    if(rbTC.checked){
        tT=rbTC.value;
    }else{
        tT=rbTD.value;
    }

    //Creamos un objeto con la información a enviar
    let user = {
        id: Number(idUser),
        nombre: String(inputNombre.value),
        tarjeta:{
            numeroTarjeta:String(inputTarjeta.value.replace(/ /g, "")),
            mes:Number(inputMes.value),
            anio:Number(inputYear.value),
            cvv:Number(inputCVV),
            tipo:String(tT),
            meses:Number(tMeses)
        },
        total: Number(totPagar.value),
        pagar:"true"
    };
    let flag=PAGO_EXITOSO;
    if(SIMULAR_POST){
        console.log(JSON.stringify(user));
    }else{
        let flag = await enviarDatos(USER_INFO_POST_URL,user);
    }
    //Retraso para ver la aimación
    syncDelay(5000);
    //Actualizamos el modal despues de hacer el pago
    postPago(flag);
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
function postPago(flag){
    if(flag){
        spinner.style.display="none";
        messageC.innerHTML="El pago se ha realizado con éxito. Gracias por tu compra.";
        checkC.style.display="inline-block";
        
    }else{
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


//función que despliega el modal, su evento de despliegue, encadea el envio del post
function procesoPago(){
    //Antes de hacer el pago, abrimos el modal
    myModal.show();
}



/**
 * 
 *                                              PROCESO DE COMPRA
 * 
 */

 function procesoCompra(){
    let flag=corroborarCampos();
    if(flag){
        //Realizamos el Post
        procesoPago();
    }
    // No se puede realizar el proceso, porque hay un campo mal
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

//eventos de ingreso de texto (despues de que el valor ha llegado al input)
inputNombre.addEventListener("keyup",(event)=>{corroborarNombreRT()});
inputTarjeta.addEventListener("keyup",(event)=>{corroborarTarjetaRT()});
inputMes.addEventListener("keyup",(event)=>{corroborarMes()});
inputYear.addEventListener("keyup",(event)=>{corroborarYear(event)});
inputCVV.addEventListener("keyup",(event)=>{corroborarCVVRT()});




//eventos de ingreso de texto (antes de que el valor llegue al input)
inputNombre.addEventListener("keydown",(event)=>{filtroTexto(event)});
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
buttonComprar.addEventListener("click",()=>{procesoCompra()});
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









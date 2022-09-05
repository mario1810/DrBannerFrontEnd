const URL_COMENT_LOCAL="http://localhost:8080/api/usuario";
const URL_COMENT_LOCAL2="http://localhost:8080/api/usuario/tarjeta";
const URL_COMENT_LOCAL3="http://localhost:8080/api/usuario/historial";
const URL_COMENT_LOCAL4="http://localhost:8080/api/usuario/comentario";
//const URL_COMENT_LOCAL="/assets/json/perfil.json";
//const URL_COMENT_LOCAL2="/assets/json/perfil.pago.json";
//const URL_COMENT_LOCAL3="/assets/json/carritoPaquetesGet.json";

const saludoM= document.getElementById("saludo");

function cargarDatosPersonales(){
    fetch((URL_COMENT_LOCAL+"/"+String(localStorage.getItem("userId")))) //el nombre del archivo JSON donde se extraeran los datos
    .then(respuesta=> respuesta.json()) //indica formato en el que se desea obtener la info
    .then(datos=> {               //datos=respuesta.json (array)
        console.log("datos personales");
        console.log(datos); 
        return mostrarDatos(datos);
    })
           
    }
    //data-title="Nombre" ,  data-title="Apellidos" ,  data-title="Correo" ,  data-title="Contraseña" ,  data-title="Telefono"


    function mostrarDatos(usuario) {
        saludoM.innerHTML="Bienvenid@ "+usuario.nombre;
        let datos = `<tr>
            <td data-title="Nombre">${usuario.nombre}</td>  
            <td data-title="Apellidos">${usuario.apellido}</td>
            <td data-title="Correo">${usuario.correo}</td>   
            <td data-title="Contraseña">${usuario.password}</td>
            <td data-title="Telefono"> ${usuario.telefono}</td>
            </tr>`;
        document.getElementById("datosPersonales").innerHTML = datos;
    }
        

function cargarFormaDePago(){
    fetch((URL_COMENT_LOCAL2+"/"+String(localStorage.getItem("userId")))) //el nombre del archivo JSON donde se extraeran los datos
    .then(res=> res.json()) //indica formato en el que se desea obtener la info
    .then(datos=> {               //datos=respuesta.json (array)
       console.log("datos usuario");
        console.log(datos); 
        return mostrarDatosPago(datos);
    })
           
    }
    
    function mostrarDatosPago(pago) {
        let datosPago ="";
        
        if(pago.datosTarjeta){
            datosPago = `<tr>
            <td data-title="Nombre">${pago.nombre}</td>
            <td data-title="Apellido">${pago.apellido}</td>
            <td data-title="Tarjeta">${pago.tipoTarjeta}</td>                   
            <td data-title="Numero">${pago.numeroTarjeta}</td>
            </tr>`; //Linea 46 deberia ser tarjeta.pago , pero la wabada bota error(grita en silencio)
        }else{
            `<tr>
            <td data-title="Nombre">${pago.nombre}</td>
            <td data-title="Apellido">${pago.apellido}</td>
            <td colspan = "2" >No hay datos de tarjeta registrados</td>                   
            </tr>`; //Linea 46 deberia ser tarjeta.pago , pero la wabada bota error(grita en silencio)
        }
        document.getElementById("datosFormaPago").innerHTML = datosPago;
    } 

    
     
   
function cargarHistorialCompra(){
        fetch((URL_COMENT_LOCAL3+"/"+String(localStorage.getItem("userId")))) //el nombre del archivo JSON donde se extraeran los datos
        .then(respuestaHistorial=> respuestaHistorial.json()) //indica formato en el que se desea obtener la info
        .then(datos=> {       
            console.log(datos);        //datos=respuesta.json (array)
            // console.log("compras");
            // let array=datos.usuario;
            // console.log(array); 
            // console.log(typeof(array));
            
            mostrarDatosCompra(datos);
            //return mostrarDatosCompra(datos.usuario);
        })
            
               
        }
        
    function mostrarDatosCompra(arregloCompras) {
            let datosAnteriores = "";
            let num=1;
            for (let compra of arregloCompras) {
                let paquetesStr="";
                for(let paquete of compra.pedidos){
                    paquetesStr+=`<tr>
                    <td>${paquete.fecha}</td> 
                    <td>${paquete.direccion}</td>
                    <td>${paquete.nombrePaquete}</td>   
                    <td>${paquete.nombreCategoria}</td>   
                    <td>${paquete.costo}</td>   
                    </tr>`
                }
                datosAnteriores = datosAnteriores + `<tr>
                <td colspan = "1"><b>#Compra</b></td> 
                <td colspan = "1"><b>Fecha Compra</b></td> 
                <td><b>Hora Compra</b></td>
                <td colspan = "2"><b>CostoToral</b></td>   
                </tr>
                
                <tr>
                <td colspan = "1">${num}</td> 
                <td colspan = "1">${compra.fechaCompra}</td> 
                <td>${compra.horaCompra}</td>
                <td colspan = "2">${compra.costoTotal}</td>   
                </tr>
                
                <tr>
                    <td><b>fecha</b></td> 
                    <td><b>direccion</b></td>
                    <td><b>Paquete</b></td>   
                    <td><b>Categoria</b></td>   
                    <td><b>costo</b></td>   
                    </tr>`
                
                +paquetesStr;
                ;
                num++;
            }
            document.getElementById("datosHistorialCompras").innerHTML = datosAnteriores;
        }
     


/* Funciones mostrar tablas de datos ***************************8***********/
//Datos personales
function mostrarDatosPersonales(){
    document.getElementById('divDatosPesonales').style.display = 'block';
}
//Forma de pago
function mostrarFormaPago(){
    document.getElementById('divFormasPago').style.display = 'block';
}
//Compras anteriores
function mostrarComprasAnteriores(){
    document.getElementById('divComprasAnteriores').style.display = 'block';
}
//Comentarios
function mostrarComentarios(){
    document.getElementById('divComentarios').style.display = 'block';
}

/* Funciones ocultar tablas de datos ********************************************************************/
//Datos personales
function ocultarDatosPersonales(){
    document.getElementById('divDatosPesonales').style.display = 'none';
   // document.getElementById('btnDatosPersonales').style.display = 'none';
}
//Forma de pago
function ocultarFormaPago(){
    document.getElementById('divFormasPago').style.display = 'none';
  //  document.getElementById('btnformaPago').style.display = 'none';
}
//Compras anteriores 
function ocultarComprasAnteriores(){
    document.getElementById('divComprasAnteriores').style.display = 'none';
  //  document.getElementById('btnHistorialCompra').style.display = 'none';
}
//comentarios 
function ocultarComent(){
    document.getElementById('divComentarios').style.display = 'none';
}
//Ocultar Datos Personales boton X=>+
function ocultarDatosPersonales(){

    if(document.getElementById('divDatosPesonales').style.display=='none'){
       document.getElementById('divDatosPesonales').style.display = 'block';
       document.getElementById('botonActivoDatosPersonales').classList.replace("bi-plus-lg", "bi-x-lg");
   }
   else{
    document.getElementById('divDatosPesonales').style.display = 'none';
    document.getElementById('botonActivoDatosPersonales').classList.replace("bi-x-lg", "bi-plus-lg");
   }
}
//Ocultar forma de pago boton X=>+
function ocultarFormaPago(){

    if(document.getElementById('divFormasPago').style.display=='none'){
       document.getElementById('divFormasPago').style.display = 'block';
       document.getElementById('botonActivoFormasPago').classList.replace("bi-plus-lg", "bi-x-lg");
   }
   else{
    document.getElementById('divFormasPago').style.display = 'none';
    document.getElementById('botonActivoFormasPago').classList.replace("bi-x-lg", "bi-plus-lg");
   }
}
//Ocultar compras anteriores boton X=>+
function ocultarComprasAnteriores(){

    if(document.getElementById('divComprasAnteriores').style.display=='none'){
       document.getElementById('divComprasAnteriores').style.display = 'block';
       document.getElementById('botonActivoComprasAnteriores').classList.replace("bi-plus-lg", "bi-x-lg");
   }
   else{
    document.getElementById('divComprasAnteriores').style.display = 'none';
    document.getElementById('botonActivoComprasAnteriores').classList.replace("bi-x-lg", "bi-plus-lg");
   }
}
//Ocultar comentarios boton X=>+
function ocultarComent(){

    if(document.getElementById('divComentarios').style.display=='none'){
       document.getElementById('divComentarios').style.display = 'block';
       document.getElementById('botonActivo').classList.replace("bi-plus-lg", "bi-x-lg");
   }
   else{
    document.getElementById('divComentarios').style.display = 'none';
    document.getElementById('botonActivo').classList.replace("bi-x-lg", "bi-plus-lg");
   }
}

window.addEventListener('DOMContentLoaded', ()=> {
    
    cargarDatosPersonales();
    cargarFormaDePago();
    cargarHistorialCompra();

});
    
 // MOSTRAR EN CONSOLA LAS ENTRADAS DE ESTRELLAS 

 btnComent.addEventListener('click',()=>{enviaComentario()});

 function leeEstrella() {
     //Lee si da un true o false porque las estrellas es como una lista
     let five= document.getElementById("five").checked;

     let four= document.getElementById("four").checked;
     let three= document.getElementById("three").checked;
     let two= document.getElementById("two").checked;
     let one= document.getElementById("one").checked;
     
     //Envia el true/false y el valor numero correcpondiente a otra funcion
     enviarEstrella(five,5);
     enviarEstrella(four,4);
     enviarEstrella(three,3);
     enviarEstrella(two,2);
     enviarEstrella(one,1);
    
     console.log("------------");
     
 }

 function enviarEstrella(estrella,numero) {
   console.log("valor estrella "+numero+" es: "+ estrella);

   if (estrella){
     console.log("Numero de estrellas: "+numero);
     //aqui debe ir el post que manda el valor de "numero"
   }

   //Creamos el objeto a enviar como json
     // let user = {
     //     id: Number(userId),
     //     total: Number(totalC.substring(1, totalC.length)),
     // };
 }
 
 let comentario= document.getElementById("cajitaComent");

 comentario.addEventListener("keydown",(event)=>{filtroTexto(event)});

 function filtroTexto(e){
     
     //test es un método de la expresión regular (como length) para comprobar si tiene un caracter fuera de la expresión regulr o no
    //console.log(e.key.charCodeAt(0));
     if((comentario.value.length+1)<120||e.key.charCodeAt(0)==66||e.key.charCodeAt(0)==65){
         //esta instruccion es para limitar los caracteres en el input de comentarios
         //tambien se necesitan los ekey para que el caracter de las flechitas
         //no se cuenten como caracteres
     }else{
         /**
          Una llamada a preventDefault() del evento keydown impide la emisión del consiguiente evento keypress
          //En otras palabras, el input no notará que se ha presionado una tecla, y por tanto no aparece
          */
         e.preventDefault();
     }
 }

 async function enviaComentario() {
     let comentarioUser= document.getElementById("cajitaComent");
      //Lee si da un true o false porque las estrellas es como una lista
      let five= document.getElementById("five").checked;
      let four= document.getElementById("four").checked;
      let three= document.getElementById("three").checked;
      let two= document.getElementById("two").checked;
      let one= document.getElementById("one").checked;
    
    let numero="0";
      if(five)
        numero="5";
    else if(four)
        numero="4";
    else if(three)
        numero="3";
    else if(two)
        numero="2";
    else if(one)
        numero="1";
    else
        numero="0";



    let todaysDate = new Date();
    todaysDate=convertDate(todaysDate);
    let data={
            comentario:comentarioUser.value,
            estrellas:numero,
            fechaComentario:String(todaysDate)
        }

     let resp= await requestPostJson((URL_COMENT_LOCAL4+"/"+String(localStorage.getItem("userId"))), data);
     five.checked=false;
     four.checked=false;
     three.checked=false;
     two.checked=false;
     one.checked=false;
     comentarioUser.value="";

     //aqui debe ir el post que manda el valor de "numero"
 }

 function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }

 //Si el servidor, responde con un json al post
 async function requestPostJson(direccionhttp, data){
    return new Promise((resolve, reject) => {
      fetch(direccionhttp, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
      })
      .then(response =>{ //Opcional
          if(response.ok){
            //console.log("HTTP request successful");
          }else{
            //console.log("HTTP request unsuccessful");
            //return resolve(false);
          }
          return response;
      }) 
      .then(response =>response.json()) 
      .then(json =>{
       // console.log(JSON.stringify(json)); // Imprimir todo el json que nos regresa
        resolve(json);// devuelve la parte de products del json
      })
      .catch(err =>{
        //console.log(err);
        reject(null);});
  });
  }



 
 //pa cambiar el iconito
 //div.classList.replace("foo", "bar");
 //document get element by id.classlist

function mostrarImagen(event){
    let imagenSource = event.target.result;
    let previewImage = document.getElementById('preview');

        previewImage.src = imagenSource;
}
function procesarArchivo(event){
    let imagen = event.target.files[0];
    let lector = new FileReader();

    lector.addEventListener('load', mostrarImagen, false);
    lector.readAsDataURL(imagen);
}

document.getElementById('archivo').addEventListener('change', procesarArchivo, false);

const btnClose = document.getElementById("btnCerrarSesion");
btnClose.addEventListener("click",()=>{
    //setCookie('session_id', sessionId, 3); // cookie name, valor, numero de dias para expirar 
    deleteCookie('session_id'); 
    //Eliminamos todo el local storage
    localStorage.clear();
    window.location.assign("/index.html"); 
})
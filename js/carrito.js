const USER_INFO_GET_URL = "http://localhost:8080/api/carrito";
const USER_INFO_DELETE_URL = "http://localhost:8080/api/carrito";

//const USER_INFO_GET_URL = "/assets/json/carritoPaquetesGet.json";
//const USER_INFO_PUT_URL = "";
//const USER_INFO_DELETE_URL = "";
const MENSAJE_CAR_VACIO="Vive tu momento,<br>nosotros lo capturamos<br><br>¿Ya has visto nuestros paquetes?<br><br>";
const SIMULAR_ENVIO=false;
let arrayCarrito;
//let idUser=0; //temporalmente global 


const tablaBody=document.getElementById("tablaBody");
const mensajeCarritoVacio=document.getElementById("carritoVacio");
const totalPagar=document.getElementById("totalPagar");
const btnPagar=document.getElementById("btnPagar");
const mensajeSub= document.getElementById("numPaquetesTitulo");
const divTabla=document.getElementById("divTabla");
const divPago=document.getElementById("divPago");

//Cmabio de etamaño de la pabtalla-> se ajusta el div de la tabla
window.onresize=start;
function start(){
  let tamano=divPago.offsetHeight;
  divTabla.style.height=tamano+"px";
}

/**
 * Se lamma la función tan pronto se cargue el documento HTML
 */
 window.addEventListener('DOMContentLoaded', ()=> {obtenerPaquetesUsuario()});
 /**
  * Función que se llama cuando se abanadona la página
  */
// window.addEventListener("beforeunload",()=> {guardarCarrito()});
 /**
  * Cuando se da click en el botón de pagar
  */
 btnPagar.addEventListener("click",()=>{EnvioInfoAPI()});
 



 /**
  * 
  *                                 GET
  */

 /**
 * 
 * Función que realiza el fetch para obtener los paquetes que el usuario agrego al carrito
 * 
 */
async function requestGet(proveedor = "Fetch", direccionhttp) {
    if (proveedor == "Fetch") {
        return new Promise((resolve, reject) => {
        fetch(direccionhttp)
          .then((responseJSON) =>{ return responseJSON.json()})
          .then((usuarioObject) => {
            resolve(usuarioObject)
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
                resolve(usuarioObject)}
            )
          .catch((error) => {
            //console.log(error);
            //reject(error);
            reject(null);
          });
      });
    }
}


/**
 * Función que agrega los paquetes a la tabla de la página HTML y realiza el cálculo del total a pagar
 */
function muestraPaquetesTabla(arrayPaquetes){
    let pagar=0;
    mensajeSub.innerHTML=(arrayPaquetes.length==1)?"1 paquete":(arrayPaquetes.length+" paquetes");
    mensajeCarritoVacio.innerHTML="";
    tablaBody.innerHTML="";
    totalPagar.innerHTML="$"+Number.parseFloat(0).toFixed(2);
    
    //Ajustar el tamaño del elemento hermano
    let tamano=divPago.offsetHeight;
    divTabla.style.height=tamano+"px";

    if(arrayPaquetes.length>0){
        let id=0;
        btnPagar.disabled=false;
        //Por cada paquete:
        for(let paquete of arrayPaquetes){
            //Creamos nuevo renglón, con la información
            tablaBody.innerHTML+=`<tr>
                                    <td scope="row" >${paquete.nombreCategoria}</td>
                                    <td>${paquete.nombrePaquete}</td>
                                    <td>$${Number.parseFloat(paquete.costo).toFixed(2)}</td>
                                    <td>${paquete.fecha}</td>
                                    <td>${paquete.direccion}</td>
                                    <td onclick="borrarRow(${id},${paquete.idPedido})"><i class="bi bi-trash3"></i></td>
                                    
                                </tr>`;                            
            pagar+=Number(paquete.costo);//*Number(paquete.cantidad);
            id++;
        }
        totalPagar.innerHTML="$"+Number.parseFloat(pagar).toFixed(2);
        localStorage.setItem("CostoTotal",pagar);
    }else{
        btnPagar.disabled=true;        
        mensajeCarritoVacio.innerHTML=MENSAJE_CAR_VACIO;
    }
}

/**
 * Función que obtiene los paquetes que se han añadido en el carrito
 */
async function obtenerPaquetesUsuario() {

  let userId = getUserId();
  if (userId != null && isUserLogged() === true) {
    //Realizamos un fetch
    let usuario;
    if(SIMULAR_ENVIO){
      usuario = await requestGet("Json", USER_INFO_GET_URL);
    }else{
       usuario = await requestGet("Fetch",(USER_INFO_GET_URL+"/"+String(localStorage.getItem("compraId"))));
    }
    console.log(JSON.stringify(usuario));
    // El fetch se realizó de manera correcta?
    if (usuario != null) {
      //Mostramos la info en la tabla
      muestraPaquetesTabla(usuario);
      return;
    }
  }
  //Condición de protección
  //alert("Recargar la página");
  btnPagar.disabled=true; 
  totalPagar.innerHTML="$"+Number.parseFloat(0).toFixed(2);
  mensajeSub.innerHTML = "0 paquetes";
  mensajeCarritoVacio.innerHTML = MENSAJE_CAR_VACIO;
}

/**
 * 
 *                                           DELETE
 */

/**
 * Función que crea evento  listener para cada bote de basura
 */
function borrarRow(id, pedidoId) {
  let userId=getUserId();
  if(userId==null || isUserLogged() === false){
    window.location.reload(); //recargamos la página porque ya vencio la sesión
  }
  if (arrayCarrito.length > 0) {
    if (!SIMULAR_ENVIO) {
      requestDelete(USER_INFO_DELETE_URL,pedidoId);
    }
    arrayCarrito.splice(id, 1);
    //Actualizamos localmente, el icono de carrito, cuantos elementos tiene el carrito
    iconoCarrito.innerHTML=arrayCarrito.length;
    muestraPaquetesTabla(arrayCarrito);
  } else {
    //Condición de protección
    mensajeCarritoVacio.innerHTML = MENSAJE_CAR_VACIO;
  }
}

/**
 * Función que envia un delete request para borrar el paquete 
 * @param {URL} direccionhttp 
 * @param {idUser&idpaquete} data  Define que paquete se borrará
 * @returns 
 */
 async function requestDelete(direccionhttp,data) {
  return new Promise((resolve, reject) => {
    fetch(direccionhttp+"/"+data, {  method: "DELETE", headers: { 'Content-type': 'application/json'}})
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


/**
 * 
 *                                           PUT 
 */


 /**
  *     FUnción que realiza un post a la api
  * @param {*} direccionhttp  // dirección de la API
  * @param {*} json  // JSON que se adjunta en el post
  */
  async function requestPut(direccionhttp, data){
    return new Promise((resolve, reject) => {
      fetch(direccionhttp, {
        method: "PUT",
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


/**
 * 
 * Función que creará el objeto con la informacióna a enviar a la API
 * 
 */
async function EnvioInfoAPI() {
  let flag = true;
  //Creamos un objeto con la información a enviar
  let totalC = String(totalPagar.innerHTML); // Para quitar el simbolo $

  let userId = getUserId();
  if (userId == null || isUserLogged() === false)
      window.location.reload(); //recargamos la página porque ya vencio la sesión
  
  //Creamos el objeto a enviar como json
  let user = {
    id: Number(userId),
    total: Number(totalC.substring(1, totalC.length)),
  };

  if (!SIMULAR_ENVIO) {
    //flag = await requestPut(USER_INFO_PUT_URL, user);
  }
  if (flag) { // Envio a la API exitoso
    window.location.assign("/html/pago.html");
  } else {
    alert("Ocurrio un error, recargar la página");
  }
}



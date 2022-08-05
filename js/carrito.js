const USER_INFO_GET_URL = "/assets/json/carritoPaquetesGet.json";
const USER_INFO_POST_URL = "https://a75973a6-cd56-4429-816a-7f6527bc347e.mock.pstmn.io";
const SERVICE_TYPE = "Json"; //Fetch
const SIMULAR_ENVIO=true;
let arrayCarrito;
let idUser=0; //temporalmente global xD


const tablaBody=document.getElementById("tablaBody");
const mensajeCarritoVacio=document.getElementById("carritoVacio");
const totalPagar=document.getElementById("totalPagar");
const btnPagar=document.getElementById("btnPagar");

/**
 * Se lamma la función tan pronto se cargue el documento HTML
 */
 window.addEventListener('load', ()=> {solicitudPaquetesCarrito()});
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


/**
 * Función que agrega los paquetes a la tabla de la página HTML y realiza el cálculo del total a pagar
 */
function muestraPaquetesTabla(arrayPaquetes){
    let pagar=0;
    mensajeCarritoVacio.innerHTML="";
    tablaBody.innerHTML="";
    totalPagar.innerHTML="$"+Number.parseFloat(0).toFixed(2);
    if(arrayPaquetes.length>0){
        let id=0;
        btnPagar.disabled=false;
        //Por cada paquete:
        for(let paquete of arrayPaquetes){
            //Creamos nuevo renglón, con la información
            tablaBody.innerHTML+=`<tr>
                                    <td scope="row" >${paquete.paquete}</td>
                                    <td>${paquete.tipo}</td>
                                    <td>$${Number.parseFloat(paquete.costo).toFixed(2)}</td>
                                    <td>${paquete.fecha}<br>${paquete.hora}</td>
                                    <td>${paquete.direccion}</td>
                                    <td onclick="borrarRow(${id},${paquete.id})"><i class="bi bi-trash3"></i></td>
                                    
                                </tr>`;                            
            pagar+=Number(paquete.costo);//*Number(paquete.cantidad);
            id++;
        }
        totalPagar.innerHTML="$"+Number.parseFloat(pagar).toFixed(2);
    }else{
        btnPagar.disabled=true;
        mensajeCarritoVacio.innerHTML=`Tu carrito de compras está vacio`;
    }
}

/**
 * Función que obtiene los paquetes que se han añadido en el carrito
 */
 async function solicitudPaquetesCarrito() {
    
    //Realizamos un fetch
    let usuario = await adquirirDatos(SERVICE_TYPE,USER_INFO_GET_URL);
    // El fetch se realizó de manera correcta?
    if(usuario!=null){ 
        //Guardamos al información del carrito localmente
        arrayCarrito=usuario.carrito;
        //Mostramos la info en la tabla
        muestraPaquetesTabla(arrayCarrito);
    }else{
        //Condición de protección
        //alert("Recargar la página");
        mensajeCarritoVacio.innerHTML=`Tu carrito de compras está vacio`;
    }
}



/**
 * Función que crea evento  listener para cada bote de basura
 */
function borrarRow(id, paqueteId){
    if(arrayCarrito.length>0){
        if(!SIMULAR_ENVIO){
          let user = {
            idusuario: Number(idUser),
            idproducto: Number(paqueteId),
            borrar:"true"
          };
          enviarDatos(USER_INFO_POST_URL,user);
        } 
        arrayCarrito.splice(id,1);
        muestraPaquetesTabla(arrayCarrito);
    }else{
        //Condición de protección
        mensajeCarritoVacio.innerHTML=`Tu carrito de compras está vacio`;
    }
}


/**
 * 
 *                                           POST    
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
 * 
 * Función que creará el objeto con la informacióna a enviar a la API
 * 
 */
async function EnvioInfoAPI(){
    let flag=true;
     //Creamos un objeto con la información a enviar
     let totalC=String(totalPagar.innerHTML);
     let user = {
         id: Number(idUser),
         total: Number(totalC.substring(1,totalC.length)),
     };

    if(!SIMULAR_ENVIO){
        flag = await enviarDatos(USER_INFO_POST_URL,user);
    }
    if(flag){ // Envio a ala API exitoso
        window.location.assign("/html/pago.html");
    }else{
        alert("Ocurrio un error, recargar la página");        
    }
}




  
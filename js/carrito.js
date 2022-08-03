const USER_INFO_GET_URL = "/assets/json/carritoPaquetesGet.json";
const USER_INFO_POST_URL = "https://a75973a6-cd56-4429-816a-7f6527bc347e.mock.pstmn.io";
const SERVICE_TYPE = "Json"; //Fetch
const KEY_LS= "userLS";



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
    let id=0;
    tablaBody.innerHTML="";
    totalPagar.innerHTML="$"+Number.parseFloat(0).toFixed(2);
    if(arrayPaquetes.length>0){
        btnPagar.disabled=false;
        //Por cada paquete:
        for(let paquete of arrayPaquetes){
            //Creamos nuevo renglón, con la información
            tablaBody.innerHTML+=`<tr>
                                    <td scope="row" >${paquete.paquete}</td>
                                    <td>${paquete.tipo}</td>
                                    <td>$${Number.parseFloat(paquete.costo).toFixed(2)}</td>
                                    <td>${paquete.fecha}</td>
                                    <td onclick="borrarRow(${id})"><i class="bi bi-trash3"></i></td>
                                <tr>`;
            pagar+=Number(paquete.costo);//*Number(paquete.cantidad);
            id++;
        }
        totalPagar.innerHTML="$"+Number.parseFloat(pagar).toFixed(2);
    }else{
        btnPagar.disabled=true;
        tablaBody.innerHTML=`<tr><td class="textoCarrito" colspan="5">Tu carrito de compras está vacio</td></tr>`;
    }
}

/**
 * Función que crea evento  listener para cada bote de basura
 */
function borrarRow(id){

    let localData=localStorage.getItem(KEY_LS);
    //Checamos si se solicitó la pagina con delay y si tenemos datos almacenados de esa página.
    if(localData!=null){
        //Obtenemos los datos como un objeto
        let localDataObject=JSON.parse(localData);
        //Obtenemos el arreglo de paquetes
        let arrayCarrito=localDataObject.carrito;
        arrayCarrito.splice(id,1); 
        localStorage.setItem(KEY_LS,JSON.stringify({ carrito:arrayCarrito}));
        muestraPaquetesTabla(arrayCarrito);
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
        //Tenemos paquetes agregados en el carrito?
        if(usuario.carrito.length>0){
            //Guardamos al información del carrito localmente
            localStorage.setItem(KEY_LS,JSON.stringify({ carrito:usuario.carrito}));
            //Mostramos la info en la tabla
            muestraPaquetesTabla(usuario.carrito);
        }
        else{
            //Mensaje de no hay elementos en el carrito
        }
    }
}
/**
 * Se lamma la función tan pronto se cargue el documento HTML
 */
 window.addEventListener('load', ()=> {solicitudPaquetesCarrito()});

const tablaBody=document.getElementById("tablaBody");
const totalPagar=document.getElementById("totalPagar");
const btnPagar=document.getElementById("btnPagar");

btnPagar.addEventListener("click",()=>{window.location.assign("/html/pago.html")});

  
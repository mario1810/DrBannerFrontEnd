const CAR_NAV_GET_URL = "/assets/json/navbar.json";
const CAR_NAV_GET="http://localhost:8080/api/carrito/cantidad";
const SIMULAR_NAV=false;


//id  del elemento para mostrar 
const iconoCarrito=document.getElementById("numItemscarNavBar");
const iconoUsuario=document.getElementById("iconUser");
window.addEventListener('DOMContentLoaded', ()=> {actualizarIconos()});

/**
 * Funciión que muestra el número de paquetes en el carrito en el icono de la barra de navegación
 */
async function actualizarIconos(){
    let userID=getUserId();
    let logged=isUserLogged();

    if(logged){
      if(iconoUsuario.classList.contains("iconoUserNoLog"))
        iconoUsuario.classList.replace("iconoUserNoLog","iconoUserLog");
      //iconoUsuario.style.cursor="pointer";
    }else{
      if(iconoUsuario.classList.contains("iconoUserLog"))
        iconoUsuario.classList.replace("iconoUserLog","iconoUserNoLog");
      //iconoUsuario.style.cursor="pointer";
    }

    if(userID!=null && logged === true){
      let response;
      if(SIMULAR_NAV){
        response = await requestGet("json",CAR_NAV_GET_URL);
      }else{
        response = await requestGet("Fetch",String(CAR_NAV_GET+"/"+localStorage.getItem("compraId")));
      }
        
        if(response!=null){
            iconoCarrito.innerHTML=response;
            return;
        }
        //else{
          // no mostramos nada porque hubo un error con conexión en la API
          //iconoCarrito.innerHTML="";
        //}
    }
    iconoCarrito.innerHTML="0";
    // No actualizamos el número el carrito porque nadie se ha loggeado
}

 /**
 * 
 * Función que realiza el fetch para obtener el número de paquetes que el usuario agregó al carrito
 * 
 */
  async function requestGet(proveedor = "Fetch", direccionhttp) {
    if (proveedor == "Fetch") {
        return new Promise((resolve, reject) => {
        fetch(direccionhttp)
          .then((response) =>{ 
            if(!response.ok){
                resolve(null);
            }
            return response.json()})
          .then((json) => {
            resolve(json.cantidad)
          })
          .catch((error) => {
            reject(null);
          });
      });
    }
    else{
      return new Promise((resolve, reject) => {
        fetch(direccionhttp)
          .then((response) => { return response.json()})
          .then((json) => {
                resolve(json)}
            )
          .catch((error) => {
            reject(null);
          });
      });
    }
}


/**
 * Obtener el user ID almacenado en memoria
 */
function getUserId(){
    return localStorage.getItem('userId');
}



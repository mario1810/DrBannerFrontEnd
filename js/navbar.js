const CAR_NAV_GET_URL = "/assets/json/navbar.json";
const SERVICE_TYPE_NAV = "Json"; //Fetch


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
      iconoUsuario.style.color="greenyellow"; // Si se dio de alta, el icono cmbia a verde
      //iconoUsuario.style.cursor="pointer";
    }else{
      iconoUsuario.style.color="#F2F2F2"; // Si no se dio de alta, el icono cmbia a blanco
      //iconoUsuario.style.cursor="pointer";
    }


    if(userID!=null && logged === true){
        let response = await requestGet(SERVICE_TYPE_NAV,CAR_NAV_GET_URL);
        if(response!=null){
            iconoCarrito.innerHTML=response.carritoitems;
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
            resolve(json.usuario)
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





/** 
 REFERENCIA 
function requestApi(url,page){
    fetch(url)
    .then(responseIsJSON =>{return responseIsJSON.json()})
    .then(dataJSON =>{ 
                        if(page==1){
                            //Almacenamos los datos de manera local
                            localStorage.setItem("localUserData",JSON.stringify({ userArray:dataJSON.data, time:Date.now()}));
                        }
                        clearTable();
                        return showUsers(dataJSON.data);
                    })
    .catch(err => {alert(" No se pudo mostrar contenido deseado");console.log('Solicitud fallida', err);});        
}

*/

const URL_COMENTARIOS="https://azucenacg.github.io/jsonapi/comentarios.json";

async function getComment() {
    const response = await fetch(URL_COMENTARIOS);
    // convertir esa response en formato json:
    const data = await response.json();
    console.log(data.nombre+" "+data.apellido);
}

getComment();
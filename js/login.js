const MyURL="http://localhost:8080/api/login";
const visible = document.getElementById("psw");
function mostrarContra() {
  if (visible.type === "password") {
    visible.type = "text";
  } else {
    visible.type = "password";
  }
}

const inputEmail = document.getElementById("validarMail");

inputEmail.addEventListener("keyup", () => {
    corroborarMail();
  });

  function corroborarMail() {
    clear(inputEmail);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(inputEmail.value)) {
      inputEmail.classList.add("is-valid");
    } else {
      inputEmail.classList.add("is-invalid");
    }

  }
    
  function clear(elemento) {
    if (elemento.classList.contains("is-valid")) {
      elemento.classList.remove("is-valid");
    }
    if (elemento.classList.contains("is-invalid")) {
      elemento.classList.remove("is-invalid");
    }
  }

  const formSignin = document.getElementById('form-signin'); 
 
  formSignin.addEventListener('submit', (event) => { 
      event.preventDefault(); 
      //enviar request para  iniciar sesion en el backend;
      sendInformation();
      //code - success 
  })

  const msjAlerta=document.getElementById("msjError");
  async function sendInformation(){

    if(!inputEmail.classList.contains("is-valid") && !visible.classList.contains("is-valid")){
      msjAlerta.innerHTML="Ingresa un correo y una contraseña";
      return;
    }
    msjAlerta.innerHTML="";
  
    let MyURL2=MyURL+`\\${inputEmail.value}\\${visible.value}`;
    console.log(MyURL2);
    let res = await requestGet("Fetch",MyURL2);

    if(res==null || res.userId== null || res.compraId==null){
      msjAlerta.innerHTML=" Correo y contraseña incorrectos";
      return;
    }
    const sessionId = Date.now();// solo para probar, esto debe venir del backend 
     //code - success  
    setCookie('session_id', sessionId, 3); // cookie name, valor, numero de dias para expirar 
    let redirectTo = document.referrer;// de donde venias caso 1 
    if (getCookie('post_login_redirect') ) { //caso2 
        redirectTo = getCookie('post_login_redirect'); 
        deleteCookie('post_login_redirect'); 
    } 
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('compraId', res.compraId);
    window.location.href = redirectTo; 
  }


  async function requestGet(proveedor = "Fetch", direccionhttp) {
    if (proveedor == "Fetch") {
        return new Promise((resolve, reject) => {
        fetch(direccionhttp)
        .then(response =>{ //Opcional
          if(response.ok){
            //console.log("HTTP request successful");
          }else{
            //console.log("HTTP request unsuccessful");
            //return resolve(null);
          }
          return response;
      }) 
      .then(response =>response.json()) 
      .then(json =>{
        //console.log(JSON.stringify(json)); // Imprimir todo el json que nos regresa el fetch
        resolve(json);// devuelve la parte de products del json
      }).catch((error) => {
        //console.log(error);
        //reject(error);
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
            //console.log(error);
            //reject(error);
            reject(null);
          });
      });
    }
  }
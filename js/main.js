/*
SETCOOKIE
Primero, creamos una function llamada setCookie que almacena el nombre del visitante en una 
cookie
https://www.w3schools.com/js/js_cookies.asp*/

/*1. Los parámetros de la función setCookie son:
    (cname),nombre de la cookie 
    (cvalue)valor de la cookie .
    (exdays)número de días hasta que caduque la cookie.*/

const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    /*2. La función establece una cookie sumando el el valor de los parametros.*/
};



//GETCOOKIE
/*Luego, creamos una function que devuelve el valor de una cookie específica:*/

//declaramos una function y le colocamos nombre del parámetro como (cname).
const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

//function para eliminar la cookie
const deleteCookie = (cname) => {
    //Para eliminar una cookie establecemos el parámetro de expiración en 
    //una fecha pasada.
    document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const isUserLogged = () => {
    return Boolean(getCookie('session_id'));
};

const bindGotoLoggedListener = () => {
    const buttons = document.querySelectorAll('[data-loggedhref]');// buscar todos los botones con el data atributo loggedhref 
    for (let button of buttons) {
        //Por cada boton encontrado agrega un listener al evento click
        button.addEventListener('click', () => {
            //Cuando el boton es clicked
            if(isUserLogged() === true) { // si el usuario esta logueado 
                //ir a la pagina que desea.
                window.location.assign(button.dataset.loggedhref);
            } else {
                // si no, guardar la cookie la pagina a donde debe ir despues del login.
                setCookie('post_login_redirect',  window.location.origin + button.dataset.loggedhref); 
                window.location.assign("/html/login.html");
            }
            
        });
    }
};
window.addEventListener('DOMContentLoaded', () => {
    bindGotoLoggedListener();
});


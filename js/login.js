const formSignin = document.getElementById('form-signin');

formSignin.addEventListener('submit', (event) => {
    event.preventDefault();
    //enviar request para  iniciar sesion en el backend;

    const sessionId = Date.now();// solo para probar, esto debe venir del backend
     //code - success 
    setCookie('session_id', sessionId, 3); // cookie name, valor, numero de dias para expirar
    let redirectTo = document.referrer;// de donde venias caso 1
    if (getCookie('post_login_redirect') ) { //caso2
        redirectTo = getCookie('post_login_redirect');
        deleteCookie('post_login_redirect');
    }
    window.location.href = redirectTo;
    //code - success
})
const URL_COMENT_LOCAL="http://localhost:8080/api/agenda";
const URL_COMENT_LOCAL2="http://localhost:8080/api/agenda/addPaquete";


const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
//let select = document.getElementById('paquete');
let continuarCompra= document.getElementById('procederCompra');

const categoriaIn=document.getElementById("categoria");
const paqueteIn=document.getElementById("paquete");


window.addEventListener('DOMContentLoaded', ()=> {
	cargarDatosPersonales()
});

let nombreIn= document.getElementById("nombre");
let apellidoIn= document.getElementById("apellido");
let correoIn= document.getElementById("correo");
let telefonoIn= document.getElementById("telefono");
let calleIn= document.getElementById("calle");
let codigoPIn= document.getElementById("codigoPostal");
let municipioIn= document.getElementById("municipio");
let estadoIn= document.getElementById("estado");
let fechaIn= document.getElementById("fecha");
let horaIn= document.getElementById("hora");


function cargarDatosPersonales(){
    fetch((URL_COMENT_LOCAL+"/"+String(localStorage.getItem("userId")))) //el nombre del archivo JSON donde se extraeran los datos
    .then(respuesta=> respuesta.json()) //indica formato en el que se desea obtener la info
    .then(datos=> {               //datos=respuesta.json (array)
        return mostrarDatos(datos);
    })
           
}

    function mostrarDatos(usuario) {
        
		nombreIn.value=usuario.nombre;
		apellidoIn.value=usuario.apellido;
		correoIn.value=usuario.correo;
		telefonoIn.value=usuario.telefono;
    }







categoriaIn.addEventListener("change",()=>{

	if(categoriaIn.value=="Familiar"){
		paqueteIn.innerHTML=`
		<option >Selecciona una Opción</option>
		<option value="Básico">Básico</option>
		<option value="Elite">Elite</option>`;
	}else{
		paqueteIn.innerHTML=`
		<option >Selecciona una Opción</option>
		<option value="Pre Evento">Pre-Evento</option>
		<option value="Evento">Evento</option>`;
	}
})


/*
const expresiones = {
	//usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	//password: /^.{4,12}$/, // 4 a 12 digitos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{10,14}$/, // 7 a 14 numeros.
	calle:/^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	codigoPostal:/^[0-9]\d{4,7}$/,
	municipio:/^[a-zA-ZÀ-ÿ\s]{4,40}$/,
	estado:/^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    fecha: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
	hora: /^\d{1,2}\:\d{1,2}$/ 
    //paquete:true
	//paquete: select.value


}

const campos = {
	usuario: false,
	nombre: false,
	//password: false,
	apellido: false,
	correo: false,
	telefono: false,
	calle:false,
	codigoPostal:false,
	municipio:false,
	estado:false,
	fecha: false,
	hora: false
	//paquete: false
  
  //paquete:true
}*/

/* btnCompra.addEventListener("click", () => {
	localStorage.setItem('idCompra', '');
  });
 */

continuarCompra.addEventListener("click", () => {

	//Se tienen que validar todos el formulario (que tenga info y esté correcta antes)

	// si todo está bien, se incia el proceso del post
	enviaPost();
});
  

async function enviaPost() {
	let comentarioUser= document.getElementById("cajitaComent");
   let data={
		   direccion:String(calleIn.value+" "+codigoPIn.value+" "+municipioIn.value+" "+estadoIn.value),
		   fecha:String(fechaIn.value),
		   compraId:String(localStorage.getItem("compraId")),
		   userId:String(localStorage.getItem("userId")),
		   nombrePaquete:paqueteIn.value,
		   nombreCategoria:categoriaIn.value,
		   telefono:telefonoIn.value,
	   }
	let resp= await requestPostJson(URL_COMENT_LOCAL2, data);
	//Significa que huo un fallo
	if(resp==null)
	   return;
	let cantidad=Number(iconoCarrito.innerHTML);
	iconoCarrito.innerHTML=String(cantidad+1);
}



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

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
});
 /*
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
	
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "calle":
			validarCampo(expresiones.calle, e.target, 'calle');
		break;
		case "codigoPostal":
			validarCampo(expresiones.codigoPostal, e.target, 'codigoPostal');
		break;
		case "municipio":
			validarCampo(expresiones.municipio, e.target, 'municipio');
		break;
		case "estado":
			validarCampo(expresiones.estado, e.target, 'estado');
		break;
        
		
        case "fecha":
      		validarCampo(expresiones.fecha, e.target, 'fecha');
   		 break;
		 
    	case "hora":
      		validarCampo(expresiones.hora, e.target, 'hora');
    	break; 
	}
}
/*
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}


/*
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.correo && campos.telefono && campos.calle && campos.codigoPostal && campos.municipio && campos.estado && campos.paquete && campos.fecha && campos.hora && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});


//Hacer post
/* window.addEventListener('DOMContentLoaded', ()=> {
    solicitudDatosForm();
});



 */


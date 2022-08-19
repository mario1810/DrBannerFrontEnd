const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
let select = document.getElementById('paquete');
let continuarCompra= document.getElementById('procederCompra');



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
}

/* btnCompra.addEventListener("click", () => {
	localStorage.setItem('idCompra', '');
  });
 */
continuarCompra.addEventListener("click", () => {
	let cantidad=Number(iconoCarrito.innerHTML);
  iconoCarrito.innerHTML=String(cantidad+1);
  });

  
 
 
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		/*case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;*/
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
        /*
		case "paquete":
			validarCampo(expresiones.paquete, e.target, 'paquete');
		break; */
		
        case "fecha":
      		validarCampo(expresiones.fecha, e.target, 'fecha');
   		 break;
		 
    	case "hora":
      		validarCampo(expresiones.hora, e.target, 'hora');
    	break; 
	}
}
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

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(/*campos.usuario &&*/ campos.nombre && campos.apellido && /*campos.password && */campos.correo && campos.telefono && campos.calle && campos.codigoPostal && campos.municipio && campos.estado && campos.paquete && campos.fecha && campos.hora/*&& campos.paquete*/ && terminos.checked ){
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


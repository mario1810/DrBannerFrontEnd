const URL_COMENT_LOCAL="/assets/json/perfil.json"; //Provicional en lo que se genera el de login 
const URL_COMENT_LOCAL2="/assets/json/perfil.pago.json";
const URL_COMENT_LOCAL3="/assets/json/carritoPaquetesGet.json";
//const URL_COMENT_LOCAL="/assets/json/perfilprueba.json";
//const URL_COMENT_LOCAL2="/assets/json/perfilpagoprueba.json";
//const URL_COMENT_LOCAL3="/assets/json/perfilpaquetesprueba.json";

function cargarDatosPersonales(){
    fetch(URL_COMENT_LOCAL) //el nombre del archivo JSON donde se extraeran los datos
    .then(respuesta=> respuesta.json()) //indica formato en el que se desea obtener la info
    .then(datos=> {               //datos=respuesta.json (array)
        console.log("datos personales");
        console.log(datos.data); 
        return mostrarDatos(datos.data);
    })
           
    }
    //data-title="Nombre" ,  data-title="Apellidos" ,  data-title="Correo" ,  data-title="Contraseña" ,  data-title="Telefono"


    function mostrarDatos(arreglo) {
        let datos = "";
        for (let usuario of arreglo) {
            datos = datos + `<tr>
            <td>${usuario.nombre}</td>  
            <td>${usuario.apellido}</td>
            <td>${usuario.correo}</td>   
            <td>${usuario.contra}</td>
            <td>${usuario.telefono}</td>
            </tr>`;
        }
        document.getElementById("datosPersonales").innerHTML = datos;
    }
        

function cargarFormaDePago(){
    fetch(URL_COMENT_LOCAL2) //el nombre del archivo JSON donde se extraeran los datos
    .then(res=> res.json()) //indica formato en el que se desea obtener la info
    .then(datos=> {               //datos=respuesta.json (array)
       console.log("datos usuario");
        console.log(datos.usuario); 
        return mostrarDatosPago(datos.usuario);
    })
           
    }
    
    function mostrarDatosPago(arregloPago) {
        let datosPago = "";
        for (let pago of arregloPago) {
            datosPago = datosPago + `<tr>
            <td>${pago.nombre}</td>
            <td>${pago.apellido}</td>
            <td>${pago.tarjeta.tipo}</td>                   
            <td>${pago.tarjeta.numeroTarjeta}</td>
            </tr>`; //Linea 46 deberia ser tarjeta.pago , pero la wabada bota error(grita en silencio)
        }
        document.getElementById("datosFormaPago").innerHTML = datosPago;
    } 

    
     
   
function cargarHistorialCompra(){
        fetch(URL_COMENT_LOCAL3) //el nombre del archivo JSON donde se extraeran los datos
        .then(respuestaHistorial=> respuestaHistorial.json()) //indica formato en el que se desea obtener la info
        .then(datos=> {       
            console.log(datos.usuario);        //datos=respuesta.json (array)
            // console.log("compras");
            // let array=datos.usuario;
            // console.log(array); 
            // console.log(typeof(array));
            let usuarioArray= datos.usuario;
            console.log(usuarioArray.carrito);
            mostrarDatosCompra(usuarioArray.carrito);
            //return mostrarDatosCompra(datos.usuario);
        })
            
               
        }
        
    function mostrarDatosCompra(arregloPaquete) {
            let datosAnteriores = "";
            for (let paquete of arregloPaquete) {
                //id paquete tipo costo fecha
                datosAnteriores = datosAnteriores + `<tr>
                <td>${paquete.id}</td> 
                <td>${paquete.paquete}</td>
                <td>${paquete.tipo}</td>   
                <td>${paquete.costo}</td>
                <td>${paquete.fecha}</td>
                </tr>`;
            }
            document.getElementById("datosHistorialCompras").innerHTML = datosAnteriores;
        }
     


/* Funciones mostrar tablas de datos ***************************8***********/
//Datos personales
function mostrarDatosPersonales(){
    document.getElementById('divDatosPesonales').style.display = 'block';
}
//Forma de pago
function mostrarFormaPago(){
    document.getElementById('divFormasPago').style.display = 'block';
}
//Compras anteriores
function mostrarComprasAnteriores(){
    document.getElementById('divComprasAnteriores').style.display = 'block';
}


/* Funciones ocultar tablas de datos ***************************8***********/
//Datos personales
function ocultarDatosPersonales(){
    document.getElementById('divDatosPesonales').style.display = 'none';
   // document.getElementById('btnDatosPersonales').style.display = 'none';
}
//Forma de pago
function ocultarFormaPago(){
    document.getElementById('divFormasPago').style.display = 'none';
  //  document.getElementById('btnformaPago').style.display = 'none';
}
//Compras anteriores 
function ocultarComprasAnteriores(){
    document.getElementById('divComprasAnteriores').style.display = 'none';
  //  document.getElementById('btnHistorialCompra').style.display = 'none';
}


    cargarDatosPersonales();
    cargarFormaDePago();
    cargarHistorialCompra();



    // MOSTRAR EN CONSOLA LAS ENTRADAS DE ESTRELLAS 

    function leeEstrella() {
        let five= document.getElementById("five").checked;
        let four= document.getElementById("four").checked;
        let three= document.getElementById("three").checked;
        let two= document.getElementById("two").checked;
        let one= document.getElementById("one").checked;
        

        enviarEstrella(five,5);
        enviarEstrella(four,4);
        enviarEstrella(three,3);
        enviarEstrella(two,2);
        enviarEstrella(one,1);

        console.log("------------");

        
    }

    function enviarEstrella(estrella,numero) {
      console.log("valor estrella "+numero+" es: "+ estrella);

      if (estrella){
        console.log("Numero de estrellas: "+numero);
        //aqui debe ir el post que manda el valor de "numero"
      }

      //Creamos el objeto a enviar como json
        // let user = {
        //     id: Number(userId),
        //     total: Number(totalC.substring(1, totalC.length)),
        // };
      
    }
    
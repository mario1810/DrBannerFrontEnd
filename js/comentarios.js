

const URL_COMENT_LOCAL="/assets/json/comentarios.json";

function solicitudBtn() {

    fetch(URL_COMENT_LOCAL)
    
    //Cuando los llegue la info de fetch, esa info se transforma en formato json
    .then((respuesta) => respuesta.json())
    
    //info es la información de la instrucción anterior, es el resultado de respuesta.json()
    .then((info) => {
        //Se imprime la informacion en consola
        console.log(info.data);
        //Se guarda la informacion en localstorage
        localStorage.setItem("Información de comentarios",JSON.stringify(info.data));
        //se muestra la información en el html con la siguiente función (ver más abajo la función)

        return mostrarInfo(info.data);
        
    })

    //Instrucción en caso de que haya un error 
    .catch((error) => console.log(error));

}



function mostrarInfo(arreglo){
//Funcion estrellas para hacer dinamicas las estrellas
  // estrellas(arreglo);

    let comentarios = "";
    
     for(let usuario of arreglo){

      //Se llama a la función que imprime el codigo de acuerdo al numero de estrellas
            let estrellas=codigoEstrellas(usuario.stars);

         //Es el código que comparten todos los comentarios en html
            let contenidoEtiquetas=
            `<div class="container">
                <div class="row pt-3">

                  <div class="col-2" id="izquierta-comment"></div>

                  <blockquote class="col-8 text-center">
            
                    <img src="${usuario.foto}" alt="avatar"
                    class="avatar">
                    
                    
                    <div class="d-flex flex-row justify-content-center p-3 stars">
                      ${estrellas}
                      
                    </div>
                    
                    <p>
                        ${usuario.comentario}
                    </p>
            
                    
                    <footer class="blockquote-footer pt-2 fs-3">
                      <cite>
                      ${usuario.nombre+" "+usuario.apellido}
                      </cite>
                    </footer>
                  </blockquote>
                </div>
            </div> `;

            
            


            if(usuario.id==1){
                /**Ingresar nuevos datos en el objeto con id "primer_comentario"
                Solo se imprime el comentario del primer usuario en este id porque
                el bootstrap indica que solo el 1er coment tiene la clase active
                */
               document.getElementById("primer_comentario").innerHTML=contenidoEtiquetas;
            }

            else{
                comentarios=comentarios+
                `<div class="carousel-item"> `+contenidoEtiquetas+` </div>`;
            }
        }
        
        document.getElementById("otros_comentarios").innerHTML=comentarios;

}

//Función que regresa el codigo de acuerdo al numero de estrellas

function codigoEstrellas(numEstrellas) {
  console.log(numEstrellas);
  let codigoEs="";

            for (let i = 0; i< numEstrellas; i ++) {
              codigoEs=codigoEs+`<i class="bi bi-star-fill"></i>`;
              
            }
            console.log(codigoEs);
            return codigoEs;
      
}



solicitudBtn();



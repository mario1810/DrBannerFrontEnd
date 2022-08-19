
//Buscar servicio por el nombre
const packagesMap = { xv: 1, boda: 2, familiar: 3 };

const fetchServiceByName = name => fetch(`https://lit-falls-71538.herokuapp.com/api/paquetes/${ packagesMap[name.toLowerCase()]}`)
    .then(response => response.json())
    .then( data => {
        data.services.forEach(service => {
            service.items = service.items.map( item  => item.name);
        });
        return data;
    })
    .catch(() => fetch(`/assets/json/packages/${name.toLowerCase()}.json`).then(response => response.json()))
    

//Dinamico
const setTitle = (title) => {
    const element =  document.querySelector('.js-title');// obtiene el primer DOM element con la clase js-title.
    element.innerHTML = title; // set el nuevo contenido del DOM element js-title
};
//Dinamico

const createImageColTemplate = (image, isActive) => {
    //image: {"title", "url"}, isActive: Boolean
    return `
        <div class="col-sm-4 ${ isActive ?  '' : 'd-none d-sm-block'}"> 
            <img title="${ image.title }" src="${ image.url }" class="img-fluid rounded-2" alt="...">
        </div>
    `;
};
const createCarouselItemTemplate = (images, isActive) => {
    /**
     * images: [{title, url}, {title, url}, {title, url}]
     * isActive:Boolean
     * 
    */
    return `
        <div class="carousel-item ${ isActive ?  'active': ''} ">
            <div class="card border-0">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    ${ images.map((image, index) => createImageColTemplate(image, index === 0)).join('\n') }
                </div>
            </div>
            </div>
        </div>
    `;
};

const createListItem = content => `<li class="list-group-item border-0 text-center">${ content }</li>`;
const createAcccordionItem = (data, index) => {
    return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${ index }">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${ index }" aria-expanded="false" aria-controls="flush-collapse${ index }">
                ${ data.name }
            </button>
            </h2>
            <div id="flush-collapse${ index }" class="accordion-collapse collapse" aria-labelledby="flush-heading${ index }" data-bs-parent="#js-accordion-services">
                <div class="accordion-body">
                    <ul class="list-group">
                        ${ data.items.map(createListItem).join('\n') }
                    </ul>
                </div>
            </div>
        </div>
    `;
};

const setCarouselItems = (images) => {
    const caruoselData = [
        [].concat(images).splice(0, 3),
        [].concat(images).splice(3, 3),
        [].concat(images).splice(6, 3),
    ];

    /*
        [
            [{title, url}, {title, url}, {title, url}] slide1 3 images
            [{title, url}, {title, url}, {title, url}] slide2 3 images
            [{title, url}, {title, url}, {title, url}] slide4 3 images
        ]
    
    */
    const carouselInner =  document.querySelector('.js-carousel-inner');
    carouselInner.innerHTML = caruoselData
        .map( (tripleImages , index) => createCarouselItemTemplate(tripleImages, index === 0))
        .join('\n');
};

const setServices = (services) => {
    const accordionElement =  document.querySelector('#js-accordion-services');
    accordionElement.innerHTML = services.map(createAcccordionItem).join('\n');
};

const setPage = async (pageName) => {
    document.querySelector('head title').innerHTML = pageName;
    const data = await fetchServiceByName(pageName);
    setTitle(data.title);
    setCarouselItems(data.images);
    setServices(data.services);
};

addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const service = url.searchParams.get('servicio')
    const serviceName= service || 'xv';
    setPage(serviceName).catch(console.error);
});


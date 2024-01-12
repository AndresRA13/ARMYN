


const hamburguerIcon = document.querySelector('.nav__hamburguer');
const navOverlay = document.querySelector('.nav__overlay');
let currentDropdown = navOverlay;

hamburguerIcon.addEventListener('click', ()=>{
    hamburguerIcon.classList.toggle('nav__hamburguer--open');

    navOverlay.classList.toggle('nav__overlay--show');
});

navOverlay.addEventListener('click', (e)=>{
    e.preventDefault();
    const currentElement = e.target;
    // console.log(e.target.classList.value);

    if( isActive(currentElement, 'nav__parent') ){

        const subMenu = currentElement.parentElement.children[1];
       

        if(window.innerWidth < 768){

            let height = (subMenu.clientHeight == 0) 
                        ? subMenu.scrollHeight : 0;
            // console.log(subMenu.clientHeight);

            subMenu.style.height = `${height}px`;
        }else{

            if( !isActive(subMenu, 'nav__inner--show') ){
                closeDropdown(currentDropdown);
            }
            subMenu.classList.toggle('nav__inner--show');

            currentDropdown = subMenu;

        }

    }
    
});

function isActive(element, string){
    return element.classList.value.includes(string);
}

function closeDropdown(currentDropdown){
    if( isActive(currentDropdown, 'nav__inner--show')){
        currentDropdown.classList.remove('nav__inner--show');
    }
}

window.addEventListener('resize', ()=>{
    closeDropdown(currentDropdown);

    if(window.innerWidth > 768){
        const navInners = document.querySelectorAll('.nav__inner');

        navInners.forEach(navInner =>{
            navInner.style.height = '';
        });
    }
});


//**Function redirect page location */
function redirectToPage(page) {
    window.location.href = `${page}.html`;
}


function changeMainImage(mainImageId, thumbnail) {
    const mainImage = document.getElementById(mainImageId);
    const thumbnailSrc = thumbnail.src;
    mainImage.src = thumbnailSrc;
  }




  function addToCart(imageId) {
    // Obtén los valores específicos del producto
    var productContainer = event.target.closest(".product_information");
    var imageSrc = document.getElementById(imageId).src;
    var title = productContainer.querySelector(".subtitle").textContent;
    var priceString = productContainer.querySelector(".price").textContent;
    var price = parseFloat(priceString.replace("$", "").trim());

    // Encuentra el input de talla específico para este producto dentro del contenedor
    var sizeInput = productContainer.querySelector(".select input[type='text']");

    // Obtén la talla del input actual
    var size = sizeInput ? sizeInput.value : "";

    // Obtén la cantidad directamente del input
    var quantityInput = productContainer.querySelector(".add_car input[type='number']");
    var quantity = quantityInput ? quantityInput.value : 1;

    // Crea un objeto con la información del producto
    var product = {
        imageSrc: imageSrc,
        title: title,
        price: price,
        size: size,
        quantity: quantity,
    };

    // Recupera el carrito de localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Agrega el nuevo producto al carrito
    cart.push(product);

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
        title: "Excelente!",
        text: "Se agrego al carrito!!",
        icon: "success"
      });
}


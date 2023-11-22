
/*funcionalidad del modal de agregar presupuesto */
const Close =  document.querySelector('.close');
const abrir = document.querySelector('.addPresupuesto');
const modal = document.querySelector('.modal_one');

abrir.addEventListener('click', () => {
    modal.classList.add('mostrar');
    Close.classList.add('mostrar');  // Agrega la clase 'mostrar' a Close
});

Close.addEventListener('click', () => {
    modal.classList.remove('mostrar');
    Close.classList.remove('mostrar');  // Quita la clase 'mostrar' de Close
});


/**Modal de agregar ganancias*/
const closeBtn =  document.querySelector('.closeBtn');
const abrirBtn =  document.querySelector('.abrirBtn');
const modalBit =  document.querySelector('.modal__add');
abrirBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    modalBit.classList.add('mostrar');
    closeBtn.classList.add('mostrar');
    
    
});
closeBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    modalBit.classList.remove('mostrar');
    closeBtn.classList.remove('mostrar');

})


function formatToCOP(valor) {
    return valor.toLocaleString("es-CO", { style: "currency", currency: "COP" });
}
// Obtener elementos del DOM
let form = document.querySelector('.inputs');
let btnPresupuesto = document.querySelector('.pres_add');
let result = document.getElementById('Resultado');

// Evento de envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener el valor actual del botón de presupuesto
    let btnPresupuestoActive = parseFloat(btnPresupuesto.value);

    // Obtener el resultado almacenado en el localStorage
    const storeResult = localStorage.getItem('total');

    // Verificar si el resultado almacenado es válido
    if (storeResult !== null) {
        // Sumar el valor del botón de presupuesto al resultado almacenado
        let nuevoTotal = parseFloat(storeResult) + btnPresupuestoActive;

        // Formatear el nuevo total a moneda colombiana y mostrarlo en el resultado
        result.innerHTML = formatToCOP(nuevoTotal);
        
        // Actualizar el localStorage con el nuevo total
        localStorage.setItem('total', nuevoTotal.toFixed(1));
    } else {
        // Si no hay resultado almacenado, mostrar un mensaje de error o realizar alguna acción
        console.error('No se encontró un resultado almacenado en el localStorage');
    }

    // Ocultar el modal
    modal.classList.remove('mostrar');
    Close.classList.remove('mostrar');
});

// Cargar el resultado almacenado al cargar la página
const storeResult = localStorage.getItem('total');
if (storeResult !== null) {
    // Formatear el resultado a moneda colombiana y mostrarlo en la página
    result.innerHTML = formatToCOP(parseFloat(storeResult));
}





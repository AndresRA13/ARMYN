


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

        // Mostrar el nuevo total en el resultado y actualizar el localStorage
        result.innerHTML = '$ ' + nuevoTotal.toFixed(2);
        localStorage.setItem('total', nuevoTotal.toFixed(2));
    } else {
        // Si no hay resultado almacenado, mostrar un mensaje de error o realizar alguna acción
        console.error('No se encontró un resultado almacenado en el localStorage');
    }
});

// Cargar el resultado almacenado al cargar la página
const storeResult = localStorage.getItem('total');
if (storeResult !== null) {
    result.innerHTML = '$ ' + storeResult;
}






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



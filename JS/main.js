
let form = document.getElementById('Form');
let valorOne = document.getElementById('valorOne');
let valorTwo = document.getElementById('valorTwo');
let inputSelect = document.getElementById('operacion');
let result = document.getElementById('Resultado');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    valorOneValue = parseFloat(valorOne.value);
    valorTwoValue = parseFloat(valorTwo.value);
    operacion = inputSelect.value;
    let resultado;
    switch (operacion) {
        case '+':
            resultado = '$ ' +  valorOneValue + valorTwoValue;
            break;
        case '-':
            resultado = valorOneValue - valorTwoValue;
            break;
        default:
            resultado = 'invalida';

    }
    localStorage.setItem('Total', JSON.stringify(resultado));
    result.innerHTML = resultado;
})



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



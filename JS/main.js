

/*Funcion */

/*FUNCIOANLIDAD DE LOS MODALES */
/*funcionalidad del modal de agregar presupuesto */
const Close = document.querySelector('.close');
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
const closeBtn = document.querySelector('.closeBtn');
const abrirBtn = document.querySelector('.abrirBtn');
const modalBit = document.querySelector('.modal__add');

abrirBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalBit.classList.add('mostrar');
    closeBtn.classList.add('mostrar');


});
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalBit.classList.remove('mostrar');
    closeBtn.classList.remove('mostrar');

});


/**Modal de restar las ganancias o gastos*/
const closeBTN = document.querySelector('.closeBTN');
const openBTN = document.querySelector('.openBTN');
const modalDelete = document.querySelector('.modal_delete');
openBTN.addEventListener('click', (e) => {
    e.preventDefault();
    modalDelete.classList.add('mostrar');
    closeBTN.classList.add('mostrar');


});
closeBTN.addEventListener('click', (e) => {
    e.preventDefault();
    modalDelete.classList.remove('mostrar');
    closeBTN.classList.remove('mostrar');

});

document.addEventListener('DOMContentLoaded', function () {
  // Evento de envío del formulario de Presupuesto
  document.querySelector('.inputs').addEventListener('submit', function (e) {
    e.preventDefault();
    modal.classList.remove('mostrar');
    Close.classList.remove('mostrar');
    agregarAlHistorial('Presupuesto', '', parseFloat(document.querySelector('.pres_add').value));
  });

  // Evento de envío del formulario de Ganancia
  document.querySelector('.newInputs').addEventListener('submit', function (e) {
    e.preventDefault();
    let descripcion = document.querySelector('.newInputs .descrip').value;
    modalBit.classList.remove('mostrar');
    closeBtn.classList.remove('mostrar');
    agregarAlHistorial('Ganancia', descripcion, parseFloat(document.querySelector('.newInputs input[type="text"]').value));
  });

  // Evento de envío del formulario de Gasto
  document.querySelector('.deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let descripcion = document.querySelector('.deleteForm .descripcion').value;
    modalDelete.classList.remove('mostrar');
    closeBTN.classList.remove('mostrar');
    agregarAlHistorial('Gasto', descripcion, -parseFloat(document.querySelector('.deleteForm input[type="text"]').value));
  });

  // Evento para eliminar un elemento del historial
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete_btn')) {
      eliminarElementoHistorial(e.target.closest('.history_item'));
    }
  });

  // Función para agregar elementos al historial y localStorage
  function agregarAlHistorial(tipo, mensaje, monto) {
    let historialItem = { tipo: tipo, mensaje: mensaje, monto: monto };
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(historialItem);
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarTotal();
    mostrarHistorialEnPagina();
  }

  // Función para eliminar un elemento del historial
  function eliminarElementoHistorial(elemento) {
    let indice = Array.from(elemento.parentNode.children).indexOf(elemento);
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.splice(indice, 1);
    localStorage.setItem('historial', JSON.stringify(historial));
    actualizarTotal();
    mostrarHistorialEnPagina();
  }

  // Función para mostrar el historial en la página
  function mostrarHistorialEnPagina() {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    let historialDiv = document.querySelector('.history');
    historialDiv.innerHTML = '';
    
    let totalGastos = 0;
    let totalGanancias = 0;

    if (historial.length > 0) {
      historial.forEach(item => {
        let nuevoElemento = document.createElement('div');
        nuevoElemento.className = 'history_item';

        if (item.tipo === 'Gasto') {
          nuevoElemento.classList.add('gasto');
          totalGastos += item.monto;
        } else if (item.tipo === 'Ganancia') {
          nuevoElemento.classList.add('ganancia');
          totalGanancias += item.monto;
        }

        nuevoElemento.innerHTML = `<span>${item.tipo}: <br> ${item.mensaje}</span><span class="amount">${formatToCOP(item.monto)}</span><button class="delete_btn">Eliminar</button>`;
        historialDiv.appendChild(nuevoElemento);
      });
    } else {
      historialDiv.innerHTML = '<h1>No has agregado un presupuesto</h1>';
    }

    // Mostrar totales de gastos, ganancias y depósito
    document.querySelector('.gastos').textContent = `Gastos: ${formatToCOP(totalGastos)}`;
    document.querySelector('.ganancias').textContent = `Ganancias: ${formatToCOP(totalGanancias)}`;
    document.querySelector('.deposito').textContent = `Depósito: ${formatToCOP(actualizarDeposito())}`;
  }

  // Función para actualizar el valor total
  function actualizarTotal() {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    let nuevoTotal = historial.reduce((total, item) => total + item.monto, 0);
    document.getElementById('Resultado').innerHTML = formatToCOP(nuevoTotal);
    localStorage.setItem('total', nuevoTotal);
  }

  // Función para actualizar el valor del depósito
  function actualizarDeposito() {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    let deposito = historial.reduce((total, item) => {
      if (item.tipo === 'Presupuesto') {
        return total + item.monto;
      }
      return total;
    }, 0);
    localStorage.setItem('deposito', deposito);
    return deposito;
  }

  // Llamar a la función al cargar la página para mostrar el historial existente
  mostrarHistorialEnPagina();
  // Llamar a la función al cargar la página para actualizar el valor total y del depósito
  actualizarTotal();
  actualizarDeposito();
});

// Función para formatear a moneda colombiana
function formatToCOP(valor) {
  return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
}

// Función para eliminar todo el almacenamiento local
const btnClean = document.querySelector('.btnEliminar');
btnClean.addEventListener('click', (e) => {
  e.preventDefault();

  if (localStorage.getItem('historial')) {
    Swal.fire({
      title: 'Eliminar historial',
      text: '¿Estás seguro de que deseas eliminar todo el historial?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        console.log("Se ha eliminado todo el almacenamiento local.");

        Swal.fire({
          title: 'Historial eliminado',
          text: 'Has eliminado completamente el historial.',
          icon: 'success',
        }).then(() => {
          location.reload(true);
        });
      }
    });
  } else {
    Swal.fire({
      title: 'Sin historial',
      text: 'No hay historial para eliminar.',
      icon: 'info',
    });
  }
});


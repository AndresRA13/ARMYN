
let spaceHeight =  document.querySelector('.space');
spaceHeight.style.height = '8vh';
let converter = document.querySelector('.converter');
converter.style.display = 'none';

// mostrar historial en el dom

/*Funcion */

/*FUNCIOANLIDAD DE LOS MODALES */
/*funcionalidad del modal de agregar presupuesto */




document.addEventListener('DOMContentLoaded', function () {
   // Evento de envío del formulario de Presupuesto
document.querySelector('.inputs').addEventListener('submit', function (e) {
  e.preventDefault();
  agregarAlHistorial('Presupuesto', '', parseFloat(document.querySelector('.pres_add').value));
});

  // Evento de envío del formulario de Ganancia
document.querySelector('.newInputs').addEventListener('submit', function (e) {
  e.preventDefault();
  // Obtener el valor del campo de descripción
  let descripcion = document.querySelector('.newInputs .descrip').value;
  // Llamar a la función agregarAlHistorial con el tipo, mensaje y monto
  agregarAlHistorial('Ganancia', descripcion, parseFloat(document.querySelector('.newInputs input[type="text"]').value));
});

// Evento de envío del formulario de Gasto
document.querySelector('.deleteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Obtener el valor del campo de descripción
  let descripcion = document.querySelector('.deleteForm .descripcion').value;
  // Llamar a la función agregarAlHistorial con el tipo, mensaje y monto
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
      // Crear un objeto que representa un elemento del historial
      let historialItem = { tipo: tipo, mensaje: mensaje, monto: monto };
  
      // Obtener el historial actual del localStorage
      let historial = JSON.parse(localStorage.getItem('historial')) || [];
  
      // Agregar el nuevo item al historial
      historial.push(historialItem);
  
      // Almacenar el historial actualizado en el localStorage
      localStorage.setItem('historial', JSON.stringify(historial));
  
      // Actualizar el valor total
      actualizarTotal();
  
      // Mostrar el historial en la página
      mostrarHistorialEnPagina();
    }
  
    // Función para eliminar un elemento del historial
    function eliminarElementoHistorial(elemento) {
      // Obtener el índice del elemento en el historial
      let indice = Array.from(elemento.parentNode.children).indexOf(elemento);
  
      // Obtener el historial actual del localStorage
      let historial = JSON.parse(localStorage.getItem('historial')) || [];
  
      // Eliminar el elemento del historial
      historial.splice(indice, 1);
  
      // Almacenar el historial actualizado en el localStorage
      localStorage.setItem('historial', JSON.stringify(historial));
  
      // Actualizar el valor total
      actualizarTotal();
  
      // Mostrar el historial en la página
      mostrarHistorialEnPagina();
    }
  
    // Función para mostrar el historial en la página
   // Función para mostrar el historial en la página
function mostrarHistorialEnPagina() {
  // Obtener el historial actual del localStorage
  let historial = JSON.parse(localStorage.getItem('historial')) || [];

  // Obtener el div del historial
  let historialDiv = document.querySelector('.history');

  // Limpiar el contenido actual del historialDiv
  historialDiv.innerHTML = '';

  // Verificar si hay elementos en el historial
  if (historial.length > 0) {
    historial.forEach(item => {
      let nuevoElemento = document.createElement('div');
      nuevoElemento.className = 'history_item';

      // Agregar la clase "gasto" si el tipo es Gasto
      if (item.tipo === 'Gasto') {
        nuevoElemento.classList.add('gasto');
      }

      nuevoElemento.innerHTML = `<span>${item.tipo}: <br> ${item.mensaje}</span><span class="amount">${formatToCOP(item.monto)}</span><button class="delete_btn">Eliminar</button>`;
      historialDiv.appendChild(nuevoElemento);
    });
  } else {
    // Si no hay elementos en el historial, mostrar un mensaje
    historialDiv.innerHTML = '<h1>No has agregado un presupuesto</h1>';
  }
}
    
  
    // Función para actualizar el valor total
    function actualizarTotal() {
      // Obtener el historial actual del localStorage
      let historial = JSON.parse(localStorage.getItem('historial')) || [];
  
      // Calcular el nuevo total sumando los montos del historial
      let nuevoTotal = historial.reduce((total, item) => total + item.monto, 0);
  
      // Mostrar el nuevo total en la página
      document.getElementById('Resultado').innerHTML = formatToCOP(nuevoTotal);
  
      // Actualizar el total en el localStorage
      localStorage.setItem('total', nuevoTotal);
    }
  
    // Llamar a la función al cargar la página para mostrar el historial existente
    mostrarHistorialEnPagina();
    // Llamar a la función al cargar la página para actualizar el valor total
    actualizarTotal();
  });
  
  // Función para formatear a moneda colombiana
  function formatToCOP(valor) {
    return valor.toLocaleString("es-CO", { style: "currency", currency: "COP" });
  }
  

// Función para eliminar todo el almacenamiento local
const btnClean = document.querySelector('.btnEliminar');
btnClean.addEventListener('click', (e) => {
  e.preventDefault();

  // Verificar si hay elementos en el historial antes de eliminar
  if (localStorage.getItem('historial')) {
    // Mostrar SweetAlert2 con un mensaje
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
        // Eliminar todo el almacenamiento local
        localStorage.clear();
        console.log("Se ha eliminado todo el almacenamiento local.");

        // Mostrar un mensaje de éxito después de la eliminación
        Swal.fire({
          title: 'Historial eliminado',
          text: 'Has eliminado completamente el historial.',
          icon: 'success',
        }).then(() => {
          // Recargar la página desde el servidor
          location.reload(true);
        });
      }
    });
  } else {
    // Mostrar SweetAlert2 indicando que no hay historial para eliminar
    Swal.fire({
      title: 'Sin historial',
      text: 'No hay historial para eliminar.',
      icon: 'info',
    });
  }
});

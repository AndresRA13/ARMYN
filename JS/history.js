
let spaceHeight =  document.querySelector('.space');
spaceHeight.style.height = '1vh';


let historialGuardado =  localStorage.getItem('historial');
if(historialGuardado){
  const historialObjeto = JSON.parse(historialGuardado);
  const MostrarHistorial = document.querySelector('.history');
  historialObjeto.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.textContent  = item;
    MostrarHistorial.appendChild(historyItem);
  });
}else{
  console.log('no hay historial guardado en el local storage')
}
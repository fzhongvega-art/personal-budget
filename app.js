
const form       = document.getElementById('form-mov');
const lista      = document.getElementById('lista');
const presupuesto = new Presupuesto();
 

function liHTML(m) {
  const ingreso = m.esIngreso();
  let caja, texto, signo;
 
  if (ingreso) {
    caja  = 'bg-green-50 border-green-500';
    texto = 'text-green-700';
    signo = '+';
  } else {
    caja  = 'bg-red-50 border-red-500';
    texto = 'text-red-700';
    signo = '-';
  }
 
  return `<li class="flex items-center justify-between p-3 border-l-4 rounded ${caja}">
            <span class="text-gray-800">
              <span class="font-medium">${m.nombre}</span>
              <span class="text-xs text-gray-500">(${m.tipo})</span>
            </span>
            <span class="font-semibold ${texto}">${signo}$${m.valor.toFixed(2)}</span>
          </li>`;
}
 
// Pinta la lista, el saldo y los totales
function render() {
  lista.innerHTML = presupuesto.movimientos.map(liHTML).join('');
 
  document.getElementById('saldo').textContent =
    '$' + presupuesto.saldo().toFixed(2);
 
  const ingresos = presupuesto.movimientos
    .filter(m => m.esIngreso())
    .reduce((acc, m) => acc + m.valor, 0);
 
  const gastos = presupuesto.movimientos
    .filter(m => !m.esIngreso())
    .reduce((acc, m) => acc + m.valor, 0);
 
  document.getElementById('total-ingresos').textContent = '$' + ingresos.toFixed(2);
  document.getElementById('total-gastos').textContent   = '$' + gastos.toFixed(2);
}
 
// Envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const tipo   = document.getElementById('tipo').value;
  const valor  = parseFloat(document.getElementById('monto').value);
 
  if (!nombre || isNaN(valor) || valor <= 0) {
    alert('Datos inválidos.');
    return;
  }
 
  presupuesto.agregar(new Movimiento(nombre, tipo, valor));
  render();
  e.target.reset();
});
 
render();


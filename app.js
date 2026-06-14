const miPresupuesto = new Presupuesto();
 
function registrarMovimiento() {
  const nombrerecibido = prompt('nombre del movimiento:');
  const tiporecibido= prompt('Tipo (ingreso / gasto):');
  const montorecibido = parseFloat(prompt('Monto:'));
 
  if (!nombrerecibido || (tiporecibido !== 'ingreso' && tiporecibido !== 'gasto') || isNaN(montorecibido) || montorecibido <= 0) {
    alert('Datos inválidos.');
    return;
  }

 const movimiento = new Movimiento(nombrerecibido, tiporecibido,montorecibido)
 miPresupuesto.agregar(movimiento)

}
 
let continuar = 'si';
while (continuar === 'si') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

console.log(miPresupuesto.resumen());

 


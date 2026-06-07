let nombres = [];
let valores = [];

let continuar = 'si';

while (continuar === 'si') {
    const nombre = prompt('Nombre del movimiento:');
    const tipo = prompt('Tipo (ingreso / gasto):');
    const monto = parseFloat(prompt('Monto:'));
 if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
  alert('Datos inválidos. Intenta de nuevo.');
} else {
  // calcular el valor con signo
    let valor;
  if(tipo==='ingreso'){
    valor = monto;
  }
  else{
    valor = -monto;
  }

  // guardar en AMBOS arrays — siempre juntos
  nombres.push(nombre);
  valores.push(valor);

  console.log('Movimiento registrado.');
  console.log('Nombres:', nombres);
  console.log('Valores:', valores);
}

  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}
let saldo = 0;
for (let i = 0; i < valores.length; i++) {
  saldo = saldo + valores[i];
}

console.log('Saldo total: $' + saldo.toFixed(2));
console.log('Registro completado. Total movimientos:', nombres.length);

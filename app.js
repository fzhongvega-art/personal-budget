let nombres = [];
let valores = [];

function registrarMovimiento() {
  const nombre = prompt("Nombre del movimiento:");
  const tipo = prompt("Tipo (ingreso / gasto):");
  const monto = parseFloat(prompt("Monto:"));

  if (!nombre || (tipo !== "ingreso" && tipo !== "gasto") || isNaN(monto) ||monto <= 0) {
    alert("Datos inválidos. Intenta de nuevo.");
    return; 
  }

  let valor;
  if (tipo === "ingreso") {
    valor = monto;
  } else {
    valor = -monto;
  }


  nombres.push(nombre);
  valores.push(valor);
}


function calcularSaldo() {
  let saldo = 0;
  for (let i = 0; i < valores.length; i++) {
    saldo = saldo + valores[i];
  }
  return saldo;
}


function mostrarResumen() {
    console.log('--- Resumen Final ---');
  console.log('Total de movimientos:', nombres.length);
  console.log('Saldo total: $' + calcularSaldo().toFixed(2));
}

let continuar = 'si';
while (continuar === 'si') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}
mostrarResumen();
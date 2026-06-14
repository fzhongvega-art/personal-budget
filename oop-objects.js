class Movimiento {
  constructor(nombre, tipo, valor) {
    this.nombre = nombre;   // "guarda en ESTE objeto la propiedad nombre"
    this.tipo = tipo;
    this.valor = valor;
  }

 esIngreso() {
    return this.tipo === 'ingreso';   // usa la propiedad 'tipo'
  }

  esGasto() {
    return this.tipo === 'gasto';
  }

  datosMovimiento() {
      let signo;
      
      if (this.esIngreso()) {
        signo = '+';
      } else {
        signo = '-';
      }
      
      return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
    }
}

class Presupuesto {
  constructor() {
    this.movimientos = [];          
  }
 
  agregar(movimiento) {
    this.movimientos.push(movimiento);
  }
 
  eliminar(nombre) {
    this.movimientos = this.movimientos.filter(movimiento => movimiento.nombre !== nombre);
  }
 
  obtenerIngresos() {
    return this.movimientos.filter(movimiento => movimiento.esIngreso());
  }
 
  obtenerGastos() {
    return this.movimientos.filter(movimiento => movimiento.esGasto());
  }
 
  totalIngresos() {
    return this.obtenerIngresos()
      .reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);
  }
 
  totalGastos() {
    return this.obtenerGastos()
      .reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);
  }
 
  saldo() {
    return this.totalIngresos() - this.totalGastos();
  }
 
  buscarPorNombre(texto) {
    return this.movimientos.find(movimiento =>
      movimiento.nombre.toLowerCase().includes(texto.toLowerCase()));
  }
 
  resumen() {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos: this.totalGastos(),
      saldo: this.saldo(),
      promedioIngresos: this.promedioIngresos(),
      promedioGastos: this.promedioGastos(),
      mayorGasto: this.mayorGasto(),
      limites: this.verificarLimites()
    };
  }
 
  promedioIngresos() {
    const ingresos = this.obtenerIngresos();
    if (ingresos.length === 0) return 0;
    return this.totalIngresos() / ingresos.length;
  }
 
  promedioGastos() {
    const gastos = this.obtenerGastos();
    if (gastos.length === 0) return 0;
    return this.totalGastos() / gastos.length;
  }
 
  mayorGasto() {
    const gastos = this.obtenerGastos();
    if (gastos.length === 0) return null;
    return gastos.reduce((mayor, movimiento) =>
      movimiento.valor > mayor.valor ? movimiento : mayor
    );
  }
 
  verificarLimites() {
    const ingresos = this.totalIngresos();
    if (ingresos === 0) return 'No hay ingresos registrados para comparar.';
    const porcentaje = (this.totalGastos() / ingresos) * 100;
    if (porcentaje > 80) {
      return ` Alerta: los gastos representan el ${porcentaje.toFixed(1)}% de los ingresos (límite: 80%).`;
    }
    return `Gastos dentro del límite: ${porcentaje.toFixed(1)}% de los ingresos.`;
  }
}
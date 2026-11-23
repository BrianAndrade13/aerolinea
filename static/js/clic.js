// que pasa al hacer clic en un asiento segun su estado
async function clicEnAsiento(codigo) {
  // asiento rojo: muestro el pase de ese pasajero
  if (estado.porAsiento[codigo]) {
    cambiarPestana("buscar");
    $('input[name="tipo"][value="asiento"]').checked = true;
    $("#buscar-valor").value = codigo;
    await buscar("asiento", codigo);
    return;
  }

  // asiento verde mientras se modifica: sera el asiento nuevo
  if (estado.enEdicion) {
    estado.seleccionado = codigo;
    $("#modificar-asiento").textContent = codigo;
    pintarAsientos();
    return;
  }

  // asiento verde: lo elijo para una reserva nueva
  if (estado.pestana !== "reservar") cambiarPestana("reservar");
  estado.seleccionado = estado.seleccionado === codigo ? null : codigo;
  estado.encontrado = null;
  actualizarAsientoElegido();
  pintarAsientos();
  if (estado.seleccionado) $('#form-reservar [name="nombre"]').focus({ preventScroll: true });
}

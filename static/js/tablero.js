// actualiza las tarjetas de arriba: reservados, libres y ocupacion
async function cargarResumen() {
  const r = await API.resumen();
  const totalAsientos = $$(".asiento").length;
  $("#dato-total").textContent = totalAsientos;

  if (!r.ok) {
    for (const id of ["#dato-reservados", "#dato-libres", "#dato-ocupacion"]) $(id).textContent = "—";
    $("#luz-ocupacion").className = "luz";
    $("#barra-ocupacion").style.width = "0";
    mostrarAviso("#aviso-tablero", r, "El tablero no puede contar las reservas.");
    return;
  }
  ocultarAviso("#aviso-tablero");

  const cantidad = r.datos.cantidad;
  const porcentaje = Math.round((cantidad * 100) / totalAsientos);

  // el color de la luz depende del porcentaje de ocupacion
  let color = "verde";
  if (porcentaje >= 80) color = "rojo";
  else if (porcentaje >= 50) color = "ambar";

  $("#dato-reservados").textContent = cantidad;
  $("#dato-libres").textContent = totalAsientos - cantidad;
  $("#dato-ocupacion").textContent = porcentaje + "%";
  $("#luz-ocupacion").className = "luz " + color;
  $("#barra-ocupacion").style.width = porcentaje + "%";
  $("#barra-ocupacion").style.background = `var(--${color})`;
}

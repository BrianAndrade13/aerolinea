async function enviarCargar(evento) {
  evento.preventDefault();
  await cargarParaModificar($("#modificar-numero").value);
}

// busca la reserva y llena el formulario con sus datos
async function cargarParaModificar(numero) {
  const r = await API.buscarNumero(numero);
  if (!r.ok) return mostrarProblema(r);
  const p = r.datos;
  estado.enEdicion = p;
  estado.seleccionado = null;
  const formulario = $("#form-modificar");
  formulario.nombre.value = p.nombre;
  formulario.cedula.value = p.cedula;
  formulario.edad.value = p.edad;
  $("#modificar-asiento").textContent = p.asiento;
  formulario.hidden = false;
  // mientras se edita no se puede cargar otra reserva
  $("#modificar-numero").disabled = true;
  $("#form-cargar button").disabled = true;
  resaltar(p.asiento);
}

// manda los cambios a flask, el numero y la cedula no se modifican
async function guardarCambios(evento) {
  evento.preventDefault();
  const p = estado.enEdicion;
  const formulario = evento.target;
  const datos = {
    nombre: formulario.nombre.value.trim(),
    edad: formulario.edad.value,

    asiento: estado.seleccionado || p.asiento,
  };
  const r = await API.modificar(p.numero, datos);
  if (!r.ok) return mostrarProblema(r);
  avisar(r.mensaje, "ok");
  for (const aviso of r.avisos) avisar(aviso, "aviso");
  cancelarEdicion();
  await refrescar();
  animarAsiento(r.datos.asiento, "recien");
  resaltar(r.datos.asiento);
}

function cancelarEdicion() {
  estado.enEdicion = null;
  estado.seleccionado = null;
  $("#form-modificar").hidden = true;
  // ya se puede cargar otra reserva
  $("#modificar-numero").disabled = false;
  $("#form-cargar button").disabled = false;
  pintarAsientos();
}

$("#form-cargar").addEventListener("submit", enviarCargar);
$("#form-modificar").addEventListener("submit", guardarCambios);
$("#btn-cancelar-edicion").addEventListener("click", cancelarEdicion);

for (const boton of $$(".pestana")) {
  boton.addEventListener("click", () => {
    if (boton.dataset.pestana !== "modificar" && estado.enEdicion) cancelarEdicion();
  });
}

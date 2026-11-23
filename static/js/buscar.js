async function enviarBusqueda(evento) {
  evento.preventDefault();
  const tipo = $('input[name="tipo"]:checked').value;
  const valor = $("#buscar-valor").value.trim();

  if (tipo === "numero" && !/^\d+$/.test(valor)) {
    avisar("El número de reserva solo lleva dígitos (ej: 1002)", "error");
    return;
  }
  await buscar(tipo, valor);
}

// busca por numero, cedula o asiento y muestra el resultado
async function buscar(tipo, valor) {
  let r;
  if (tipo === "numero") r = await API.buscarNumero(valor);
  else if (tipo === "cedula") r = await API.buscarCedula(valor);
  else r = await API.buscarAsiento(valor.toUpperCase());

  const caja = $("#resultado-buscar");
  caja.innerHTML = "";

  if (!r.ok) {
    estado.encontrado = null;
    pintarAsientos();
    caja.append(crear("p", "vacio", r.mensaje));
    if (r.pendiente || r.error_codigo) mostrarProblema(r);
    return;
  }
  if (r.datos === null) {
    caja.append(crear("p", "vacio", r.mensaje));
    resaltar(valor.toUpperCase());
    return;
  }
  caja.append(crearPase(r.datos));
  resaltar(r.datos.asiento);
}

// arma el pase de abordar con los botones Modificar y Cancelar reserva
function crearPase(p) {
  const clase = claseDeAsiento(p.asiento);
  const v = estado.vuelo;
  const contenedor = crear("div");

  contenedor.innerHTML = `
    <article class="pase ${clase === "Ejecutiva" ? "ejecutiva" : ""}">
      <div class="pase-cuerpo">
        <div class="pase-cabecera"><span>AEROLISTA</span><span>PASE DE ABORDAR</span></div>
        <div class="pase-nombre">${escapar(p.nombre)}</div>
        <div class="pase-ruta"><span>${v.codigo_origen}</span><i></i><span><svg class="icono-avion" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg></span><i></i><span>${v.codigo_destino}</span></div>
        <div class="pase-detalle">
          <span>Reserva<b>#${p.numero}</b></span>
          <span>Cédula<b>${escapar(p.cedula)}</b></span>
          <span>Edad<b>${p.edad} años</b></span>
        </div>
      </div>
      <div class="pase-talon"><small>ASIENTO</small><b>${escapar(p.asiento)}</b><em>${clase}</em></div>
    </article>
    <div class="pase-acciones">
      <button type="button" class="btn btn-suave" data-accion="modificar">Modificar</button>
      <button type="button" class="btn btn-peligro" data-accion="eliminar">Cancelar reserva</button>
    </div>`;

  contenedor.querySelector('[data-accion="modificar"]').addEventListener("click", () => {
    cambiarPestana("modificar");
    $("#modificar-numero").value = p.numero;
    cargarParaModificar(p.numero);
  });

  contenedor.querySelector('[data-accion="eliminar"]').addEventListener("click", async () => {
    const eliminado = await confirmarEliminar(p.numero, p);
    if (eliminado) $("#resultado-buscar").innerHTML = "";
  });
  return contenedor;
}

$("#form-buscar").addEventListener("submit", enviarBusqueda);

for (const radio of $$('input[name="tipo"]')) {
  radio.addEventListener("change", () => {
    const ejemplos = { numero: "Ej: 1002", cedula: "Ej: 0912345678", asiento: "Ej: 7D" };
    $("#buscar-valor").placeholder = ejemplos[radio.value];
  });
}

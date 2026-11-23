// mensaje flotante que se quita solo, tipo: ok, aviso, pendiente, error o codigo
function avisar(texto, tipo = "ok") {
  const duracion = tipo === "ok" ? 3500 : 7000;

  const toast = crear("div", "toast toast-" + tipo);
  toast.append(crear("p", "", texto));
  $("#toasts").append(toast);

  setTimeout(() => toast.classList.add("saliendo"), duracion);
  setTimeout(() => toast.remove(), duracion + 400);
}

// elige el tipo de mensaje segun lo que respondio flask
function mostrarProblema(r) {
  if (r.pendiente) avisar(r.mensaje, "pendiente");
  else if (r.error_codigo) avisar(r.mensaje + "  (revisa la terminal de Flask)", "codigo");
  else avisar(r.mensaje, "error");
}

// aviso fijo dentro de una caja de la pagina
function mostrarAviso(selector, r, titulo) {
  const caja = $(selector);
  caja.hidden = false;
  caja.classList.toggle("es-error", !r.pendiente);
  caja.innerHTML = r.pendiente
    ? `${titulo} Implementa <code>${r.metodo}()</code> en <code>lista_pasajeros.py</code>, guarda y recarga la página.`
    : escapar(r.mensaje);
}

function ocultarAviso(selector) {
  $(selector).hidden = true;
}

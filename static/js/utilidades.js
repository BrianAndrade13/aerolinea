// atajos para no escribir tanto document.querySelector
const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

// crea un elemento con su clase y su texto
function crear(etiqueta, clase = "", texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// evita que un nombre con < o > se tome como html
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto);
  return div.innerHTML;
}

// las primeras filas son ejecutiva
function claseDeAsiento(asiento) {
  const fila = parseInt(asiento);
  return fila <= estado.vuelo.filas_ejecutiva ? "Ejecutiva" : "Económica";
}

function botonDeAsiento(asiento) {
  return document.querySelector(`.asiento[data-asiento="${asiento}"]`);
}

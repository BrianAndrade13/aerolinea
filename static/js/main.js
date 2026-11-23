// lo que la pagina recuerda mientras esta abierta
const estado = {
  vuelo: null,
  vista: "3d",
  reservas: [],
  porAsiento: {},
  seleccionado: null,
  encontrado: null,
  enEdicion: null,
  pestana: "reservar",
  filtroClase: "",
};

// vuelve a pedir los datos y redibuja avion, tren y tablero
async function refrescar(numeroNuevo = null) {
  const r = await cargarReservas();
  dibujarTren(r, numeroNuevo);
  await cargarResumen();
}

// arranque de la pagina
async function iniciar() {
  const r = await API.vuelo();
  if (!r.ok) {
    avisar(r.mensaje, "codigo");
    return;
  }
  estado.vuelo = r.datos;
  dibujarAvion();
  aplicarAngulos();
  await refrescar();
  avisar(`Vuelo ${estado.vuelo.codigo} listo · haz clic en un asiento`);
  await cargarProgreso();
}

iniciar();

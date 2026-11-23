// muestra la pestana elegida y esconde las demas
function mostrarPestana(nombre) {
  estado.pestana = nombre;

  for (const boton of $$(".pestana")) {
    boton.classList.toggle("activa", boton.dataset.pestana === nombre);
  }

  for (const seccion of $$(".contenido-pestana")) {
    seccion.classList.toggle("activa", seccion.id === "pestana-" + nombre);
  }
}

// cambia de pestana por codigo simulando el clic
function cambiarPestana(nombre) {
  $(`.pestana[data-pestana="${nombre}"]`).click();
}

for (const boton of $$(".pestana")) {
  boton.addEventListener("click", () => mostrarPestana(boton.dataset.pestana));
}

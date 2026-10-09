/* 1. MENÚ MÓVIL: componentes.js ya creó el botón y los enlaces.
   classList cambia el aspecto; aria-expanded comunica su estado accesible. */
const botonMenu = document.getElementById("boton-menu");
const navegacion = document.getElementById("navegacion");
botonMenu.addEventListener("click", function() {
  const abierto = botonMenu.getAttribute("aria-expanded") === "true";
  botonMenu.setAttribute("aria-expanded", String(!abierto));
  botonMenu.textContent = abierto ? "☰" : "×";
  navegacion.classList.toggle("abierta", !abierto);
});

/* 2. ESTADO LOCAL: esta entrega guarda un carrito de prueba en Web Storage.
   JSON.parse recupera el arreglo; try/catch evita fallos con datos corruptos. */
function leerCarrito() {
  return normalizarCarrito(leerDatos("yoko-carrito", []));
}
let temporizadorMensaje;

function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensaje-interaccion");
  mensaje.textContent = texto;
  mensaje.hidden = false;
  clearTimeout(temporizadorMensaje);
  temporizadorMensaje = setTimeout(function() {
    mensaje.hidden = true;
  }, 5000);
}

/* 3. Los botones compartidos abren vistas del proyecto.
   El mismo comportamiento se utiliza desde cualquier página. */
document.querySelectorAll("[data-accion]").forEach(function(boton) {
  boton.addEventListener("click", function() {
    const accion = boton.getAttribute("data-accion");
    if (accion === "buscar") {
      abrirPanel("buscar");
    } else if (accion === "carrito") {
      abrirPanel("carrito");
    } else if (accion === "perfil" || accion === "wishlist") {
      window.location.href = ruta("src/pages/perfil.html");
    } else if (accion === "vender") {
      window.location.href = ruta("src/pages/publicar.html");
    } else {
      mostrarMensaje("Esta sección todavía no forma parte de la entrega.");
    }
  });
});

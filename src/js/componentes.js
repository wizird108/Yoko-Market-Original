/* 1. RUTAS: data-base cambia entre index.html y las páginas dentro de src.
   Así usamos el mismo header/footer sin romper enlaces ni imágenes. */
const BASE = document.body.getAttribute("data-base");

function ruta(rutaRelativa) {
  return BASE + rutaRelativa;
}

/* 2. HEADER ÚNICO: colores, textos y medidas del componente 234:225.
   Las comillas invertidas permiten HTML multilínea; ${ruta(...)} inserta rutas.
   outerHTML sustituye el contenedor por el header semántico completo. */
function cargarHeader() {
  document.getElementById("header-compartido").outerHTML = `
<header class="encabezado">
 <a class="logo" href="${ruta('index.html')}">
  YOKOMARKET
 </a>
 <button aria-controls="navegacion" aria-expanded="false" aria-label="Abrir menú" class="boton-menu" id="boton-menu" type="button">
  ☰
 </button>
 <nav aria-label="Navegación principal" class="navegacion" id="navegacion">
  <a href="${ruta('index.html')}">
   INICIO
  </a>
  <a href="${ruta('src/pages/ropa.html')}">
   ROPA
  </a>
  <a href="${ruta('src/pages/peluches.html')}">
   PELUCHES
  </a>
  <a href="${ruta('src/pages/vinilos.html')}">
   VINILOS
  </a>
  <a href="${ruta('src/pages/accesorios.html')}">
   ACCESORIOS
  </a>
  <a class="enlace-sale" href="${ruta('src/pages/sale.html')}">
   SALE
  </a>
 </nav>
 <div class="acciones-header">
  <button aria-label="Buscar" data-accion="buscar" type="button">
   <img alt="" height="18" src="${ruta('src/assets/icons/buscar.svg')}" width="18"/>
   <span class="accion-texto">BUSCAR</span>
  </button>
  <button aria-label="Carrito" data-accion="carrito" type="button">
   <img alt="" height="18" src="${ruta('src/assets/icons/carrito.svg')}" width="18"/>
   <span class="accion-texto">CARRITO</span>
  </button>
  <button aria-label="Perfil" data-accion="perfil" type="button">
   <img alt="" height="18" src="${ruta('src/assets/icons/perfil.svg')}" width="18"/>
   <span class="accion-texto">PERFIL</span>
  </button>
 </div>
</header>
`;
}
cargarHeader();

/* 3. FOOTER ÚNICO: las cuatro columnas de Desktop Footer (139:260).
   Las pantallas fuera de esta entrega avisan al pulsar su botón. */
document.getElementById("footer-compartido").outerHTML = `
<footer class="pie-pagina">
 <div>
  <p class="logo">
   YOKOMARKET
  </p>
  <p class="lema">
   Merch oficial + reventa entre fans.
  </p>
 </div>
 <nav aria-label="Explorar">
  <h2>
   EXPLORAR
  </h2>
  <a href="${ruta('src/pages/ropa.html')}">
   Ropa
  </a>
  <a href="${ruta('src/pages/peluches.html')}">
   Peluches
  </a>
  <a href="${ruta('src/pages/vinilos.html')}">
   Vinilos
  </a>
  <a href="${ruta('src/pages/sale.html')}">
   Sale
  </a>
 </nav>
 <nav aria-label="Comunidad">
  <h2>
   COMUNIDAD
  </h2>
  <button data-accion="vender" type="button">
   Vender
  </button>
  <button aria-label="Perfil" data-accion="perfil" type="button">
   Mi perfil
  </button>
  <button data-accion="wishlist" type="button">
   Wishlist
  </button>
  <button data-accion="ayuda" type="button">
   Ayuda
  </button>
 </nav>
 <nav aria-label="Síguenos">
  <h2>
   SÍGUENOS
  </h2>
  <button data-accion="instagram" type="button">
   Instagram
  </button>
  <button data-accion="tiktok" type="button">
   TikTok
  </button>
  <button data-accion="twitter" type="button">
   X / Twitter
  </button>
 </nav>
</footer>
`;

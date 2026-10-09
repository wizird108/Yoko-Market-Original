/* 1. ELEGIR VISTA: las páginas nuevas declaran data-categoria.
   catalogo.html conserva compatibilidad con los enlaces antiguos por URL. */
const parametrosCatalogo = new URLSearchParams(window.location.search);
let categoriaActual = document.body.getAttribute("data-categoria") ||
  parametrosCatalogo.get("categoria") || "peluches";
if (parametrosCatalogo.get("ofertas") === "true") categoriaActual = "sale";
if (!CATALOGOS[categoriaActual]) categoriaActual = "peluches";
const configuracion = CATALOGOS[categoriaActual];
const contenidoCatalogo = document.getElementById("contenido");
contenidoCatalogo.classList.add("catalogo", "catalogo-" + categoriaActual);
contenidoCatalogo.style.setProperty("--color-catalogo", configuracion.color);
document.title = configuracion.titulo + " | YokoMarket";

/* 2. BANNER FINAL: ropa y sale tienen personajes espejados;
   peluches tiene un producto de $35.000 distinto de sus cards de $129.000. */
if (categoriaActual === "ropa" || categoriaActual === "sale") {
  const banner = elemento("section", "banner-promocion");
  banner.setAttribute("aria-label", "Promoción de " + configuracion.titulo);
  const imagen = categoriaActual === "ropa" ? "coco-verde" : "coco-sale-banner";
  const texto = categoriaActual === "ropa" ?
    "PRODUCTOS OFICIALES · ÁLVARO DÍAZ" : "SALE";
  banner.innerHTML = `
<img alt="" class="personaje-promo" src="${ruta('src/assets/images/' + imagen + '.png')}"/>
<p>
 ${texto}
</p>
<img alt="" class="personaje-promo personaje-espejo" src="${ruta('src/assets/images/' + imagen + '.png')}"/>
`;
  contenidoCatalogo.appendChild(banner);
} else if (categoriaActual === "peluches") {
  const banner = elemento("section", "banner-peluches");
  banner.innerHTML = `
<div class="texto-banner">
 <h2>
  PELUCHE FAVORITO
 </h2>
 <p>
  Elige a Coco y llévalo contigo a todas partes.
 </p>
 <a class="boton-comprar" href="#productos">
  COMPRAR YA
 </a>
</div>
`;
  const productoBanner = buscarProducto(8);
  const ficha = elemento("a", "ficha-banner");
  ficha.href = ruta("src/pages/producto.html?id=" + productoBanner.id);
  ficha.appendChild(imagenProducto(productoBanner));
  const textos = elemento("div");
  textos.appendChild(elemento("h3", "", productoBanner.nombre));
  textos.appendChild(elemento("p", "precio", precioTexto(productoBanner.precio)));
  ficha.appendChild(textos);
  banner.appendChild(ficha);
  contenidoCatalogo.appendChild(banner);
}

/* 3. Género filtra metadatos simulados. Unisex aparece en ambas selecciones. */
const encabezadoCatalogo = elemento("section", "titulo-catalogo");
encabezadoCatalogo.innerHTML = `
<div>
 <h1>
  ${configuracion.titulo}
 </h1>
 <p>
  ${configuracion.subtitulo}
 </p>
</div>
<fieldset class="selector-genero">
 <legend class="solo-lectores">
  Sección de género
 </legend>
 <input id="hombre" name="genero" type="radio" value="hombre"/>
 <label for="hombre">
  HOMBRE
 </label>
 <input id="mujer" name="genero" type="radio" value="mujer"/>
 <label for="mujer">
  MUJER
 </label>
</fieldset>
`;
contenidoCatalogo.appendChild(encabezadoCatalogo);

/* 4. CARDS EXTRA DE ROPA: mantienen los recortes y las etiquetas finales.
   Son accesos a estilos; estos estilos no se atribuyen a productos sin evidencia. */
if (categoriaActual === "ropa") {
  const estilos = elemento("div", "estilos-ropa");
  const opciones = [{
    texto: "Oversize",
    imagen: "tile-oversize"
  }, {
    texto: "Baggy",
    imagen: "tile-baggy"
  }, {
    texto: "Gráficos",
    imagen: "tile-graficos"
  }, {
    texto: "Basicos",
    imagen: "tile-basicos"
  }];
  opciones.forEach(function(opcion, indice) {
    const boton = elemento("button", "estilo-ropa estilo-" + indice);
    boton.type = "button";
    boton.innerHTML = `
<img alt="" src="${ruta('src/assets/images/' + opcion.imagen + '.png')}"/>
<span>
 ${opcion.texto}
</span>
`;
    boton.addEventListener("click", function() {
      mostrarMensaje("Estilo seleccionado: " + opcion.texto +
        ". El filtro de estilos estará disponible próximamente.");
    });
    estilos.appendChild(boton);
  });
  contenidoCatalogo.appendChild(estilos);
}

/* 5. FILTROS Y GRILLA: compartidos por todos los catálogos.
   Precio permite ordenar y categoría conduce al catálogo correspondiente.
   Ubicación, talla y estado se extraen del arreglo de productos. */
const zona = elemento("section", "zona-catalogo");
zona.id = "productos";
const formulario = elemento("form", "filtros-catalogo");
formulario.setAttribute("aria-label", "Filtros de productos");
formulario.innerHTML = `
<h2>
 FILTRAR
</h2>
<label class="solo-lectores" for="filtro-categoria">
 Categoría
</label>
<select id="filtro-categoria">
 <option value="">
  Categoría ⌄
 </option>
 <option value="ropa">
  Ropa
 </option>
 <option value="peluches">
  Peluches
 </option>
 <option value="sale">
  Sale
 </option>
</select>
<label class="solo-lectores" for="filtro-ubicacion">
 Ubicación
</label>
<select id="filtro-ubicacion">
 <option value="">
  Ubicación ⌄
 </option>
 <option disabled="">
  Sin opciones disponibles
 </option>
</select>
<label class="solo-lectores" for="filtro-precio">
 Precio
</label>
<select id="filtro-precio">
 <option value="">
  Precio ⌄
 </option>
 <option value="menor">
  Menor a mayor
 </option>
 <option value="mayor">
  Mayor a menor
 </option>
</select>
<label class="solo-lectores" for="filtro-estado">
 Estado
</label>
<select id="filtro-estado">
 <option value="">
  Estado ⌄
 </option>
 <option disabled="">
  Sin opciones disponibles
 </option>
</select>
<label class="solo-lectores" for="filtro-talla">
 Talla
</label>
<select id="filtro-talla">
 <option value="">
  Talla ⌄
 </option>
 <option disabled="">
  Sin opciones disponibles
 </option>
</select>
`;
zona.appendChild(formulario);
const columnaProductos = elemento("div", "columna-productos");
const grillaCatalogo = elemento("div", "grilla-productos grilla-catalogo");
grillaCatalogo.id = "lista-productos";
const avisoCatalogo = elemento("p", "aviso-catalogo");
avisoCatalogo.setAttribute("role", "status");
columnaProductos.appendChild(grillaCatalogo);
columnaProductos.appendChild(avisoCatalogo);
zona.appendChild(columnaProductos);
contenidoCatalogo.appendChild(zona);
const productosCategoria = PRODUCTOS.filter(function(producto) {
  if (categoriaActual === "sale") return producto.oferta === true;
  return producto.categoria === categoriaActual || (categoriaActual === "accesorios" && producto
    .categoria === "bolsos");
});

function actualizarCatalogo() {
  const destino = document.getElementById("filtro-categoria").value;
  if (destino && destino !== categoriaActual) {
    window.location.href = ruta("src/pages/" + destino + ".html");
    return;
  }
  const genero = document.querySelector('input[name="genero"]:checked');
  const ubicacion = document.getElementById("filtro-ubicacion").value;
  const estado = document.getElementById("filtro-estado").value;
  const talla = document.getElementById("filtro-talla").value;
  let seleccion = productosCategoria.filter(function(producto) {
    return (!genero || producto.genero === genero.value || producto.genero === "unisex") &&
      (!ubicacion || producto.ubicacion === ubicacion) &&
      (!estado || producto.estado === estado) &&
      (!talla || producto.tallas.indexOf(talla) !== -1);
  });
  const orden = document.getElementById("filtro-precio").value;
  if (orden) seleccion.sort(function(a, b) {
    return orden === "menor" ? a.precio - b.precio : b.precio - a.precio;
  });
  renderizarProductos(grillaCatalogo, seleccion);
  avisoCatalogo.textContent = seleccion.length ? "" :
    "No hay productos disponibles para esta selección.";
}
formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();
});
formulario.addEventListener("change", actualizarCatalogo);
actualizarCatalogo();

/* Opciones extraídas de los productos, sin filtros decorativos. */
["ubicacion", "estado", "talla"].forEach(function(campo) {
  const selector = document.getElementById("filtro-" + campo);
  while (selector.options.length > 1) selector.remove(1);
  const valores = [];
  productosCategoria.forEach(function(producto) {
    const opciones = campo === "talla" ? producto.tallas : [producto[campo]];
    opciones.forEach(function(valor) {
      if (valor && valores.indexOf(valor) === -1) valores.push(valor);
    });
  });
  valores.forEach(function(valor) {
    const opcion = elemento("option", "", valor);
    opcion.value = valor;
    selector.appendChild(opcion);
  });
  selector.hidden = valores.length === 0;
});
encabezadoCatalogo.addEventListener("change", actualizarCatalogo);
const limpiar = elemento("button", "boton-texto", "Limpiar filtros");
limpiar.type = "button";
limpiar.addEventListener("click", function() {
  formulario.reset();
  document.querySelectorAll('input[name="genero"]').forEach(function(input) {
    input.checked = false;
  });
  actualizarCatalogo();
});
formulario.appendChild(limpiar);

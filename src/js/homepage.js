/* HOMEPAGE FINAL 132:317. El hero contiene textos de la pantalla;
   las tarjetas de sus tres secciones se leen de la constante compartida. */
document.title = "YokoMarket | Inicio";
const contenidoHome = document.getElementById("contenido");
const hero = elemento("section", "hero-home");
hero.setAttribute("aria-labelledby", "titulo-home");
hero.innerHTML = `
<p class="presentacion">
 YOKOMARKET PRESENTA
</p>
<h1 id="titulo-home">
 NUEVA COLECCIÓN
 <br/>
 SAYONARA
</h1>
<p>
 Merch oficial y piezas únicas para despedirse a lo grande.
</p>
<a class="boton-coleccion" href="${ruta('src/pages/ropa.html')}">
 VER COLECCIÓN
</a>
`;
contenidoHome.appendChild(hero);

/* Cada sección usa el mismo generador de tarjetas, sin copiar productos. */
// Tres secciones finales reutilizan el mismo renderizador.
const secciones = [{
  titulo: "Destacados Felicilandia",
  lista: productos.slice(0, 4)
}, {
  titulo: "Tienda Oficial",
  lista: productos.slice(0, 4)
}, {
  titulo: "Reventa",
  lista: productosUsuarios.slice(0, 4)
}];
secciones.forEach(function(datos) {
  const seccion = elemento("section", "seccion-home");
  seccion.appendChild(elemento("h2", "titulo-seccion", datos.titulo));
  const grilla = elemento("div", "grilla-productos grilla-home");
  renderizarProductos(grilla, datos.lista);
  seccion.appendChild(grilla);
  if (datos.lista.length === 0) seccion.appendChild(elemento("p", "",
    "Todavía no hay publicaciones de usuarios."));
  contenidoHome.appendChild(seccion);
});

/* PANELES COMPARTIDOS: una sola definición disponible desde cualquier vista.
   hidden muestra/oculta el diálogo; el DOM crea resultados y filas del carrito. */
const capaPanel = elemento("div", "capa-panel");
capaPanel.hidden = true;
capaPanel.innerHTML = `
<section class="panel-modal panel-busqueda" id="panel-busqueda" role="dialog" aria-modal="true" aria-labelledby="titulo-panel-busqueda" hidden>
  <div class="barra-busqueda">
    <h2 class="solo-lectores" id="titulo-panel-busqueda">Buscar productos</h2>
    <label class="solo-lectores" for="consulta-panel">Nombre del producto</label>
    <input id="consulta-panel" type="search" placeholder="Busca entre productos oficiales y reventa…">
    <button type="button" data-cerrar-panel aria-label="Cerrar búsqueda">×</button>
  </div>
  <div class="contenido-busqueda">
    <section class="resultados-panel">
      <h3>PRODUCTOS</h3>
      <p id="estado-busqueda" role="status"></p>
      <div class="grilla-productos" id="resultados-busqueda"></div>
    </section>
    <aside class="sugerencias-panel">
      <h3>BÚSQUEDAS SUGERIDAS</h3>
      <button type="button" data-consulta="Omakase">Omakase</button>
      <button type="button" data-consulta="Coco">Coco</button>
      <button type="button" data-consulta="Hoodie">Hoodie</button>
    </aside>
  </div>
</section>
<aside class="panel-modal panel-bolsa" id="panel-bolsa" role="dialog" aria-modal="true" aria-labelledby="titulo-panel-bolsa" hidden>
  <div class="cabecera-bolsa">
    <h2 id="titulo-panel-bolsa">BOLSA DE COMPRAS</h2>
    <button type="button" data-cerrar-panel aria-label="Cerrar carrito">×</button>
  </div>
  <div id="items-panel-carrito"></div>
  <div class="total-panel" id="resumen-panel-carrito"></div>
</aside>
`;
document.body.appendChild(capaPanel);
let panelActual = null;
let focoAnterior = null;

function abrirPanel(tipo) {
  if (capaPanel.hidden) focoAnterior = document.activeElement;
  panelActual = tipo === "carrito" ? document.getElementById("panel-bolsa") : document.getElementById("panel-busqueda");
  document.getElementById("panel-bolsa").hidden = tipo !== "carrito";
  document.getElementById("panel-busqueda").hidden = tipo === "carrito";
  capaPanel.hidden = false;
  capaPanel.classList.toggle("modo-busqueda", tipo !== "carrito");
  document.body.classList.add("panel-abierto");
  if (tipo === "carrito") actualizarPanelCarrito();
  else buscarEnPanel();
  panelActual.querySelector("input, button").focus();
}

function cerrarPanel() {
  capaPanel.hidden = true;
  document.body.classList.remove("panel-abierto");
  panelActual = null;
  if (focoAnterior) focoAnterior.focus();
}

capaPanel.querySelectorAll("[data-cerrar-panel]").forEach(function(boton) {
  boton.addEventListener("click", cerrarPanel);
});
capaPanel.addEventListener("click", function(evento) {
  if (evento.target === capaPanel) cerrarPanel();
});
/* Escape cierra; Tab mantiene el teclado dentro del diálogo abierto. */
document.addEventListener("keydown", function(evento) {
  if (!panelActual) return;
  if (evento.key === "Escape") cerrarPanel();
  if (evento.key === "Tab") {
    const controles = panelActual.querySelectorAll('button:not([disabled]), input, a[href]');
    const primero = controles[0];
    const ultimo = controles[controles.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }
});

function buscarEnPanel() {
  const texto = document.getElementById("consulta-panel").value.trim().toLowerCase();
  const lista = PRODUCTOS.filter(function(producto) {
    return producto.nombre.toLowerCase().indexOf(texto) !== -1;
  });
  renderizarProductos(document.getElementById("resultados-busqueda"), lista);
  document.getElementById("estado-busqueda").textContent = lista.length + " resultados";
}
document.getElementById("consulta-panel").addEventListener("input", buscarEnPanel);
capaPanel.querySelectorAll("[data-consulta]").forEach(function(boton) {
  boton.addEventListener("click", function() {
    document.getElementById("consulta-panel").value = boton.getAttribute("data-consulta");
    buscarEnPanel();
  });
});

/* Cada cambio guarda el arreglo y vuelve a dibujar únicamente la bolsa. */
function actualizarPanelCarrito() {
  const lista = document.getElementById("items-panel-carrito");
  const resumen = document.getElementById("resumen-panel-carrito");
  const carrito = leerCarrito();
  lista.textContent = "";
  resumen.textContent = "";
  let total = 0;
  carrito.forEach(function(item, indice) {
    const producto = buscarProducto(item.id);
    total += producto.precio * item.cantidad;
    const fila = elemento("article", "fila-bolsa");
    fila.appendChild(imagenProducto(producto));
    const datos = elemento("div", "datos-bolsa");
    datos.appendChild(elemento("h3", "", producto.nombre));
    datos.appendChild(elemento("p", "", item.talla ? "Talla: " + item.talla : "Sin talla"));
    datos.appendChild(elemento("p", "precio", precioTexto(producto.precio * item.cantidad)));
    const controles = elemento("div", "controles-bolsa");
    ["−", "+", "Eliminar"].forEach(function(accion) {
      const boton = elemento("button", "", accion);
      boton.type = "button";
      boton.setAttribute("aria-label", accion + " " + producto.nombre);
      boton.addEventListener("click", function() {
        if (accion === "Eliminar") carrito.splice(indice, 1);
        else if (accion === "+") carrito[indice].cantidad += 1;
        else if (carrito[indice].cantidad > 1) carrito[indice].cantidad -= 1;
        if (guardarDatos("yoko-carrito", carrito)) actualizarPanelCarrito();
        const estadistica = document.getElementById("cantidad-carrito");
        if (estadistica) {
          let cantidad = 0;
          leerCarrito().forEach(function(fila) {
            cantidad += fila.cantidad;
          });
          estadistica.textContent = cantidad;
        }
      });
      controles.appendChild(boton);
      if (accion === "−") controles.appendChild(elemento("span", "", item.cantidad));
    });
    datos.appendChild(controles);
    fila.appendChild(datos);
    lista.appendChild(fila);
  });
  if (carrito.length === 0) {
    const vacio = elemento("div", "bolsa-vacia");
    const imagen = elemento("img");
    imagen.src = ruta("src/assets/images/carrito-vacio.jpg");
    imagen.alt = "";
    vacio.appendChild(imagen);
    vacio.appendChild(elemento("p", "", "Tu bolsa de compras está vacía"));
    lista.appendChild(vacio);
  } else resumen.appendChild(elemento("p", "", "TOTAL: " + precioTexto(total)));
}

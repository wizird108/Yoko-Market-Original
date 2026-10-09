/* FAVORITOS: guardamos IDs, no copias completas de productos.
   Así las cards y el perfil leen siempre los mismos datos del catálogo. */
function leerFavoritos() {
  const resultado = [];
  leerDatos("yoko-favoritos", []).forEach(function(id) {
    const valor = String(id);
    if (buscarProducto(valor) && resultado.indexOf(valor) === -1) resultado.push(valor);
  });
  return resultado;
}

function crearBotonFavorito(producto) {
  const boton = elemento("button", "boton-favorito");
  boton.type = "button";
  boton.setAttribute("data-favorito", String(producto.id));
  actualizarBotonFavorito(boton);
  boton.addEventListener("click", function() {
    const favoritos = leerFavoritos();
    const indice = favoritos.indexOf(String(producto.id));
    if (indice === -1) favoritos.push(String(producto.id));
    else favoritos.splice(indice, 1);
    if (!guardarDatos("yoko-favoritos", favoritos)) return;
    document.querySelectorAll("[data-favorito]").forEach(actualizarBotonFavorito);
    if (typeof actualizarWishlist === "function") actualizarWishlist();
  });
  return boton;
}

function actualizarBotonFavorito(boton) {
  const activo = leerFavoritos().indexOf(boton.getAttribute("data-favorito")) !== -1;
  boton.textContent = activo ? "♥" : "♡";
  boton.setAttribute("aria-pressed", String(activo));
  boton.setAttribute("aria-label", activo ? "Quitar de favoritos" : "Guardar en favoritos");
}

/* CARRO: una fila corresponde a un producto y una talla.
   También unificamos duplicados guardados por la versión anterior. */
function normalizarCarrito(items) {
  const resultado = [];
  if (!Array.isArray(items)) return resultado;
  items.forEach(function(item) {
    if (!buscarProducto(item.id)) return;
    const talla = item.talla || null;
    const cantidad = Math.max(1, Math.floor(Number(item.cantidad) || 1));
    const existente = resultado.find(function(fila) {
      return String(fila.id) === String(item.id) && fila.talla === talla;
    });
    if (existente) existente.cantidad += cantidad;
    else resultado.push({
      id: item.id,
      talla: talla,
      cantidad: cantidad
    });
  });
  return resultado;
}

function agregarProductoCarrito(producto, talla) {
  if (producto.tallas.length > 0 && producto.tallas.indexOf(talla) === -1) {
    mostrarMensaje("Selecciona una talla antes de añadir el producto.");
    return false;
  }
  const carrito = leerCarrito();
  const existente = carrito.find(function(item) {
    return String(item.id) === String(producto.id) && item.talla === (talla || null);
  });
  if (existente) existente.cantidad += 1;
  else carrito.push({
    id: producto.id,
    talla: talla || null,
    cantidad: 1
  });
  return guardarDatos("yoko-carrito", carrito);
}

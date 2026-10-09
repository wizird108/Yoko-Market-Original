/* 1. UTILIDADES DE DOM: crean etiquetas y colocan texto de manera segura.
   appendChild define el orden de los elementos en pantalla. */
function elemento(etiqueta, clase, texto) {
  const nodo = document.createElement(etiqueta);
  if (clase) nodo.className = clase;
  if (texto !== undefined) nodo.textContent = texto;
  return nodo;
}

function imagenProducto(producto) {
  const imagen = elemento("img", "imagen-producto");
  if (producto.imagen && producto.imagen.indexOf("data:image/") === 0) {
    imagen.src = producto.imagen;
  } else if (producto.imagen) {
    imagen.src = ruta(producto.imagen);
  } else {
    imagen.src = ruta("src/assets/images/foto-pendiente.svg");
  }
  imagen.alt = producto.nombre;
  // La foto pendiente no se sustituye por una fotografía de otro producto.
  imagen.addEventListener("error", function() {
    if (!imagen.src.endsWith("foto-pendiente.svg")) {
      imagen.src = ruta("src/assets/images/foto-pendiente.svg");
    }
  });
  imagen.width = 300;
  imagen.height = 300;
  return imagen;
}

function buscarProducto(id) {
  return PRODUCTOS.find(function(producto) {
    return String(producto.id) === String(id);
  });
}

function precioTexto(precio, moneda) {
  return "COP $" + Number(precio).toLocaleString("es-CO");
}

/* 2. CARD COMPARTIDA: imagen, etiqueta, nombre y precio desde datos.js.
   Los HTML no contienen nombres, precios ni artículos de productos. */
function crearTarjeta(producto) {
  const tarjeta = elemento("article", "tarjeta-producto");
  const enlace = elemento("a", "enlace-producto");
  enlace.href = ruta("src/pages/producto.html?id=" + producto.id);
  enlace.appendChild(imagenProducto(producto));
  const informacion = elemento("div", "info-producto");
  const etiqueta = elemento("span", "etiqueta-producto", producto.oficial ? "OFICIAL" : "USUARIO");
  if (producto.preventa) informacion.appendChild(elemento("span", "etiqueta-producto", "PREVENTA"));
  informacion.appendChild(etiqueta);
  informacion.appendChild(elemento("h3", "nombre-producto", producto.nombre));
  informacion.appendChild(elemento("p", "precio", precioTexto(producto.precio, producto.moneda)));
  enlace.appendChild(informacion);
  if (producto.oferta) {
    informacion.appendChild(elemento("del", "precio-anterior", precioTexto(producto.precioAnterior)));
    informacion.appendChild(elemento("span", "etiqueta-producto", "SALE"));
  }
  tarjeta.appendChild(enlace);
  tarjeta.appendChild(crearBotonFavorito(producto));
  return tarjeta;
}

function renderizarProductos(contenedor, productos) {
  // Antes de volver a dibujar limpiamos la lista para evitar duplicados.
  contenedor.textContent = "";
  productos.forEach(function(producto) {
    contenedor.appendChild(crearTarjeta(producto));
  });
}

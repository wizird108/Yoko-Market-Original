/* 1. DETALLE FINAL 132:321: sin ID abre el primer producto oficial.
   Al llegar desde una tarjeta conserva los datos de esa ficha concreta. */
const parametrosDetalle = new URLSearchParams(window.location.search);
const idDetalle = parametrosDetalle.get("id") || "1";
const productoDetalle = buscarProducto(idDetalle);
const contenidoDetalle = document.getElementById("contenido");
contenidoDetalle.classList.add("detalle");
if (!productoDetalle) {
  contenidoDetalle.appendChild(elemento("h1", "producto-no-encontrado", "Producto no encontrado"));
} else {
  document.title = productoDetalle.nombre + " | YokoMarket";
  const principal = elemento("section", "detalle-principal");
  const galeria = elemento("div", "galeria-producto");
  galeria.appendChild(imagenProducto(productoDetalle));
  /* Fotos adicionales del anuncio: cada botón cambia la imagen principal. */
  if (productoDetalle.fotos) {
    const controles = elemento("div", "controles-fotos");
    productoDetalle.fotos.forEach(function(foto, indice) {
      if (foto) {
        const boton = elemento("button", "", "Foto " + (indice + 1));
        boton.type = "button";
        boton.addEventListener("click", function() {
          galeria.querySelector("img").src = foto;
        });
        controles.appendChild(boton);
      }
    });
    galeria.appendChild(controles);
  }
  principal.appendChild(galeria);
  const informacion = elemento("div", "detalle-informacion");
  informacion.appendChild(elemento("span", "etiqueta-detalle", productoDetalle.oficial ? "OFICIAL" :
    "USUARIO"));
  informacion.appendChild(elemento("h1", "", productoDetalle.nombre));
  informacion.appendChild(elemento("p", "precio-detalle", precioTexto(productoDetalle.precio,
    productoDetalle.moneda)));
  if (productoDetalle.envio) informacion.appendChild(elemento("p", "envio", productoDetalle.envio));
  if (productoDetalle.estado) {
    informacion.appendChild(elemento("p", "", productoDetalle.estado));
  }
  if (productoDetalle.ubicacion) {
    informacion.appendChild(elemento("p", "", "Ubicación: " + productoDetalle.ubicacion));
  }
  if (productoDetalle.vendedor && !productoDetalle.avatar) {
    informacion.appendChild(elemento("p", "", "Publicado por " + productoDetalle.vendedor));
  }
  informacion.appendChild(elemento("p", "descripcion", productoDetalle.descripcion ||
    "Descripción no disponible."));

  /* 2. TALLAS: selección accesible con radios y label.
     Las opciones salen del arreglo tallas del producto seleccionado. */
  let tallaElegida = productoDetalle.talla || null;
  if (productoDetalle.tallas.length > 0) {
    const tallas = elemento("fieldset", "selector-tallas");
    tallas.appendChild(elemento("legend", "", "SELECCIONA TU TALLA"));
    productoDetalle.tallas.forEach(function(talla) {
      const input = elemento("input");
      input.type = "radio";
      input.name = "talla";
      input.id = "talla-" + talla;
      input.value = talla;
      input.checked = talla === tallaElegida;
      const label = elemento("label", "", talla);
      label.htmlFor = input.id;
      input.addEventListener("change", function() {
        tallaElegida = talla;
      });
      tallas.appendChild(input);
      tallas.appendChild(label);
    });
    informacion.appendChild(tallas);
  }

  /* 3. VENDEDOR: datos exclusivos del producto de la pantalla final. */
  if (productoDetalle.vendedor && productoDetalle.avatar) {
    const vendedor = elemento("section", "vendedor");
    const avatar = elemento("img");
    avatar.src = ruta(productoDetalle.avatar);
    avatar.alt = "Perfil de " + productoDetalle.vendedor;
    avatar.width = 56;
    avatar.height = 56;
    vendedor.appendChild(avatar);
    const textos = elemento("div");
    textos.appendChild(elemento("h2", "", productoDetalle.vendedor));
    textos.appendChild(elemento("p", "", productoDetalle.reputacion));
    vendedor.appendChild(textos);
    informacion.appendChild(vendedor);
  }

  /* 4. ACCIONES: contacto solo muestra un aviso; carrito guarda JSON local.
     No se realizan mensajes externos ni compras reales. */
  const acciones = elemento("div", "acciones-detalle");
  const contactar = elemento("button", "boton-contactar", "CONTACTAR");
  contactar.type = "button";
  contactar.addEventListener("click", function() {
    mostrarMensaje(productoDetalle.vendedor ? "Vendedor: " + productoDetalle.vendedor :
      "Información del vendedor no disponible.");
  });
  const agregar = elemento("button", "boton-carrito", "AÑADIR AL CARRITO");
  agregar.type = "button";
  agregar.addEventListener("click", function() {
    if (agregarProductoCarrito(productoDetalle, tallaElegida)) {
      abrirPanel("carrito");
    }
  });
  acciones.appendChild(crearBotonFavorito(productoDetalle));
  acciones.appendChild(contactar);
  acciones.appendChild(agregar);
  informacion.appendChild(acciones);
  principal.appendChild(informacion);
  contenidoDetalle.appendChild(principal);

  /* Reseñas pertenecientes al producto seleccionado, sin un ID fijo. */
  renderizarResenas(productoDetalle, contenidoDetalle);
}

function renderizarResenas(producto, contenedor) {
  const seccion = elemento("section", "resenas");
  seccion.appendChild(elemento("h2", "", "COMENTARIOS Y RESEÑAS"));
  const lista = elemento("div", "lista-resenas");
  producto.resenas.forEach(function(resena) {
    const tarjeta = elemento("article", "tarjeta-resena");
    tarjeta.appendChild(elemento("h3", "", resena.autor + " · " + resena.estrellas));
    tarjeta.appendChild(elemento("p", "", resena.texto));
    lista.appendChild(tarjeta);
  });
  if (producto.resenas.length === 0) lista.appendChild(elemento("p", "", "Este producto aún no tiene reseñas."));
  seccion.appendChild(lista);
  contenedor.appendChild(seccion);
}

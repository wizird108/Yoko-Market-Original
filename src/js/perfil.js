/* 1. Una sesión local permite mostrar el perfil.
   Sin sesión enviamos al formulario de ingreso. */
if (pedirSesion()) {
  const usuario = usuarioActual();
  document.getElementById("nombre-perfil").textContent = "@" + usuario.nombre;
  document.getElementById("correo-perfil").textContent = usuario.correo;
  document.getElementById("avatar-texto").textContent = usuario.nombre.charAt(0).toUpperCase();
  const contenedor = document.getElementById("mis-anuncios");
  let cantidad = 0;

  /* 2. Cada anuncio se construye con DOM. textContent evita interpretar
     el nombre y la descripción escritos por el usuario como HTML. */
  productosUsuarios.forEach(function(producto) {
    if (producto.usuarioId === usuario.id) {
      cantidad = cantidad + 1;
      const fila = elemento("article", "fila-anuncio");
      fila.appendChild(imagenProducto(producto));
      const enlace = elemento("a", "", producto.nombre);
      enlace.href = ruta("src/pages/producto.html?id=" + producto.id);
      fila.appendChild(enlace);
      fila.appendChild(elemento("p", "precio", precioTexto(producto.precio, producto.moneda)));
      fila.appendChild(elemento("span", "", "ACTIVO"));
      contenedor.appendChild(fila);
    }
  });
  if (cantidad === 0) {
    contenedor.appendChild(elemento("p", "estado-vacio", "Todavía no has publicado productos."));
  }
  document.getElementById("cantidad-anuncios").textContent = cantidad;
  let cantidadCarrito = 0;
  leerCarrito().forEach(function(item) {
    cantidadCarrito = cantidadCarrito + item.cantidad;
  });
  document.getElementById("cantidad-carrito").textContent = cantidadCarrito;

  /* 3. Cerrar elimina únicamente la sesión; las publicaciones permanecen. */
  document.getElementById("cerrar-sesion").addEventListener("click", function() {
    localStorage.removeItem("yoko-sesion");
    window.location.href = ruta("src/pages/login.html");
  });
}

/* Compartida con los botones Like: actualiza la lista sin recargar. */
function actualizarWishlist() {
  const lista = document.getElementById("lista-wishlist");
  if (!lista) return;
  lista.textContent = "";
  const favoritos = leerFavoritos();
  document.getElementById("cantidad-favoritos").textContent = favoritos.length;
  favoritos.forEach(function(id) {
    const producto = buscarProducto(id);
    if (producto) lista.appendChild(crearTarjeta(producto));
  });
  if (favoritos.length === 0) lista.appendChild(elemento("p", "estado-vacio", "Guarda productos con el corazón para verlos aquí."));
}
actualizarWishlist();

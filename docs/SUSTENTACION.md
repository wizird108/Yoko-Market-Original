# Explicacio Entrega

## 1. Un solo header y footer
`componentes.js` define su HTML una sola vez. Cada página deja un contenedor y carga el mismo script. `ruta()` ajusta los enlaces según la profundidad de la página. El botón móvil modifica `aria-expanded` y una clase del menú.

## 2. Un esquema de producto
`datos.js` conserva los productos oficiales y separa `productosUsuarios`. Un `forEach` añade COP, descripción, tallas, género y reseñas a cada objeto. La conversión y los metadatos nuevos son simulados y están señalados en el reporte. `PRODUCTOS` reúne ambos arrays para consultas, sin mezclar su origen.

## 3. DOM para tarjetas y filtros
`elemento()` usa `createElement` y `textContent`; `appendChild` coloca hijos en orden. `crearTarjeta()` se usa en home, catálogo, búsqueda y Wishlist. `filter` devuelve los productos que cumplen los controles. Sale comprueba `oferta`, porque una oferta puede pertenecer a cualquier categoría. Los selects se llenan con valores existentes; una talla inexistente se oculta.

## 4. Favoritos
Se guardan IDs en `yoko-favoritos`. Al pulsar el corazón se agrega o elimina el ID, se actualiza el estado de los botones y se dibuja la Wishlist. Guardar IDs evita duplicar datos completos de productos.

## 5. Detalle y tallas
La URL entrega el ID, y `buscarProducto()` encuentra su objeto. El array `tallas` crea radios. Sin selección válida no se agrega al carrito. Las reseñas se leen de `producto.resenas`, no de un ID escrito a mano. Si está vacío se muestra un aviso.

## 6. Carrito
Cada fila guarda ID, talla y cantidad. `find` busca una coincidencia antes de agregar: misma talla incrementa la cantidad; distinta talla crea otra fila. `normalizarCarrito()` también agrupa duplicados de la versión anterior. El panel permite sumar, restar y eliminar; el total acumula precio por cantidad en COP.

## 7. Búsqueda y bolsa como paneles
`paneles.js` crea ambos diálogos una vez. `hidden` los oculta y `abrirPanel()` muestra el elegido sobre la página. El evento `input` filtra por nombre. Escape, el botón × y el fondo cierran; el teclado regresa al botón que abrió el panel. Tab permanece en el diálogo abierto.

## 8. Login y publicación
Login busca primero entre usuarios mock y también entre cuentas locales. La sesión solo copia ID, nombre y correo. Registro evita correos repetidos en ambos orígenes. Publicar agrega objetos con el mismo esquema, precio COP y fotos locales. FileReader, ya usado en la entrega anterior, convierte una foto a texto para Web Storage; no carga fotos a un servidor.

## 9. CSS y responsive
Flexbox organiza header, filas y estadísticas. Grid distribuye resultados. `@media` cambia el diseño a 768px o menos. El logo usa `position: absolute`, `left: 50%` y `transform: translateX(-50%)`: se centra respecto al header completo. Los paneles usan `position: fixed`, `inset` y `z-index` para superponerse. `overflow-y: auto` permite desplazarlos; el fondo deja de desplazarse mientras están abiertos. Estas propiedades deben explicarse si no se trabajaron aún en clase.

Se mantiene HTML, CSS y JavaScript sin frameworks, React, TypeScript innecesario ni llamadas a servicios externos. Una futura migración a React podrá reutilizar el esquema de datos; hoy los componentes son funciones sencillas de DOM.

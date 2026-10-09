// ============================================================
// datos.js - Datos simulados (mocked data) de YOKOMARKET
// Fuente: https://shop.alvarodiaz.com (tienda oficial, precios en USD)
// Se carga con <script src="...datos.js"></script> ANTES de los demás JS.
// ============================================================

// Categorías: ropa, peluches, vinilos, bolsos, accesorios
const productos = [{
  id: 1,
  nombre: "Omakase Tracklist Tee",
  precio: 45.00,
  categoria: "ropa",
  imagen: "src/assets/images/omakase-tracklist-tee.jpg",
  preventa: true,
  oficial: true
}, {
  id: 2,
  nombre: "No Podemos Ser Amigos Baby Tee",
  precio: 40.00,
  categoria: "ropa",
  imagen: "src/assets/images/no-podemos-ser-amigos-baby-tee.jpg",
  preventa: true,
  oficial: true
}, {
  id: 3,
  nombre: "Omakase Black Tote Bag",
  precio: 25.00,
  categoria: "bolsos",
  imagen: "src/assets/images/omakase-black-tote-bag.jpg",
  preventa: true,
  oficial: true
}, {
  id: 4,
  nombre: "Omakase Bikini Top",
  precio: 32.00,
  categoria: "ropa",
  imagen: "src/assets/images/omakase-bikini-top.jpg",
  preventa: true,
  oficial: true
}, {
  id: 5,
  nombre: "Omakase Logo Bralette",
  precio: 32.00,
  categoria: "ropa",
  imagen: "src/assets/images/omakase-logo-bralette.jpg",
  preventa: true,
  oficial: true
}, {
  id: 6,
  nombre: "OMAKASE 2LP Picture Disc Vinyl",
  precio: 39.98,
  categoria: "vinilos",
  imagen: "src/assets/images/omakase-2lp-vinyl.jpg",
  preventa: true,
  oficial: true
}, {
  id: 7,
  nombre: "OMAKASE CD",
  precio: 11.99,
  categoria: "vinilos",
  imagen: "src/assets/images/omakase-cd.jpg",
  preventa: true,
  oficial: true
}, {
  id: 8,
  nombre: "Chef Coco Plushie",
  precio: 45.00,
  categoria: "peluches",
  imagen: "src/assets/images/chef-coco-plushie.jpg",
  preventa: false,
  oficial: true
}, {
  id: 9,
  nombre: "OMAKASE Logo Chef Apron Fan Pack",
  precio: 37.99,
  categoria: "accesorios",
  imagen: "src/assets/images/omakase-chef-apron-fan-pack.jpg",
  preventa: true,
  oficial: true
}, {
  id: 10,
  nombre: "Te Lo Dejo a Ti Black Zip-Up Hoodie Fan Pack",
  precio: 92.99,
  categoria: "ropa",
  imagen: "src/assets/images/tldat-hoodie-fan-pack.jpg",
  preventa: false,
  oficial: true
}, {
  id: 11,
  nombre: "Te Lo Dejo a Ti Black Zip-Up Hoodie",
  precio: 85.00,
  categoria: "ropa",
  imagen: "src/assets/images/tldat-hoodie.jpg",
  preventa: false,
  oficial: true
}, {
  id: 12,
  nombre: "OMAKASE Logo Chef Apron",
  precio: 30.00,
  categoria: "accesorios",
  imagen: "src/assets/images/omakase-chef-apron.jpg",
  preventa: false,
  oficial: true
}];


/* Conversión fija para el ejercicio, NO una tasa de cambio vigente.
   Conservamos el importe original para poder revisar la conversión. */
const CAMBIO_DE_PRUEBA = 4000;
productos.forEach(function(producto) {
  producto.precioUSDOriginal = producto.precio;
  producto.moneda = "COP";
  producto.precio = Math.round(producto.precio * CAMBIO_DE_PRUEBA);
  producto.oferta = producto.id === 1 || producto.id === 8 || producto.id === 11;
  producto.precioAnterior = producto.oferta ? producto.precio : null;
  if (producto.oferta) producto.precio = Math.round(producto.precio * 0.8);
  // Metadatos simulados para practicar filtros y selección de tallas.
  producto.ofertaSimulada = producto.oferta;
  producto.tallas = producto.categoria === "ropa" ? ["XS", "S", "M", "L", "XL"] : [];
  producto.genero = [2, 4, 5].indexOf(producto.id) !== -1 ? "mujer" : "unisex";
  producto.estado = "Nuevo";
  producto.ubicacion = "Tienda oficial";
  producto.descripcion = producto.nombre + ". Producto del catálogo de Álvaro Díaz. " +
    "Consulta disponibilidad y características antes de comprar.";
  producto.metadatosSimulados = true;
  // No inventamos opiniones de clientes: cada producto tiene su propio arreglo.
  producto.resenas = [];
});

/* Cuenta mock exigida por la rúbrica; solo sirve en este prototipo local. */
const usuarios = [{
  id: "demo-yoko",
  nombre: "yoko_fan_95",
  correo: "fan@yokomarket.com",
  contrasena: "123456"
}];

// Publicaciones de usuarios: arreglo separado. Todavía no hay datos proporcionados.
const productosUsuarios = leerDatos("yoko-publicaciones", []);
/* Adaptamos publicaciones de la entrega anterior al mismo esquema. */
productosUsuarios.forEach(function(producto) {
  if (producto.moneda === "USD") producto.precio = Math.round(producto.precio * CAMBIO_DE_PRUEBA);
  producto.moneda = "COP";
  producto.tallas = producto.tallas || (producto.talla ? [producto.talla] : []);
  producto.resenas = producto.resenas || [];
  producto.genero = producto.genero || "unisex";
  producto.oferta = producto.oferta === true;
  if (producto.imagen) producto.imagen = producto.imagen.replace("src/" + "img/", "src/assets/images/");
  if (producto.avatar) producto.avatar = producto.avatar.replace("src/" + "img/", "src/assets/images/");
  if (producto.fotos) producto.fotos.forEach(function(foto, indice) {
    if (foto) producto.fotos[indice] = foto.replace("src/" + "img/", "src/assets/images/");
  });
});
// Lista común para buscar productos; no modifica los arreglos originales.
const PRODUCTOS = [];
productos.forEach(function(producto) {
  PRODUCTOS.push(producto);
});
productosUsuarios.forEach(function(producto) {
  PRODUCTOS.push(producto);
});
const CATALOGOS = {
  ropa: {
    titulo: "ROPA",
    subtitulo: "Oversize, gráficos y básicos",
    color: "#2266c9"
  },
  peluches: {
    titulo: "PELUCHES",
    subtitulo: "Coco y amigos de Felicilandia",
    color: "#e85d75"
  },
  sale: {
    titulo: "SALE",
    subtitulo: "Últimas unidades, precios felices",
    color: "#e5372b"
  },
  vinilos: {
    titulo: "VINILOS",
    subtitulo: "",
    color: "#2266c9"
  },
  accesorios: {
    titulo: "ACCESORIOS",
    subtitulo: "",
    color: "#2266c9"
  }
};

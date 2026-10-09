/* 1. Exigimos una sesión local y reservamos cuatro espacios para fotos. */
if (pedirSesion()) {
  const fotos = [null, null, null, null];
  const formulario = document.getElementById("form-publicar");
  const error = document.getElementById("error-publicar");

  /* 2. FileReader es el pequeño recurso adicional necesario para leer
     una foto seleccionada. No llama una API externa: lee un archivo local.
     readAsDataURL convierte la foto en texto para guardarla con Web Storage.
     load se activa cuando termina; hasta entonces no publicamos la foto. */
  fotos.forEach(function(foto, indice) {
    const campo = document.getElementById("foto-" + indice);
    campo.addEventListener("change", function() {
      fotos[indice] = null;
      const preview = document.getElementById("preview-" + indice);
      preview.hidden = true;
      document.getElementById("texto-foto-" + indice).hidden = false;
      const archivo = campo.files[0];
      error.textContent = "";
      if (!archivo) {
        return;
      }
      if ((archivo.type !== "image/jpeg" && archivo.type !== "image/png" && archivo.type !==
          "image/webp") || archivo.size > 300 * 1024) {
        error.textContent = "Selecciona JPG, PNG o WebP de hasta 300 KB.";
        campo.value = "";
        return;
      }
      const lector = new FileReader();
      lector.addEventListener("load", function() {
        // Si cambió la selección mientras se leía, ignoramos el resultado viejo.
        if (campo.files[0] === archivo) {
          fotos[indice] = lector.result;
          preview.src = lector.result;
          preview.hidden = false;
          document.getElementById("texto-foto-" + indice).hidden = true;
        }
      });
      lector.addEventListener("error", function() {
        campo.value = "";
        error.textContent = "No se pudo leer la foto. Selecciónala otra vez.";
      });
      lector.readAsDataURL(archivo);
    });
  });

  /* 3. Creamos un objeto compatible con las cards oficiales.
     oficial:false mantiene claramente separadas las publicaciones de fans. */
  formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    if (!fotos[0]) {
      error.textContent = "Espera a que termine de cargar la foto de portada.";
      return;
    }
    const usuario = usuarioActual();
    if (!usuario) {
      pedirSesion();
      return;
    }
    const nombre = document.getElementById("nombre").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    if (!nombre || !ubicacion || !descripcion) {
      error.textContent = "Completa los campos con información, no solo espacios.";
      return;
    }
    const producto = {
      id: "fan-" + Date.now(),
      nombre: nombre,
      precio: Number(document.getElementById("precio").value),
      moneda: "COP",
      categoria: document.getElementById("categoria").value,
      estado: document.getElementById("estado").value,
      talla: document.getElementById("talla").value,
      tallas: document.getElementById("talla").value ? [document.getElementById("talla").value] : [],
      genero: document.getElementById("genero-publicar").value,
      resenas: [],
      oferta: false,
      precioAnterior: null,
      ubicacion: ubicacion,
      descripcion: descripcion,
      imagen: fotos[0],
      fotos: fotos,
      preventa: false,
      oficial: false,
      usuarioId: usuario.id,
      vendedor: "@" + usuario.nombre
    };
    // Leemos otra vez para conservar publicaciones agregadas desde otra vista.
    const publicaciones = leerDatos("yoko-publicaciones", []);
    publicaciones.push(producto);
    if (guardarDatos("yoko-publicaciones", publicaciones)) {
      window.location.href = ruta("src/pages/perfil.html");
    }
  });
}

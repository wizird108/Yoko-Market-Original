/* 1. El evento submit se activa al enviar el formulario.
   preventDefault evita recargar antes de validar y guardar. */
const formularioRegistro = document.getElementById("form-registro");
formularioRegistro.addEventListener("submit", function(evento) {
  evento.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;
  const error = document.getElementById("error-formulario");
  error.textContent = "";
  if (nombre.length === 0) {
    error.textContent = "Escribe un nombre de usuario.";
    return;
  }
  if (contrasena !== confirmar) {
    error.textContent = "Las contraseñas no coinciden.";
    return;
  }

  /* 2. Recorremos las cuentas para impedir correos repetidos.
     Son datos simulados: esta contraseña se guarda localmente como texto. */
  const cuentas = leerDatos("yoko-cuentas", []);
  let repetido = false;
  usuarios.concat(cuentas).forEach(function(cuenta) {
    if (cuenta.correo === correo) {
      repetido = true;
    }
  });
  if (repetido) {
    error.textContent = "Ya existe una cuenta con este correo.";
    return;
  }
  cuentas.push({
    id: "cuenta-" + Date.now(),
    nombre: nombre,
    correo: correo,
    contrasena: contrasena
  });
  if (guardarDatos("yoko-cuentas", cuentas)) {
    window.location.href = ruta("src/pages/login.html");
  }
});

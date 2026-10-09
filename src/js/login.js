/* 1. Leemos los campos y buscamos una cuenta local coincidente.
   No hay servidor, API ni autenticación real en este ejercicio. */
const formularioLogin = document.getElementById("form-login");
formularioLogin.addEventListener("submit", function(evento) {
  evento.preventDefault();
  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const contrasena = document.getElementById("contrasena").value;
  const cuentas = usuarios.concat(leerDatos("yoko-cuentas", []));
  let encontrada = null;
  cuentas.forEach(function(cuenta) {
    if (cuenta.correo === correo && cuenta.contrasena === contrasena) {
      encontrada = cuenta;
    }
  });
  if (encontrada === null) {
    document.getElementById("error-formulario").textContent =
      "Correo o contraseña incorrectos. Regístrate primero si no tienes una cuenta de prueba.";
    return;
  }

  /* 2. La sesión guarda ID, nombre y correo; no vuelve a copiar la contraseña. */
  const sesion = {
    id: encontrada.id,
    nombre: encontrada.nombre,
    correo: encontrada.correo
  };
  if (guardarDatos("yoko-sesion", sesion)) {
    window.location.href = ruta("src/pages/perfil.html");
  }
});

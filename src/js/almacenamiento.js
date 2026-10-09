/* 1. Leer: localStorage guarda textos. JSON.parse vuelve a crear arrays
   y objetos. Si no existe una clave, devolvemos el valor inicial. */
function leerDatos(clave, inicial) {
  try {
    const texto = localStorage.getItem(clave);
    if (texto === null) {
      return inicial;
    }
    return JSON.parse(texto);
  } catch (error) {
    return inicial;
  }
}

/* 2. Guardar: JSON.stringify convierte el dato en texto.
   Devolvemos true/false para no anunciar éxito si falla el almacenamiento. */
function guardarDatos(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
    return true;
  } catch (error) {
    mostrarMensaje(
      "No fue posible guardar. Reduce el tamaño de las fotos o revisa el almacenamiento del navegador."
    );
    return false;
  }
}

/* 3. Sesión simulada: conserva solamente los datos públicos de la cuenta.
   No es autenticación real; todo funciona dentro de este navegador. */
function usuarioActual() {
  return leerDatos("yoko-sesion", null);
}

function pedirSesion() {
  if (usuarioActual() === null) {
    window.location.href = ruta("src/pages/login.html");
    return false;
  }
  return true;
}

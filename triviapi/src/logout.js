import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig.js'; // Ajusta el path si es diferente
import mostrarLogin from './login.js';

export default function mostrarPerfil() {
  const app = document.getElementById('app');
  app.innerHTML = 'logout';

  // Después de mostrar "logout", intentamos cerrar sesión
  signOut(auth)
    .then(() => {
      // Al cerrar sesión exitosamente, mostrar la pantalla de login
      mostrarLogin();
    })
    .catch((error) => {
      // En caso de error, alertar y también mostrar login para no bloquear al usuario
      alert("Error al cerrar sesión: " + error.message);
      mostrarLogin();
    });
}

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Registro</h2>
    <input type="text" id="nombre" placeholder="Nombre"><br>
    <input type="email" id="correo" placeholder="Correo electrónico"><br>
    <input type="password" id="contrasena" placeholder="Contraseña"><br>
    <input type="text" id="fecha" placeholder="Fecha de nacimiento"><br>
    <input type="tel" id="telefono" placeholder="Teléfono"><br>
    <button id="btnRegistro">Registrarse</button>
    <p><a href="#" id="irLogin">¿Ya tienes cuenta? Inicia sesión</a></p>
    <p id="mensaje"></p>
  `;

  document.getElementById("btnRegistro").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje");

    if (!nombre || !correo || !contrasena || !fecha || !telefono) {
      mensaje.textContent = "⚠️ Por favor, completa todos los campos.";
      return;
    }

    let ganados = 0;
    let perdidos = 0;

    const btn = document.getElementById("btnRegistro");
    btn.disabled = true;
    btn.textContent = "Registrando...";

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        ganados,
        perdidos
      });

      mensaje.textContent = "✅ Usuario registrado correctamente.";
      setTimeout(() => mostrarLogin(), 1000); // Pequeña pausa antes de ir al login
    } catch (error) {
      mensaje.textContent = "❌ Error al registrarse: " + error.message;
      console.error(error);
    } finally {
      btn.disabled = false;
      btn.textContent = "Registrarse";
    }
  });

  document.getElementById("irLogin").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarLogin();
  });
}

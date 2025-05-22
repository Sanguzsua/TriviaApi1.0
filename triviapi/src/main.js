import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

import mostrarHome from './home.js';
import mostrarOriginal from './original.js';
import mostrarPerfil from './perfil.js';
import mostrarLogout from './logout.js';
import mostrarLogin from './login.js';
import mostrarRegistro from './registro.js';

function renderMenu(usuario) {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  let botones = [];

  if (usuario) {
    botones = [
      { texto: "Home", fn: mostrarHome },
      { texto: "Original", fn: mostrarOriginal },
      { texto: "Perfil", fn: mostrarPerfil },
      { texto: "Logout", fn: mostrarLogout },
    ];
  } else {
    botones = [
      { texto: "Login", fn: mostrarLogin },
      { texto: "Registro", fn: mostrarRegistro },
    ];
  }

  botones.forEach(({ texto, fn }) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = fn;
    menu.appendChild(btn);
  });
}

onAuthStateChanged(auth, (user) => {
  renderMenu(user);

  if (user) {
    mostrarHome();
  } else {
    mostrarLogin();
  }
});

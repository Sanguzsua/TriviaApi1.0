export default async function mostrarOriginal() {
  const app = document.getElementById('app');
  app.innerHTML = `<p>Cargando pregunta...</p>`;

  try {
    // Petición para obtener 1 pregunta aleatoria (tipo multiple choice)
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    if (!response.ok) throw new Error('Error al cargar la pregunta');

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      app.innerHTML = '<p>No hay preguntas disponibles.</p>';
      return;
    }

    const preguntaData = data.results[0];

    // La API devuelve texto HTML encoded, lo decodificamos para mostrar bien
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    const pregunta = decodeHTML(preguntaData.question);
    const correcta = decodeHTML(preguntaData.correct_answer);
    const incorrectas = preguntaData.incorrect_answers.map(decodeHTML);

    // Mezclamos las respuestas (correcta + incorrectas)
    const opciones = [...incorrectas, correcta];
    opciones.sort(() => Math.random() - 0.5);

    app.innerHTML = `
      <h2>Pregunta:</h2>
      <p>${pregunta}</p>
      <div id="opciones">
        ${opciones.map((op, i) => `<button class="opcion" data-answer="${op}">${op}</button>`).join('')}
      </div>
      <p id="resultado"></p>
    `;

    const botones = app.querySelectorAll('.opcion');
    const resultado = app.querySelector('#resultado');

    botones.forEach(boton => {
      boton.addEventListener('click', () => {
        const respuestaSeleccionada = boton.dataset.answer;

        if (respuestaSeleccionada === correcta) {
          resultado.textContent = '¡Correcto!';
          resultado.style.color = 'green';
        } else {
          resultado.textContent = 'Incorrecto, intenta de nuevo.';
          resultado.style.color = 'red';
        }
      });
    });

  } catch (error) {
    app.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

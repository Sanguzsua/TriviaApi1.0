export default async function mostrarHome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Categorías de Trivia</h2>
    <div id="lista" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;"></div>
    <h2>Preguntas</h2>
    <div id="preguntas"></div>
  `;

  const lista = document.getElementById('lista');
  const preguntasDiv = document.getElementById('preguntas');

  try {
    // Cargar categorías
    const resCategorias = await fetch("https://opentdb.com/api_category.php");
    if (!resCategorias.ok) throw new Error('Error al obtener categorías');
    const jsonCategorias = await resCategorias.json();
    const categorias = jsonCategorias.trivia_categories;

    categorias.forEach(categoria => {
      const btn = document.createElement('button');
      btn.textContent = categoria.name;
      btn.style.padding = '10px 15px';
      btn.style.borderRadius = '5px';
      btn.style.cursor = 'pointer';
      btn.onclick = () => cargarPreguntas(categoria.id);
      lista.appendChild(btn);
    });

  } catch (error) {
    app.innerHTML = `<p>Error cargando trivia: ${error.message}</p>`;
  }

  async function cargarPreguntas(categoriaId) {
    preguntasDiv.innerHTML = `<p>Cargando preguntas...</p>`;
    try {
      // API para preguntas por categoría, aquí cargo 5 preguntas por ejemplo
      const resPreguntas = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoriaId}&type=multiple`);
      if (!resPreguntas.ok) throw new Error('Error al obtener preguntas');
      const jsonPreguntas = await resPreguntas.json();

      if (!jsonPreguntas.results || jsonPreguntas.results.length === 0) {
        preguntasDiv.innerHTML = '<p>No hay preguntas disponibles para esta categoría.</p>';
        return;
      }

      preguntasDiv.innerHTML = '';

      jsonPreguntas.results.forEach((pregunta, idx) => {
        // Mezclar respuestas
        const opciones = [...pregunta.incorrect_answers, pregunta.correct_answer]
          .sort(() => Math.random() - 0.5);

        const preguntaElem = document.createElement('div');
        preguntaElem.style.marginBottom = '20px';
        preguntaElem.innerHTML = `
          <p><strong>${idx + 1}. ${pregunta.question}</strong></p>
          <ul style="list-style: none; padding-left: 0;">
            ${opciones.map(opcion => `<li style="margin-bottom: 5px; cursor: pointer;" class="opcion">${opcion}</li>`).join('')}
          </ul>
        `;

        preguntasDiv.appendChild(preguntaElem);

        // Evento para validar respuestas
        const liOpciones = preguntaElem.querySelectorAll('.opcion');
        liOpciones.forEach(li => {
          li.addEventListener('click', () => {
            if (li.textContent === pregunta.correct_answer) {
              alert('¡Correcto!');
              li.style.color = 'green';
            } else {
              alert(`Incorrecto, la respuesta correcta era: ${pregunta.correct_answer}`);
              li.style.color = 'red';
            }
            // Opcional: deshabilitar más clics para esta pregunta
            liOpciones.forEach(el => el.style.pointerEvents = 'none');
          });
        });
      });

    } catch (error) {
      preguntasDiv.innerHTML = `<p>Error al cargar preguntas: ${error.message}</p>`;
    }
  }
}

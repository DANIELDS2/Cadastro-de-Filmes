const form = document.getElementById('form-filme');
const galeria = document.getElementById('galeria');

let editandoCard = null; // Para rastrear se estamos editando um card

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const diretor = document.getElementById('diretor').value;
  const ano = document.getElementById('ano').value;
  const genero = document.getElementById('genero').value;
  const nota = document.getElementById('nota').value;
  const imagem = document.getElementById('imagem').value;

  if (editandoCard) {
    // Atualizar card existente
    editandoCard.querySelector('img').src = imagem;
    editandoCard.querySelector('.info').innerHTML = `
      <strong>${titulo}</strong><br>
      Diretor: ${diretor}<br>
      Ano: ${ano}<br>
      Gênero: ${genero}<br>
      Nota: ${nota}
    `;
    editandoCard = null;
    form.querySelector('button[type="submit"]').textContent = "Cadastrar";
  } else {
    // Criar novo card
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${imagem}" alt="Cartaz do Filme">
      <div class="info">
        <strong>${titulo}</strong><br>
        Diretor: ${diretor}<br>
        Ano: ${ano}<br>
        Gênero: ${genero}<br>
        Nota: ${nota}
      </div>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    `;

    // Excluir
    card.querySelector('.excluir').addEventListener('click', () => {
      if (card === editandoCard) {
        editandoCard = null;
        form.querySelector('button[type="submit"]').textContent = "Cadastrar";
      }
      card.remove();
    });

    // Editar
    card.querySelector('.editar').addEventListener('click', () => {
      const info = card.querySelector('.info').innerHTML.split('<br>');
      document.getElementById('titulo').value = info[0].replace('<strong>', '').replace('</strong>', '');
      document.getElementById('diretor').value = info[1].replace('Diretor: ', '');
      document.getElementById('ano').value = info[2].replace('Ano: ', '').replace('Ano de Lançamento: ', '');
      document.getElementById('genero').value = info[3].replace('Gênero: ', '');
      document.getElementById('nota').value = info[4].replace('Nota: ', '');
      document.getElementById('imagem').value = card.querySelector('img').src;

      editandoCard = card;
      form.querySelector('button[type="submit"]').textContent = "Atualizar";
    });

    galeria.appendChild(card);
  }

  form.reset();
});
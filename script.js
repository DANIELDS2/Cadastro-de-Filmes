const form = document.getElementById('form-filme');
const galeria = document.getElementById('galeria');
const filtroGenero = document.getElementById('filtro-genero');
const filtroNota = document.getElementById('filtro-nota');

let editandoCard = null;
let filmes = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const diretor = document.getElementById('diretor').value;
  const ano = document.getElementById('ano').value;
  const genero = document.getElementById('genero').value;
  const nota = document.getElementById('nota').value;
  const imagem = document.getElementById('imagem').value;

  if (editandoCard) {
    const id = editandoCard.dataset.id;
    const filme = filmes.find(f => f.id === id);
    Object.assign(filme, { titulo, diretor, ano, genero, nota, imagem });

    editandoCard = null;
    form.querySelector('button[type="submit"]').textContent = "Cadastrar";
  } else {
    const id = Date.now().toString();
    filmes.push({ id, titulo, diretor, ano, genero, nota, imagem });
    atualizarFiltroGenero(genero);
  }

  form.reset();
  renderFilmes();
});

// Atualiza opções do filtro de gênero dinamicamente
function atualizarFiltroGenero(novoGenero) {
  const opcoes = Array.from(filtroGenero.options).map(opt => opt.value);
  if (!opcoes.includes(novoGenero)) {
    const option = document.createElement('option');
    option.value = novoGenero;
    option.textContent = novoGenero;
    filtroGenero.appendChild(option);
  }
}

function renderFilmes() {
  galeria.innerHTML = '';

  const generoSelecionado = filtroGenero.value;
  const notaMinima = parseFloat(filtroNota.value || 0);

  filmes.forEach(filme => {
    if ((generoSelecionado === '' || filme.genero === generoSelecionado) &&
        parseFloat(filme.nota) >= notaMinima) {

      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.id = filme.id;

      card.innerHTML = `
        <img src="${filme.imagem}" alt="Cartaz do Filme">
        <div class="info">
          <strong>${filme.titulo}</strong><br>
          Diretor: ${filme.diretor}<br>
          Ano: ${filme.ano}<br>
          Gênero: ${filme.genero}<br>
          Nota: ${filme.nota}
        </div>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      `;

      card.querySelector('.excluir').addEventListener('click', () => {
        filmes = filmes.filter(f => f.id !== filme.id);
        if (card === editandoCard) {
          editandoCard = null;
          form.querySelector('button[type="submit"]').textContent = "Cadastrar";
        }
        renderFilmes();
      });

      card.querySelector('.editar').addEventListener('click', () => {
        document.getElementById('titulo').value = filme.titulo;
        document.getElementById('diretor').value = filme.diretor;
        document.getElementById('ano').value = filme.ano;
        document.getElementById('genero').value = filme.genero;
        document.getElementById('nota').value = filme.nota;
        document.getElementById('imagem').value = filme.imagem;

        editandoCard = card;
        form.querySelector('button[type="submit"]').textContent = "Atualizar";
      });

      galeria.appendChild(card);
    }
  });
}

// Atualiza os filmes ao mudar o filtro
filtroGenero.addEventListener('change', renderFilmes);
filtroNota.addEventListener('change', renderFilmes);
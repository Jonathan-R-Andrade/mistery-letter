// Declarando elementos
let btnCriarCarta;
let inputCartaTexto;
let pCartaGerada;

// Separa texto em palavras
function separarTextoEmPalavras(texto) {
  // Pega palavras separadas por um 1 espaço em branco
  const palavras = texto.split(' ');
  // Remove valores vazios
  for (let i = palavras.length - 1; i >= 0; i -= 1) {
    if (palavras[i] === '') {
      palavras.splice(i, 1);
    }
  }
  return palavras;
}

// Adiciona palavras do texto do input no parágrafo
function adicionarPalavrasParagrafo() {
  // Separa texto em palavras
  const palavras = separarTextoEmPalavras(inputCartaTexto.value);
  // Adiciona as palavras em um span e depois no parágrafo
  const palavrasTotais = palavras.length;
  if (palavrasTotais > 0) {
    pCartaGerada.innerHTML = ''; // Apaga o conteúdo do parágrafo
    // Adiciona a primeira palavra sem espaço antes da palavra
    let span = document.createElement('span');
    span.innerText = [palavras[0]];
    pCartaGerada.appendChild(span);
    // Adiciona as demais palavras com espaço antes da palavra
    for (let i = 1; i < palavrasTotais; i += 1) {
      span = document.createElement('span');
      span.innerText = palavras[i];
      pCartaGerada.append(' ');
      pCartaGerada.appendChild(span);
    }
  }
}

// Adiciona palavras do texto do input no parágrafo quando apertar Enter
function adicionarPalavrasParagrafoEnter(event) {
  if (event.key === 'Enter') {
    adicionarPalavrasParagrafo();
  }
}

// Obter elementos da página
function obterElementos() {
  btnCriarCarta = document.getElementById('criar-carta');
  inputCartaTexto = document.getElementById('carta-texto');
  pCartaGerada = document.getElementById('carta-gerada');
}

// Adicionar ouvintes aos elementos
function adicionarOuvinte() {
  btnCriarCarta.addEventListener('click', adicionarPalavrasParagrafo);
  inputCartaTexto.addEventListener('keypress', adicionarPalavrasParagrafoEnter);
}

// Executar após o carregamento da página
function executarCodigo() {
  // Obtendo os elementos da página
  obterElementos();
  // Adicionando ouvintes aos elementos
  adicionarOuvinte();
}

window.onload = executarCodigo;

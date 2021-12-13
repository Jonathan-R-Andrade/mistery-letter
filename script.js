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

// Verifica se o array com as palavras está correto
function verificarPalavras(palavras) {
  if (palavras.length === 0) {
    pCartaGerada.innerHTML = 'Por favor, digite o conteúdo da carta.';
    return false;
  }
  return true;
}

// Preencher o parágrafo com palavras dentro de spans e espaços antes dos spans
function preencherParagrafo(paragrafo, palavras) {
  // Adiciona as palavras em um span e depois no parágrafo
  for (let i = 0; i < palavras.length; i += 1) {
    const span = document.createElement('span');
    span.innerText = palavras[i];
    // A partir da segunda palavra coloca um espaço em branco antes da mesma
    if (i > 0) {
      paragrafo.append(' ');
    }
    paragrafo.appendChild(span);
  }
}

// Adiciona palavras do texto do input no parágrafo
function adicionarPalavrasParagrafo() {
  // Separa texto do input em palavras
  const palavras = separarTextoEmPalavras(inputCartaTexto.value);
  if (verificarPalavras(palavras)) {
    pCartaGerada.innerHTML = ''; // Apaga o conteúdo do parágrafo
    preencherParagrafo(pCartaGerada, palavras);
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

// Declarando elementos
let btnCriarCarta;
let inputCartaTexto;
let pCartaGerada;

// Classes para estilizar as palavras
const classes = [
  ['newspaper', 'magazine1', 'magazine2'], // Grupo estilo
  ['medium', 'big', 'reallybig'], // Grupo tamanho
  ['rotateleft', 'rotateright'], // Grupo rotação
  ['skewleft', 'skewright'], // Grupo inclinação
];

// Gera números aleatórios de 0 a n sem repetilos
function gerarNumeros(quantidade, n) {
  const numerosGerados = [];
  for (let i = 0; i < quantidade; i += 1) {
    // Gera um número aleatório até n
    let numeroAleatorio = Math.round(Math.random() * n);
    // Enquanto o número repetir tentar de novo
    while (numerosGerados.indexOf(numeroAleatorio) > -1) {
      numeroAleatorio = Math.round(Math.random() * n);
    }
    // Armazena o novo número gerado
    numerosGerados.push(numeroAleatorio);
  }
  return numerosGerados;
}

// Pega classes aleatórias do array classes
function obterClassesAleatorias(minimoGrupo) {
  const totalGrupos = classes.length;
  if (minimoGrupo <= 0 || minimoGrupo > totalGrupos) {
    return '';
  }
  const classesSorteadas = [];
  // Calcula o total de grupos que serão usados
  const totalGruposUsar = Math.round(Math.random() * (totalGrupos - minimoGrupo)) + minimoGrupo;
  // Obtem os índices dos grupo
  const indicesGrupos = gerarNumeros(totalGruposUsar, totalGrupos - 1);
  // Percorre os grupos
  for (let i = 0; i < totalGruposUsar; i += 1) {
    const totalClasses = classes[indicesGrupos[i]].length;
    // Obtem o índice da classe
    const indiceClasse = gerarNumeros(1, totalClasses - 1);
    // Percorre as classes
    classesSorteadas.push(classes[indicesGrupos[i]][indiceClasse[0]]);
  }
  return classesSorteadas;
}

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
    span.style.display = 'inline-block';
    // Obtem as classes aleatórias e adiciona no span
    const classesAleatorias = obterClassesAleatorias(2);
    for (let j = 0; j < classesAleatorias.length; j += 1) {
      span.classList.add(classesAleatorias[j]);
    }
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

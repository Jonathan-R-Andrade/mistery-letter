// Declarando elementos
let btnMistery;
let btnCriarCarta;
let inputCartaTexto;
let pCartaGerada;
let pCartaContador;
let divEnvelope;
let spanTexto;

// Classes para estilizar as palavras
const classes = [
  ['newspaper', 'magazine1', 'magazine2'], // Grupo estilo
  ['medium', 'big', 'reallybig'], // Grupo tamanho
  ['rotateleft', 'rotateright'], // Grupo rotação
  ['skewleft', 'skewright'], // Grupo inclinação
];

// Classe do CSS
const CC_ESCONDER_ENVELOPE = 'esconder-envelope';

// Flag opção misteriosa
let opcaoMisteriosa = false;

// Recebe o ID retornado por setInterval()
let idSetInterval;

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
    return [];
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
    pCartaContador.innerText = '0';
    return false;
  }
  return true;
}

// Troca o conjunto de classes de uma palavra alterando seu estilo
function alterarEstilo(event) {
  const palavra = event.target;
  const estiloAnterior = palavra.classList;
  const estiloAnteriorString = estiloAnterior.toString();
  // Obtem as classes aleatórias
  let novoEstilo = obterClassesAleatorias(4);
  let novoEstiloString = novoEstilo.toString().replace(/,/g, ' ');
  // Enquanto o novo estilo for igual ao estilo anterior tentar de novo
  while (novoEstiloString === estiloAnteriorString) {
    novoEstilo = obterClassesAleatorias(4);
    novoEstiloString = novoEstilo.toString().replace(/,/g, ' ');
  }
  palavra.className = novoEstiloString;
}

// Preencher o parágrafo com palavras dentro de spans e espaços antes dos spans
function preencherParagrafo(paragrafo, palavras) {
  // Adiciona as palavras em um span e depois no parágrafo
  for (let i = 0; i < palavras.length; i += 1) {
    const span = document.createElement('span');
    span.innerText = palavras[i];
    // Adiciona ouvinte de click que permite alterar o estilo
    span.addEventListener('click', alterarEstilo);
    // Obtem as classes aleatórias e adiciona no span
    const classesAleatorias = obterClassesAleatorias(4);
    for (let j = 0; j < classesAleatorias.length; j += 1) {
      span.classList.add(classesAleatorias[j]);
    }
    // A partir da segunda palavra coloca um espaço em branco antes da mesma
    if (i > 0) {
      paragrafo.append(' ');
    }
    paragrafo.appendChild(span);
  }
  pCartaContador.innerText = palavras.length;
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

// Esconde ou mostra o envelope
function escoderMostrarEnvelope() {
  if (divEnvelope.classList.contains(CC_ESCONDER_ENVELOPE)) {
    divEnvelope.classList.remove(CC_ESCONDER_ENVELOPE);
  } else {
    divEnvelope.classList.add(CC_ESCONDER_ENVELOPE);
  }
}

// Obter elementos da página
function obterElementos() {
  btnCriarCarta = document.getElementById('criar-carta');
  inputCartaTexto = document.getElementById('carta-texto');
  pCartaGerada = document.getElementById('carta-gerada');
  pCartaContador = document.getElementById('carta-contador');
  btnMistery = document.getElementById('mistery');
  divEnvelope = document.getElementById('envelope');
  spanTexto = document.getElementById('texto');
}

// Estiliza as palavras automaticamente
function estilizarAutomaticamente() {
  const palavras = document.querySelectorAll('#carta-gerada span');
  for (let i = 0; i < palavras.length; i += 1) {
    // Adiciona uma propriedade target para a função que recebe evento e estiliza as palavras
    const palavra = { target: palavras[i] };
    alterarEstilo(palavra);
  }
}

// Ativa ou desativa a opção misteriosa
function opcaoMisteriosaOnOff() {
  if (opcaoMisteriosa) {
    opcaoMisteriosa = false;
    clearInterval(idSetInterval);
  } else {
    opcaoMisteriosa = true;
    estilizarAutomaticamente();
    idSetInterval = setInterval(estilizarAutomaticamente, 1000);
  }
}

// Adicionar ouvintes aos elementos
function adicionarOuvinte() {
  btnCriarCarta.addEventListener('click', adicionarPalavrasParagrafo);
  inputCartaTexto.addEventListener('keypress', adicionarPalavrasParagrafoEnter);
  btnMistery.addEventListener('click', escoderMostrarEnvelope);
  spanTexto.addEventListener('click', opcaoMisteriosaOnOff);
}

// Executar após o carregamento da página
function executarCodigo() {
  // Obtendo os elementos da página
  obterElementos();
  // Adicionando ouvintes aos elementos
  adicionarOuvinte();
}

window.onload = executarCodigo;

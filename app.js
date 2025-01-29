// Declara uma array(lista) vazia para armazenar os números já sorteados.
let listaNumerosSorteados = [];
// Declara uma variável que define o limite máximo dos números a serem sorteados (neste caso, de 1 a 10).
let limiteDeNumeros = 50;
// Gera o número secreto aleatório na primeira vez que o código é executado.
let numeroSecreto = gerarNumeroAleatorio();
// Inicializa o contador de tentativas com 1.
let tentativas = 1;

// Função para exibir texto em um elemento HTML específico.
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com a tag especificada (ex: "h1", "p", "h2").
    let campo = document.querySelector(tag);
    // Define o conteúdo HTML do elemento com o texto fornecido.
    campo.innerHTML = texto;
    // Usa a biblioteca responsiveVoice para reproduzir o texto por áudio (requer inclusão da biblioteca no HTML).
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.1 });
}

// Função para apagar o contéudo do elemento h2, usada para limpar mensagens anteriores na tela.
function apagarTentativas() {
    exibirTextoNaTela("h2", "");
}

// Exibe o título e a mensagem inicial do jogo na tela. Referente aos elementos h1 e p do HTML.
exibirTextoNaTela("h1", "Jogo do número secreto");
exibirTextoNaTela("p", "Escolha um número entre 1 e 50");
// Limpa o campo de tentativas no início.
apagarTentativas();

// Função principal que verifica o chute do usuário.
function verificarChute() {
    // Obtém o valor digitado pelo usuário no campo de input.
    chute = document.querySelector("input").value;
    // Verifica se o input esta vazio e retorna uma mensagem na tela.
    if (chute === "") {
        alert("Por favor, insira um número");
        return;
    }
    // Verifica se o chute é igual ao número secreto.
    if (chute == numeroSecreto) {
        // Determina se deve usar "tentativa" ou "tentativas" na mensagem.
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        // Cria a mensagem de acerto com o número de tentativas.
        let numeroTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        // Exibe a mensagem de acerto na tela.
        exibirTextoNaTela("h2", numeroTentativas);
        // Habilita o botão de reiniciar o jogo.
        document.getElementById("reiniciar").removeAttribute("disabled");
        // Verifica se o chute é maior que o número secreto.
    } else if (chute > numeroSecreto) {
        // Exibe uma mensagem informando que o número secreto é menor.
        exibirTextoNaTela("h2", `O número secreto é menor que ${chute}`);
        // Se não for igual nem maior, então o chute é menor.
    } else {
        // Exibe uma mensagem informando que o número secreto é maior.
        exibirTextoNaTela("h2", `O número secreto é maior que ${chute}`);
    }
    // Incrementa o número de tentativas.
    tentativas++;
    // Limpa o campo de input para o próximo chute.
    limparCampo();
}

// Função que gera um número aleatório entre 1 e o limite definido (inclusive).
function gerarNumeroAleatorio() {
    // Gera um número pseudo-aleatório no intervado 0 (inclusive) e 1 (exclusivo), multiplicando pelo limite e soma 1 para obter um número entre 1 e o limite.
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1);
    // Obtém a quantidade de números já sorteados.
    let quantidadeElementosLista = listaNumerosSorteados.length;

    // Se a quantidade de números sorteados for igual ao limite, reinicia a lista para evitar loop infinito.
    if (quantidadeElementosLista == limiteDeNumeros) {
        listaNumerosSorteados = [];
    }
    // Verifica se o número escolhido já foi sorteado usando o método includes.
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        // Se já foi sorteado, chama a função novamente para gerar outro número. 
        return gerarNumeroAleatorio();
    } else {
        // Se não foi sorteado, adiciona o número à lista de sorteados.
        listaNumerosSorteados.push(numeroEscolhido);
        // Retorna o número escolhido.
        return numeroEscolhido;
    }
}

// Função para limpar o campo de input (entrada).
function limparCampo() {
    // Seleciona o campo de input.
    chute = document.querySelector("input");
    // Irá definir o valor do campo como vazio.
    chute.value = "";
}

// Função para reiniciar o jogo.
function reiniciarJogo() {
    // Gera um novo número secreto.
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    // Reinicia o contador de tentativas.
    tentativas = 1;
    // Apaga as mensagens de tentativas anteriores.
    apagarTentativas();
    // Desabilita o botão reiniciar até que o jogador acerte o número novamente.
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

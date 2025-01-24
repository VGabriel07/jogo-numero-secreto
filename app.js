let listaNumerosSorteados = [];
let quantidadeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.1});
}

function apagarTentativas() {
    exibirTextoNaTela("h2", "");
}

exibirTextoNaTela("h1", "Jogo do número secreto");
exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
apagarTentativas();

function verificarChute() {
    chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let numeroTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("h2", numeroTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("h2", `O número secreto é menor que ${chute}`);
    } else {
        exibirTextoNaTela("h2", `O número secreto é maior que ${chute}`);
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * quantidadeNumeros + 1);
   let quantidadeElementosLista = listaNumerosSorteados.length;

   if (quantidadeElementosLista == quantidadeNumeros) {
    listaNumerosSorteados = [];
   }
   if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    apagarTentativas();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}

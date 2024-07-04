// Inicializa a lista de números sorteados
var listaDeNumerosSorteados = [];

// Inicializa o contador de tentativas
var tentativas = 1;

// Define o valor máximo para os números sorteados
var MAXNUM = 10;

// Gera o número secreto inicial
var secretNumber = gerarNumeroAleatorio(); 

/**
 * Função que gera um número aleatório entre 1 e MAXNUM.
 * Verifica se o número já foi sorteado anteriormente e, caso tenha sido, chama a função novamente.
 * Se todos os números já tiverem sido sorteados, reinicia a lista.
 * 
 * @returns {number} - Um número aleatório entre 1 e MAXNUM.
 */
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * MAXNUM + 1); // Gera um número aleatório entre 1 e MAXNUM
    let quantidadeValoresLista = listaDeNumerosSorteados.length;

    // Se todos os números já tiverem sido sorteados, reinicia a lista
    if (quantidadeValoresLista == MAXNUM) {
        listaDeNumerosSorteados = [];
    }

    // Se o número já foi sorteado, chama a função novamente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // Adiciona o número à lista de números sorteados e o retorna
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

/**
 * Função que exibe um texto na tela em um elemento HTML específico.
 * 
 * @param {string} tag - A tag do elemento HTML onde o texto será exibido.
 * @param {string} texto - O texto a ser exibido.
 */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento HTML correspondente à tag
    campo.innerHTML = texto;
}

/**
 * Função que limpa o valor do campo input.
 */
function limparInput() {
    let inputVar = document.querySelector('input'); // Seleciona o primeiro input no HTML
    inputVar.value = ''; // Define o valor do input como vazio
}

/**
 * Função que reinicia o jogo, gerando um novo número secreto e resetando as tentativas.
 * Também desabilita o botão de reiniciar e habilita o botão de chute.
 */
function reiniciarJogo() {
    secretNumber = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparInput(); // Limpa o campo input
    tentativas = 1; // Reseta o contador de tentativas
    initialCode(); // Chama o código inicial para resetar a interface
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar
    document.getElementById('Chutar').removeAttribute('disabled'); // Habilita o botão de chute
}

/**
 * Função que verifica o chute do usuário e exibe mensagens de acerto ou erro.
 * Se o chute estiver correto, exibe uma mensagem de sucesso e habilita o botão de reiniciar.
 * Se o chute estiver incorreto, exibe uma dica e incrementa o contador de tentativas.
 */
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor do input
    chute = parseInt(chute); // Converte o valor do chute para inteiro

    // Verifica se o chute está correto
    if (chute == secretNumber) {
        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${tentativas == 1 ? 'tentativa' : 'tentativas'}!`);
        if (tentativas == 1) {
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
        }
        document.getElementById('Chutar').setAttribute('disabled', true); // Desabilita o botão de chute
    } else {
        // Fornece uma dica se o chute estiver incorreto
        if (secretNumber > chute) {
            exibirTextoNaTela('p', 'O número é maior...');
        } else {
            exibirTextoNaTela('p', 'O número é menor...');
        }
        tentativas++; // Incrementa o contador de tentativas
        limparInput(); // Limpa o campo input
    }
    document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
}

/**
 * Função inicial que configura a interface do jogo.
 * Exibe o título e a instrução inicial na tela.
 */
function initialCode() {
    exibirTextoNaTela('h1', 'NUMBER SECRET');
    exibirTextoNaTela('p', `Escolha um número de 1 a ${MAXNUM}`);
}

// Executa a função inicial para configurar a interface do jogo
initialCode();

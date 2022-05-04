/****************************************************************************************** 
* Programação do jogo da velha para Jogador vs. Programa. No caso em que a Velha inicia,  *
* ela sempre jogará no topo a direita e seguirá o melhor caminho  para vencer. No futuro  *
* pretendo implementar uma árvore genérica para tomar decisões. A Velha poderá iniciar no *
* topo à direita, topo à esquerda, base à esquerda e base à direita.                      *
*******************************************************************************************/


var jogador = null;
var vencedor = null;
var vencedorSelecionado = document.getElementById('vencedor-selecionado');
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var quadrados = document.getElementsByClassName("quadrado");
const btReiniciar = document.getElementsByTagName("button");
var inicio = 0;
var fim = null;

var velhaComecou = null;
//var jogadaInicial = [1, 3, 7, 9];
var caminho = [];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let selectEl = document.getElementsByTagName('select');  // Adiciona evento no 'select' para mudar o modo do jogo
                                                         // entre Jogador vs. Jogador e Jogador vs. Velha
selectEl[0].addEventListener('change', function() {
    location.href=this.value;
});

andamentoJogo(); // Primeira chamada da função para iniciar o jogo.

/**********************************************************************************
* Função que recebe a primeira jogada do oponente quando a Velha iniciou o jogo.  *
* Retorna um vetor com o melhor caminho a ser seguido pela Velha. O vetor consis- *
* te nas prováveis jogadas do oponente nos índices ímpares do vetor, e a melhor   *
* jogada para a velha nos índices pares.                                          *
***********************************************************************************/
function retornaCaminho(numero){

    let retorno = [];
    switch(numero){

        case 2:

            retorno = [2, 7, 4, 9];

        break;
        
        case 3:

            retorno = [3, 7, 4, 9];

        break;

        case 4:

            retorno = [4, 3, 2, 9];
        
        break;

        case 5:

            retorno = [5, 3, 2, 8];

        break;
        
        case 6:

            retorno = [6, 3, 2, 7];
            
        break;

        case 7:

           retorno = [7, 3, 2, 9];
            
        break;
        
        case 8:

            retorno = [8, 7, 4, 3];
            
        break;

        case 9:

            retorno = [9, 7, 4, 3];

        break;

        default:

    }

    return retorno;

}


/*************************************************************************************
* Função que Recebe a primeira ogada do oponente quando a Velha iniciou o jogo e re- *
* torna as duas possíveis jogadas finais para a Velha ganhar.                        *
**************************************************************************************/

function retornaFim(numero){

    let retorno = [];

    if(numero === 2 || numero === 3){

        retorno = [5, 8];

    }

    else if(numero === 4 || numero === 7){
        
        retorno = [5, 6];

    }

    else if(numero === 8 || numero === 9){
        
        retorno = [2, 5];

    }

    else{

        retorno = [4 , 5];

    }

    return retorno;

}

/**************************************************************************************
* Função que recebe um jogador ('X' ou 'O') e verifica se há possibilidade de vitória *
* para ele. Retorna a casa onde ocorrerá a jogada de vitória.                         * 
***************************************************************************************/

function verificaPossivelVitoria(jogador){

    var quadradoId = [];
    var possivelVitoria = null;
    var bloqueio = null;
    let i, j;

    for(i = 0 ; i < quadrados.length ; i++){                    
                                                                    
        j = i+1;                                                
        quadradoId[i] = document.getElementById(j.toString());
        
    }

    for(i = 0 ; i < 9 ; i+=3){  // Checa se há condição de vitória nas linhas
        
        possivelVitoria = checaTrio(quadradoId[i], quadradoId[i+1], quadradoId[i+2], jogador);

        if(possivelVitoria !== null){

            bloqueio = retornaBloqueio(possivelVitoria);
            bloqueio = bloqueio + i + 1;

            return bloqueio;

        }

    }

    for(i = 0 ; i < 3 ; i++){ // Checa se há condição de vitória nas colunas

        possivelVitoria = checaTrio(quadradoId[i], quadradoId[i+3], quadradoId[i+6], jogador);

        if(possivelVitoria !== null){

            bloqueio = retornaBloqueio(possivelVitoria);
            bloqueio = (3 * bloqueio + i) + 1;

            return bloqueio;

        }

    }

    for(i = 0 ; i < 3 ; i+=2){ // Checa se há condição de vitória nas diagonais

        possivelVitoria = checaTrio(quadradoId[i], quadradoId[4], quadradoId[8-i], jogador);

        if(possivelVitoria !== null){

            bloqueio = retornaBloqueio(possivelVitoria);
            
            switch(bloqueio){

                case 0:

                    return (i + 1);
                break;
                
                case 1:

                    return 5;
                break;

                case 2:

                    return (8 - i + 1);
                
                break;

                default:

            }

            return bloqueio;

        }

    }

    return bloqueio;

}

/*******************************************************************************************
* Função que recebe três casas e um jogador ('X' ou 'O') e verifica se há duas casas mar-  *
* cadas pelo jogador e um vazia. Se houver, retorna qual a casa falta para completar a se- *
* quência de vitória. Caso contrário, retorna 'null'.                                      *
*******************************************************************************************/

function checaTrio(quadradoA, quadradoB, quadradoC, jogador){

    if(quadradoA.innerHTML === jogador && quadradoB.innerHTML === '-' && quadradoC.innerHTML === jogador){

        return [jogador, '-', jogador];

    }

    else if(quadradoA.innerHTML === '-' && quadradoB.innerHTML === jogador && quadradoC.innerHTML === jogador){

        return ['-', jogador, jogador];

    }

    else if(quadradoA.innerHTML === jogador && quadradoB.innerHTML === jogador && quadradoC.innerHTML === '-'){

        return [jogador, jogador, '-'];

    }

    else{

        return null;

    }
}


/*******************************************************************************************
* Função que recebe uma sequência de três casas do jogo onde há possibilidade de vitória e *
* retorna qual das três casas está vazia.                                                  * 
********************************************************************************************/

function retornaBloqueio(sequencia){

    for(let i = 0 ; i < sequencia.length ; i++){

        if(sequencia[i] === '-'){

            return i;
        }
    }

}

/**********************************************
* Função que sorteia quem iniciará a partida. *
**********************************************/

function sorteiaJogador(){

    let sorteio = getRandomInt(0, 2);
    let mensagem;

    if(sorteio === 0){

        jogador = 'X';
        mudaJogador(jogador);
        velhaComecou = true;
        mensagem = document.getElementById('balaoDeFala_velha_comeca');
        mensagem.style.display = 'inline';

    }

    else{

        jogador = 'O';
        mudaJogador(jogador);
        velhaComecou = false;
        mensagem = document.getElementById('balaoDeFala_adv_comeca');
        mensagem.style.display = 'inline';

    }

}


///////////////////////////////
/*function syncDelay(milliseconds){

    var start = new Date().getTime();
    var end=0;

    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }

}*/

/**********************************************************
* Função que verifica se todo o tabuleiro foi preenchido. *
***********************************************************/

function jogoTerminou(){

    let contador = 0;

    for(let i = 0 ; i < quadrados.length ; i++){

        if(quadrados[i].innerHTML === '-'){

            contador ++;

        }

    }

    if(contador > 0){

        return false;

    }

    return true;

}


/**********************************************************
* Função que recebe quem fará a próxima jogada (X ou O) e *
* mostra na área 'Jogador: ' quem é o jogador da vez.     *
**********************************************************/

function mudaJogador(valor){

    jogador = valor;
    jogadorSelecionado.innerHTML = jogador;

}

/*********************************************************
* Função que faz as jogadas pela adiversária do jogador. * 
*********************************************************/

function velhaJoga(){  

        let quadrado;


        if(vencedor !== null || jogoTerminou()){ // Caso o jogo já tenha um vencedor ou o tabuleiro esteja todo preenchido finaliza a função
                                                 
            return;
    
        }

        if(velhaComecou === true){ // Caso a Velha seja quem inciou o jogo ela jogará de forma a tentar ganhar o jogo

           quadrado = velhaPrimeiroJogador();

        }

        else{ // Caso o oponente inicie, a Velha tentará não cometer erros para que ela vença ou dê empate

           quadrado = velhaSegundoJogador();

        }

        // syncDelay(5000);

        quadrado.innerHTML = jogador;
        quadrado.style.color = '#000';

        checaVencedor();
        jogador = 'O';
        mudaJogador(jogador);

}

/****************************************************************************
* Função que faz as jogadas para a Velha quando ela quem iniciou a partida. *
****************************************************************************/

function velhaPrimeiroJogador(){

    let jogada;
    let quadrado;

    if(inicio === 1){ // Caso seja o inicio da partida a Velha jogará no topo à direita.

        //jogada = jogadaInicial[getRandomInt(0, 4)];
        jogada = 1;
        inicio = 2;

        return document.getElementById(jogada);
        
    }

    else{

        if(inicio === 2){ // Caso seja a segunda vez que a Velha joga, busca no tabuleiro o primeiro local onde o adversário jogou
            
            jogada = 2;
            quadrado = document.getElementById(jogada);
            
            while(quadrado.innerHTML !== 'O'){

                jogada++;
                quadrado = document.getElementById(jogada);

            }

            caminho = retornaCaminho(jogada);               // Sabendo a jogada do adversário busca o vetor com o melhor caminho para a vitória
            fim = caminho[0];                               // Variável para indicar qual será a melhor jogada final caso a Velha não vença antes
            caminho.shift();                                // Retira o primeiro elemento do vetor de melhor caminho
            quadrado = document.getElementById(caminho[0]); // Faz a melhor jogada atual
            caminho.shift();                                // Retira a jogada do inicio do vetor de melhor caminho
            inicio = 3;                                     // Indica que já foram feitas as duas primeiras jogadas

            return quadrado;

        }


        else{ // Caso as duas primeiras jogadas tenha sido feitas

            if(caminho.length > 0){  // verifica se o vetor de melhor caminho não está vazio

                if(document.getElementById(caminho[0]).innerHTML === '-'){ // caso não seteja vazio, verifica se o jogador fez a jogada para impedir uma vitória neste momento
                                                                           // se não tiver feito, a vitória pode ser alcançada agora
                    quadrado = document.getElementById(caminho[0]);
                    caminho.shift();
                    caminho.shift();

                    return quadrado;

                }
                

                else{  // Caso o adversário tenha impedido uma vitória, segue pelo vetor de melhor caminho
 
                    caminho.shift();
                    quadrado = document.getElementById(caminho[0]);
                    caminho.shift();

                    return quadrado;

                }

            }

            else{ // Caso o vetor de melhor caminho esteja vazio, a vitória poderá vir em dois locais diferentes

                let fimCaminho = retornaFim(fim);  // Busca o vetor dos possíveis finais

                if(document.getElementById(fimCaminho[0]).innerHTML === '-'){ // Verifica em qual dos dois possíveis locais a Velha pode finalizar o jogo

                    quadrado = document.getElementById(fimCaminho[0]);
                    
                    return quadrado;

                }

                else if(document.getElementById(fimCaminho[1]).innerHTML === '-'){

                    quadrado = document.getElementById(fimCaminho[1]);
                    
                    return quadrado;

                }

                else{

                    jogada = 1;
                    quadrado = document.getElementById(jogada);

                    while(quadrado.innerHTML !== '-'){

                        jogada++;
                        quadrado = document.getElementById(jogada);

                    }

                }

            }

        }

    }

    return quadrado;

}

/*******************************************************************************
* Função que faz as jogadas para a Velha quando o adversário iniciou a partida *
* Tentará fazer a melhor resposta para que não haja vitória do adversário.     *
********************************************************************************/

function velhaSegundoJogador(){

    let jogada;
    let quadrado; 

    if(inicio === 1){ // Caso seja o inicio da partida 
        
        jogada = 1;
        quadrado = document.getElementById(jogada);

        let mensagem = document.getElementsByClassName('balaoDeFala');
        for(let j = 0 ; j < mensagem.length ; j++){
            mensagem[j].style.display = 'none';
        }

        while(quadrado.innerHTML !== 'O'){ // busca o local que o adversário jogou

            jogada++;
            quadrado = document.getElementById(jogada);

        }

        if(jogada === 2 || jogada === 4 || jogada === 5 || jogada === 6 || jogada === 8){ // Caso tenha jogado em algum lugar que não sejam os cantos

            jogada = 1;  // joga na primeira casa

        }

        else{  // Caso contrário joga na casa cantral

            jogada = 5;

        }

        
        inicio = 2;  // Indica que a primeira jogada da Velha foi feita

        return document.getElementById(jogada);
        
    }

    jogada = verificaPossivelVitoria('X');  // Verifica se há possibilidade de vitória da Velha

    if(jogada !== null){  // se houver, faz a jogada e vence o jogo

        quadrado = document.getElementById(jogada);

    }

    else{ // caso contrário, verifica se há possibilidade do adversário ganhar

        let teste = verificaPossivelVitoria('O');
        
        if(teste !== null){ // Se o adversário puder ganhar, bloqueia
            
            quadrado = document.getElementById(teste);

        }

        else{ // caso contrário, busca uma casa vazia para jogar

            teste = 1;
            quadrado = document.getElementById(teste);
            
            while(quadrado.innerHTML !== '-'){

                teste++;
                quadrado = document.getElementById(teste);

            }
        }

    }

    return quadrado;

}

/**********************************************************
* Função que recebe quem fará a próxima jogada (X ou O) e *
* mostra na área 'Jogador: ' quem é o jogador da vez.     *
**********************************************************/

function escolherQuadrado(id){

    if(vencedor !== null){

        return;

    }

    if(inicio === 2){

        let mensagem = document.getElementsByClassName('balaoDeFala');
        for(let j = 0 ; j < mensagem.length ; j++){
            mensagem[j].style.display = 'none';
        }

    }

    let quadrado = document.getElementById(id);

    if(quadrado.innerHTML !== '-'){  // Verifica se o quadrado selecionado já foi clicado uma vez
                                     // caso tenha sido, não muda seu conteúdo
        return;

    }

    quadrado.innerHTML = jogador;   // O quadrado selecionado recebe a marcação do jogador da vez
    quadrado.style.color = '#000';  // e a marcação fica com a cor preta

    checaVencedor();
    jogador = 'X';
    mudaJogador(jogador);
    andamentoJogo();

}

/****************************************************************
* Função que gera números inteiros aleatórios. O número é maior *
* ou igual à 'min' e sempre menor que 'max'.                    * 
****************************************************************/

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;

}

/*********************************************************************** 
* Função que checa se alguma das 8 condições de vitória foi alcançada. * 
***********************************************************************/

function checaVencedor(){

    var quadradoId = [];
    let i, j;

    for(i = 0 ; i < quadrados.length ; i++){                    
                                                                    
        j = i+1;                                                
        quadradoId[i] = document.getElementById(j.toString());
        
    }

    for(i = 0 ; i < 9 ; i+=3){  // Checa se houve condição de vitória nas linhas

        if(checaSequencia(quadradoId[i], quadradoId[i+1], quadradoId[i+2])){

            mudaCor(quadradoId[i], quadradoId[i+1], quadradoId[i+2]);         
            declaraVencedor(quadradoId[i]);
    
            return;

        }

    }

    for(i = 0 ; i < 3 ; i++){ // Checa se houve condição de vitória nas colunas

        if(checaSequencia(quadradoId[i], quadradoId[i+3], quadradoId[i+6])){

            mudaCor(quadradoId[i], quadradoId[i+3], quadradoId[i+6]);         
            declaraVencedor(quadradoId[i]);
    
            return;

        }

    }


    for(i = 0 ; i < 3 ; i+=2){ // Checa se houve condição de vitória nas diagonais

        if(checaSequencia(quadradoId[i], quadradoId[4], quadradoId[8-i])){

            mudaCor(quadradoId[i], quadradoId[4], quadradoId[8-i]);           
            declaraVencedor(quadradoId[0]);

            return;

        }

    }

}

/***********************************************************************
* Função que recebe qual jogador venceu (X ou O) e declara o vencedor. * 
************************************************************************/

function declaraVencedor(quemVenceu){
    
    let mensagem;
    vencedor = quemVenceu.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;

    if(vencedor == 'X'){

        mensagem = document.getElementById('balaoDeFala_velha_ganhou');
        mensagem.style.display = 'inline';

    }

    else{

        mensagem = document.getElementById('balaoDeFala_adv_ganhou');
        mensagem.style.display = 'inline';

    }
    
}

/*************************************************************************** 
* Função que recebe 3 quadrados do jogo e muda a cor de fundo para indicar *
* que uma condição de vitória ocorreu.                                     * 
****************************************************************************/

function mudaCor(quadradoA,quadradoB, quadradoC){
    
    quadradoA.style.background = '#2de92d';
    quadradoB.style.background = '#2de92d';
    quadradoC.style.background = '#2de92d';

}

/****************************************************************************** 
* Função que recebe 3 quadrados do jogo e checa se o conteúdo deles é igual,  *
* sem contar o caracter '-', que indica que aquele quadrado ainda não foi se- *
* lecionado.                                                                  *
******************************************************************************/

function checaSequencia(quadradoA,quadradoB, quadradoC){

    var igual = false;

    if(quadradoA.innerHTML !== '-' && quadradoA.innerHTML === quadradoB.innerHTML && quadradoB.innerHTML === quadradoC.innerHTML){

        igual = true;

    }

    return igual;

}

/********************************************************************
* Função que reinicia o jogo quando o botão 'Reiniciar' é clicado.  *
* Apaga os conteúdos na parte de 'Jogador: ' e 'Vencedor: ', muda   * 
* os conteúdos dos quadrados para o caracter '-', muda a cor do ca- * 
* racter em cada quadrado e a cor de fundo para as cores iniciais e *
* reinicia a variável que indica o vencedor.                        * 
********************************************************************/

function reiniciar(){

    vencedor = null;
    vencedorSelecionado.innerHTML = "";
    jogador = null;
    jogadorSelecionado.innerHTML = "";
    inicio = 0;
    velhaComecou = null;
    caminho = [];
    fim = null;

    let mensagem = document.getElementsByClassName('balaoDeFala');
    for(let j = 0 ; j < mensagem.length ; j++){
        mensagem[j].style.display = 'none';
    }

    for(let i = 0 ; i < quadrados.length ; i++){

        quadrados[i].innerHTML = '-';
        quadrados[i].style.color = '#eee';
        quadrados[i].style.background = '#eee';

    }

    andamentoJogo();

}


/**********************************************************************
* Função que controla o andamento do jogo. Inicia sorteando o jogador *
* que deve iniciar a partida e alterna entre a Velha o adversário.    *
**********************************************************************/

function andamentoJogo(){

    let mensagem;

    if(jogoTerminou()){

        mensagem = document.getElementById('balaoDeFala_empate');
        mensagem.style.display = 'inline';

    }

    if(inicio === 0){

        sorteiaJogador();
        inicio = 1;

    }

    if(jogador === 'X' && vencedor === null){

        velhaJoga();

    }


}

btReiniciar[0].addEventListener("click", reiniciar); // Adiciona o evento que espera um clique no botão 'Reiniciar'.
var jogador = null;
var vencedor = null;
var vencedorSelecionado = document.getElementById('vencedor-selecionado');
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var quadrados = document.getElementsByClassName("quadrado");
const btReiniciar = document.getElementsByTagName("button");

let selectEl = document.getElementsByTagName('select');

selectEl[0].addEventListener('change', function() {
    location.href=this.value;
});

mudaJogador('X'); // Faz com que o jogador inicial seja sempre X quando a página é carregada

/*********************************************************** 
*  Função que recebe a 'id' de um dos quadrados do jogo e  *
*  muda seu conteúdo para X ou O dependendo do jogador que *
*  clicou no quadrado.                                     *
***********************************************************/

function escolherQuadrado(id){

    if(vencedor !== null){  // Verifica se já houve um vencedor, caso tenha encerra a função

        return;

    }

    let quadrado = document.getElementById(id);

    if(quadrado.innerHTML !== '-'){  // Verifica se o quadrado selecionado já foi clicado uma vez
                                     // caso tenha sido, não muda seu conteúdo
        return;

    }

    quadrado.innerHTML = jogador;   // O quadrado selecionado recebe a marcação do jogador da vez
    quadrado.style.color = '#000';  // e a marcação fica com a cor preta

    if(jogador === 'X'){  // Caso o jogador da vez seja 'X', indica que o próximo sera 'O'

        jogador = 'O';

    }

    else{ // Caso o jogador da vez seja 'O', indica que o próximo sera 'X'

        jogador = 'X';

    }

    mudaJogador(jogador);
    checaVencedor();

}

/**********************************************************
* Função que recebe quem fará a próxima jogada (X ou O) e *
* mostra na área 'Jogador: ' quem é o jogador da vez.     *
**********************************************************/

function mudaJogador(valor){

    jogador = valor;
    jogadorSelecionado.innerHTML = jogador;

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

    for(i = 0 ; i < 9 ; i+=3){  // Checa se houve condução de vitória nas linhas

        if(checaSequencia(quadradoId[i], quadradoId[i+1], quadradoId[i+2])){

            mudaCor(quadradoId[i], quadradoId[i+1], quadradoId[i+2]);         
            declaraVencedor(quadradoId[i]);
    
            return;

        }

    }

    for(i = 0 ; i < 3 ; i++){ // Checa se houve condução de vitória nas colunas

        if(checaSequencia(quadradoId[i], quadradoId[i+3], quadradoId[i+6])){

            mudaCor(quadradoId[i], quadradoId[i+3], quadradoId[i+6]);         
            declaraVencedor(quadradoId[i]);
    
            return;

        }

    }


    for(i = 0 ; i < 3 ; i+=2){ // Checa se houve condução de vitória nas diagonais

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
 
    vencedor = quemVenceu.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
    
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
    jogador = 'X';
    jogadorSelecionado.innerHTML = "";

    for(let i = 0 ; i < quadrados.length ; i++){

        quadrados[i].innerHTML = '-';
        quadrados[i].style.color = '#eee';
        quadrados[i].style.background = '#eee';

    }

}

btReiniciar[0].addEventListener("click", reiniciar); // Adiciona o evento que espera um clique no botão 'Reiniciar'.
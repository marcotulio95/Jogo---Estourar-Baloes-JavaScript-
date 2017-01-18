var timerId = null; // Variavel para o cronometro feito em JS ; 

function iniciarJogo(argument){
	
	var url = window.location.search;
	var nivel_jogo = url.replace("?", " ");

	var tempoJogo = 0;
	
	if (nivel_jogo == 1){ // 1 facil -> 120 seg
		tempoJogo = 120;
	}

	if (nivel_jogo == 2){ // 2 medio -> 60 seg
		tempoJogo = 60;
	}

	if (nivel_jogo == 3){ // 3 dificil -> 30 seg
		tempoJogo = 30;
	}

	document.getElementById("cronometro").innerHTML = tempoJogo;
	var qtde_baloes = 80;

	cria_baloes(qtde_baloes);

	// Imprimir a qnte baloes inteiros

	document.getElementById("baloes_inteiros").innerHTML= qtde_baloes;
	document.getElementById("baloes_estourados").innerHTML= 0;

	cronometro(tempoJogo);

}

function cronometro (segundos) {
	
	document.getElementById("cronometro").innerHTML = segundos;
	timerId = setTimeout("cronometro("+ (segundos - 1) +")", 1000); // A cada 1 seg uma chamada recursiva é chamada, atualizando o valor do cronomêtro
	if (segundos	==  -1){
		clearTimeout(timerId); // Parar o cronometro
		game_over();
		document.getElementById("cronometro").innerHTML = 0;
		return false;
	}

}

function game_over(){
	alert('Fim de Jogo, você não conseguiu estourar todos os baloes a tempo !');
}
function cria_baloes(qtde_baloes) {
	
	for(var i= 1; i<= qtde_baloes; i++){
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this);}

		document.getElementById("cenario").appendChild(balao);
	}
}

function estourar(e){
	var id_balao = e.id; 
	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
	var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;


	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	if(baloes_inteiros	== 0 ){
		alert	('Parabéns, você conseguiu estourar todos os baloes a tempo !');
		clearTimeout(timerId);
	}
}

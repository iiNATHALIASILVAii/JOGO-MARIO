// Busca pelos elementos no HTML
// document.querySelector() é a maneira de obter uma referência a um elemento dentro do DOM
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

// Função jump
const jump = () => {
  mario.classList.add("jump"); // Adiciona a classe 'jump' ao mario, que ativa a animação de pulo CSS

  // Define um temporizador para remover a classe 'jump' depois de 500ms
  // Mario volta pra posição incial e a animação é reativada
  setTimeout(() => {
    mario.classList.remove("jump"); // se não tivesse esse trecho o mario so pularia uma unica vez
  }, 500);
};

// Loop do jogo e colisão
// cria o loop que executa uma função a cada 10ms
const loop = setInterval(() => {
  // obter a posição horizintal do cano em relação a borda esquerda do quadro do jogo
  const pipePosition = pipe.offsetLeft;
  // ober a posição vertical do mario em relação a borda inferior
  // o "+window.getComputedStyle(...)" converte string (15px e.g) em numero (15 e.g)
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");


// checagem pra descobrir se houve colisão entre o mario e o cano
// pipePosition <= 120 é pra saber se o cano ta perto do mario
// pipePosition > 0 o cano ainda esta visivel na tela (dentro do game-container)
// marioPosition < 90px o mario não pulou o suficiente/ não passou da altura do cano
// && pq se tds esssas condiçoes forem verdadeiras teve colisão
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 90) {
    pipe.style.animation = "none"; // para a animação
    pipe.style.left = `${pipePosition}px`; // fixa a posição no local da colisão

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`; // fixa a posição do mario no local da colisão

    mario.src = "imagens/gameOver.png"; // altera a imagem pra game over
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clearInterval(loop);
  }
}, 10);

// gatilho para o pulo
document.addEventListener("keydown", jump);

// Botão reset - Nova partida
const novoJogoBotao = document.getElementById("novoJogoBotao");

// Função pra reiniciar a pag
const resetPag = () => {
  window.location.reload();
};

// Chamada do botão nova partida
novoJogoBotao.addEventListener("click", resetPag);

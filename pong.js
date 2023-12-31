let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//Variaveis do oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

function setup() {
  createCanvas(600, 400);
}

//Desenho em tela
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  moveRaquete();
  //colisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);

  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);

  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);

  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();

  //Função para mostrar a bolinha
  function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
  }

  //Função para movimentar a bolinha
  function movimentaBolinha() {
    xBolinha += velocidadexBolinha;
    yBolinha += velocidadeyBolinha;
  }

  //Função para verificar a colisão com a borda
  function verificaColisao() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
      velocidadexBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
      velocidadeyBolinha *= -1;
    }
  }
}

//Função para criar a raquete
function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function moveRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function colisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velocidadexBolinha *= -1;
  }
}

function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );

  if (colidiu) {
    velocidadexBolinha *= -1;
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23;
  }
}

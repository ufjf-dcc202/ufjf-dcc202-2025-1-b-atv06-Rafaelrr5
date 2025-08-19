const TABULEIRO_INICIAL = [
    [0, 0, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [0, 0, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0]
];

let tabuleiro = [];
let posicaoSelecionada = null;
export function inicializarJogo() {
    tabuleiro = TABULEIRO_INICIAL.map(linha => [...linha]);
    posicaoSelecionada = null;
}

export function getTabuleiro() {
    return tabuleiro.map(linha => [...linha]);
}

export function getPosicaoSelecionada() {
    return posicaoSelecionada;
}

export function posicaoValida(linha, coluna) {
    return linha >= 0 && linha < 7 && 
           coluna >= 0 && coluna < 7 && 
           tabuleiro[linha][coluna] !== 0;
}

export function temPeca(linha, coluna) {
    return posicaoValida(linha, coluna) && tabuleiro[linha][coluna] === 2;
}

export function posicaoVazia(linha, coluna) {
    return posicaoValida(linha, coluna) && tabuleiro[linha][coluna] === 1;
}

export function contarPecas() {
    let contador = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (temPeca(i, j)) {
                contador++;
            }
        }
    }
    return contador;
}

inicializarJogo();

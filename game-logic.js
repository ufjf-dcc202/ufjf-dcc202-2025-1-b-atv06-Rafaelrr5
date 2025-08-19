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

export function selecionarPosicao(linha, coluna) {
    if (!temPeca(linha, coluna)) {
        return false;
    }
    
    posicaoSelecionada = { linha, coluna };
    return true;
}

export function desselecionarPosicao() {
    posicaoSelecionada = null;
}

export function movimentoValido(linhaDestino, colunaDestino) {
    if (!posicaoSelecionada) return false;
    if (!posicaoVazia(linhaDestino, colunaDestino)) return false;
    
    const { linha: linhaOrigem, coluna: colunaOrigem } = posicaoSelecionada;
    
    const deltaLinha = linhaDestino - linhaOrigem;
    const deltaColuna = colunaDestino - colunaOrigem;
    
    const movimentoHorizontal = deltaLinha === 0 && Math.abs(deltaColuna) === 2;
    const movimentoVertical = deltaColuna === 0 && Math.abs(deltaLinha) === 2;
    
    if (!movimentoHorizontal && !movimentoVertical) return false;
    
    const linhaMeio = linhaOrigem + deltaLinha / 2;
    const colunaMeio = colunaOrigem + deltaColuna / 2;
    
    return temPeca(linhaMeio, colunaMeio);
}

export function executarMovimento(linhaDestino, colunaDestino) {
    if (!movimentoValido(linhaDestino, colunaDestino)) {
        return false;
    }
    
    const { linha: linhaOrigem, coluna: colunaOrigem } = posicaoSelecionada;
    const deltaLinha = linhaDestino - linhaOrigem;
    const deltaColuna = colunaDestino - colunaOrigem;
    const linhaMeio = linhaOrigem + deltaLinha / 2;
    const colunaMeio = colunaOrigem + deltaColuna / 2;
    
    tabuleiro[linhaOrigem][colunaOrigem] = 1;
    tabuleiro[linhaMeio][colunaMeio] = 1;
    tabuleiro[linhaDestino][colunaDestino] = 2;
    
    posicaoSelecionada = null;
    return true;
}

export function temMovimentosPossiveis() {
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (temPeca(i, j)) {
                const movimentos = [
                    [i - 2, j],
                    [i + 2, j],
                    [i, j - 2],
                    [i, j + 2]
                ];
                
                for (const [linha, coluna] of movimentos) {
                    posicaoSelecionada = { linha: i, coluna: j };
                    if (movimentoValido(linha, coluna)) {
                        posicaoSelecionada = null;
                        return true;
                    }
                }
            }
        }
    }
    posicaoSelecionada = null;
    return false;
}

export function jogoVencido() {
    return contarPecas() === 1;
}

export function jogoTerminado() {
    return jogoVencido() || !temMovimentosPossiveis();
}

inicializarJogo();

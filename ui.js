import * as GameLogic from './game-logic.js';

const tabuleiro = document.getElementById('tabuleiro');
const contadorPecas = document.getElementById('contador-pecas');
const statusJogo = document.getElementById('status');

export function inicializarInterface() {
    criarTabuleiro();
    atualizarInterface();
}

function criarTabuleiro() {
    tabuleiro.innerHTML = '';
    const tabuleiroData = GameLogic.getTabuleiro();
    
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            const posicao = document.createElement('div');
            posicao.className = 'posicao';
            posicao.dataset.linha = i;
            posicao.dataset.coluna = j;
            
            if (tabuleiroData[i][j] === 0) {
                posicao.classList.add('invalida');
            } else {
                posicao.classList.add('valida');
                if (tabuleiroData[i][j] === 2) {
                    posicao.classList.add('com-peca');
                }
                posicao.addEventListener('click', handleClick);
            }
            
            tabuleiro.appendChild(posicao);
        }
    }
}

function handleClick(event) {
    const linha = parseInt(event.target.dataset.linha);
    const coluna = parseInt(event.target.dataset.coluna);
    const posicaoSelecionada = GameLogic.getPosicaoSelecionada();
    
    if (!posicaoSelecionada) {
        if (GameLogic.selecionarPosicao(linha, coluna)) {
            atualizarInterface();
        }
    } else {
        if (posicaoSelecionada.linha === linha && posicaoSelecionada.coluna === coluna) {
            GameLogic.desselecionarPosicao();
            atualizarInterface();
        } else if (GameLogic.executarMovimento(linha, coluna)) {
            atualizarInterface();
            verificarFimDeJogo();
        } else if (GameLogic.selecionarPosicao(linha, coluna)) {
            atualizarInterface();
        }
    }
}

function atualizarInterface() {
    const tabuleiroData = GameLogic.getTabuleiro();
    const posicaoSelecionada = GameLogic.getPosicaoSelecionada();
    const posicoes = tabuleiro.children;
    
    for (let i = 0; i < posicoes.length; i++) {
        const posicao = posicoes[i];
        const linha = parseInt(posicao.dataset.linha);
        const coluna = parseInt(posicao.dataset.coluna);
        
        posicao.classList.remove('com-peca', 'selecionada', 'movimento-possivel');
        
        if (tabuleiroData[linha][coluna] === 2) {
            posicao.classList.add('com-peca');
        }
        
        if (posicaoSelecionada && 
            posicaoSelecionada.linha === linha && 
            posicaoSelecionada.coluna === coluna) {
            posicao.classList.add('selecionada');
        }
        
        if (posicaoSelecionada && GameLogic.movimentoValido(linha, coluna)) {
            posicao.classList.add('movimento-possivel');
        }
    }
    
    contadorPecas.textContent = GameLogic.contarPecas();
    
    if (posicaoSelecionada) {
        statusJogo.textContent = 'Escolha onde mover a peça';
    } else {
        statusJogo.textContent = 'Clique em uma peça para selecioná-la';
    }
}

function verificarFimDeJogo() {
    if (GameLogic.jogoVencido()) {
        statusJogo.textContent = 'Parabéns! Você venceu!';
        statusJogo.style.color = '#32CD32';
    } else if (GameLogic.jogoTerminado()) {
        statusJogo.textContent = 'Fim de jogo! Não há mais movimentos possíveis.';
        statusJogo.style.color = '#FF6B6B';
    }
}
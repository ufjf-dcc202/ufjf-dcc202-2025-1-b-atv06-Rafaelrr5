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

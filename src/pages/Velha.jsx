import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SideButtons from './components/SideButtons';

import 'react-toastify/dist/ReactToastify.css';
import './styles/Velha.css';

export default function Velha() {
  const [turno, setTurno] = useState('X');
  const [mesa, setMesa] = useState(Array(9).fill(null)); // Array inicializado com 9 posições nulas
  const [ganhador, setGanhador] = useState(null);

  useEffect(() => {
    if (ganhador) {
      toast(`🎉 O jogador ${ganhador} ganhou! 🎉`);
    }
  }, [ganhador]);

  function marcarCasa(index) {
    if (mesa[index] === null && !ganhador) {
      const novaMesa = [...mesa]; // Cópia do array para imutabilidade
      novaMesa[index] = turno;
      setMesa(novaMesa);

      if (verificarVencedor(novaMesa, turno)) {
        setGanhador(turno);
      } else {
        setTurno(turno === 'X' ? 'O' : 'X');
      }
    }
  }

  function verificarVencedor(mesa, turno) {
    const combinacoesVencedoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return combinacoesVencedoras.some(combinacao =>
      combinacao.every(index => mesa[index] === turno)
    );
  }

  function resetarJogo() {
    setMesa(Array(9).fill(null)); // Reinicia o tabuleiro com 9 posições nulas
    setTurno('X');
    setGanhador(null);
  }

  return (
    <div className='Velha'>
      <SideButtons click={resetarJogo} turno={turno} jogando={'Resetar'} 
        titulo="Jogo da velha"
        comoJogar='Dois jogadores se revezam para marcar "X" ou "O" em uma grade de 3x3, 
        tentando alinhar três de seus símbolos em linha reta (horizontal, vertical ou diagonal). 
        O jogo termina quando um jogador vence ou todas as células são preenchidas, resultando em empate.'/>

      <div className="jogoBox">
        <div className="jogo">
          {mesa.map((casa, index) => (
            <div
              key={index}
              className={`casa c${index + 1} ${casa}`}
              onClick={() => marcarCasa(index)}
            >
              {casa}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SideButtons from './components/SideButtons';

import 'react-toastify/dist/ReactToastify.css';
import './styles/Velha.css';

export default function Velha() {
  const [turno, setTurno] = useState('X');
  const [mesa, setMesa] = useState([null, null, null, null, null, null, null, null, null]);
  const [ganhador, setGanhador] = useState(null);

  useEffect(() => {
    if (ganhador) {
      toast(`🎉 O jogador ${ganhador} ganhou! 🎉`);
    }
  }, [ganhador]);

  function marcarCasa(casa) {
    if (mesa[casa] == null && !ganhador) {  // Verificar se a casa está vazia e se não há vencedor
      const novaMesa = [...mesa];  // Criar uma cópia do array
      novaMesa[casa] = turno;  // Atualizar a casa com o turno atual
      setMesa(novaMesa);  // Atualizar o estado

      if (verificarVencedor(novaMesa, turno)) {
        setGanhador(turno);
      } else {
        setTurno(turno === 'X' ? 'O' : 'X');  // Alternar o turno
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
    setMesa([null, null, null, null, null, null, null, null, null]);
    setTurno('X');
    setGanhador(null);
  }

  return (
    <div className='Velha'>
      <SideButtons click={resetarJogo} turno={turno} jogando={'Resetar'}/>

      <div className="jogoBox">
        <div className="jogo">
          <div className="casa c1" onClick={() => marcarCasa(0)}>{mesa[0]}</div>
          <div className="casa c2" onClick={() => marcarCasa(1)}>{mesa[1]}</div>
          <div className="casa c3" onClick={() => marcarCasa(2)}>{mesa[2]}</div>
          <div className="casa c4" onClick={() => marcarCasa(3)}>{mesa[3]}</div>
          <div className="casa c5" onClick={() => marcarCasa(4)}>{mesa[4]}</div>
          <div className="casa c6" onClick={() => marcarCasa(5)}>{mesa[5]}</div>
          <div className="casa c7" onClick={() => marcarCasa(6)}>{mesa[6]}</div>
          <div className="casa c8" onClick={() => marcarCasa(7)}>{mesa[7]}</div>
          <div className="casa c9" onClick={() => marcarCasa(8)}>{mesa[8]}</div>
        </div>
      </div>
    </div>
  );
}

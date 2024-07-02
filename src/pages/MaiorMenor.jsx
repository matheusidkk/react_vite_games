import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import SideButtons from './components/SideButtons';
import CardFlip from './components/CardFlip';

import 'react-toastify/dist/ReactToastify.css';
import './styles/MaiorMenor.css';

export default function MaiorMenor() {
  const [turno, setTurno] = useState(1);
  const [ganhador, setGanhador] = useState(null);
  const [numeroAtual, setNumeroAtual] = useState(Math.floor(Math.random() * 10));
  const [numeroNovo, setNumeroNovo] = useState(null);
  const [virada, setVirada] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    if (ganhador) {
      const mensagem = ganhador === 'player' ? '🎉 Você ganhou, Próxima rodada! 🎉' : '❌ Você perdeu! ❌';
      toast(mensagem);

      // Redefinir o estado ganhador após a mensagem ser exibida
      const timer = setTimeout(() => setGanhador(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [ganhador]);

  const resetarJogo = () => {
    setTurno(1);
    setGanhador(null);
    setNumeroAtual(Math.floor(Math.random() * 10));
    setNumeroNovo(null);
    setVirada(false);
    setBloqueado(false);
  };

  const handleEscolha = (escolha) => {
    if (bloqueado || ganhador === 'perdeu') return;

    let novoNumero;
    do {
      novoNumero = Math.floor(Math.random() * 10);
    } while (novoNumero === numeroAtual);

    setNumeroNovo(novoNumero);
    setVirada(true);
    setBloqueado(true);

    setTimeout(() => {
      const acertou = (escolha === 'maior' && novoNumero > numeroAtual) || (escolha === 'menor' && novoNumero < numeroAtual);
      if (acertou) {
        setTurno(turno + 1);
        setNumeroAtual(novoNumero);
        setNumeroNovo(null);
        setVirada(false);
        setBloqueado(false);
        setGanhador('player');
      } else {
        setGanhador('perdeu');
      }
    }, 1000);
  };

  return (
    <div className='MaiorMenor'>
      <SideButtons click={resetarJogo} turno={turno} jogando='Resetar'
        titulo="Maior menor"
        comoJogar='O objetivo do jogo é adivinhar se a próxima carta virada será maior ou menor que a carta atual.
        O jogador faz sua aposta (maior ou menor) e a próxima carta é revelada. Se a previsão estiver correta, 
        o jogador ganha um ponto. Se estiver errada, o jogo termina. Continue jogando e acumulando pontos 
        enquanto suas previsões estiverem corretas!'/>

      <div className="jogoBox">
        <div className="jogo">
          <div className="casa maior" onClick={() => handleEscolha('maior')} aria-label="Escolher maior">
            <IoIosArrowUp />
          </div>
          <CardFlip numero1={numeroAtual} numero2={numeroNovo} virada={virada} />
          <div className="casa menor" onClick={() => handleEscolha('menor')} aria-label="Escolher menor">
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
}

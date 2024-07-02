import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

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
      if (ganhador === 'player') {
        toast('Você ganhou! Próximo turno.');
      } else if (ganhador === 'perdeu') {
        toast('Você perdeu!');
      }
      // Redefinir o estado ganhador após a mensagem ser exibida
      setTimeout(() => setGanhador(null), 2000);
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
        setGanhador('player'); // Definir ganhador como 'player'
      } else {
        setGanhador('perdeu');
      }
    }, 1000); // 2 segundos de bloqueio
  };

  return (
    <div className='MaiorMenor'>
      <SideButtons click={resetarJogo} turno={turno} jogando={'Resetar'} />

      <div className="jogoBox">
        <div className="jogo">
          <div className="casa maior" onClick={() => handleEscolha('maior')}>
            {<IoIosArrowUp/>}
          </div>
          <CardFlip numero1={numeroAtual} numero2={numeroNovo} virada={virada} />
          <div className="casa menor" onClick={() => handleEscolha('menor')}>
            {<IoIosArrowDown/>}
          </div>
        </div>
      </div>
    </div>
  );
}

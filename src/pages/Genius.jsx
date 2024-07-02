import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import SideButtons from './components/SideButtons';

import 'react-toastify/dist/ReactToastify.css';
import './styles/Genius.css';

export default function Genius() {
  const [turno, setTurno] = useState(1);
  const [sequencia, setSequencia] = useState([]);
  const [sequenciaJogador, setSequenciaJogador] = useState([]);
  const [jogando, setJogando] = useState(false);
  const [clicavel, setClicavel] = useState(false);

  useEffect(() => {
    if (jogando) {
      novaSequencia();
    }
  }, [jogando]);

  useEffect(() => {
    if (sequenciaJogador.length && sequenciaJogador.length === sequencia.length) {
      checarSequencia();
    }
  }, [sequenciaJogador]);

  function novaSequencia() {
    const novaCasa = Math.floor(Math.random() * 9);
    setSequencia([...sequencia, novaCasa]);
    setSequenciaJogador([]);
    setTurno(sequencia.length + 1);
    exibirSequencia([...sequencia, novaCasa]);
  }

  function exibirSequencia(seq) {
    setClicavel(false); // Desativa cliques
    seq.forEach((casa, index) => {
      setTimeout(() => {
        document.querySelector(`.c${casa + 1}`).classList.add('active');
        setTimeout(() => {
          document.querySelector(`.c${casa + 1}`).classList.remove('active');
          if (index === seq.length - 1) {
            setClicavel(true); // Reativa cliques após a sequência terminar
          }
        }, 500);
      }, (index + 1) * 700);
    });
  }

  function checarSequencia() {
    const corretos = sequenciaJogador.every((num, index) => num === sequencia[index]);
    if (corretos) {
      toast('✅ Correto! Próxima rodada! ✅');
      setTimeout(() => novaSequencia(), 500);
    } else {
      toast('❌ Errado! Tente novamente! ❌');
      setJogando(false);
    }
  }

  function casaClicada(i) {
    if (jogando && clicavel) {
      setSequenciaJogador([...sequenciaJogador, i]);
      document.querySelector(`.c${i + 1}`).classList.add('active');
      setTimeout(() => {
        document.querySelector(`.c${i + 1}`).classList.remove('active');
      }, 500);
    }
  }

  function resetarJogo() {
    setSequencia([]);
    setSequenciaJogador([]);
    setTurno(1);
    setJogando(!jogando);
  }

  return (
    <div className='Genius'>
      <SideButtons click={resetarJogo} turno={turno} jogando={jogando ? 'Resetar' : 'Iniciar'}/>

      <div className="jogoBox">
        <div className="jogo">
          <div className="casa c1" onClick={() => casaClicada(0)}></div>
          <div className="casa c2" onClick={() => casaClicada(1)}></div>
          <div className="casa c3" onClick={() => casaClicada(2)}></div>
          <div className="casa c4" onClick={() => casaClicada(3)}></div>
          <div className="casa c5" onClick={() => casaClicada(4)}></div>
          <div className="casa c6" onClick={() => casaClicada(5)}></div>
          <div className="casa c7" onClick={() => casaClicada(6)}></div>
          <div className="casa c8" onClick={() => casaClicada(7)}></div>
          <div className="casa c9" onClick={() => casaClicada(8)}></div>
        </div>
      </div>
    </div>
  );
}

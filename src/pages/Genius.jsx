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
        ativarCasa(casa);
        setTimeout(() => {
          ativarCasa(casa, false);
          if (index === seq.length - 1) {
            setClicavel(true); // Reativa cliques após a sequência terminar
          }
        }, 500);
      }, (index + 1) * 700);
    });
  }

  function ativarCasa(casa, ativar = true) {
    const casaElement = document.querySelector(`.casa.c${casa + 1}`);
    if (casaElement) {
      if (ativar) {
        casaElement.classList.add('active');
      } else {
        casaElement.classList.remove('active');
      }
    }
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
      ativarCasa(i);
      setTimeout(() => {
        ativarCasa(i, false);
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
      <SideButtons click={resetarJogo} turno={turno} jogando={jogando ? 'Resetar' : 'Iniciar'}
        titulo="Genius"
        comoJogar='O Jogo Genius testa sua memória e concentração. 
        O jogo começa com o dispositivo acendendo uma sequência de luzes coloridas. 
        Seu objetivo é repetir a sequência correta pressionando as cores na mesma ordem. 
        A cada rodada, a sequência fica mais longa e difícil. O jogo termina quando você errar a sequência. 
        Tente memorizar e repetir o máximo de sequências possível!'/>

      <div className="jogoBox">
        <div className="jogo">
          {[...Array(9)].map((_, index) => (
            <div key={index} className={`casa c${index + 1}`} onClick={() => casaClicada(index)}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

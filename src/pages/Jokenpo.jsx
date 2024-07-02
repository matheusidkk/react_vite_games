import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SideButtons from './components/SideButtons';
import CardJKP from './components/CardJKP';

import 'react-toastify/dist/ReactToastify.css';
import './styles/Jokenpo.css';

export default function Jokenpo() {
  const [turno, setTurno] = useState(1);
  const [ganhador, setGanhador] = useState(null);
  const [bounceClass, setBounceClass] = useState('');
  const [canPlay, setCanPlay] = useState(true);

  const cards = {
    pedra: 'https://images.emojiterra.com/google/android-12l/512px/1faa8.png',
    papel: 'https://images.emojiterra.com/google/android-pie/512px/1f9fb.png',
    tesoura: 'https://images.emojiterra.com/mozilla/512px/2702.png'
  };

  const [playerCard, setPlayerCard] = useState(null);
  const [inimigoCard, setInimigoCard] = useState(null);

  useEffect(() => {
    if (ganhador) {
      toast(`🎉 O ${ganhador} ganhou! 🎉`);
    }
  }, [ganhador]);

  useEffect(() => {
    if (ganhador === 'jogador') {
      setTurno(turno + 1);
    } else if (ganhador === 'inimigo') {
      setTurno(1);
    }
  }, [ganhador]);

  function resetarJogo() {
    setTurno(1);
    setPlayerCard(null);
    setInimigoCard(null);
    setGanhador(null);
    setBounceClass('');
    setCanPlay(true);
  }

  function jogar(card) {
    if (!canPlay) {
      return;
    }

    setCanPlay(false);
    setPlayerCard(card);

    const inimigoCard = escolherCartaInimigo();
    setInimigoCard(inimigoCard);

    const resultado = determinarVencedor(card, inimigoCard);
    setGanhador(resultado);

    triggerBounce();

    setTimeout(() => {
      setCanPlay(true);
    }, 2500);
  }

  function escolherCartaInimigo() {
    const escolhas = Object.values(cards);
    const escolhaAleatoria = escolhas[Math.floor(Math.random() * escolhas.length)];
    return escolhaAleatoria;
  }

  function determinarVencedor(player, inimigo) {
    if (player === inimigo) {
      return 'ninguém (empate)';
    }

    const regras = {
      [cards.pedra]: cards.tesoura,
      [cards.papel]: cards.pedra,
      [cards.tesoura]: cards.papel,
    };

    return regras[player] === inimigo ? 'jogador' : 'inimigo';
  }

  function triggerBounce() {
    setBounceClass('bounce');
    setTimeout(() => setBounceClass(''), 500);
  }

  return (
    <div className='Jokenpo'>
      <SideButtons click={resetarJogo} turno={turno} jogando={'Resetar'} />

      <div className="jogoBox">
        <div className="jogo">
          <div className={`player ${bounceClass}`}>
            <img src={playerCard || cards.pedra} alt="Imagem da resposta do player" />
          </div>
          <div className='traco'></div>
          <div className={`inimigo ${bounceClass}`}>
            <img src={inimigoCard || cards.pedra} alt="Imagem da resposta do inimigo" />
          </div>
        </div>
      </div>
      <div className="cards">
        <span />
        <CardJKP imagem={cards.pedra} onClick={() => jogar(cards.pedra)} />
        <span />
        <CardJKP imagem={cards.papel} onClick={() => jogar(cards.papel)} />
        <span />
        <CardJKP imagem={cards.tesoura} onClick={() => jogar(cards.tesoura)} />
      </div>
    </div>
  );
}

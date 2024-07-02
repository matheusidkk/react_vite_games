import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Adivinhacao.css';

export default function Adivinhacao() {
  const [turno, setTurno] = useState(1);
  const [jogando, setJogando] = useState(false);

  const copo1 = useRef(null);
  const copo2 = useRef(null);
  const copo3 = useRef(null);

  let shuffleInterval;

  // Efeito para iniciar ou parar o embaralhamento contínuo
  useEffect(() => {
    if (jogando) {
      iniciarTrocaContinua();
    } else {
      pararTrocaContinua();
    }
  }, [jogando]);

  function resetarJogo() {
    if (jogando) {
      setJogando(false);
      // lógica para resetar o jogo se necessário
    } else {
      setTurno(1);
      setJogando(true);
    }
  }

  function iniciarTrocaContinua() {
    shuffleInterval = setInterval(() => {
      embaralharCasas();
    }, 1000); // Intervalo de 1 segundo (1000 milissegundos) entre cada troca
  }

  function pararTrocaContinua() {
    clearInterval(shuffleInterval);
  }

  function embaralharCasas() {
    const casas = [copo1.current, copo2.current, copo3.current];

    // Embaralhar array de casas
    for (let i = casas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = casas[i];
      casas[i] = casas[j];
      casas[j] = temp;
    }

    // Animação de transição
    casas.forEach((casa, index) => {
      casa.style.transition = 'transform 0.5s ease-in-out';
      casa.style.transform = `translateX(${index === 0 ? 0 : index === 1 ? -100 : 100}%)`;
    });

    // Reinicia as posições após a animação
    setTimeout(() => {
      casas.forEach((casa, index) => {
        casa.style.transition = '';
        casa.parentNode.appendChild(casa); // Move para o final do pai
        casa.style.transform = '';
      });
    }, 500);
  }

  return (
    <div className='Adivinhacao'>
      <div className="botoes">
        <button onClick={resetarJogo}>{jogando ? 'Parar' : 'Iniciar'}</button>
        <div className="turno">
          <h3>Turno</h3>
          <div>{turno}</div>
        </div>
      </div>

      <div className="jogo">
        <div className="casa c1" ref={copo1}>
          <div className="bloco"></div>
          <div className="bola"></div>
        </div>
        <div className="casa c2" ref={copo2}>
          <div className="bloco"></div>
        </div>
        <div className="casa c3" ref={copo3}>
          <div className="bloco"></div>
        </div>
      </div>
    </div>
  );
}

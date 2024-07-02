import React from 'react';
import './styles/Sobre.css';

export default function Sobre() {
  return (
    <div className='Sobre'>
      <a href="https://github.com/matheusidkk" aria-label="GitHub">
        <button className='btn github'></button>
      </a>
      <a href="https://www.linkedin.com/in/joao-matheus-de-mello-duarte/" aria-label="LinkedIn">
        <button className='btn linkedin'></button>
      </a>
    </div>
  );
}

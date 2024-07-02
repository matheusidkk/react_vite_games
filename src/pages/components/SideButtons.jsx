import React, { useState } from 'react'

import './styles/SideButtons.css'

export default function SideButtons(props) {

  const [mostrarComoJogar, setMostrarComoJogar] = useState(false)

  return (
    <div className="SideButtons">
    <button className='resetBtn' onClick={_ => props.click()}>{props.jogando}</button>
    <div className="turno">
      <h3>Turno</h3>
      <div>{props.turno}</div>
    </div>
    <button className="info" onClick={() => setMostrarComoJogar(true)}>?</button>
    <div className="comoJogar" style={{display: mostrarComoJogar ? 'flex' : 'none'}}>
      <button className="fechar" onClick={() => setMostrarComoJogar(false)}>X</button>
      <div className="texto">
        <h3 className="titulo">{props.titulo}</h3>
        <div className="tutorial">
          {props.comoJogar}
        </div>
      </div>
    </div>
  </div>
  )
}

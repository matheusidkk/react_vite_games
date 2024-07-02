import React from 'react'

import './styles/SideButtons.css'

export default function SideButtons(props) {
  return (
    <div className="SideButtons">
    <button onClick={_ => props.click()}>{props.jogando}</button>
    <div className="turno">
      <h3>Turno</h3>
      <div>{props.turno}</div>
    </div>
  </div>
  )
}

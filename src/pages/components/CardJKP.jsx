import React from 'react'

import './styles/CardJKP.css'

export default function CardJKP(props) {
  return (
    <div className='CardJKP' onClick={props.onClick}>
        <img src={props.imagem}/>
    </div>
  )
}

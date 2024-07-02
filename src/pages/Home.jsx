import React from 'react'
import { Link } from 'react-router-dom'

import './styles/Home.css'

export default function Home() {
  return (
    <div className='Home'>
            <Link to="/memoria" className='memoria'>Memória</Link>
            <Link to="/velha" className='velha'>Jogo da Velha</Link>
            <Link to="/genius" className='genius'>Genius</Link>
            <Link to="/jokenpo" className='jokenpo'>Jo-ken-po</Link>
            <Link to="/maiormenor" className='maiorMenor'>Maior/Menor</Link>
    </div>
  )
}

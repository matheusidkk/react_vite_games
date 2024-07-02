import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from "react-icons/fa"
import { FiAlignJustify } from "react-icons/fi";

import './components.css'

export default function Menu() {

  const [menuAberto, setMenuAberto] = useState(false)
  const [menuEspaco, setMenuEspaco] = useState('0')
  const [mobile, setMobile] = useState(window.innerWidth < 500)

  const linkLocation = useLocation()

  function abrirMenu() {
    setMenuAberto(!menuAberto)
  }

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 500)
    }

    window.addEventListener('resize', handleResize)

    // Verifica o estado inicial ao montar o componente
    handleResize()

    // Remove o listener de redimensionamento quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (mobile) {
      // Seu código para mobile
      setMenuEspaco(menuAberto ? '0' : '-100vw')
    } else {
      // Seu código para desktop
      setMenuEspaco(menuAberto ? '0' : '-200px')
    }
  }, [menuAberto, mobile])

  return (
    <aside className='Menu' style={{marginLeft: menuEspaco}}>
      <button className='openMenu' onClick={abrirMenu}><FiAlignJustify/></button>
      <Link className={linkLocation.pathname === '/' ? 'atual' : 'outro'} to="/"><FaHome/></Link>
      <Link className={linkLocation.pathname === '/memoria' ? 'atual' : 'outro'} to="/memoria">Memória</Link>
      <Link className={linkLocation.pathname === '/velha' ? 'atual' : 'outro'} to="/velha">Jogo da Velha</Link>
      <Link className={linkLocation.pathname === '/genius' ? 'atual' : 'outro'} to="/genius">Genius</Link>
      <Link className={linkLocation.pathname === '/jokenpo' ? 'atual' : 'outro'} to="/jokenpo">Jo-ken-po</Link>
      <Link className={linkLocation.pathname === '/maiormenor' ? 'atual' : 'outro'} to="/maiormenor">Maior ou menor</Link>
      <Link className={linkLocation.pathname === '/sobre' ? 'atual' : 'outro'} to="/sobre">Sobre</Link>
      </aside>
  )
}

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Memoria from '../pages/Memoria'
import Velha from '../pages/Velha'
import Genius from '../pages/Genius'
import Jokenpo from '../pages/Jokenpo'
import MaiorMenor from '../pages/MaiorMenor'
import Sobre from '../pages/Sobre'

import './components.css'

export default function Content() {
  return (
    <main className='Content'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/memoria" element={<Memoria/>}/>
          <Route path="/velha" element={<Velha/>}/>
          <Route path="/genius" element={<Genius/>}/>
          <Route path="/jokenpo" element={<Jokenpo/>}/>
          <Route path="/maiormenor" element={<MaiorMenor/>}/>
          <Route path="/sobre" element={<Sobre/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
    </main>
  )
}

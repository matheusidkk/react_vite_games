import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SideButtons from './components/SideButtons';
import Card from './components/Card';

import 'react-toastify/dist/ReactToastify.css';
import './styles/Memoria.css';

export default function Memoria() {
  const cartasIniciais = [
    { id: 1, imagem: "https://i.pinimg.com/originals/4b/6f/0f/4b6f0f786d32460c3eb9b9f1c68dcf69.png", combinada: false },
    { id: 2, imagem: "https://i.pinimg.com/originals/4b/6f/0f/4b6f0f786d32460c3eb9b9f1c68dcf69.png", combinada: false },
    { id: 3, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FD0yxrb8d53sJnL7h-upMuBJ_Qbc0x0OGw&s", combinada: false },
    { id: 4, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0FD0yxrb8d53sJnL7h-upMuBJ_Qbc0x0OGw&s", combinada: false },
    { id: 5, imagem: "https://www.imagenspng.com.br/wp-content/uploads/2022/11/emoji-png-0002.png", combinada: false },
    { id: 6, imagem: "https://www.imagenspng.com.br/wp-content/uploads/2022/11/emoji-png-0002.png", combinada: false },
    { id: 7, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSHULDfQtM5k9VPEmj-jClcGU_0-VxyIekg&s", combinada: false },
    { id: 8, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFSHULDfQtM5k9VPEmj-jClcGU_0-VxyIekg&s", combinada: false },
    { id: 9, imagem: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Smirk_face_large.png?v=1571606093", combinada: false },
    { id: 10, imagem: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Smirk_face_large.png?v=1571606093", combinada: false },
    { id: 11, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEAWdU7ON-r8VaTrQGPqh49H7KMH8L_um0gA&s", combinada: false },
    { id: 12, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEAWdU7ON-r8VaTrQGPqh49H7KMH8L_um0gA&s", combinada: false },
    { id: 13, imagem: "https://images.vexels.com/content/134645/preview/laugh-tongue-emoji-emoticon-13cea9.png", combinada: false },
    { id: 14, imagem: "https://images.vexels.com/content/134645/preview/laugh-tongue-emoji-emoticon-13cea9.png", combinada: false },
    { id: 15, imagem: "https://em-content.zobj.net/source/facebook/355/partying-face_1f973.png", combinada: false },
    { id: 16, imagem: "https://em-content.zobj.net/source/facebook/355/partying-face_1f973.png", combinada: false },
    { id: 17, imagem: "https://symbl-world.akamaized.net/i/webp/c2/5f0199530ac59c1bcca216cf4453dd.webp", combinada: false },
    { id: 18, imagem: "https://symbl-world.akamaized.net/i/webp/c2/5f0199530ac59c1bcca216cf4453dd.webp", combinada: false },
    { id: 19, imagem: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Poop_Emoji.png", combinada: false },
    { id: 20, imagem: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Poop_Emoji.png", combinada: false },
    { id: 21, imagem: "https://www.pngitem.com/pimgs/m/18-183502_facebook-angry-emoji-png-angry-emoji-transparent-png.png", combinada: false },
    { id: 22, imagem: "https://www.pngitem.com/pimgs/m/18-183502_facebook-angry-emoji-png-angry-emoji-transparent-png.png", combinada: false },
    { id: 23, imagem: "https://emojiisland.com/cdn/shop/products/Flushed_Emoji_Icon_5e6ce936-4add-472b-96ba-9082998adcf7_grande.png?v=1571606089", combinada: false },
    { id: 24, imagem: "https://emojiisland.com/cdn/shop/products/Flushed_Emoji_Icon_5e6ce936-4add-472b-96ba-9082998adcf7_grande.png?v=1571606089", combinada: false },
  ];

  const [cartas, setCartas] = useState(embaralharCartas(cartasIniciais));
  const [cartasViradas, setCartasViradas] = useState([]);
  const [paresCombinados, setParesCombinados] = useState(0);
  const [turno, setTurno] = useState(1)

  function embaralharCartas(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (cartasViradas.length === 2) {
      const [primeiraCarta, segundaCarta] = cartasViradas;
      if (primeiraCarta.imagem === segundaCarta.imagem) {
        setCartas(prevCartas =>
          prevCartas.map(carta =>
            carta.imagem === primeiraCarta.imagem ? { ...carta, combinada: true } : carta
          )
        );
        setParesCombinados(prev => prev + 1);
      }
      setTimeout(() => setCartasViradas([]), 1000);
      
      setTurno(turno + 1)
    }
  }, [cartasViradas]);

  useEffect(() => {
    if (paresCombinados === cartasIniciais.length / 2) {
      toast(`🎉 Você ganhou!!! 🎉`);
    }
  }, [paresCombinados, cartasIniciais.length]);

  const CliqueNaCarta = (carta) => {
    if (cartasViradas.length < 2 && !carta.combinada && !cartasViradas.includes(carta)) {
      setCartasViradas([...cartasViradas, carta]);
    }
  };

  return (
    <div className='Memoria'>
      <SideButtons click={() => (setCartas(embaralharCartas(cartasIniciais)), setTurno(1))} turno={turno} jogando={'Resetar'}/>

      <div className="jogo">
        <div className="cards">
          {cartas.map(carta => (
            <Card
              key={carta.id}
              imagem={carta.imagem}
              virada={cartasViradas.includes(carta) || carta.combinada}
              onClick={() => CliqueNaCarta(carta)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

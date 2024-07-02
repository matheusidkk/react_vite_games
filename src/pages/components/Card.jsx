import React, { useEffect, useState } from 'react';
import './styles/Card.css';

export default function Card({ imagem, virada, onClick }) {
  const [isFlipped, setIsFlipped] = useState(virada);

  useEffect(() => {
    setIsFlipped(virada);
  }, [virada]);

  const handleCardClick = () => {
    if (!isFlipped) {
      onClick();
    }
  };

  return (
    <div value={imagem} className={`CardContainer ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className='Card'>
        <div className="flipper">
          <div className="frente">
            <img src="https://wallpapers.com/images/featured/emoji-mzkra61b5lyofv9z.jpg" alt="Frente" />
          </div>
          <div className="tras">
            <img src={imagem} alt="Verso" />
          </div>
        </div>
      </div>
    </div>
  );
}

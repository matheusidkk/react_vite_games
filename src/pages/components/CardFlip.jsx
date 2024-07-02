import React, { useEffect, useState } from 'react';
import './styles/CardFlip.css';

export default function CardFlip(props) {
  const { numero1, numero2, virada } = props;
  const [isFlipped, setIsFlipped] = useState(virada);

  useEffect(() => {
    setIsFlipped(virada);
  }, [virada]);

  return (
    <div className={`CardFlipContainer ${isFlipped ? 'flipped' : ''}`}>
      <div className='CardFlip'>
        <div className="flipper">
          <div className="frente">
            {props.numero1}
          </div>
          <div className="tras">
            {props.numero2}
          </div>
        </div>
      </div>
    </div>
  );
}

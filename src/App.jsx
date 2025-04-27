import React, { useState, useRef } from 'react';
import './styles.css';

function App() {
  const [emojis, setEmojis] = useState([]);
  const [clicked, setClicked] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    // Trigger click animation
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // remove class after animation

    // Emoji launch logic
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newEmojis = Array.from({ length: 5 }).map(() => ({
      id: Date.now() + Math.random(),
      x: centerX,
      y: centerY,
      arcX: Math.random() * 200 - 100,
      arcY: Math.random() * 150 + 150,
    }));

    setEmojis((prev) => [...prev, ...newEmojis]);

    setTimeout(() => {
      setEmojis((prev) =>
        prev.filter((e) => !newEmojis.find((ne) => ne.id === e.id))
      );
    }, 2000);
  };

  return (
    <div className="container">
      <button
        ref={buttonRef}
        className={`rainbow-button ${clicked ? 'clicked' : ''}`}
        onClick={handleClick}
      >
        КО ПРОЧИТА ПЕДЕР
      </button>

      {emojis.map((emoji) => (
        <span
          key={emoji.id}
          className="floating-emoji"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
            '--arc-x': `${emoji.arcX}px`,
            '--arc-y': `${emoji.arcY}px`,
          }}
        >
          🌈
        </span>
      ))}
    </div>
  );
}

export default App;

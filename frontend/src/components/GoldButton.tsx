import React from 'react';

interface GoldButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function GoldButton({
  text,
  onClick,
  type = 'button',
  fullWidth = true,
  disabled = false,
  style,
}: GoldButtonProps) {
  const letters = text.split('');

  return (
    <button
      type={type}
      className={`uiverse-gold-btn ${fullWidth ? 'full-width' : ''}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <div className="outline"></div>
      <div className="state state--default">
        <p>
          {letters.map((char, index) => (
            <span
              key={index}
              style={{ '--i': index } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>
    </button>
  );
}

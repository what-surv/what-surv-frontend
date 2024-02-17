import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} type='button' className={className}>
      {children}
    </button>
  );
};

export default Button;

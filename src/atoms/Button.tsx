import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  type: 'submit' | 'button' | 'reset';
}

const Button = ({ children, type, onClick, className }: ButtonProps) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;

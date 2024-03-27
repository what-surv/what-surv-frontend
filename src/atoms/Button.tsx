import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}

const Button = ({
  children,
  type,
  onClick,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

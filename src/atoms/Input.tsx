import React, { forwardRef } from 'react';

interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  // tailwind 사용하기 위해 이름을 className으로 할당
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      defaultValue,
      label,
      type,
      className,
      onChange,
      placeholder,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <input
        id={id}
        name={name}
        aria-label={label}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...props}
        ref={ref}
        onChange={onChange}
        className={className}
      />
    );
  }
);

export default Input;

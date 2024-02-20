import { forwardRef } from 'react';

interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  // tailwind 사용하기 위해 이름을 className으로 할당
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, type, className, placeholder, ...props }: InputProps,
    ref
  ) => {
    return (
      <input
        id={id}
        name={name}
        aria-label={label}
        type={type}
        placeholder={placeholder}
        {...props}
        ref={ref}
        className={className}
      />
    );
  }
);

export default Input;

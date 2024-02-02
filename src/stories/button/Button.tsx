import { cva, VariantProps } from 'class-variance-authority';
import { ReactHTMLElement } from 'react';

const ButtonVariants = cva(
  `
  flex justify-center items-center gap-8 h-12
  `,
  {
    variants: {
      size: {
        default: 'py-3 px-6 bg-gray-200',
        small: 'px-5 py-2 bg-orange-100',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface ButtonProps
  extends ReactHTMLElement<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

/**
 * Primary UI component for user interaction
 */
// eslint-disable-next-line import/prefer-default-export
export const Button = ({ size, ...props }: ButtonProps) => {
  return (
    <button type='button' className={ButtonVariants({ size, ...props })}>
      로그인
    </button>
  );
};

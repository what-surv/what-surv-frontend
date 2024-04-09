import { cva } from 'class-variance-authority';
import React from 'react';

const TyphographyVariants = cva(``, {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      xl2: 'text-2xl',
    },
    weight: {
      Regular: 'font-normal',
      Medium: 'font-medium',
      Semibold: 'font-semibold',
      Bold: 'font-bold',
    },
    lineheight: {
      18: 'leading-[18px]',
      22: 'leading-[22px]',
      26: 'leading-[26px]',
      28: 'leading-[28px]',
      30: 'leading-[30px]',
      32: 'leading-[32px]',
      34: 'leading-[34px]',
      36: 'leading-[36px]',
      44: 'leading-[44px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface TypographyProps {
  text: string | React.ReactNode;
  /**
   * 타이포그래피 크기 값
   */
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xl2';
  /**
   * 타이포그래피 폰트 두께 값
   */
  weight: 'Regular' | 'Medium' | 'Semibold' | 'Bold';

  /** 타이포그래피 행간 값 */
  lineheight?: 18 | 22 | 26 | 28 | 30 | 32 | 34 | 36 | 44;

  /** tailwind 사용하기 위해 이름을 className으로 할당 */
  className?: string;
}

/**
 * 타이포그래피 컴포넌트
 */

const Typography = ({
  size,
  text,
  weight,
  lineheight,
  className,
  ...props
}: TypographyProps) => {
  return (
    <span
      className={`${TyphographyVariants({ size, weight, lineheight, ...props })} ${className}`}
    >
      {text}
    </span>
  );
};

export default Typography;

import { cva } from 'class-variance-authority';
import React from 'react';

const TyphographyVariants = cva(``, {
  variants: {
    size: {
      default: 'text-2xl',
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
  },
  defaultVariants: {
    size: 'default',
  },
});

interface TypographyProps {
  text: string | React.ReactNode;
  /**
   * Typography Size
   */
  size: 'default' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xl2';
  /**
   * Typography weights
   */
  weight: 'Regular' | 'Medium' | 'Semibold' | 'Bold';
  // /**
  //  * Typography Size
  //  */
  // size?: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 32;
  // /**
  //  * Typography Scale Category
  //  */
  // scale?: 'Xsmall' | 'Small' | 'Medium' | 'Large' | 'Xlarge' | 'Xxlarge';
  // /**
  //  * Typography weights
  //  */
  // weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  // /**
  //  * Typography Typeface
  //  */
  // typeface: 'pretendard';
  // /**
  //  * leading value
  //  */
  // lineheight: 18 | 22 | 26 | 28 | 30 | 32 | 34 | 36 | 44;
}

/**
 * Primary UI component for user interaction
 */

const Typography = ({ size, text, weight, ...props }: TypographyProps) => {
  return (
    <span className={TyphographyVariants({ size, weight, ...props })}>
      {text}
    </span>
  );
};

export default Typography;

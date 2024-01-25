import { cva, VariantProps } from 'class-variance-authority';
import { ReactHTMLElement } from 'react';

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

interface TypographyProps
  extends ReactHTMLElement<HTMLSpanElement>,
    VariantProps<typeof TyphographyVariants> {
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
// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-unused-vars
const Typography = ({ size, weight, ...props }: TypographyProps) => {
  return (
    <span className={TyphographyVariants({ size, weight, ...props })}>
      리서치 참여자 모집이 힘든 당신을 위해. 왓썹 what surv
    </span>
  );
};

export default Typography;

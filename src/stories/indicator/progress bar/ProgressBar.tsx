import { cva } from 'class-variance-authority';

const ProgressBarVariants = cva(
  `
  relative h-3 rounded-[400px] bg-[#e5e7ed]
  `,
  {
    variants: {
      size: {
        desktop: 'max-w-[546px] w-full',
        mobile: 'max-w-[342px] w-full',
      },
      percent: {
        percent: (value: number) => `w-[${value}%]`,
      },
    },
  }
);

interface ProgressBarProps {
  /** progress 퍼센트 */
  percent: number;
  /** 각 단말기별 크기 확인용 */
  size: 'mobile' | 'desktop';
}

/** 로그인 페이지에서 사용하는 Progress Bar 컴포넌트 */

export const ProgressBar = ({ percent, size }: ProgressBarProps) => {
  return (
    <div className={`${ProgressBarVariants({ size })} `}>
      <div className='relative'>
        <div
          className={`absolute h-3 ${
            percent === 100 ? `bg-[#0051FF]` : `bg-[#3283ff]`
          } rounded-[400px] transition-all duration-300 ease-in`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

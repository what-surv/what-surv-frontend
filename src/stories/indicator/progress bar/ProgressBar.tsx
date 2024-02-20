import { cva } from 'class-variance-authority';

const ProgressBarVariants = cva(
  `
  relative h-3 rounded-[400px] bg-[#e5e7ed]
  `,
  {
    variants: {
      environment: {
        desktop: 'w-[546px]',
        mobile: 'w-[342px]',
      },
      percent: {
        percent: (value: number) => `w-[${value}%]`,
      },
    },
  }
);

interface ProgressBarProps {
  percent: number;
  environment: 'mobile' | 'desktop';
}

export const ProgressBar = ({ percent, environment }: ProgressBarProps) => {
  return (
    <div className={`${ProgressBarVariants({ environment })} `}>
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

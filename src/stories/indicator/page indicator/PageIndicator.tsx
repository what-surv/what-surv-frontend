import { cva } from 'class-variance-authority';

const PageIndicatorVariants = cva(
  `
  flex items-start gap-2
  `,
  {
    variants: {
      environment: {
        desktop: 'py-3',
        mobile: 'py-2',
      },
      percent: {
        percent: (value: number) => `w-[${value}%]`,
      },
    },
  }
);

interface PageProps {
  isActivate: boolean;
  pageNumber: number;
}

interface PageIndicatorProps {
  environment: 'mobile' | 'desktop';
  page: PageProps[];
}

export const PageIndicator = ({ page, environment }: PageIndicatorProps) => {
  return (
    <div className={`${PageIndicatorVariants({ environment })} `}>
      {page.map((IndicatorState: PageProps) => (
        <div key={IndicatorState.pageNumber}>
          <button
            type='button'
            aria-label='button'
            className={`relative ${environment === 'mobile' ? `w-[30px] h-1` : `w-10 h-1.5`} rounded-[400px]
            ${IndicatorState.isActivate ? `bg-[#0051FF]` : `bg-[#D7DBE2]`}`}
          />
        </div>
      ))}
    </div>
  );
};

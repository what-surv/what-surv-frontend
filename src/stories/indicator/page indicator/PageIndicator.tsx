import { cva } from 'class-variance-authority';

const PageIndicatorVariants = cva(
  `
  flex items-start gap-2
  `,
  {
    variants: {
      size: {
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
  /** 각 단말기별 크기 확인용 */
  size?: 'mobile' | 'desktop';
  /** 활성화 여부 및 페이지 번호값이 담겨있는 배열 */
  page: PageProps[];
}

/** 메인 페이지에서 사용하는 Page Indicator  컴포넌트 */
export const PageIndicator = ({ page, size }: PageIndicatorProps) => {
  return (
    <div className={`${PageIndicatorVariants({ size })} `}>
      {page.map((IndicatorState: PageProps) => (
        <div key={IndicatorState.pageNumber}>
          <button
            type='button'
            aria-label='button'
            className={`relative ${size === 'mobile' ? `w-[30px] h-1` : `w-10 h-1.5`} rounded-[400px]
            ${IndicatorState.isActivate ? `bg-[#0051FF]` : `bg-[#D7DBE2]`}`}
          />
        </div>
      ))}
    </div>
  );
};

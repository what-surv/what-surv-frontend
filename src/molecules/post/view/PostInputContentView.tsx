/* eslint-disable jsx-a11y/click-events-have-key-events */
import Typography from '../../../stories/typography/Typography';

interface PostInputContentProps {
  title: string;
  content: string;
  isLink?: boolean;
}

const PostInputContentView = ({
  content,
  title,
  isLink,
}: PostInputContentProps) => {
  // content가 URL이면 해당 URL로 이동하는 함수
  const handleClick = () => {
    window.open(`https://${content}`, '_blank');
  };

  return (
    <div className='flex w-full lg:min-w-[450px] md:max-w-[375px] flex-col items-start gap-1.5 md:gap-2'>
      <Typography size='base' weight='Regular' text={title} />

      <div
        className={`${isLink ? 'cursor-pointer' : 'cursor-default'} text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#818490] bg-[#FAFAFA]`}
        onClick={() => (isLink ? handleClick() : undefined)}
        role='button'
        tabIndex={0}
        aria-label='link'
      >
        <Typography
          text={content}
          weight='Semibold'
          size='sm'
          lineheight={22}
          className='text-[#545760]'
        />
      </div>
    </div>
  );
};

export default PostInputContentView;

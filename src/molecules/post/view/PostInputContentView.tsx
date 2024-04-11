import Typography from '../../../stories/typography/Typography';

interface PostInputContentProps {
  title: string;
  content: string;
}

const PostInputContentView = ({ content, title }: PostInputContentProps) => {
  return (
    <div className='flex w-full lg:min-w-[450px] md:max-w-[375px] flex-col items-start gap-1.5 md:gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#818490] bg-[#FAFAFA]'>
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

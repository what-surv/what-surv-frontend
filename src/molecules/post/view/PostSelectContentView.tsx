import Typography from '../../../stories/typography/Typography';

interface PostSelectContentViewProps {
  value?: string[];
  title: string;
}

const PostSelectContentView = ({
  value,
  title,
}: PostSelectContentViewProps) => {
  console.log(value);
  return (
    <div className='flex min-w-[149px] max-w-[485px] flex-col items-start w-[45%] gap-1.5 md:gap-2'>
      <Typography
        size='base'
        weight='Regular'
        text={title}
        className='min-w-[30px]'
      />
      <div className='flex flex-wrap items-start content-start self-stretch gap-2'>
        {value?.map((items: string, idx: number) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className='flex items-center gap-2 px-3 py-1 border border-[#818490] bg-[#FAFAFA] rounded-[400px]'
          >
            <Typography
              size='sm'
              weight='Semibold'
              text={items}
              lineheight={22}
              className='text-[#545760]'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSelectContentView;

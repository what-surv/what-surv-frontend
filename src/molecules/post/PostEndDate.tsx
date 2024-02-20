import SelectDate from '../../atoms/post/SelectDate';
import Typography from '../../stories/typography/Typography';

interface PostEndDateProps {
  title: string;
}

const PostEndDate = ({ title }: PostEndDateProps) => {
  return (
    <div className='flex flex-col items-start w-[149px] md:w-[375px] gap-1.5 md:gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <SelectDate />
    </div>
  );
};

export default PostEndDate;

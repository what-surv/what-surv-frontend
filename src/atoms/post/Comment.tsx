import Typography from '../../stories/typography/Typography';

const Comment = ({ content }: { content: string }) => {
  return (
    <div className='flex flex-col rounded-lg items-start justify-center gap-4 py-5 px-7 bg-[#E5EEFF]'>
      <Typography
        text={content}
        size='base'
        weight='Semibold'
        lineheight={26}
        className='text-[#242424]'
      />
    </div>
  );
};
export default Comment;

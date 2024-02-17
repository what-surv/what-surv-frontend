import { Dropdown } from '../../stories/dropdown/Dropdown';
import Typography from '../../stories/typography/Typography';

interface PostSelectDropdownProps {
  title: string;
}

const PostSelectDropdown = ({ title }: PostSelectDropdownProps) => {
  return (
    <div className='flex flex-col items-start w-[375px] gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <Dropdown
        isArrow
        size='default'
        state='default'
        value={['최신순', '인기순', '직종순']}
        isClose={false}
      >
        전체
      </Dropdown>
    </div>
  );
};

export default PostSelectDropdown;

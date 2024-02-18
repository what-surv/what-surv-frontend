import { Dropdown } from '../../stories/dropdown/Dropdown';
import Typography from '../../stories/typography/Typography';

interface PostSelectDropdownProps {
  title: string;
  options: string[];
  onDropdownChange?: (selectedOptions: string) => void;
  defaultValue: string;
  value: string[];
}

const PostSelectDropdown = ({
  title,
  options,
  onDropdownChange,
  defaultValue,
  value,
}: PostSelectDropdownProps) => {
  const handleDropdownChange = (selectedOptions: string) => {
    if (onDropdownChange) {
      onDropdownChange(selectedOptions);
    }
  };
  return (
    <div className='flex flex-col items-start w-[375px] gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <Dropdown
        isArrow
        size='default'
        state='default'
        menu={options}
        value={value}
        isClose={false}
        defaultValue={defaultValue}
        onDropdownChange={handleDropdownChange}
      />
    </div>
  );
};

export default PostSelectDropdown;

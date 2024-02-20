import { Dropdown } from '../../stories/dropdown/Dropdown';
import Typography from '../../stories/typography/Typography';

interface arrOptionProps {
  key: string;
  label: string;
}

interface PostSelectDropdownProps {
  title: string;
  options: arrOptionProps[];
  onDropdownChange?: (selectedOptions: string) => void;
  defaultValue: string;
  value: string[] | string;
  oneSelect: boolean;
}

const PostSelectDropdown = ({
  oneSelect,
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
    <div className='flex flex-col items-start w-[149px] md:w-[375px] gap-1.5 md:gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <Dropdown
        isArrow
        size='default'
        state='default'
        menu={options}
        value={value}
        defaultValue={defaultValue}
        oneSelect={oneSelect}
        onDropdownChange={handleDropdownChange}
      />
    </div>
  );
};

export default PostSelectDropdown;

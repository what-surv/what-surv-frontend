import { Dropdown } from '../../../stories/dropdown/Dropdown';
import Typography from '../../../stories/typography/Typography';

interface arrOptionProps {
  key: string;
  label: string;
}

interface PostSelectDropdownProps {
  title: string;
  options: arrOptionProps[];
  onDropdownChange?: (selectedOptions: string) => void;
  toggleDropdownValue?: (selectedOptions: string[]) => void;
  defaultValue: string;
  value: string[] | string;
  oneSelect: boolean;
}

const PostSelectDropdown = ({
  oneSelect,
  title,
  options,
  onDropdownChange,
  toggleDropdownValue,
  value,
  defaultValue,
}: PostSelectDropdownProps) => {
  const handleDropdownChange = (selectedOptions: string) => {
    if (onDropdownChange) {
      onDropdownChange(selectedOptions);
    }
  };

  return (
    <div className='flex min-w-[149px] max-w-[485px] flex-wrap flex-col items-start w-[45%] gap-1.5 md:gap-2'>
      <Typography
        size='base'
        weight='Regular'
        text={title}
        className='min-w-[30px]'
      />
      <Dropdown
        isArrow
        state='default'
        menu={options}
        value={value}
        defaultValue={defaultValue}
        oneSelect={oneSelect}
        onDropdownChange={handleDropdownChange}
        toggleDropdownValue={toggleDropdownValue}
      />
    </div>
  );
};

export default PostSelectDropdown;

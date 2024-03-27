import close from '../../../stories/assets/close-circle.svg';
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

  const handleCloseClick = (option: string) => {
    if (Array.isArray(value)) {
      const updatedValue = value.filter((item: string) => item !== option);

      if (updatedValue !== undefined && toggleDropdownValue) {
        toggleDropdownValue(updatedValue);
      }
    }
  };

  return (
    <div className='grid grid-col-2 items-start w-[45%] gap-1.5 md:gap-2'>
      <Typography
        size='base'
        weight='Regular'
        text={title}
        className='min-w-[30px]'
      />
      <div className='flex gap-1.5'>
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
        <div className='flex flex-wrap w-[calc(100%_-_170px)] overflow-x-auto'>
          {!oneSelect && (
            <div className='flex gap-1.5'>
              {Array.isArray(value) &&
                value.map((DropdownSelectValue: string) => (
                  <div
                    className='flex bg-[#FAFAFA] h-9 md:px-3 py-1 pl-3 pr-2 items-center rounded-[400px] gap-2
      border border-[#0051FF] text-sm font-semibold leading-[22px] text-[#393B41] whitespace-nowrap min-w-[80px]'
                    key={DropdownSelectValue}
                  >
                    {options.find(
                      (option) => option.key === DropdownSelectValue
                    )?.label || DropdownSelectValue}
                    <button
                      className='flex w-full focus:outline-none'
                      type='button'
                      onClick={() => handleCloseClick(DropdownSelectValue)}
                    >
                      <img src={close} alt='close' />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSelectDropdown;

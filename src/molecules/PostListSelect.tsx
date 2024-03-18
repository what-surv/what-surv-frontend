import React from 'react';

import Button from '../atoms/Button';
import Typography from '../stories/typography/Typography';

import { Link } from 'react-router-dom';

interface ButtonInfo {
  label: string;
  url: string;
  key: string;
}

interface PostListSelectProps {
  buttonValues: ButtonInfo[];
  isEdit?: boolean;
  showIsEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostListSelect = ({
  buttonValues,
  isEdit,
  showIsEdit,
  setIsEdit,
}: PostListSelectProps) => {
  const handleEditButtonClick = () => {
    if (setIsEdit) {
      setIsEdit((prevState) => !prevState);
    }
  };

  return (
    <div className='flex justify-between mb-8'>
      <div className='flex gap-6'>
        {buttonValues.map((button) => (
          <Link to={button.url} key={button.key}>
            <Button
              className='relative w-full flex h-[52px] items-center justify-center px-2.5 text-[#545760]'
              type='button'
            >
              <Typography text={button.label} size='lg' weight='Semibold' />

              <Typography
                className='absolute w-full h-0.5 left-0 bottom-0 bg-[#242424] transition-all duration-200 ease-in'
                text=''
                size='lg'
                weight='Semibold'
              />
            </Button>
          </Link>
        ))}
      </div>
      {showIsEdit ? (
        <div className='flex items-center'>
          <Button type='button' onClick={handleEditButtonClick}>
            <Typography
              size='lg'
              text={isEdit ? '취소' : '편집'}
              weight='Regular'
            />
          </Button>
        </div>
      ) : (
        ``
      )}
    </div>
  );
};

export default PostListSelect;

import React from 'react';

import Input from '../../atoms/Input';
import Typography from '../../stories/typography/Typography';

import { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface Inputs {
  title: string;
  link: string;
  time: string;
}

interface PostInputContentProps {
  register: UseFormRegister<Inputs>;
  name: 'link' | 'time';
  id: string;
  title: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  helperClassName?: string;
  errorClassName?: string;
  inputRightComponent?: React.ReactNode;
  setValue: (value: string) => void;
}

const PostInputContent = ({
  title,
  register,
  setValue,
  name,
  ...props
}: PostInputContentProps) => {
  //  input값 실시간 변화 하는 값 받아오기  위한 changeEvent
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className='flex w-[375px] flex-col items-start gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
        <Input
          type='text'
          {...(register && {
            ...register(name, { required: true, maxLength: 100 }),
            onChange: handleChange,
          })}
          {...props}
          className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
        />
      </div>
    </div>
  );
};

export default PostInputContent;

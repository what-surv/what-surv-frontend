import React from 'react';

import Input from '../../atoms/Input';
import Typography from '../../stories/typography/Typography';

import { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface FormInputs {
  link: string;
  time: string;
}

interface PostInputContentProps {
  register: UseFormRegister<FormInputs>;
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
}

const PostInputContent = ({
  title,
  register,
  name,
  ...props
}: PostInputContentProps) => {
  return (
    <div className='flex w-[375px] flex-col items-start gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
        <Input
          type='text'
          {...(register && { ...register(name, props.validation) })}
          {...props}
          className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
        />
      </div>
    </div>
  );
};

export default PostInputContent;

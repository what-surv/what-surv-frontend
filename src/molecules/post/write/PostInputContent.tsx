import React from 'react';

import Input from '../../../atoms/Input';
import Typography from '../../../stories/typography/Typography';

import {
  // UseFormRegister,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

interface PostInputContentProps {
  // register: UseFormRegister<Inputs>;
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
  value?: string;
  isLink?: boolean;
  setValue: (value: string) => void;
}

interface FormInputs {
  title: string;
  link: string;
  time: string;
}

const PostInputContent = ({
  title,
  setValue,
  name,
  isLink,
  ...props
}: PostInputContentProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();
  //  input값 실시간 변화 하는 값 받아오기  위한 changeEvent
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className='flex w-full full:min-w-[450px] md:max-w-[375px] flex-col items-start gap-1.5 md:gap-2'>
      <Typography size='base' weight='Regular' text={title} />
      <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
        <Input
          type='text'
          {...props}
          {...register(name, {
            required: '값을 입력해주세요.',
            pattern: isLink
              ? {
                  value:
                    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/,
                  message: '유효한 URL 형식이 아닙니다.',
                }
              : undefined,
            maxLength: {
              value: 50,
              message: '내용을 50자 이내로 입력해주세요.',
            },
            onChange: handleChange,
          })}
          className='w-full flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
        />
      </div>
      {isLink ? (
        <span className='relative flex'>{errors.link?.message}</span>
      ) : (
        ``
      )}
    </div>
  );
};

export default PostInputContent;

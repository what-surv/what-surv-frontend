import React, { useState } from 'react';

import check from '../../assets/check.svg';
import leftArrow from '../../assets/left_arrow.svg';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import EditorBox from '../../organisms/post/EditorBox';
// eslint-disable-next-line import/no-cycle
import PostSelectContent from '../../organisms/post/PostSelectContent';
import { WritePageStore } from '../../store/store';
import { Header } from '../../stories/header/Header';
import { SubHeader } from '../../stories/subheader/SubHeader';
import Typography from '../../stories/typography/Typography';

import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  title: string;
  link: string;
  time: string;
  content: string;
}

const PostWritePage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [titleValue, setTitleValue] = useState('');

  const {
    ageArray,
    gender,
    researchType,
    link,
    time,
    title,
    setTitle,
    setLink,
    setTime,
    progressMethodValue,
  } = WritePageStore();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLink(data.link);
    setTime(data.time);
    setTitle(data.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  console.log(
    ageArray,
    title,
    gender,
    researchType,
    progressMethodValue,
    link,
    time
  );

  return (
    <div className='w-full pb-[200px]'>
      <div className='header'>
        <Header size='default' isLogo isSearch isAccount />
        <SubHeader size='default' />
      </div>

      <div className='flex justify-center w-full content-layout'>
        <div className='flex w-[814px] min-w-[342px] max-w-[1034px] p-0 flex-col items-start gap-8 mt-14'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-8'
          >
            <img src={leftArrow} alt='왼쪽 화살표' className='w-4 h-5' />
            <div className='flex flex-col items-start w-full gap-3'>
              <Typography
                size='xl'
                weight='Regular'
                text='제목을 입력해주세요.'
              />
              <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
                <Input
                  type='text'
                  placeholder='리서치 내용을 한 줄로 요약해보세요!'
                  className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
                  {...(register && {
                    ...register('title', { required: true, maxLength: 100 }),
                    onChange: handleTitleChange,
                  })}
                />
                <Typography
                  size='sm'
                  text={`${titleValue.length}/100`}
                  weight='Regular'
                />
              </div>
            </div>
            <PostSelectContent register={register} />
            <EditorBox />
            <div className='flex justify-end w-full'>
              <Button
                type='submit'
                className='bg-[#0051FF] inline-flex justify-center text-white py-3 px-6 items-center gap-2 rounded-[400px] w-[314px]'
              >
                등록하기
                <img src={check} alt='체크 이미지' />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostWritePage;

import React, { useState, useEffect } from 'react';

import check from '../../assets/check.svg';
import leftArrow from '../../assets/left_arrow.svg';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import EditorBox from '../../organisms/post/EditorBox';
import PostSelectContent from '../../organisms/post/PostSelectContent';
import { WritePageStore } from '../../store/store';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { useForm } from 'react-hook-form';

interface Inputs {
  title: string;
  link: string;
  time: string;
}

const PostWritePage = () => {
  const { register } = useForm<Inputs>();
  const [disableButton, setDisableButton] = useState(true);

  const {
    age,
    gender,
    researchType,
    link,
    time,
    content,
    title,
    procedure,
    enddate,
    setTitle,
  } = WritePageStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // 버튼 disable 여부 확인용 useEffect
  useEffect(() => {
    if (
      !age ||
      !gender ||
      !researchType ||
      !link ||
      !time ||
      !content ||
      !title ||
      !procedure ||
      !enddate
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    age,
    gender,
    researchType,
    link,
    time,
    content,
    title,
    procedure,
    enddate,
  ]);

  const formDataToJson = () => {
    const jsonData = JSON.stringify({
      age,
      title,
      content,
      gender,
      researchType,
      procedure,
      link,
      enddate,
      time,
    });
    console.log(jsonData);
  };
  // max-w-[1280px]:w-[814px]

  return (
    <div className='w-full bg-[#FAFAFA] flex-col pb-[100px] md:pb-[200px]'>
      <Appbar isLogo isSearch isAccount />
      <Tabbar />
      <div className='flex justify-center max-w-[1034px] w-full m-auto min-w-[342px] bg-[#FAFAFA]'>
        <div className='content-layout  flex w-full justify-center flex-col items-start gap-8 mt-[30px] md:mt-14 bg-[#FAFAFA]'>
          <img
            src={leftArrow}
            alt='left arrow'
            className='hidden w-4 h-5 md:inline-block'
          />
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
                text={`${title.length}/100`}
                weight='Regular'
              />
            </div>
          </div>
          <PostSelectContent register={register} />
          <EditorBox />
          <div className='flex justify-end w-full'>
            <Button
              type='submit'
              className={`inline-flex justify-center text-white py-3 px-6 items-center gap-2 rounded-[400px] md:w-[314px] ${disableButton ? `bg-[#A6AAB2]` : `bg-[#0051FF]`}`}
              onClick={() => formDataToJson()}
              disabled={disableButton}
            >
              등록하기
              <img src={check} alt='체크 이미지' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWritePage;

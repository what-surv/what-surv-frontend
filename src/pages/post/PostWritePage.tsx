import React, { useState } from 'react';

import check from '../../assets/check.svg';
import leftArrow from '../../assets/left_arrow.svg';
import Button from '../../atoms/Button';
import EditorBox from '../../organisms/post/EditorBox';
import PostSelectContent from '../../organisms/post/PostSelectContent';
import { Header } from '../../stories/header/Header';
import { SubHeader } from '../../stories/subheader/SubHeader';
import Typography from '../../stories/typography/Typography';

import { useForm } from 'react-hook-form';

interface Inputs {
  title: string;
}

const PostWritePage = () => {
  const { register } = useForm<Inputs>();
  const [titleValue, settitleValue] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settitleValue(e.target.value);
  };

  return (
    <div className='w-full pb-[200px]'>
      <div className='header'>
        <Header size='default' isLogo isSearch isAccount />
        <SubHeader size='default' />
      </div>
      <div className='flex justify-center w-full content-layout'>
        <div className='flex w-[814px] min-w-[342px] max-w-[1034px] p-0 flex-col items-start gap-8 mt-14'>
          <img src={leftArrow} alt='왼쪽 화살표' />
          <div className='flex flex-col items-start w-full gap-3'>
            <Typography
              size='xl'
              weight='Regular'
              text='제목을 입력해주세요.'
            />
            <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
              <input
                type='text'
                placeholder='리서치 내용을 한 줄로 요약해보세요!'
                className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
                {...(register('title'), { required: true, maxLength: 100 })}
                value={titleValue}
                onChange={handleTitleChange}
              />
              <Typography
                size='sm'
                text={`${titleValue.length}/100`}
                weight='Regular'
              />
            </div>
          </div>
          <PostSelectContent />
          <EditorBox />
          <div className='flex justify-end w-full'>
            <Button className='bg-[#0051FF] inline-flex justify-center text-white py-3 px-6 items-center gap-2 rounded-[400px] w-[314px]'>
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

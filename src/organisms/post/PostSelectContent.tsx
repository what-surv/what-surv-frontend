import React from 'react';

import { genderArr, methodArr, typeArr, ageArr } from './DropdownValue';
import PostEndDate from '../../molecules/post/PostEndDate';
import PostInputContent from '../../molecules/post/PostInputContent';
import PostSelectDropdown from '../../molecules/post/PostSelectDropdown';
import { WritePageStore } from '../../store/store';

import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInputs {
  link: string;
  time: string;
}

const PostSelectContent = () => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);
  const {
    ageArray,
    genderArray,
    setResearchType,
    researchTypeArray,
    setGender,
    setAge,
  } = WritePageStore();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-wrap items-start content-start self-stretch gap-4 p-6 rounded-lg bg-[#E5E7ED]'>
        <PostEndDate title='마감일' />
        <PostSelectDropdown
          title='성별'
          options={genderArr}
          defaultValue='성별'
          value={genderArray}
          onDropdownChange={(selectGender: string) => setGender(selectGender)}
        />
        <PostSelectDropdown
          title='리서치 종류'
          options={typeArr}
          defaultValue='종류'
          value={researchTypeArray}
          onDropdownChange={(selectType: string) => setResearchType(selectType)}
        />
        <PostSelectDropdown
          title='연령'
          options={ageArr}
          onDropdownChange={(selectAge: string) => setAge(selectAge)}
          defaultValue='연령'
          value={ageArray}
        />
        <PostSelectDropdown
          title='진행 방식'
          options={methodArr}
          defaultValue='진행 방식'
          value={ageArray}
        />
        <PostInputContent
          id='research-link'
          label='researchLink'
          type='text'
          name='link'
          title='링크'
          placeholder='리서치 링크를 첨부해보세요!'
          register={register}
        />
        <PostInputContent
          id='time-taken'
          name='time'
          label='time'
          type='text'
          title='소요 시간'
          placeholder='설문 1분 이내, 인터뷰 30분 이내'
          register={register}
        />
      </div>
    </form>
  );
};

export default PostSelectContent;

import { genderArr, methodArr, typeArr, ageArr } from './DropdownValue';
import PostEndDate from '../../molecules/post/PostEndDate';
import PostInputContent from '../../molecules/post/PostInputContent';
import PostSelectDropdown from '../../molecules/post/PostSelectDropdown';
import { WritePageStore } from '../../store/store';

import { UseFormRegister } from 'react-hook-form';

interface FormInputs {
  title: string;
  link: string;
  time: string;
}

interface PostSelectContentProps {
  register: UseFormRegister<FormInputs>;
}

const PostSelectContent = ({ register }: PostSelectContentProps) => {
  const {
    age,
    gender,
    setResearchType,
    researchType,
    setTime,
    setGender,
    setLink,
    setAge,
    setprocedureArray,
    procedure,
  } = WritePageStore();

  return (
    <div className='flex flex-wrap items-start w-full m-auto md:w-full content-start self-stretch gap-3 md:gap-4 px-4 py-6 md:p-6 rounded-lg bg-[#E5E7ED]'>
      <PostEndDate title='마감일' />
      <PostSelectDropdown
        title='성별'
        options={genderArr}
        defaultValue='성별'
        value={gender}
        oneSelect
        onDropdownChange={(selectGender) => setGender(selectGender)}
      />
      <PostSelectDropdown
        title='리서치 종류'
        options={typeArr}
        defaultValue='종류'
        oneSelect
        value={researchType}
        onDropdownChange={(selectType) => setResearchType(selectType)}
      />
      <PostSelectDropdown
        title='연령'
        options={ageArr}
        onDropdownChange={(selectAge) => setAge(selectAge)}
        oneSelect={false}
        defaultValue='연령'
        value={age}
      />
      <PostSelectDropdown
        title='진행 방식'
        options={methodArr}
        oneSelect
        defaultValue='진행 방식'
        value={procedure}
        onDropdownChange={(selectMethod) => setprocedureArray(selectMethod)}
      />
      <PostInputContent
        id='research-link'
        label='researchLink'
        type='text'
        name='link'
        title='링크'
        placeholder='리서치 링크를 첨부해보세요!'
        register={register}
        setValue={setLink}
      />
      <PostInputContent
        id='time-taken'
        name='time'
        label='time'
        type='text'
        title='소요 시간'
        placeholder='설문 1분 이내, 인터뷰 30분 이내'
        register={register}
        setValue={setTime}
      />
    </div>
  );
};

export default PostSelectContent;

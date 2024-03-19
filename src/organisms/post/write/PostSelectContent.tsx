import { genderArr, methodArr, typeArr, ageArr } from './DropdownValue';
import PostEndDate from '../../../molecules/post/write/PostEndDate';
import PostInputContent from '../../../molecules/post/write/PostInputContent';
import PostSelectDropdown from '../../../molecules/post/write/PostSelectDropdown';
import { WritePageStore } from '../../../store/store';

import { useFormContext } from 'react-hook-form';

interface FormInputs {
  title: string;
  link: string;
  time: string;
}

// interface PostSelectContentProps {}

const PostSelectContent = () => {
  const {
    age,
    time,
    gender,
    researchType,
    link,
    procedure,
    setResearchType,
    setTime,
    setGender,
    setLink,
    setAge,
    setAges,
    setprocedureArray,
  } = WritePageStore();

  const { register } = useFormContext<FormInputs>();

  return (
    <div className='flex flex-wrap items-start w-full md:w-full content-start self-stretch gap-3 md:gap-4 px-4 py-6 md:p-6 rounded-lg bg-[#E5E7ED]'>
      <PostEndDate title='마감일' />
      <PostSelectDropdown
        title='성별'
        options={genderArr}
        defaultValue='성별'
        oneSelect
        value={[gender]}
        onDropdownChange={(selectGender) => setGender(selectGender)}
      />
      <PostSelectDropdown
        title='리서치 종류'
        options={typeArr}
        defaultValue='종류'
        value={[researchType]}
        oneSelect
        onDropdownChange={(selectType) => setResearchType(selectType)}
      />
      <PostSelectDropdown
        title='연령'
        options={ageArr}
        onDropdownChange={(selectAge) => setAge(selectAge)}
        toggleDropdownValue={(ageArray) => setAges(ageArray)}
        oneSelect={false}
        value={age}
        defaultValue='연령'
      />
      <PostSelectDropdown
        title='진행 방식'
        options={methodArr}
        oneSelect
        value={[procedure]}
        defaultValue='진행 방식'
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
        value={link}
      />
      <PostInputContent
        id='time-taken'
        name='time'
        label='time'
        type='text'
        title='소요시간'
        placeholder='설문 1분 이내, 인터뷰 30분 이내'
        register={register}
        setValue={setTime}
        value={time}
      />
    </div>
  );
};

export default PostSelectContent;

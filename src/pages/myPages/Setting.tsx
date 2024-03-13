import React, { useState } from 'react';

import userProfile from '../../assets/ic-user.svg';
import Input from '../../atoms/Input';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface Inputs {
  nickname: string;
  interest: string;
}

interface ButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Button = ({ label, isSelected, onClick }: ButtonProps) => (
  <button
    type='button'
    aria-label={label}
    className={`relative flex h-[52px] items-center justify-center px-[10px] ${isSelected ? 'text-[#242424]' : 'text-[#545760]'}`}
    onClick={onClick}
  >
    <Typography
      size='lg'
      text={label}
      weight={isSelected ? 'Semibold' : 'Regular'}
    />
    <span
      className={`absolute ${isSelected ? 'w-full' : 'w-0'}  h-[2px] left-0 bottom-0 bg-[#242424] transition-all duration-200 ease-in`}
    />
  </button>
);

const Setting = () => {
  const [nickname, setNickName] = useState('');
  const [selectedButton, setSelectedButton] = useState('관심');

  const { register } = useForm<Inputs>();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case 'nickname':
        setNickName(value);
        break;

      case 'interest':
        // setInterest(value);
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <Appbar
        isAccount
        isFullLogo
        isLogo
        isSearch
        onArrowClick={() => {}}
        size='full'
      />
      <Tabbar isMobileVisible size='default' />

      <div className='max-w-[506px] w-full mt-[50px] m-auto'>
        {/* 2dep Tab Style */}
        <div className='flex justify-between mb-8'>
          <div className='flex gap-6'>
            <Button
              label='관심 표시한 글'
              isSelected={selectedButton === '관심'}
              onClick={() => setSelectedButton('관심')}
            />
            <Button
              label='최근 조회 목록'
              isSelected={selectedButton === '조회'}
              onClick={() => setSelectedButton('조회')}
            />
            <Button
              label='내 모집 글'
              isSelected={selectedButton === '모집'}
              onClick={() => setSelectedButton('모집')}
            />
          </div>
          {/* 내 모집글 일때 On 시켜주세용 */}
          <div className='flex items-center'>
            <button type='button' aria-label='편집 | 취소'>
              <Typography size='lg' text='편집 | 취소' weight='Regular' />
            </button>
          </div>
        </div>

        {/* 프로필 및 닉네임 */}
        <div className='text-center mb-6'>
          <img
            src={userProfile}
            alt='유저 프로필 이미지'
            className='inline-block mb-[10px]'
          />
          <Typography
            text='김서치 님'
            size='xl'
            weight='Bold'
            className='block'
          />
        </div>
        {/* // 프로필 및 닉네임 */}

        {/* 유저 기본정보 */}
        <div className='flex gap-4 mb-9'>
          <dl>
            <dt>
              <Typography text='로그인 아이디' size='base' weight='Medium' />
            </dt>
            <dd className='mt-2 px-4 py-[6px] bg-[#E5E7ED] rounded-lg'>
              <Typography
                text='a01090762806@gamil.com'
                size='sm'
                weight='Semibold'
                className='text-[#545760]'
              />
            </dd>
          </dl>
          <dl>
            <dt>
              <Typography text='생일' size='base' weight='Medium' />
            </dt>
            <dd className='mt-2 px-4 py-[6px] bg-[#E5E7ED] rounded-lg'>
              <Typography
                text='001202'
                size='sm'
                weight='Semibold'
                className='text-[#545760]'
              />
            </dd>
          </dl>
          <dl>
            <dt>
              <Typography text='성별' size='base' weight='Medium' />
            </dt>
            <dd className='mt-2 px-4 py-[6px] bg-[#E5E7ED] rounded-lg'>
              <Typography
                text='남성'
                size='sm'
                weight='Semibold'
                className='text-[#545760]'
              />
            </dd>
          </dl>
        </div>
        {/* // 유저 기본정보 */}

        {/* 수정 인풋들 */}
        <div className='flex flex-col mb-9 gap-4'>
          <div className='flex flex-col items-start w-full gap-2'>
            <Typography
              size='base'
              weight='Medium'
              text='닉네임'
              className='text-[#242424]'
            />
            <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#808490] bg-[#FAFAFA]'>
              <Input
                type='text'
                placeholder='김서치'
                className='flex-1 bg-inherit text-base placeholder:text-[#545760] placeholder:font-semibold normal font-pretendard font-semibold outline-none leading-[26px]'
                id='nickname'
                {...register('nickname', {
                  required: '김서치.',
                  maxLength: {
                    value: 10,
                    message: '닉네임은 10글자 이하로 작성해 주세요.',
                  },
                  onChange: inputChangeHandler,
                })}
              />
              <Typography
                size='xs'
                text={`${nickname.length}/10`}
                weight='Regular'
                className='text-[#818490]'
              />
            </div>
          </div>

          <div className='flex w-full flex-col items-start gap-2'>
            <Typography
              size='base'
              weight='Medium'
              text='관심분야'
              className='text-[#242424]'
            />
            <div className='w-full text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#808490] bg-[#FAFAFA]'>
              <Input
                type='text'
                id='interest'
                placeholder='관심있는 분야 또는 도메인 등을 입력해보세요!'
                {...(register && {
                  ...register('interest', {
                    required: '이 값은 필수항목입니다.',
                    maxLength: {
                      value: 50,
                      message: '50자 이내로 입력해주세요.',
                    },
                  }),
                  onChange: inputChangeHandler,
                })}
                className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
              />
            </div>
          </div>
        </div>
        {/* // 수정 인풋들 */}

        <div className='flex flex-col gap-6'>
          <button
            type='button'
            className='flex w-full items-center justify-center h-12 bg-[#0051FF] rounded-[400px]'
            aria-label='저장하기'
          >
            <Typography
              text='저장하기'
              size='base'
              weight='Medium'
              className='text-[#FFFFFF]'
            />
          </button>
          <Link to='/' className='text-center text-[#808490]'>
            회원 탈퇴
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setting;

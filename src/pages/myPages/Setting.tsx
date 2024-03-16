import React, { useState } from 'react';

import { axiosBaseUrl } from '../../api/axiosConfig';
import { profileTypes } from '../../api/Posttypes';
import userProfile from '../../assets/ic-user.svg';
import Input from '../../atoms/Input';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { DevTool } from '@hookform/devtools';
import { useQuery } from '@tanstack/react-query';
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
  const { data: profile, isLoading } = useQuery<profileTypes>({
    queryKey: ['getProfile'],
    queryFn: () => axiosBaseUrl.get(`auth/profile`),
  });

  const [selectedButton, setSelectedButton] = useState('관심');
  const [nicknameLength, setNicknameLength] = useState<number>(
    profile?.data.nickname?.length ?? 0
  );

  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10); // Limit to 10 characters
    setValue('nickname', value); // Update the value in react-hook-form
    setNicknameLength(value.length);
  };

  if (isLoading) {
    return null;
  }
  return (
    <div>
      <Appbar isLogo isNotification isFullLogo />
      <Tabbar isMobileVisible />

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
        <div className='mb-6 text-center'>
          <img
            src={userProfile}
            alt='유저 프로필 이미지'
            className='inline-block mb-[10px]'
          />
          <Typography
            text={`${profile?.data.nickname} 님`}
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
                text={`${profile?.data.email}`}
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
        <form>
          <div className='flex flex-col gap-4 mb-9'>
            <div className='flex flex-col items-start w-full gap-2'>
              <Typography
                size='base'
                weight='Medium'
                text='닉네임'
                className='text-[#242424]'
              />
              <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#808490] bg-[#FAFAFA]'>
                <Input
                  placeholder='닉네임을 입력해주세요.'
                  className='flex-1 bg-inherit text-base placeholder:text-[#545760] placeholder:font-semibold normal font-pretendard font-semibold outline-none leading-[26px]'
                  {...register('nickname', {
                    required: '닉네임을 입력해주세요.',
                    pattern: {
                      value:
                        /^[a-zA-Z가-힣]*[ㄱ-ㅎㅏ-ㅣ]*[가-힣a-zA-Z]+[a-zA-Z가-힣]*$/,
                      message:
                        '닉네임은 한글 또는 영어만 사용 가능하며, 조합된 문자만 허용됩니다.',
                    },

                    onChange: handleNicknameChange,
                    maxLength: {
                      value: 10,
                      message: '닉네임은 10글자 이하로 작성해 주세요.',
                    },
                  })}
                />

                <Typography
                  size='xs'
                  text={`${nicknameLength}/10`}
                  weight='Regular'
                  className='text-[#818490]'
                />
              </div>
              {errors.nickname && <span>{errors.nickname.message}</span>}
            </div>
            <div className='flex flex-col items-start w-full gap-2'>
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
                  {...register('interest', {
                    required: '관심분야를 입력해주세요.',
                    maxLength: {
                      value: 50,
                      message: '50자 이내로 입력해주세요.',
                    },
                  })}
                  className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
                />
              </div>
              {errors.interest && <span>{errors.interest.message}</span>}
            </div>
          </div>
        </form>
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
      <DevTool control={control} />
    </div>
  );
};

export default Setting;

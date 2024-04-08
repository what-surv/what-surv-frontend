import React, { useState } from 'react';

import { postQuit } from '../../api/quit';
import { getUserInfoApi } from '../../api/userCheckApi';
import drawal from '../../assets/ic-withdrawal.svg';
import SelectsButton from '../../atoms/withdrawal/SelectsButton';
import WithdrawalModal from '../../organisms/WithdrawalModal';
import { Appbar } from '../../stories/appbar/Appbar';
import CheckBox from '../../stories/checkBox/CheckBox';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface OptionProps {
  id: number;
  label: string;
  details?: {
    id: number;
    label: string;
    selected: boolean;
  }[];
  selected: boolean;
}

const initOptions = [
  {
    id: 0,
    label: '이용하기 너무 불편해요.',
    details: [
      {
        id: 0,
        label: '게시글이 모여있는 메인페이지가 불편해요.',
        selected: false,
      },
      { id: 1, label: '게시글 조회 페이지가 불편해요.', selected: false },
      { id: 2, label: '게시글 작성하기 페이지가 불편해요.', selected: false },
      { id: 3, label: '마이페이지가 불편해요.', selected: false },
      { id: 4, label: '기능이 너무 적어요.', selected: false },
    ],
    selected: false,
  },
  { id: 1, label: '어떤 서비스인지 모르겠어요.', selected: false },
  { id: 2, label: '리워드가 너무 적어요.', selected: false },
  {
    id: 3,
    label: '잘 이용하지 않게 돼요.',
    details: [
      { id: 0, label: '저와 맞지 않는 서비스에요.', selected: false },
      { id: 1, label: '리서치 참여자가 잘 모이지 않아요.', selected: false },
      { id: 2, label: '기능이 너무 적어요.', selected: false },
    ],
    selected: false,
  },
  { id: 4, label: '계정을 새로 만들고 싶어요.', selected: false },
  { id: 5, label: '기타', selected: false },
];
const Withdrawal = () => {
  const [options, setOptions] = useState<OptionProps[]>(initOptions);
  const [checked, setChecked] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const maxReasonTextLength = 1000;

  const navigate = useNavigate();

  // textarea의 글자 수가 1000자를 넘지 않도록 제한하는 onChange 이벤트 핸들러
  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (
      value.length <= maxReasonTextLength ||
      value.length < reasonText.length
    ) {
      setReasonText(value);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['drawal'],
    queryFn: () => getUserInfoApi(),
  });

  if (isLoading) {
    return null;
  }

  const handleSelect = (id: number) => {
    const newOptions = options.map((option) => {
      if (option.id === id) {
        const updatedOption = {
          ...option,
          selected: !option.selected,
          details: option.details
            ? option.details.map((detail) => ({ ...detail, selected: false }))
            : undefined,
        };
        // '기타' 옵션 선택 해제 시, reasonText를 초기화
        if (id === 5 && !updatedOption.selected) {
          setReasonText('');
        }
        return updatedOption;
      }
      return option;
    });
    setOptions(newOptions);
  };

  const handleSelectDetail = (
    optionId: number,
    detailId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id !== optionId
          ? option // 현재 옵션과 선택한 옵션의 ID가 일치하지 않으면 이전 상태를 반환
          : {
              ...option,
              details: option.details
                ? option.details.map(
                    (detail) =>
                      detail.id !== detailId
                        ? detail // 현재 디테일과 선택한 디테일의 ID가 일치하지 않으면 이전 상태를 반환
                        : { ...detail, selected: !detail.selected } // 선택한 디테일의 selected 상태를 변경
                  )
                : [], // 디테일이 없는 경우 빈 배열 반환
            }
      )
    );
  };

  const CheckBoxChange = () => {
    setChecked(!checked);
  };

  const isAllOptionsUnselected = options.every((option) => !option.selected);

  const onClick = () => {
    const selectedLabels = options
      .filter((option) => option.selected)
      .map((option) => {
        if (option.details) {
          const detailsLabels = option.details
            .filter((detail) => detail.selected)
            .map((detail) => detail.label)
            .join(', ');
          return `${option.label}, ${detailsLabels}`;
        }
        return option.label;
      })
      .join(', ');

    postQuit(selectedLabels);

    navigate('/', { state: { quit: true } });
  };
  return (
    <div>
      <Appbar
        isAccount
        isClose
        isLogo
        isTextCenter
        onCloseClick={() => {
          navigate('/me/setting');
        }}
      >
        회원 탈퇴
      </Appbar>

      <div className='hidden md:block'>
        <Tabbar isMobileVisible size='default' />
      </div>

      <div className='px-6'>
        <div className=' max-w-[520px] w-full mt-[50px] m-auto'>
          <div className='flex flex-col gap-9'>
            <div className='flex flex-col gap-4 '>
              <div>
                <Typography
                  size='xl'
                  weight='Bold'
                  text={`${data.nickname}님,`}
                />
                <br />
                <Typography
                  size='xl'
                  weight='Bold'
                  text='정말 탈퇴하시겠어요?'
                />
              </div>
              <div>
                <dl className='flex gap-3'>
                  <dt className='relative w-5 h-5'>
                    <img
                      src={drawal}
                      alt='주의사항 아이콘'
                      className='absolute top-[4px]'
                    />
                  </dt>
                  <dd className='w-[calc(100%-21px)]'>
                    <Typography
                      size='sm'
                      weight='Medium'
                      text='지금 탈퇴하시면 게시글, 댓글, 관심 표시 등 모든 활동 정보가 삭제됩니다.'
                      className='text-[#676A72]'
                    />
                  </dd>
                </dl>
                <dl className='flex gap-3'>
                  <dt className='relative w-5 h-5'>
                    <img
                      src={drawal}
                      alt='주의사항 아이콘'
                      className='absolute top-[4px]'
                    />
                  </dt>
                  <dd className='w-[calc(100%-21px)]'>
                    <Typography
                      size='sm'
                      weight='Medium'
                      text='계정 삭제 후 7일간 다시 가입할 수 없습니다.'
                      className='text-[#676A72]'
                    />
                  </dd>
                </dl>
                <dl className='flex gap-3'>
                  <dt className='relative w-5 h-5'>
                    <img
                      src={drawal}
                      alt='주의사항 아이콘'
                      className='absolute top-[4px]'
                    />
                  </dt>
                  <dd className='w-[calc(100%-21px)]'>
                    <Typography
                      size='sm'
                      weight='Medium'
                      text='운영진에 의해 서비스 이용 후기 관련 이메일이 발송될 수 있습니다.'
                      className='text-[#676A72]'
                    />
                  </dd>
                </dl>
              </div>
              <div className='flex h-[54px] items-center'>
                <CheckBox id='0' checked={checked} onChange={CheckBoxChange}>
                  <Typography
                    size='sm'
                    weight='Semibold'
                    text='회원 탈퇴 유의사항을 확인했으며 이에 동의합니다.'
                    className='text-neutral-800 leading-snug'
                  />
                </CheckBox>
              </div>
            </div>

            <div className='flex flex-col gap-6'>
              <p className='flex gap-[19px] justify-center items-baseline'>
                <Typography
                  size='base'
                  weight='Semibold'
                  text='계정을 삭제하시려는 이유를 알려주세요'
                />
                <Typography
                  size='sm'
                  weight='Regular'
                  text='중복 선택 가능'
                  className='text-[#3283FF] text-xs'
                />
              </p>
              <div className='flex flex-col gap-[10px]'>
                {options.map((option) => (
                  <SelectsButton
                    key={option.id}
                    label={option.label}
                    isSelected={option.selected}
                    details={option.details}
                    onClick={() => handleSelect(option.id)}
                    handleSelectDetail={(
                      detailId: number,
                      event: React.MouseEvent<HTMLButtonElement>
                    ) => handleSelectDetail(option.id, detailId, event)}
                  />
                ))}
                {options[5].selected && (
                  <div className='relative'>
                    <textarea
                      value={reasonText}
                      onChange={handleReasonChange}
                      className='w-full h-[120px] p-5 focus:outline-none focus:border-[#000AFF] border border-[#6697FF] rounded-xl'
                      placeholder='기타 사유를 입력해 주세요!'
                    />
                    <Typography
                      size='xs'
                      weight='Regular'
                      text={`${reasonText.length} / ${maxReasonTextLength}`}
                      className='absolute bottom-[14px] right-[19px] text-[#808490]'
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              type='button'
              className='flex w-full items-center justify-center h-12 bg-[#0051FF] disabled:bg-[#A6AAB2] rounded-[400px] transition-all duration-300 ease-in-out'
              aria-label='탈퇴하기'
              disabled={
                !checked ||
                (isAllOptionsUnselected && !options[5].selected) ||
                (options[5].selected && reasonText.trim() === '')
              }
              onClick={() => setShowWithdrawalModal(true)}
            >
              <Typography
                text='탈퇴하기'
                size='base'
                weight='Medium'
                className='text-[#FFFFFF]'
              />
            </button>
          </div>
        </div>
      </div>
      <WithdrawalModal
        isOpen={showWithdrawalModal}
        submit={onClick}
        handleClose={() => {
          setShowWithdrawalModal(false);
        }}
      />
    </div>
  );
};

export default Withdrawal;

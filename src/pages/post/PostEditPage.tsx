import React, { useEffect, useState } from 'react';

import { axiosBaseUrl } from '../../api/axiosConfig';
import { GetData } from '../../api/IndexApi';
import { getPost } from '../../api/PostApi';
import check from '../../assets/check.svg';
import leftArrow from '../../assets/left_arrow.svg';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import EditorBox from '../../molecules/post/write/EditorBox';
import ConfirmationModal from '../../organisms/ConfirmationModal';
import PostSelectContent from '../../organisms/post/write/PostSelectContent';
import PostSuccessModal from '../../organisms/post/write/PostSuccessModal';
import { SuccessModalStore, WritePageStore } from '../../store/store';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';
import Typography from '../../stories/typography/Typography';

import { DevTool } from '@hookform/devtools';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

interface Inputs {
  title: string;
  link: string;
  time: string;
}

const PostEditPage = () => {
  const { postId } = useParams() as { postId: string };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [disableButton, setDisableButton] = useState(true);
  const { register, handleSubmit, control } = useForm<Inputs>();
  const { setIsSuccessModalOpen } = SuccessModalStore();

  // 뒤로가기 모달 팝업 확인용 isConfirmOpen state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setTitle(data.title);
    updatePost.mutate(data);
  };

  const { data: postDetails, isLoading } = useQuery<GetData>({
    queryKey: ['getPost', postId],
    queryFn: () => getPost(postId),
  });

  useEffect(() => {
    if (postDetails) {
      setTitle(postDetails.title);
      setResearchType(postDetails.researchType);
      setAges(postDetails.ages);
      setGender(postDetails.gender);
      setTime(postDetails.duration);
      setLink(postDetails.url);
      setEnddate(postDetails.endDate);
      setprocedureArray(postDetails.procedure);
    }
  }, [postDetails]);

  const updatePost = useMutation<void, unknown, Inputs>({
    mutationFn: (inputs) =>
      axiosBaseUrl.patch(`/posts/${postId})}`, {
        ages: age,
        endDate: enddate,
        gender,
        researchType,
        url: inputs.link,
        procedure,
        duration: inputs.time,
        content,
        title: inputs.title,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['WritePost'],
      });
      setIsSuccessModalOpen(true);
    },
    onError: () => {
      console.error('에러 발생');
    },
  });

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
    setEnddate,
    setResearchType,
    setTime,
    setGender,
    setLink,
    setAges,
    setprocedureArray,
  } = WritePageStore();

  const handleNavigate = () => {
    if (
      age.length <= 0 &&
      !gender &&
      !researchType &&
      !link &&
      !content &&
      !title &&
      !procedure &&
      !enddate
    ) {
      navigate(-1);
    } else {
      setIsConfirmModalOpen(true);
    }
  };

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

  const handleModalLeave = () => {
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  // 수정하기 버튼 눌렀을 때
  const closeModal = () => {
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(false);
    queryClient.refetchQueries({ queryKey: ['getAllPost'] });
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className='w-full bg-[#FAFAFA] flex-col pb-[100px] md:pb-[200px]'>
      <Appbar isArrow isLogo isAccount onArrowClick={() => handleNavigate()}>
        게시글 작성하기
      </Appbar>
      <Tabbar />
      <div className='flex justify-center items-center max-w-[1034px] w-full m-auto bg-[#FAFAFA]'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[90%]'>
          <div className='content-layout flex justify-center flex-col items-start gap-8 mt-[30px] md:mt-14 bg-[#FAFAFA]'>
            <button
              type='button'
              className='hidden md:inline-block'
              onClick={() => handleNavigate()}
            >
              <img src={leftArrow} alt='left arrow' className='w-4 h-5' />
            </button>
            <div className='flex flex-col items-start w-full gap-3'>
              <Typography
                size='base'
                weight='Regular'
                text='제목을 입력해주세요.'
              />
              <div className='text-area flex py-2.5 px-5 border self-stretch gap-3 items-center rounded-xl border-[#6697FF] bg-[#FAFAFA]'>
                <Input
                  type='text'
                  placeholder='리서치 내용을 한 줄로 요약해보세요!'
                  className='flex-1 bg-inherit text-base placeholder:text-[#C1C5CC] placeholder:font-medium normal font-pretendard font-semibold outline-none leading-[26px]'
                  id='title'
                  value={title}
                  {...register('title', {
                    required: '제목을 입력해주세요.',
                    maxLength: {
                      value: 100,
                      message: '제목을 100자 이내로 입력해주세요.',
                    },
                  })}
                />
                <Typography
                  size='xs'
                  text={`${title.length}/100`}
                  weight='Regular'
                  className='text-[#818490]'
                />
              </div>
            </div>
            <PostSelectContent register={register} />
            <EditorBox />
            <div className='flex justify-end w-full'>
              <Button
                type='submit'
                className={`inline-flex justify-center text-white py-3 px-6 items-center gap-2 rounded-[400px] md:w-[314px] ${disableButton ? `bg-[#A6AAB2]` : `bg-[#0051FF]`}`}
                disabled={disableButton}
              >
                등록하기
                <img src={check} alt='체크 이미지' />
              </Button>
            </div>
          </div>
        </form>
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          handleClose={() => setIsConfirmModalOpen(false)}
          handleModalLeave={handleModalLeave}
        />
        <PostSuccessModal
          firstButtonOnClick={closeModal}
          SecondButtonOnClick={handleModalLeave}
          title='게시물 등록이 완료되었습니다!!'
          content={`내가 작성한 글 목록에서 언제든지 내용을 수정할 수 있어요.\n메인에 등록된 게시물을 확인해보세요!`}
          firstButtonText='수정하기'
          SecondButtonText='홈으로'
          isLogo
        />
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default PostEditPage;

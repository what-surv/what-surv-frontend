import React from 'react';

import CommentWithButton from '../../molecules/post/view/CommentWithButton';
import ReplyWithButton from '../../molecules/post/view/ReplyWithButton';
import PostContentView from '../../organisms/post/view/PostContentView';
import UserInfoWithComment from '../../organisms/post/view/UserInfoWithComment';
import { Appbar } from '../../stories/appbar/Appbar';
import icComment from '../../stories/assets/ic_comment.svg';
import icEye from '../../stories/assets/ic_eye.svg';
import icUser from '../../stories/assets/ic_usersvg.svg';
import Like from '../../stories/like/Like';
import Typography from '../../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

const PostViewPage = () => {
  const navigate = useNavigate();
  const isArrowClick = () => {
    navigate(-1);
  };

  return (
    <div className='w-full mx-auto pb-[150px]'>
      {/* header 영역 */}
      <div className='w-full'>
        <Appbar isArrow onArrowClick={isArrowClick} isSearch isLogo isAccount />
      </div>
      <div className='flex flex-col items-end gap-8 max-w-[1034px] w-[90%] mx-auto'>
        <div className='flex flex-col items-start self-stretch gap-6'>
          <div className='flex self-stretch mt-[30px]'>
            <Typography
              text='게시글 제목입니다! 가나다라마바사아자차카타파하가나다라마바사아자차카타파하 가나다라마바사아자차카타파하'
              size='xl'
              weight='Semibold'
              lineheight={28}
              className='text-[#242424]'
            />
          </div>
          <div className='flex justify-between items-center gap-3.5 self-stretch border-[#D7DBE2] border-t pt-[14px]'>
            <div className='flex gap-2.5 items-start'>
              <img src={icUser} alt='유저 이미지' />
              <Typography
                text='닉네임'
                size='sm'
                weight='Medium'
                lineheight={22}
              />
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center gap-1'>
                <img src={icEye} alt='눈 아이콘' />
                <Typography
                  text='99'
                  size='sm'
                  weight='Medium'
                  lineheight={22}
                  className='text-[#818490]'
                />
              </div>
              <div className='flex items-center gap-1'>
                <img src={icComment} alt='댓글 아이콘' />
                <Typography
                  text='99'
                  size='sm'
                  weight='Medium'
                  lineheight={22}
                  className='text-[#818490]'
                />
              </div>
            </div>
          </div>
        </div>
        <PostContentView />
        {/* 글 */}
        <div className='px-4 py-6 bg-[#FFFFFF] rounded-[8px]'>
          리서치 소개글 또는 이미지 아래는 글 예시입니다. 당사는 SurveyMonkey가
          제공해야 하는 다양한 질문 유형에 대하여 조사를 실시하고 있습니다. 어떤
          질문 유형을 가장 많이 사용하며, 어떤 질문 유형이 만들어졌으면 하는지에
          대하여 귀하의 의견을 듣고자 합니다. 귀하의 의견은 당사가 기존 도구를
          개선하고 새로운 기능의 우선순위를 정하는 데 유용하게 활용될 것입니다.
          이 설문조사는 약 5분 정도 소요되며, 귀하의 응답은 완전히 익명으로
          처리됩니다. 이 설문조사에는 한 번만 참여할 수 있으나 설문조사가
          종료되는 2014년 5월 28일까지는 응답을 수정할 수 있습니다. 별표(*)가
          있는 질문에는 반드시 답변해야 합니다. 이 설문조사에 대하여 궁금한 점이
          있으시면 youremail@email.com으로 이메일을 보내주십시오. 참여해 주셔서
          진심으로 감사 드립니다!
        </div>

        {/* 관심 */}
        <div className='flex gap-3.5 w-full self-stretch flex-col items-start'>
          <div className='flex items-center self-stretch justify-end gap-1'>
            <Typography
              text='관심있어요!'
              size='base'
              lineheight={26}
              weight='Medium'
              className='text-[#818490]'
            />
            <div className='p-2.5 flex items-center justify-center gap-2.5'>
              <Like />
            </div>
          </div>
          <div className='h-[1px] self-stretch bg-[#A6AAB2]' />

          {/* //관심 */}

          <div className='h-[26px] self-stretch'>
            <Typography
              text='댓글'
              size='base'
              lineheight={26}
              weight='Medium'
              className='text-[#242424]'
            />
          </div>
          <CommentWithButton placeholder='댓글을 입력해보세요!' />
          <div>
            <UserInfoWithComment />
            <ReplyWithButton placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.' />
          </div>
        </div>
        {/* //댓글 */}
      </div>
    </div>
  );
};

export default PostViewPage;

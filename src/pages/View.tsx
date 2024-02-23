import React from 'react';

import icBtnArrow from '../stories/assets/ic_btn_arrow.svg';
import icComment from '../stories/assets/ic_comment.svg';
import icCommentDelete from '../stories/assets/ic_comment_delete.svg';
import icCommentModifiy from '../stories/assets/ic_comment_modifiy.svg';
import icCommentReport from '../stories/assets/ic_comment_report.svg';
import icEye from '../stories/assets/ic_eye.svg';
import icReply from '../stories/assets/ic_reply.svg';
import icUser from '../stories/assets/ic_usersvg.svg';
import Like from '../stories/like/Like';

const View = () => {
  const onClick = (sort: string) => {
    switch (sort) {
      case 'reply':
        console.log(sort);
        break;
      case 'modifiy':
        console.log(sort);

        break;
      case 'delete':
        console.log(sort);

        break;
      case 'report':
        console.log(sort);

        break;

      case 'like':
        console.log(sort);

        break;

      default:
        break;
    }
  };

  const likeCallback = (state: boolean) => {
    console.log(state);
  };
  return (
    <div>
      <p className='text-lg font-semibold pb-[24px] border-b'>
        게시글 제목입니다!
        가나다라마바사아자차카타파하가나다라마바사아자차카타파하
        가나다라마바사아자차카타파하
      </p>
      {/* content의 header 영역 */}
      <div className='flex justify-between mt-[14px]'>
        <div className='flex'>
          <p className='mr-[10px]'>
            <img src={icUser} alt='유저 이미지' />
          </p>
          <p>닉네임</p>
        </div>
        <div className='flex mb-[32px]'>
          <p className='flex items-center mr-[4px]'>
            <img src={icEye} alt='눈 아이콘' />
          </p>
          <p className='mr-[6px] text-[#808490]'>99</p>
          <p className='flex items-center mr-[4px]'>
            <img src={icComment} alt='댓글 아이콘' />
          </p>
          <p className='text-[#808490]'>99</p>
        </div>
      </div>
      {/* //content의 header 영역 */}

      {/* 상세 */}
      <div className='flex flex-wrap gap-4 mb-8 p-6 bg-[#E5E7ED] rounded-[8px]'>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>마감일</dt>
          <dd className='flex gap-2'>
            <span className='inline-block text-sm border font-semibold rounded-[400px] bg-[#FAFAFA] border-[#808490] text-[#545760] px-4 py-1.5'>
              2024.10.10
            </span>
          </dd>
        </dl>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>성별</dt>
          <dd>
            <span className='inline-block text-sm border font-semibold rounded-[400px] bg-[#FAFAFA] border-[#808490] text-[#545760] px-4 py-1.5'>
              2024.10.10
            </span>
          </dd>
        </dl>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>리서치 종류</dt>
          <dd>
            <span className='inline-block text-sm border font-semibold rounded-[400px] bg-[#FAFAFA] border-[#808490] text-[#545760] px-4 py-1.5'>
              2024.10.10
            </span>
          </dd>
        </dl>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>연령</dt>
          <dd>
            <span className='inline-block text-sm border font-semibold rounded-[400px] bg-[#FAFAFA] border-[#808490] text-[#545760] px-4 py-1.5'>
              2024.10.10
            </span>
          </dd>
        </dl>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>진행방식</dt>
          <dd>
            <span className='inline-block text-sm border font-semibold rounded-[400px] bg-[#FAFAFA] border-[#808490] text-[#545760] px-4 py-1.5'>
              2024.10.10
            </span>
          </dd>
        </dl>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>링크</dt>
          <dd>
            <span className='block w-full text-area py-2.5 px-5 border  rounded-xl border-[#808490] bg-[#FAFAFA]'>
              <a href='https://www.naver.com' target='_blank' rel='noreferrer'>
                https://www.naver.com
              </a>
            </span>
          </dd>
        </dl>
        <dl className='w-[calc(50%-1rem)]'>
          <dt className='mb-2'>소요시간</dt>
          <dd>
            <span className='block w-full text-area py-2.5 px-5 border  rounded-xl border-[#808490] bg-[#FAFAFA]'>
              설문 1분 이내, 인터뷰 30분 이내
            </span>
          </dd>
        </dl>
      </div>
      {/* //상세 */}

      {/* 글 */}
      <div className='mb-8 px-4 py-6 bg-[#FFFFFF] rounded-[8px]'>
        선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가
        출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다. 대통령은
        필요하다고 인정할 때에는 외교·국방·통일 기타 국가안위에 관한 중요정책을
        국민투표에 붙일 수 있다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
        재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다. 가부동수인
        때에는 부결된 것으로 본다. 모든 국민은 법 앞에 평등하다. 누구든지
        성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의
        모든 영역에 있어서 차별을 받지 아니한다. 대법원장의 임기는 6년으로 하며,
        중임할 수 없다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고,
        재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은
        의결을 하면 그 법률안은 법률로서 확정된다. 국무위원은 국정에 관하여
        대통령을 보좌하며, 국무회의의 구성원으로서 국정을 심의한다. 모든 국민은
        그 보호하는 자녀에게 적어도 초등교육과 법률이 정하는 교육을 받게 할
        의무를 진다. 선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는
        범위안에서 하되, 균등한 기회가 보장되어야 한다. 모든 국민은 신속한
        재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이
        공개재판을 받을 권리를 가진다. 재판의 심리와 판결은 공개한다. 다만,
        심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할
        염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다. 감사원은
        세입·세출의 결산을 매년 검사하여 대통령과 차년도국회에 그 결과를
        보고하여야 한다. 공개하지 아니한 회의내용의 공표에 관하여는 법률이
        정하는 바에 의한다. 국회의원의 선거구와 비례대표제 기타 선거에 관한
        사항은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는
        기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를
        취득하거나 타인을 위하여 그 취득을 알선할 수 없다. 대통령은 헌법과
        법률이 정하는 바에 의하여 국군을 통수한다. 평화통일정책의 수립에 관한
        대통령의 자문에 응하기 위하여 민주평화통일자문회의를 둘 수 있다. 모든
        국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 헌법재판소
        재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지
        아니한다. 대한민국은 통일을 지향하며, 자유민주적 기본질서에 입각한
        평화적 통일 정책을 수립하고 이를 추진한다. 형사피해자는 법률이 정하는
        바에 의하여 당해 사건의 재판절차에서 진술할 수 있다. 광물 기타 중요한
        지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는
        바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.
        체포·구속·압수 또는 수색을 할 때에는 적법한 절차에 따라 검사의 신청에
        의하여 법관이 발부한 영장을 제시하여야 한다. 다만, 현행범인인 경우와
        장기 3년 이상의 형에 해당하는 죄를 범하고 도피 또는 증거인멸의 염려가
        있을 때에는 사후에 영장을 청구할 수 있다. 정당은 그 목적·조직과 활동이
        민주적이어야 하며, 국민의 정치적 의사형성에 참여하는데 필요한 조직을
        가져야 한다. 대법원장은 국회의 동의를 얻어 대통령이 임명한다. 국회에서
        의결된 법률안은 정부에 이송되어 15일 이내에 대통령이 공포한다. 국회는
        국가의 예산안을 심의·확정한다. 지방의회의 조직·권한·의원선거와
        지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한
        사항은 법률로 정한다. 국회는 국민의 보통·평등·직접·비밀선거에 의하여
        선출된 국회의원으로 구성한다. 원장은 국회의 동의를 얻어 대통령이
        임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다.
        국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
        국회의원과 정부는 법률안을 제출할 수 있다. 대통령은 제1항과 제2항의 처분
        또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다.
        법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이
        정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다. 연소자의
        근로는 특별한 보호를 받는다. 근로자는 근로조건의 향상을 위하여 자주적인
        단결권·단체교섭권 및 단체행동권을 가진다.
      </div>
      {/* //글 */}

      {/* 관심 */}
      <div className='flex justify-end mb-3.5 p-3.5 pb-8 border-b-2 border-b-[#C2C5CC]'>
        <button
          type='button'
          className='flex items-center text-[#808490]'
          onClick={() => onClick('like')}
        >
          <p className='mr-2'>관심있어요!</p>
          <Like onClickCallback={likeCallback} />
        </button>
      </div>
      {/* //관심 */}

      {/* 댓글 */}
      <div>
        <p className='my-3.5'>댓글</p>
        <div className='flex items-center'>
          <div className='flex align-center w-[calc(100%-151px)] mr-[18px]'>
            <img
              src={icUser}
              alt='유저 섬네일 이미지'
              className='w-[23px] mr-[20px]'
            />
            <textarea
              placeholder='댓글을 입력해보세요!'
              rows={1}
              className='w-full py-6 px-[30px] border-2 border-[#C1C5CC] rounded-[12px]'
            />
          </div>
          <button
            type='button'
            className='flex w-[151px] h-[52px] items-center justify-center bg-[#0051FF] rounded-[400px] text-white font-semibold text-lg'
          >
            <img src={icBtnArrow} alt='버튼 아이콘' className='mr-2' />
            <span>댓글 쓰기</span>
          </button>
        </div>
        <ul className='mt-6'>
          <li>
            <div className='flex mb-3'>
              <p className='mr-[10px]'>
                <img src={icUser} alt='유저 이미지' />
              </p>
              <p className='font-semibold'>닉네임</p>
            </div>
            <div className='flex mb-[18px] ml-[30px] '>
              <p className='px-7 py-5 bg-[#E5EEFF] rounded-[8px] font-semibold text-[#242424]'>
                오프라인장소는 어디서 진행되나요?
              </p>
              <ul className='flex gap-2 items-end ml-[10px]'>
                <li>
                  <button type='button' onClick={() => onClick('reply')}>
                    <img src={icReply} alt='답글 아이콘' />
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => onClick('modifiy')}>
                    <img src={icCommentModifiy} alt='수정 아이콘' />
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => onClick('delete')}>
                    <img src={icCommentDelete} alt='삭제 아이콘' />
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => onClick('report')}>
                    <img src={icCommentReport} alt='신고 아이콘' />
                  </button>
                </li>
              </ul>
            </div>

            <div className='flex items-center ml-[52px]'>
              <div className='flex align-center w-[calc(100%-151px)] mr-[18px]'>
                <img
                  src={icUser}
                  alt='유저 섬네일 이미지'
                  className='w-[23px] mr-[20px]'
                />
                <textarea
                  placeholder='타인에게 불쾌감을 주는 욕설 또는 비속어는 경고 조치 없이 삭제될 수 있습니다.'
                  rows={1}
                  className='w-full py-[20px] px-[30px] border-2 border-[#C1C5CC] rounded-[12px]'
                />
              </div>
              <button
                type='button'
                className='flex w-[151px] h-[52px] items-center justify-center bg-[#0051FF] rounded-[400px] text-white font-semibold text-lg'
              >
                <img src={icBtnArrow} alt='버튼 아이콘' className='mr-2' />
                <span>댓글 쓰기</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      {/* //댓글 */}
    </div>
  );
};

export default View;

import PostInputContentView from '../../../molecules/post/view/PostInputContentView';
import PostSelectContentView from '../../../molecules/post/view/PostSelectContentView';

// interface PostViewContentProps {}

const PostContentView = () => {
  return (
    <div className='flex flex-wrap items-start w-full md:w-full content-start self-stretch gap-3 md:gap-4 px-4 py-6 md:p-6 rounded-lg bg-[#E5E7ED]'>
      <PostSelectContentView title='마감일' value={['2024.10.10']} />
      <PostSelectContentView title='성별' value={['전체']} />
      <PostSelectContentView
        title='리서치 종류'
        value={['설문조사', '인터뷰']}
      />
      <PostSelectContentView title='연령' value={['20-30대']} />
      <PostSelectContentView title='진행 방식' value={['온라인', '오프라인']} />

      <PostInputContentView
        title='소요시간'
        content='설문 1분 이내, 인터뷰 30분 이내'
      />
      <PostInputContentView
        title='링크'
        content='설문 1분 이내, 인터뷰 30분 이내'
      />
    </div>
  );
};

export default PostContentView;

import { GetData } from '../../../api/IndexApi';
import { getPost } from '../../../api/PostApi';
import PostInputContentView from '../../../molecules/post/view/PostInputContentView';
import PostSelectContentView from '../../../molecules/post/view/PostSelectContentView';
import { formatDateString } from '../../../utils/dateUtils';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// interface PostViewContentProps {}

const PostContentView = () => {
  const { num } = useParams() as { num: string };
  const { data: postDetails } = useQuery<GetData>({
    queryKey: ['getPost'],
    queryFn: () => getPost(num),
  });
  if (!postDetails) return null;

  return (
    <div className='flex flex-wrap items-start w-full md:w-full content-start self-stretch gap-3 md:gap-4 px-4 py-6 md:p-6 rounded-lg bg-[#E5E7ED]'>
      <PostSelectContentView
        title='마감일'
        value={[formatDateString(postDetails?.endDate)]}
      />
      <PostSelectContentView title='성별' value={['전체']} />
      <PostSelectContentView
        title='리서치 종류'
        value={[postDetails.researchType]}
      />
      <PostSelectContentView title='연령' value={['20-30대']} />
      <PostSelectContentView
        title='진행 방식'
        value={[postDetails.procedure]}
      />

      <PostInputContentView title='소요시간' content={postDetails?.duration} />
      <PostInputContentView title='링크' content={postDetails?.url} />
    </div>
  );
};

export default PostContentView;

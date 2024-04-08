import { GetData } from '../../../api/IndexApi';
import { getPost } from '../../../api/PostApi';
import PostInputContentView from '../../../molecules/post/view/PostInputContentView';
import PostSelectContentView from '../../../molecules/post/view/PostSelectContentView';
import { formatDateString } from '../../../utils/dateUtils';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const transformAges = (ages: string[]): string[] => {
  if (ages.includes('all')) {
    return ['전체'];
  }
  const sortedAges = ages.sort();

  const transformedAges: string[] = [];

  let startRange = parseInt(sortedAges[0].slice(0, -1), 10);
  let endRange = parseInt(sortedAges[0].slice(0, -1), 10);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < sortedAges.length; i++) {
    const currentAgeNum = parseInt(sortedAges[i].slice(0, -1), 10);
    const previousAgeNum = parseInt(sortedAges[i - 1].slice(0, -1), 10);

    if (currentAgeNum - previousAgeNum === 10) {
      endRange = currentAgeNum;
    } else {
      transformedAges.push(getAgeRange(startRange, endRange));
      startRange = currentAgeNum;
      endRange = currentAgeNum;
    }
  }

  // Push the last range to the transformedAges array
  transformedAges.push(getAgeRange(startRange, endRange));

  return transformedAges;
};

const getAgeRange = (start: number, end: number): string => {
  if (start === end) {
    return `${start}대`;
  }
  return `${start}대-${end}대`;
};

const translateValue = (key: string, value: string[]): string[] => {
  const translations: Record<string, Record<string, string>> = {
    gender: {
      all: '전체',
      male: '남성',
      female: '여성',
    },
    researchTypes: {
      all: '전체',
      survey: '설문조사',
      interview: '인터뷰',
      userTest: '유저테스트',
      other: '기타',
    },
    procedure: {
      all: '전체',
      online: '온라인',
      offline: '오프라인',
      onlineOffline: '온오프라인 병행',
    },
  };

  return value.map((v) => translations[key]?.[v] || v);
};

const PostContentView = () => {
  const { num } = useParams() as { num: string };
  const { data: postDetails } = useQuery<GetData>({
    queryKey: ['getPost', num],
    queryFn: () => getPost(num),
  });
  if (!postDetails) return null;

  return (
    <div className='flex flex-wrap items-start w-full md:w-full content-start self-stretch gap-3 md:gap-4 px-4 py-6 md:p-6 rounded-lg bg-[#E5E7ED]'>
      <PostSelectContentView
        title='마감일'
        value={[formatDateString(postDetails.endDate)]}
      />
      <PostSelectContentView
        title='성별'
        value={translateValue('gender', [postDetails.gender])}
      />
      <PostSelectContentView
        title='리서치 종류'
        value={translateValue('researchTypes', postDetails.researchTypes)}
      />
      <PostSelectContentView
        title='연령'
        value={transformAges(postDetails?.ages || [])}
      />
      <PostSelectContentView
        title='진행 방식'
        value={translateValue('procedure', [postDetails.procedure])}
      />

      <PostInputContentView title='소요시간' content={postDetails.duration} />
      <PostInputContentView title='링크' content={postDetails.url} />
    </div>
  );
};

export default PostContentView;

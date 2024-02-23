import React, { useState } from 'react';

import icLikeFalse from '../assets/ic_like_false.svg';
import icLikeTrue from '../assets/ic_like_true.svg';

interface LikeProps {
  onClickCallback: (state: boolean) => void;
}

const Like = ({ onClickCallback }: LikeProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const onClick = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    onClickCallback(newLikeStatus);
  };
  return (
    <button type='button' onClick={onClick}>
      <div className='relative'>
        <img src={icLikeFalse} alt='하트아이콘 프레임' />
        <img
          src={icLikeTrue}
          alt='하트아이콘'
          className={`absolute top-0 transition-all duration-300 ease ${isLiked ? 'scale-0' : 'scale-1'}`}
        />
      </div>
    </button>
  );
};

export default Like;

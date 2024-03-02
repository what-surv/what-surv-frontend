import React from 'react';

interface CommentButtonProps {
  children: React.ReactNode;
}

const CommentButton = ({ children }: CommentButtonProps) => {
  return (
    <button
      type='button'
      className='flex gap-2.5 p-2 items-center justify-center rounded-[400px] bg-[#E5EEFF]'
    >
      {children}
    </button>
  );
};

export default CommentButton;

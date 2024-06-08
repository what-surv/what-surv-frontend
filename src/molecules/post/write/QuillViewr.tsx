import Quill from 'quill';
import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';

interface QuillViewerProps {
  content: string;
}

const QuillViewer = ({ content }: QuillViewerProps) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      // Quill 인스턴스를 읽기 전용 모드로 초기화
      const quill = new Quill(quillRef.current, {
        readOnly: true, // 읽기 전용 모드 설정
        theme: 'snow', // 테마 설정
        modules: {
          toolbar: false, // 툴바 비활성화
        },
      });
      // Quill 에디터에 콘텐츠 설정
      quill.root.innerHTML = content;

      // 에디터의 기본 폰트 설정
      quill.root.style.fontFamily = 'Pretendard, sans-serif';
    }
  }, [content]);

  return (
    <div>
      <div ref={quillRef} className='ql-content' />
    </div>
  );
};

export default QuillViewer;

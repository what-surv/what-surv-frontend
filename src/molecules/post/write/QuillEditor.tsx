import { useEffect, useMemo, useRef } from 'react';

import { WritePageStore } from '../../../store/store';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

const QuillEditor = () => {
  const { setContent, content } = WritePageStore();
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // console.log('A child node has been added or removed.');
          }
        });
      });

      const config = { attributes: true, childList: true, subtree: true };
      observer.observe(quillRef.current.getEditor().root, config);

      return () => {
        observer.disconnect();
      };
    }
    // Return undefined if observer is not created
    return undefined;
  }, []);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactQuill
        style={{ width: '100%', height: '92%' }}
        ref={quillRef}
        theme='snow'
        value={content}
        modules={modules}
        formats={formats}
        onChange={setContent}
      />
    </div>
  );
};

export default QuillEditor;

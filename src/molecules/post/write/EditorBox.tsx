import { useRef, useEffect } from 'react';

import { WritePageStore } from '../../../store/store';

import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';

const EditorBox = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>();
  const { setContent, content } = WritePageStore();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setContent(data);
  };
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, []);

  return (
    <div className='w-full'>
      <Editor
        initialValue=' '
        height='600px'
        ref={editorRef}
        onChange={onChange}
        initialEditType='wysiwyg'
        language='ko-KR'
        useCommandShortcut={false}
        hideModeSwitch
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
        ]}
        placeholder={`내용을 입력해주세요!
자세한 내용을 입력할수록 신뢰도가 증가하고 참여율이 높아집니다.
귀하의 이름이나 귀하가 대표하는 회사 또는 단체의 이름.
설문조사의 목적이나 알아보고자 하는 내용.
설문조사 참여 대상.
구분을 위해 응답을 사용할 방법.
소요 시간 및 일정.
응답이 익명, 기밀로 유지되거나 추적되는지여부.
회사 또는 단체에서 요구하는 모든동의서 또는 개인정보 보호 공지.
보상 및 문의사항 발생 시 연락 가능한 연락처 등.`}
        className='flex-1 w-[200px] text-base leading-[26px]'
      />
    </div>
  );
};

export default EditorBox;

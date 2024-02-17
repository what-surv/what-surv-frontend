import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

const EditorBox = () => {
  return (
    <div className='prose' style={{ backgroundImage: 'inherit' }}>
      <Editor
        initialValue='test'
        previewStyle='tab'
        height='600px'
        initialEditType='wysiwyg'
        hideModeSwitch
      />
    </div>
  );
};

export default EditorBox;

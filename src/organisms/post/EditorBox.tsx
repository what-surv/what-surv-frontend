import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const EditorBox = () => {
  return (
    <Editor
      initialValue='hello react editor world!'
      previewStyle='vertical'
      height='600px'
      initialEditType='wysiwyg'
      useCommandShortcut={false}
    />
  );
};

export default EditorBox;

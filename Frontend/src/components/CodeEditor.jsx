import React from 'react';
import EditorModule from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

const Editor = EditorModule.default || EditorModule;

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <div className="code-editor-wrapper">
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => {
          const grammar = Prism.languages[language] || Prism.languages.javascript;
          if (!grammar) return code;
          
          try {
            return Prism.highlight(code, grammar, language);
          } catch (e) {
            return code;
          }
        }}
        padding={15}
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 16,
          backgroundColor: 'transparent',
          minHeight: '250px'
        }}
        textareaClassName="code-textarea-internal"
      />
    </div>
  );
};

export default CodeEditor;

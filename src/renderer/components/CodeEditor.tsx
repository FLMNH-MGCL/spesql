import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql.min.js';
// import 'prismjs/themes/prism-dark.css';

type Props = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

export default function CodeEditor({ code, setCode }: Props) {
  return (
    <Editor
      className="rounded-md shadow-sm bg-gray-100 dark:bg-dark-500 min-h-40 text-gray-600 dark:text-dark-200"
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => Prism.highlight(code, Prism.languages.sql, 'sql')}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 15,
      }}
    />
  );
}

import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql.min.js';
import clsx from 'clsx';
import { usePersistedStore } from '../../stores/persisted';
import shallow from 'zustand/shallow';

const Light = React.lazy(() => import('./prism-themes/Light'));
const Dark = React.lazy(() => import('./prism-themes/Dark'));

function Theme({ children }: { children: React.ReactNode }) {
  const theme = usePersistedStore((state) => state.theme, shallow);

  return (
    <React.Fragment>
      <React.Suspense fallback={<></>}>
        {theme === 'dark' ? <Dark /> : <Light />}
      </React.Suspense>
      {children}
    </React.Fragment>
  );
}

type Props = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  small?: boolean;
};

export default function CodeEditor({ code, setCode, disabled, small }: Props) {
  return (
    <Theme>
      <Editor
        disabled={disabled}
        className={clsx(
          'rounded-md shadow-sm  text-gray-800 dark:text-dark-200',
          small ? 'min-h-24' : 'min-h-40',
          disabled
            ? 'bg-gray-50 dark:bg-dark-600'
            : 'bg-gray-100 dark:bg-dark-500'
        )}
        value={code}
        placeholder="Write your query here"
        onValueChange={(code) => setCode(code)}
        highlight={(code) => Prism.highlight(code, Prism.languages.sql, 'sql')}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 15,
        }}
      />
    </Theme>
  );
}

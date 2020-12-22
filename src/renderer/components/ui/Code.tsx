import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MutuallyExclusive } from '../../types';

type ChildProps = {
  children: React.ReactText;
};

type StringProps = {
  codeString: string;
};

type Props = MutuallyExclusive<ChildProps, StringProps> & {
  rounded?: boolean;
  // TODO: type me
  language?: string;
  theme?: 'light' | 'dark';
};

export default function Code({
  codeString,
  children,
  rounded,
  language = 'typescript',
  theme = 'dark',
}: Props) {
  const text = codeString ?? children;
  const styles = {
    borderRadius: rounded ? '.375rem' : 0,
    backgroundColor: theme === 'light' && '#F9FAFB',
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={theme === 'dark' ? vscDarkPlus : vs}
      customStyle={styles}
    >
      {text}
    </SyntaxHighlighter>
  );
}

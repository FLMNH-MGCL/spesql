import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MutuallyExclusive } from '../../types';

type ChildProps = {
  children: React.ReactText;
};

type StringProps = {
  codeString: string;
};

type Props = MutuallyExclusive<ChildProps, StringProps> & {
  rounded?: boolean;
};

export default function Code({ codeString, children, rounded }: Props) {
  const text = codeString ?? children;
  const styles = { borderRadius: rounded ? '.375rem' : 0 };

  return (
    <SyntaxHighlighter
      language="typescript"
      style={vscDarkPlus}
      customStyle={styles}
    >
      {text}
    </SyntaxHighlighter>
  );
}

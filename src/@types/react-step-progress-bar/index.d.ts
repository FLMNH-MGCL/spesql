// declare module 'react-step-progress-bar' {
//   import ProgressBar from './components/ProgressBar';
//   export { ProgressBar };
// }

interface StepFunctionProps {
  accomplished: boolean;
  position: number;
  index: number;
  transition?: 'scale' | 'rotate' | 'skew';
  transitionDuration?: string;
}

interface StepProps {
  children?({ ...args }: StepFunctionProps): React.ReactElement;
}

interface ProgressBarProps {
  percent?: number;
  children?: React.ReactElement<StepProps>[]; // FIXME
  stepPositions?: number[];
  unfilledBackground?: string;
  filledBackground?: string;
  width?: number;
  height?: number;
  hasStepZero?: boolean;
  text?: string;
}

declare module 'react-step-progress-bar' {
  export class ProgressBar extends React.PureComponent<ProgressBarProps, any> {}
  export class Step extends React.PureComponent<StepProps, any> {}
}

import React from 'react';
import errorBoundary from '../assets/svg/error_boundary.svg';
import CopyButton from './buttons/CopyButton';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Text from './ui/Text';
import useToggle from './utils/useToggle';

// TODO: type my things plz

function TopLevelErrorBoundary({ error }: { error?: Error }) {
  const [loading, { on }] = useToggle(false);
  return (
    <div className="h-screen flex justify-center">
      <div className="flex flex-col text-center space-y-4 mt-4">
        <Heading size="massive" tag="h2">
          Uh oh! Something went wrong!
        </Heading>

        <img className="object-scale-down max-h-96" src={errorBoundary} />

        <Text className="max-w-lg mx-auto">
          Something broke while you were using the application! Not to worry
          though, I have the little bugger right below. Please copy that and
          send it on over to Aaron to see what happened!
        </Text>

        <textarea
          rows={4}
          className="bg-gray-100 border border-gray-100 rounded-md p-2"
        >
          {error &&
            JSON.stringify({
              error: error.name,
              message: error.message,
              stack: error.stack,
            })}
        </textarea>

        <div className="flex items-center justify-center space-x-4">
          <CopyButton
            value={
              error
                ? JSON.stringify(
                    {
                      error: error.name,
                      message: error.message,
                      stack: error.stack,
                    },
                    null,
                    2
                  )
                : ''
            }
          />
          <Button
            variant="danger"
            onClick={() => {
              on();
              window.location.reload();
            }}
            loading={loading}
          >
            Take me back to safety!
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<
  {},
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <TopLevelErrorBoundary error={this.state.error} />;
    }

    return this.props.children;
  }
}

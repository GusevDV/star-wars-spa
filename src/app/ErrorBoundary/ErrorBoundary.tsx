import React, { ErrorInfo, ReactNode } from 'react';
import Error from 'pages/Error';
import Header from 'widgets/Header';
import MainLayout from 'widgets/MainLayout';

type Props = {
  children?: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Todo log to the sentry
  }

  render() {
    if (this.state.hasError) {
      return (
        <MainLayout header={<Header />}>
          <Error />
        </MainLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

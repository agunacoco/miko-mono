import { Center, Heading } from '@chakra-ui/react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center h="100vh" bgColor="cyan.100" flexDir="column">
          <Heading size="4xl" color="pink.400">
            Error
          </Heading>
          <Heading size="2xl" color="black.500" py="10">
            {`please refresh & check consol log`}
          </Heading>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

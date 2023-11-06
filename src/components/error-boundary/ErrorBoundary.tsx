import React, { Component, ErrorInfo } from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(
      "ErrorBoundary did catch an error: ",
      error,
      info.componentStack,
    );
    this.setState({
      hasError: true,
      error: error,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>{`Oops, something went wrong: ${this.state.error?.message}`}</h2>
      );
    }

    return this.props.children;
  }
}

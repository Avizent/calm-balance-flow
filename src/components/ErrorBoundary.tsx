import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Global error boundary. Renders a friendly fallback instead of a blank page
 * if any descendant throws during render. Errors are logged to the console
 * for debugging; in production this could be wired up to Sentry/etc.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted px-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-4xl font-semibold text-foreground mb-3">
            Something went wrong
          </h1>
          <p className="font-sans text-muted-foreground mb-6">
            An unexpected error occurred. Please try refreshing the page — if the problem
            persists, contact us at{" "}
            <a href="mailto:spessiritskine@icloud.com" className="text-primary underline">
              spessiritskine@icloud.com
            </a>
            .
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
          >
            Reload page
          </button>
        </div>
      </main>
    );
  }
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

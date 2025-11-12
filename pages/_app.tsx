// pages/_app.tsx
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  // pageProps may include `session` when using getServerSideProps, getInitialProps, or next-auth callbacks
  return (
    <SessionProvider session={(pageProps as any).session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

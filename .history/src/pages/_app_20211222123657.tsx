import "../styles/globals.css";
import type { AppProps } from "next/app";
import auth from "./auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <auth>
      <Component {...pageProps} />
    </auth>
  );
}

export default MyApp;

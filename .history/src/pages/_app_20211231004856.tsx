import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthLayout from "../components/organisms/AuthLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthLayout>
      <Component {...pageProps} />
    </AuthLayout>
  );
}

export default MyApp;

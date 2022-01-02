import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthLayout from "../components/organisms/AuthLayout";

function MyApp({ Component, pageProps }: AppProps) {
  // SSR時のMuiエラー対策
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <AuthLayout>
      <Component {...pageProps} />
    </AuthLayout>
  );
}

export default MyApp;

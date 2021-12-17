if (typeof window != "undefined") {
  var QrReader = require("react-qr-reader");
}
import Component from "react";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Auth from "./Auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;

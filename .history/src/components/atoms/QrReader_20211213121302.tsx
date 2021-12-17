import QrReader from "react-qr-reader";
import { useCallback } from "react-transition-group/node_modules/@types/react";

const QrReaderCustom = () => {
  <QrReader
    delay={300}
    onError={handleError}
    onScan={handleScan}
    style={{ width: "50%" }}
  />;
};

export default QrReaderCustom;

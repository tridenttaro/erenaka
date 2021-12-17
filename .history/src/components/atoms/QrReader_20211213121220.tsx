import QrReader from "react-qr-reader";
import { useCallback } from "react-transition-group/node_modules/@types/react";

const handleScan = useCallback((data) => {
  if (data) {
    // setIsReaderActivate(data);
  }
}, []);

const handleError = (err) => {
  console.error(err);
};

const QrReaderCustom = () => {
  <QrReader
    delay={300}
    onError={handleError}
    onScan={handleScan}
    style={{ width: "50%" }}
  />;
};

export default QrReaderCustom;

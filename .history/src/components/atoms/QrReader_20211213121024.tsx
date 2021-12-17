import QrReader from "react-qr-reader";

const QrReaderCustom = () => {
  <QrReader
    delay={300}
    onError={handleError}
    onScan={handleScan}
    style={{ width: "50%" }}
  />;
};

export default QrReaderCustom;

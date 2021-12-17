import QrReader from "react-qr-reader";
import { useCallback } from "react-transition-group/node_modules/@types/react";

type Props = {
  handleScan: () => void;
};

const QrReaderCustom = (props: Props) => {
  <QrReader
    delay={300}
    onError={(err) => console.error(err)}
    onScan={props.handleScan}
    style={{ width: "50%" }}
  />;
};

export default QrReaderCustom;

import QrReader from "react-qr-reader";
import { useCallback } from "react-transition-group/node_modules/@types/react";

type Props = {
  handleScan: (data: string) => void;
};

const QrReaderCustom = (props: Props) => {
  return (
    <>
      <QrReader
        delay={300}
        onError={(err) => console.error(err)}
        onScan={(data) => props.handleScan(data)}
        style={{ width: "50%" }}
      />
    </>
  );
};

export default QrReaderCustom;

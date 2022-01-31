// import QrReader from "react-qr-reader";
import dynamic from "next/dynamic";
import styles from "../../styles/components/atoms/qrreadercustom.module.scss";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

type Props = {
  handleScan: (data: string | null) => void;
};

const QrReaderCustom = (props: Props) => {
  return (
    <>
      <QrReader
        delay={300}
        onError={(err) => console.error(err)}
        onScan={(data) => props.handleScan(data)}
        className={}
      />
    </>
  );
};

export default QrReaderCustom;

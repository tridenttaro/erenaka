import { NextPage } from "next";
import { useCallback, useState, useEffect } from "react";
import { QrReaderCustom } from "../components/atoms";
import downloadFile from "../lib/firebase/downloadFile";

const QrReaderReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");

  const qrReaderHandleScan = useCallback(
    (data) => {
      if (data === "" || isNaN(parseInt(data, 10))) {
        return;
      } else {
        const keyNum = parseInt(data, 10);
        if (data < 0 || data > 99999) {
          return;
        } else {
          setDownloadKey(data);
          downloadFile({ downloadKey: downloadKey });
        }
      }
    },
    [setDownloadKey, downloadKey]
  );

  return (
    <>
      <QrReaderCustom handleScan={qrReaderHandleScan} />
    </>
  );
};

export default QrReaderReceiveFile;

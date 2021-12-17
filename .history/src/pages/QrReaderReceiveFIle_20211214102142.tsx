import { NextPage } from "next";
import { useCallback, useState, useEffect } from "react";
import downloadFile from "../lib/firebase/downloadFile";

const QrReaderReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");

  const downloadFile_callback = useCallback(() => {
    downloadFile({ downloadKey: downloadKey });
  }, [downloadKey]);

  const qrReaderHandleScan = useCallback(
    (data) => {
      if (data) {
        setDownloadKey(data);
      }
    },
    [setDownloadKey]
  );

  return (
    <>
      <QrReaderCustom handleScan={qrReaderHandleScan} />
    </>
  );
};

export default QrReaderReceiveFile;

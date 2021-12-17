import { NextPage } from "next";
import { useCallback, useState, useEffect } from "react";

const QrReaderReceiveFile: NextPage = () => {
  const qrReaderHandleScan = useCallback(
    (data) => {
      if (data) {
        setDownloadKey(data);
        setIsReaderActivate((prevState) => !prevState);
      }
    },
    [setDownloadKey]
  );
  return <QrReaderCustom handleScan={qrReaderHandleScan} />;
};

export default QrReaderReceiveFile;

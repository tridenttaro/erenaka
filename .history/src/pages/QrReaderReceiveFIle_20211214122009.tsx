import { NextPage } from "next";
import { useCallback, useState } from "react";
import { QrReaderCustom } from "../components/atoms";
import useChangePage from "../hooks/useChangePage";
import downloadFile from "../lib/firebase/downloadFile";

const QrReaderReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [changePage] = useChangePage();

  const qrReaderHandleScan = useCallback(
    (data) => {
      console.log(data);
      if (data === "" || isNaN(parseInt(data, 10))) {
        return;
      } else {
        const keyNum = parseInt(data, 10);
        if (keyNum < 0 || keyNum > 99999) {
          return;
        } else {
          // 読み取った値が正常である
          setDownloadKey(data);
          downloadFile({ downloadKey: downloadKey });
          changePage("/ReceiveFile");
        }
      }
    },
    [setDownloadKey, downloadKey, changePage]
  );

  return (
    <>
      <PrimaryButton
        label={"SEND FILE"}
        onClick={() => uploadFile_callback()}
      />

      <QrReaderCustom handleScan={qrReaderHandleScan} />
    </>
  );
};

export default QrReaderReceiveFile;

import { NextPage } from "next";
import { useCallback, useState, useEffect } from "react";
import { QrReaderCustom } from "../components/atoms";

import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";

const ReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [isReaderActivate, setIsReaderActivate] = useState<boolean>(false);

  const inputReceiveKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  const downloadFile_callback = useCallback(() => {
    downloadFile({ downloadKey: downloadKey });
  }, [downloadKey]);

  const qrReaderHandleScan = useCallback(
    (data) => {
      if (data) {
        setDownloadKey(data);
        setIsReaderActivate((prevState) => !prevState);
      }
    },
    [setDownloadKey]
  );

  const switchReader = useCallback(() => {
    setIsReaderActivate(!isReaderActivate);
  }, [isReaderActivate]);
  return (
    <>
      <h2>RECEIVE FILE</h2>

      <TextInput
        fullWidth={false}
        label={"key"}
        multiline={false}
        required={true}
        onChange={inputReceiveKey}
        rows={1}
        value={downloadKey}
        type={"text"}
      />

      <PrimaryButton
        label={"RECEIVE FILE"}
        onClick={() => downloadFile_callback()}
      />
      <br />
      <br />
      <PrimaryButton
        label={isReaderActivate ? "QR Reader: OFF" : "QR Reader: ON"}
        onClick={switchReader}
      />
      <div>
        {isReaderActivate && <QrReaderCustom handleScan={qrReaderHandleScan} />}
      </div>
    </>
  );
};

export default ReceiveFile;

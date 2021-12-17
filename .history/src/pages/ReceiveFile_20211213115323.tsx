import { NextPage } from "next";
import { useCallback, useState } from "react";
import QrReader from "react-qr-reader";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";

const ReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [isReaderActivate, setIsReaderActivate] = useState<any>();
  const [readerButtonLabel, setRaederButtonLabel] = useState<string>("aaa");

  const inputReceiveKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  const downloadFile_callback = useCallback(() => {
    downloadFile({ downloadKey: downloadKey });
  }, [downloadKey]);

  const handleScan = (data) => {
    if (data) {
      setIsReaderActivate(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const switchReader = useCallback(() => {
    setRaederButtonLabel("iii");
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

      <PrimaryButton label={testText} onClick={switchReader} />
      <div>
        {!isReaderActivate && (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "50%" }}
          />
        )}

        <p>{isReaderActivate}</p>
      </div>
    </>
  );
};

export default ReceiveFile;

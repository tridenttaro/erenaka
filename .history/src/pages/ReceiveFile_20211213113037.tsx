import { NextPage } from "next";
import { useCallback, useState } from "react";
import QrReader from "react-qr-reader";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";

const ReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [testState, setTestState] = useState<any>();

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
      setTestState(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

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

      <div>
        {!testState && (
          <QrReader delay={300} onError={handleError} onScan={handleScan} />
        )}

        <p>{testState}</p>
      </div>
    </>
  );
};

export default ReceiveFile;

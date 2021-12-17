import { NextPage } from "next";
import { useCallback, useState } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";

const ReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");

  const inputReceiveKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  const downloadFile_callback = useCallback(() => {
    downloadFile({ downloadKey: downloadKey });
  }, [downloadKey]);

  return (
    <>
      <h2>RECEIVE FILE AREA</h2>

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
    </>
  );
};

export default ReceiveFile;

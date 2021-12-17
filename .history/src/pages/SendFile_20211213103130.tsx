import { NextPage } from "next";
import QRCode from "qrcode.react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";
import uploadFile from "../lib/firebase/uploadFile";

// テスト用
const SendFile: NextPage = () => {
  const [imageData, setImageData] = useState<File>();
  const [downloadKey, setDownloadKey] = useState<string>("");

  // useCallbackすべきか???
  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
    // console.log("setImagedata: " + iconFile)
  };

  const uploadFile_callback = useCallback(() => {
    uploadFile({ file: imageData });
  }, [imageData]);

  return (
    <>
      <h2>SEND FILE</h2>
      <label>
        <input
          type="file"
          accept="image/*,.png,.jpg,.jpeg"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
        />
      </label>

      <PrimaryButton
        label={"SEND FILE"}
        onClick={() => uploadFile_callback()}
      />
      <br />
      {downloadKey != "" && downloadKey != null && (
        <QRCode value="https://google.com" />
      )}

      <br />
      <PrimaryButton label={"TEST"} onClick={() => {}} />
    </>
  );
};

export default SendFile;

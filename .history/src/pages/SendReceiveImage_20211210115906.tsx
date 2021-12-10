import { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";
import uploadFile from "../lib/firebase/uploadFile";

// テスト用
const SendReceiveImage: NextPage = () => {
  const [imageData, setImageData] = useState<File>();
  const [downloadKey, setDownloadKey] = useState<string>("");

  const inputReceiveKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  // useCallbackすべきか???
  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
    // console.log("setImagedata: " + iconFile)
  };

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
        onClick={() => uploadFile({ file: imageData })}
      />
      <br />
      <br />
      <PrimaryButton label={"TEST"} onClick={() => {}} />
      <br />
      <br />
      <hr />

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
        onClick={() => downloadFile({ downloadKey: downloadKey })}
      />
    </>
  );
};

export default SendReceiveImage;

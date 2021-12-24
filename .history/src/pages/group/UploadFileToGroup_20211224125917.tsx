import { NextPage } from "next";
import { ChangeEvent, useCallback, useState } from "react";
import { PrimaryButton } from "./../../components/atoms";

const UploadFileToGroup: NextPage = () => {
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
    uploadFileToTemp({ file: imageData, setDownloadKey: setDownloadKey });
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
    </>
  );
};

export default UploadFileToGroup;

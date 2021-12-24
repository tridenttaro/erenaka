import { NextPage } from "next";
import QRCode from "qrcode.react";
import { ChangeEvent, useCallback, useState } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import uploadImage from "../lib/firebase/uploadImage";

// テスト用
const UploadFileToTemp: NextPage = () => {
  const [imageData, setImageData] = useState<File>();
  const [downloadKey, setDownloadKey] = useState<string>("");

  // useCallbackすべきか???
  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
    // console.log("setImagedata: " + iconFile)
  };

  const uploadImage_callback = useCallback(() => {
    uploadImage({ image: imageData, setDownloadKey: setDownloadKey });
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
        onClick={() => uploadImage_callback()}
      />
      <br />
      {downloadKey != "" && downloadKey != null && (
        <>
          <QRCode
            value={downloadKey}
            style={{ margin: "30px auto auto 30px" }}
          />
          <p>
            downloadKey: <strong>{downloadKey}</strong>
          </p>
        </>
      )}
    </>
  );
};

export default UploadFileToTemp;

import { NextPage } from "next";
import QRCode from "qrcode.react";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { AuthContext } from "../components/organisms/Auth";
import uploadImage from "../lib/firebase/uploadImage";
import { UserState } from "../types/auth";

// テスト用
const UploadFileToTemp: NextPage = () => {
  const [image, setImage] = useState<File>();
  const [downloadKey, setDownloadKey] = useState<string>("");
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  // useCallbackすべきか???
  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImage(iconFile);
  };

  const uploadImage_callback = useCallback(() => {
    uploadImage({ image, setDownloadKey, userState });
  }, [image, userState]);

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

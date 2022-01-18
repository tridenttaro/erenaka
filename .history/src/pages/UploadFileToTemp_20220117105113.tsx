import { NextPage } from "next";
import QRCode from "qrcode.react";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { SelectBox, TextInput } from "../components/atoms";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { AuthContext } from "../components/organisms/AuthLayout";
import uploadImage from "../lib/firebase/uploadImage";
import { UserState } from "../types/auth";
import { BusinessCardData } from "../types/other";

const UploadFileToTemp: NextPage = () => {
  const [image, setImage] = useState<File>();
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [joinedGroupsInfo, setJoinedGroupsInfo] = useState<
    { id: string; name: string }[]
  >([]);
  const [businessCardData, setBusinessCardData] = useState<BusinessCardData>({
    company: "comp1",
  });
  const [company, setCompany] = useState<string>("");

  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImage(iconFile);
  };

  const uploadImage_callback = useCallback(() => {
    uploadImage({ image, setDownloadKey, userState, businessCardData });
  }, [image, userState, businessCardData]);

  const inputCompany = useCallback((event) => {
    setCompany(event.target.value);
  }, []);
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

      <SelectBox
        label={"アップロード先グループ選択"}
        required={true}
        options={joinedGroupsInfo}
        select={setUpToGroupId}
        value={selectedGroupId}
      />

      {/* <TextInput
        fullWidth={false}
        label={"会社名"}
        multiline={false}
        required={true}
        onChange={inputCompany}
        rows={1}
        value={company}
        type={"text"}
      /> */}

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

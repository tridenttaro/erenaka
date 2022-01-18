import { NextPage } from "next";
import QRCode from "qrcode.react";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SelectBox, TextInput } from "../components/atoms";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { AuthContext } from "../components/organisms/AuthLayout";
import getGroupsInfo from "../lib/firebase/groups/getGroupsInfo";
import uploadImage from "../lib/firebase/uploadImage";
import { UserState } from "../types/auth";
import { BusinessCardData } from "../types/other";

const UploadFileToTemp: NextPage = () => {
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;
  // const joinedGroupsId = userState.joinedGroups;
  const [image, setImage] = useState<File>();
  const [downloadKey, setDownloadKey] = useState<string>("");
  // const [joinedGroupsInfo, setJoinedGroupsInfo] = useState<
  //   { id: string; name: string }[]
  // >([]);
  // const [disabledCompTextInput, setDisabledCompTextInput] = useState(true);

  // 名刺情報用
  const [businessCardData, setBusinessCardData] = useState<BusinessCardData>({
    company: "",
    username: "",
    position: "",
    address: "",
    telephoneNumber: "",
    fax: "",
    email: "",
    others: "",
  });

  // useEffect(() => {
  //   (async () => {
  //     await getGroupsInfo({
  //       joinedGroupsId,
  //       setJoinedGroupsInfo,
  //     });

  //     setJoinedGroupsInfo((prevState) => [
  //       ...prevState,
  //       { id: "other", name: "その他(テキスト入力)" },
  //     ]);
  //   })();
  // }, [joinedGroupsId]);

  // useEffect(() => {
  //   if (company === "oher") setDisabledCompTextInput(false);
  // }, [company]);

  useEffect(() => {
    // setUsername(userState.username);
    setBusinessCardData((prevState: BusinessCardData) => ({
      ...prevState,
      username: userState.username,
    }));
  }, [userState]);

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImage(iconFile);
  };

  const uploadImage_callback = useCallback(() => {
    uploadImage({ image, setDownloadKey, userState, businessCardData });
  }, [image, userState, businessCardData]);

  // 名刺情報用
  const inputCompany = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      company: event.target.value,
    }));
  }, []);
  const inputUsername = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  }, []);
  const inputPositon = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      position: event.target.value,
    }));
  }, []);
  const inputAddress = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      address: event.target.value,
    }));
  }, []);
  const inputTelephoneNumber = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      telephoneNumber: event.target.value,
    }));
  }, []);
  const inputFax = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      fax: event.target.value,
    }));
  const inputEmail = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
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
      <br />

      {/* <SelectBox
        label={"会社名"}
        required={true}
        options={}
        select={setCompany}
        value={company}
      /> */}

      <TextInput
        fullWidth={false}
        label={"会社名"}
        multiline={false}
        required={true}
        onChange={inputCompany}
        rows={1}
        value={businessCardData.company}
        type={"text"}
        // disabled={disabledCompTextInput}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"氏名"}
        multiline={false}
        required={true}
        onChange={inputUsername}
        rows={1}
        value={businessCardData.username}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"部署・役職名"}
        multiline={false}
        required={false}
        onChange={inputPositon}
        rows={1}
        value={businessCardData.position}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"会社住所"}
        multiline={false}
        required={true}
        onChange={inputAddress}
        rows={1}
        value={businessCardData.address}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"電話番号"}
        multiline={false}
        required={true}
        onChange={inputTelephoneNumber}
        rows={1}
        value={businessCardData.telephoneNumber}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"FAX"}
        multiline={false}
        required={false}
        onChange={inputFax}
        rows={1}
        value={businessCardData.fax}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        onChange={inputEmail}
        rows={1}
        value={businessCardData.email}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={true}
        label={"その他"}
        multiline={true}
        required={false}
        onChange={inputOthers}
        rows={3}
        value={businessCardData.others}
        type={"text"}
      />
      <br />
      <br />

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

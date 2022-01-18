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
  const [businessCardData, setBusinessCardData] = useState<BusinessCardData>({
    company: "comp1",
  });

  // 名刺情報用
  const [company, setCompany] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [telephoneNumber, setTelephoneNumber] = useState<string>("");
  const [fax, setFax] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [others, setOthers] = useState<string>("");

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
    setUsername(userState.username);
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
    setCompany(event.target.value);
  }, []);
  const inputUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, []);
  const inputPositon = useCallback((event) => {
    setPosition(event.target.value);
  }, []);
  const inputAddress = useCallback((event) => {
    setAddress(event.target.value);
  }, []);
  const inputTelephoneNumber = useCallback((event) => {
    setTelephoneNumber(event.target.value);
  }, []);
  const inputFax = useCallback((event) => {
    setFax(event.target.value);
  }, []);
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);
  const inputOthers = useCallback((event) => {
    setOthers(event.target.value);
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
        value={company}
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
        value={username}
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
        value={position}
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
        value={address}
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
        value={telephoneNumber}
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
        value={fax}
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
        value={email}
        type={"text"}
      />
      <br />
      <TextInput
        fullWidth={false}
        label={"その他"}
        multiline={true}
        required={false}
        onChange={inputOthers}
        rows={3}
        value={others}
        type={"text"}
      />
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

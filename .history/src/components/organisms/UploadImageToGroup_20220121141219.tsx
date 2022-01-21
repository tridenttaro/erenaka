import { useRouter } from "next/dist/client/router";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./AuthLayout";
import uploadImage from "../../lib/firebase/uploadImage";
import { UserState } from "../../types/auth";
import { PrimaryButton, TextInput } from "../atoms";
import { BusinessCardData } from "../../types/other";

type Props = {
  groupId: string;
  currentDirectory: string[];
  updateImages?: () => void;
};

const UploadImageToGroup = (props: Props) => {
  const { groupId, currentDirectory, updateImages } = props;
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);

  const context = useContext(AuthContext);
  const userState = context?.state as UserState;
  const router = useRouter();

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

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImage(iconFile);
  };

  const uploadFile_callback = useCallback(() => {
    uploadImage({
      image,
      groupId,
      currentDirectory,
      userState,
      businessCardData,
      setBusinessCardData,
      updateImages,
      loading,
      setLoading,
    });
  }, [
    image,
    groupId,
    currentDirectory,
    userState,
    businessCardData,
    updateImages,
    loading,
    setLoading,
  ]);

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
  }, []);
  const inputEmail = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  }, []);
  const inputOthers = useCallback((event) => {
    setBusinessCardData((prevState) => ({
      ...prevState,
      others: event.target.value,
    }));
  }, []);

  return (
    <div>
      <h2>画像アップロード</h2>
      <label>
        <input
          type="file"
          accept="image/*"
          // accept="image/*,.png,.jpg,.jpeg"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
        />
      </label>
      <br />
      <br />
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
        value={businessCardData.position as string}
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
        value={businessCardData.address as string}
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
        value={businessCardData.telephoneNumber as string}
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
        value={businessCardData.email as string}
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
        value={businessCardData.fax as string}
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
        value={businessCardData.others as string}
        type={"text"}
      />
      <br />

      <PrimaryButton
        label={"SEND FILE"}
        onClick={() => uploadFile_callback()}
      />
    </div>
  );
};

export default UploadImageToGroup;

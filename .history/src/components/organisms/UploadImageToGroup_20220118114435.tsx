import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "./AuthLayout";
import uploadImage from "../../lib/firebase/uploadImage";
import { UserState } from "../../types/auth";
import { PrimaryButton } from "../atoms";
import groupStyles from "../../styles/group.module.scss";
import { BusinessCardData } from "../../types/other";

type Props = {
  groupId: string;
  currentDirectory: string[];
  updateImages?: () => void;
};

const UploadImageToGroup = (props: Props) => {
  const { groupId, currentDirectory, updateImages } = props;
  const [image, setImage] = useState<File>();
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
      updateImages,
    });
  }, [image, groupId, currentDirectory, userState, updateImages]);

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

      <PrimaryButton
        label={"SEND FILE"}
        onClick={() => uploadFile_callback()}
      />
    </div>
  );
};

export default UploadImageToGroup;

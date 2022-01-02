import { NextPage } from "next";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../components/organisms/Auth";
import uploadImage from "../../lib/firebase/uploadImage";
import { UserState } from "../../types/auth";
import { PrimaryButton } from "./../../components/atoms";

type Props = {
  groupId: string;
  currentDirectory: string[];
};

const UploadFileToGroup = ({ groupId, currentDirectory }: Props) => {
  const [imageData, setImageData] = useState<File>();
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
  };

  const uploadFile_callback = useCallback(() => {
    // const cdStr = currentDirectory.join("/")
    // const path = (currentDirectory.length > 0) ? `groups/${cdStr}/${groupId}` : `groups/${groupId}`
    let path = `groups/${groupId}`;
    if (currentDirectory.length > 0)
      path = `groups/${currentDirectory.join("/")}/${groupId}`;
    uploadImage({
      image: imageData,
      path: path,
      userState: contextUserState,
    });
  }, [imageData, groupId, currentDirectory, contextUserState]);

  return (
    <>
      <h2>SEND FILE</h2>
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
    </>
  );
};

export default UploadFileToGroup;

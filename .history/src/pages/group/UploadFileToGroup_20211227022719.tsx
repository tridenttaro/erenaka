import { NextPage } from "next";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../components/organisms/Auth";
import uploadImage from "../../lib/firebase/uploadImage";
import { UserState } from "../../types/auth";
import { PrimaryButton } from "./../../components/atoms";

type Props = {
  groupId: string;
  currentDirectory={currentDirectory}
};

const UploadFileToGroup = ({ groupId }: Props) => {
  const [imageData, setImageData] = useState<File>();
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
  };

  const uploadFile_callback = useCallback(() => {
    uploadImage({
      image: imageData,
      path: `groups/${groupId}`,
      userState: contextUserState,
    });
  }, [imageData, groupId, contextUserState]);

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

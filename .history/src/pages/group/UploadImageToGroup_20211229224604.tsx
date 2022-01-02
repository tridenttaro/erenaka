import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../../components/organisms/Auth";
import uploadImage from "../../lib/firebase/uploadImage";
import { UserState } from "../../types/auth";
import { PrimaryButton } from "../../components/atoms";

type Props = {
  groupId: string;
  currentDirectory: string[];
  updateImages: () => void;
};

const UploadImageToGroup = (props: Props) => {
  const { groupId, currentDirectory, updateImages } = props;

  const [imageData, setImageData] = useState<File>();
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const router = useRouter();

  useEffect(() => {
    setImageData(undefined);
  }, [router]);

  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
  };

  const uploadFile_callback = useCallback(() => {
    uploadImage({
      image: imageData,
      setImageData: setImageData,
      groupId: groupId,
      currentDirectory: currentDirectory,
      userState: contextUserState,
    });
  }, [imageData, setImageData, groupId, currentDirectory, contextUserState]);

  return (
    <>
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
    </>
  );
};

export default UploadImageToGroup;

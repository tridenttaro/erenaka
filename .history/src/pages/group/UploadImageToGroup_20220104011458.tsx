import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { AuthContext } from "../../components/organisms/AuthLayout";
import uploadImage from "../../lib/firebase/uploadImage";
import { UserState } from "../../types/auth";
import { PrimaryButton } from "../../components/atoms";
import groupStyles from "../../styles/group.module.scss";

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

  // useEffect(() => {
  //   setImage(undefined);
  // }, [router]);

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

  return (
    <div className={groupStyles.wrapper}>
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

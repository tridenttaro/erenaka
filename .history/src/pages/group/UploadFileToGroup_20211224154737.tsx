import { NextPage } from "next";
import { ChangeEvent, useCallback, useState } from "react";
import uploadImage from "../../lib/firebase/uploadImage";
import { PrimaryButton } from "./../../components/atoms";

type Props = {
  groupId: string;
};

const UploadFileToGroup = ({ groupId }: Props) => {
  const [imageData, setImageData] = useState<File>();

  // useCallbackすべきか???
  const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const iconFile: File = e.target.files[0];
    setImageData(iconFile);
  };

  const uploadFile_callback = useCallback(() => {
    uploadImage({
      image: imageData,
      path: `groups/${groupId}`,
    });
  }, [imageData, groupId]);

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

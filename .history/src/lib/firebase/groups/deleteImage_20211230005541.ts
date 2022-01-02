import { deleteObject, ref } from "firebase/storage";
import { storage } from "..";

type Props = {
  imageId: string;
  groupId: string;
  currentDirectory: string[];
};

const deleteImage = async (props: Props) => {
  const { imageId, groupId, currentDirectory } = props;

  const cdStr =
    currentDirectory.length > 0 ? "/" + currentDirectory.join("/") : "";
  const storageRef = ref(storage, `groups/${groupId}${cdStr}/${imageId}`);

  try {
    await deleteObject(storageRef);
  } catch (error) {
    alert("削除に失敗しました。");
  }
};

export default deleteImage;

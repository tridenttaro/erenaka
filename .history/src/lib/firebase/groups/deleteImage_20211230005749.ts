import { doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "..";

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

  let storeRef = doc(db, "groups", groupId, "images", imageId);
  if (currentDirectory.length > 0) {
    const cdStr: string[] = [];
    cdStr.push("directories");
    currentDirectory.forEach((dir, i) => {
      cdStr.push(dir);
      i < currentDirectory.length - 1 && cdStr.push("directories");
    });
    cdStr.push("images");

    storeRef = doc(db, "groups", groupId, ...cdStr, newFileName);
  }

  try {
    await deleteObject(storageRef);
  } catch (error) {
    alert("削除に失敗しました。");
  }
};

export default deleteImage;

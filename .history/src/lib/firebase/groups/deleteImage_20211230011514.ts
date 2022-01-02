import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "..";

type Props = {
  imageId: string;
  groupId: string;
  currentDirectory: string[];
  updateImages: () => void;
};

const deleteImage = async (props: Props) => {
  const { imageId, groupId, currentDirectory, updateImages } = props;

  const cdStr =
    currentDirectory.length > 0 ? "/" + currentDirectory.join("/") : "";
  const storageRef = ref(storage, `groups/${groupId}${cdStr}/${imageId}`);

  let storeRef = doc(db, "groups", groupId, "images", imageId);
  if (currentDirectory.length > 0) {
    const cdStr2: string[] = [];
    cdStr2.push("directories");
    currentDirectory.forEach((dir, i) => {
      cdStr2.push(dir);
      i < currentDirectory.length - 1 && cdStr2.push("directories");
    });
    cdStr2.push("images");

    storeRef = doc(db, "groups", groupId, ...cdStr2, imageId);
  }

  try {
    const result = confirm("画像を削除します。よろしいですか？");

    if (result) {
      await deleteObject(storageRef);

      await deleteDoc(storeRef);

      // 画面を更新
      updateImages();
    } else {
      return;
    }
  } catch (error) {
    alert("削除に失敗しました。");
  }
};

export default deleteImage;

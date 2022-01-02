import { doc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { db, storage } from "..";

type Props = {
  groupId: string;
  currentDirectory: string[];
};

const getImages = async (props: Props) => {
  const { groupId, currentDirectory } = props;

  let storeRef = doc(db, "groups", groupId, "images");
  if (currentDirectory && currentDirectory.length > 0) {
    const cdStr: string[] = [];
    cdStr.push("directories");
    currentDirectory.forEach((dir, i) => {
      cdStr.push(dir);
      i < currentDirectory.length - 1 && cdStr.push("directories");
    });
    cdStr.push("images");

    storeRef = doc(db, "groups", groupId, ...cdStr);
  }

  try {
    // const response =
  } catch (error) {}
};

export default getImages;

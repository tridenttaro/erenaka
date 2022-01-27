import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "..";
import { DirectoryData } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  groupId: string;
  currentDirectory: string[];
  setDirectories: (dirs: DirectoryData[]) => void;
};

const getDirectories = async ({
  groupId,
  currentDirectory,
  setDirectories,
}: Props) => {
  const directories: DirectoryData[] = [];

  let ref = collection(db, "groups", groupId, "directories");

  if (currentDirectory != [] && currentDirectory.length > 0) {
    const storePath: string[] = [];
    currentDirectory.forEach((dir, i) => {
      storePath.push(dir);
      storePath.push("directories");
    });
    ref = collection(db, "groups", groupId, "directories", ...storePath);
  }

  try {
    const dirSnaps = await getDocs(ref);
    dirSnaps.forEach((dirDoc) => {
      const docData = dirDoc.data();
      const createdAt = datetimeToString({ timeStamp: docData.createdAt });
      const updatedAt = datetimeToString({ timeStamp: docData.updatedAt });
      directories.push({
        createdAt: createdAt,
        directoryName: docData.directoryName,
        createdUid: docData.createdUid,
        updatedAt: updatedAt,
      });
    });

    setDirectories(directories);
  } catch (error) {
    return;
  }
};

export default getDirectories;

import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "..";
import { DirectoryInfo } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  groupId: string;
  currentDirectory: string[];
};

const getDirectories = async ({ groupId, currentDirectory }: Props) => {
  const directories: DirectoryInfo[] = [];

  let ref = collection(db, "groups", groupId, "directories");

  if (currentDirectory != [] && currentDirectory.length > 0) {
    const storePath: string[] = [];
    currentDirectory.forEach((dir, i) => {
      storePath.push(dir);
      storePath.push("directories");
    });
    ref = collection(db, "groups", groupId, "directories", ...storePath);
  }

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

  return directories;
};

export default getDirectories;

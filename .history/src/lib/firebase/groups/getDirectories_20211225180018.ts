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

  // const listRef = ref(storage, props.path);

  // // Find all the prefixes and items.
  // listAll(listRef)
  //   .then((res) => {
  //     res.prefixes.forEach((folderRef) => {
  //       // console.log(folderRef.name);
  //       directories.push(folderRef.name);
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  let ref = collection(db, "groups", groupId, "storageDirectory");
  if (currentDirectory != []) {
    ref = collection(
      db,
      "groups",
      groupId,
      "storageDirectory",
      ...currentDirectory
    );
    // for (const dir of currentDirectory) {
    // }
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

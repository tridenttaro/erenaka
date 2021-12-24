import { collection, getDocs } from "firebase/firestore";
import { listAll, ref } from "firebase/storage";
import { db, storage } from ".";
import { DirectoryInfo } from "../../types/other";

type Props = {
  groupId: string;
};

const getDirectories = async ({ groupId }: Props) => {
  const directories: DirectoryInfo = [];

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

  const dirSnaps = await getDocs(
    collection(db, "groups", groupId, "storageDirectory")
  );
  dirSnaps.forEach((dirDoc) => {
    const docData = dirDoc.data();
    directories.push({
      createdAt: docData.createdAt,
      directoryName: docData.directoryName,
      createdUid: docData.createdUid,
      updatedAt: docData.updatedAt,
    });
  });

  return directories;
};

export default getDirectories;

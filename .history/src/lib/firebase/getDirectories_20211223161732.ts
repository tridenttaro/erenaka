import { collection, getDocs } from "firebase/firestore";
import { listAll, ref } from "firebase/storage";
import { db, storage } from ".";

type Props = {
  groupId: string;
};

const getDirectories = ({ groupId }: Props) => {
  const directories: string[] = [];

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
    directories.push(docData.directoryName);
  });

  return directories;
};

export default getDirectories;

import { collection, getDocs } from "firebase/firestore";
import { listAll, ref } from "firebase/storage";
import { db, storage } from ".";

type Props = {
  path: string;
};

const getDirectories = (props: Props) => {
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

  const dirSnaps = await getDocs(collection(db, "groups", groupId, "storageDirectory"));
  dirSnaps.forEach((groupsDoc) => {
    const docData = groupsDoc.data();
  }

  return directories;
};

export default getDirectories;

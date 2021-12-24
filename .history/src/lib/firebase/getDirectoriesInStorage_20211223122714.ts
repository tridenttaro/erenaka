import { listAll, ref } from "firebase/storage";
import { storage } from ".";

type Props = {
  path: string;
};

const getDirectoriesInStorage = (props: Props) => {
  const directories: string[] = [];

  const listRef = ref(storage, props.path);

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // console.log(folderRef.name);
        directories.push(folderRef.name);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  return directories;
};

export default getDirectoriesInStorage;

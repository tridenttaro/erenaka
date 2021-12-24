import { listAll, ref } from "firebase/storage";
import { storage } from ".";

type Props = {
  path: string;
};

const getDirectoriesInStorage = async (props: Props) => {
  const directories: string[] = [];

  const listRef = ref(storage, props.path);

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log(folderRef.name);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export default getDirectoriesInStorage;

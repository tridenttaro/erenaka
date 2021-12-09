import { listAll, ref } from "@firebase/storage";
import { storage } from "../../firebase";

type Props = {
  file?: File;
};

const uploadFile = (props: Props) => {
  if (!props.file) return;

  const storageFilesNames: string[] = [];

  const listRef = ref(storage, "temp");
  listAll(listRef)
    .then((res) => {
      // res.prefixes.forEach((folderRef) => {
      //   console.log("folderRef");
      //   console.log(folderRef);
      // });
      res.items.forEach((itemRef) => {
        const uploadedFileName = itemRef.name.split(".")[0];
        storageFilesNames.push(uploadedFileName);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.error(error);
    });

  console.log(storageFilesNames);

  // const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const S = "0123456789";
  const N = 5;
  while (true) {
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    if (!storageFilesNames.includes(fileName)) break;
  }
};
export default uploadFile;

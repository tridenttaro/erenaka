import { listAll, ref } from "@firebase/storage";
import { storage } from "../../firebase";

type Props = {
  file?: File;
};

const uploadFile = (props: Props) => {
  // if (!props.file) return;

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
      console.error(error);
    });

  console.log(storageFilesNames[1]);

  // const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const S = "0123456789";
  const N = 5;
  while (true) {
    // const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    //   .map((n) => S[n % S.length])
    //   .join("");
    const fileName = "白";
    console.log(fileName);

    if (!storageFilesNames.includes(fileName)) {
      console.log("ファイル名不一致");
      break;
    }

    if (storageFilesNames.includes(fileName)) {
      console.log("ファイル名が一致してしまった");
      break;
    }
  }
};
export default uploadFile;

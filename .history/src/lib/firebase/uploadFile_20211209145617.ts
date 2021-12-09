import { listAll, ref, uploadBytes } from "@firebase/storage";
import { storage } from ".";

type Props = {
  file?: File;
};

const uploadFile = (props: Props) => {
  if (!props.file) return;

  const file = props.file as File;

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

      // const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      const S = "0123456789";
      const N = 5;
      let fileName = "";
      while (true) {
        fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");

        console.log(fileName);

        if (!storageFilesNames.includes(fileName)) {
          break;
        }
      }

      // const tempImageRef = ref(storage, `temp/${fileName}`)
      const storageRef = ref(storage, "temp");
      const metadata = {
        name: fileName,
      };
      uploadBytes(storageRef, file, metadata).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
export default uploadFile;

import { listAll, ref, uploadBytes } from "@firebase/storage";
import { storage } from ".";

type Props = {
  file?: File;
};

const uploadFile = (props: Props) => {
  if (!props.file) return;

  // 元画像ベースにファイル名を変更して、新しく画像を作成する為の情報
  const file = props.file as File;
  const fileName = file.name;
  const fileExtention = fileName.substring(fileName.lastIndexOf(".") + 1);
  const blob = file.slice(0, file.size, file.type);

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
      let newFileName = "";
      while (true) {
        newFileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");

        console.log(fileName);

        if (!storageFilesNames.includes(fileName)) {
          break;
        }
      }
      // 元画像から名前を変更した、ファイルオブジェクトを作成
      const renamedFile = new File([blob], `${newFileName}.` + fileExtention, {
        type: file.type,
      });

      // const tempImageRef = ref(storage, `temp/${fileName}`)
      const storageRef = ref(storage, "temp/");

      uploadBytes(storageRef, renamedFile).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
export default uploadFile;

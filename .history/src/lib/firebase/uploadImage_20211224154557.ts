import { listAll, ref, uploadBytes } from "@firebase/storage";
import { storage } from ".";

type Props = {
  image?: File;
  path?: string;
  setDownloadKey?: (str: string) => void;
};

const uploadImage = (props: Props) => {
  if (!props.image) return;

  let path = "temp";
  if (props.path && !(props.path == "")) {
    path = props.path;
  }
  const { image: file, setDownloadKey } = props;

  // 元画像ベースにファイル名を変更して、新しく画像を作成する為の情報
  const trueFileName = file.name;
  const fileExtention = trueFileName.substring(
    trueFileName.lastIndexOf(".") + 1
  );
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

      const S = "0123456789";
      const N = 5;
      let newFileName = "";
      while (true) {
        newFileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");

        if (!storageFilesNames.includes(newFileName)) {
          break;
        }
      }
      // 元画像から名前を変更した、ファイルオブジェクトを作成
      const renamedFile = new File([blob], `${newFileName}.` + fileExtention, {
        type: file.type,
      });

      const storageRef = ref(storage, `temp/${newFileName}`);
      // メタデータに元のファイル名を持たせる
      const metadata = {
        customMetadata: {
          trueFileName: trueFileName,
        },
      };
      // アップロード
      uploadBytes(storageRef, renamedFile, metadata).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      // ダウンロードキーを設定(画像交換時)
      setDownloadKey(newFileName);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default uploadImage;

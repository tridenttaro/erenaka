import { listAll, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from ".";
import { UserState } from "../../types/auth";

type Props = {
  image?: File;
  setImageData: (image: File | undefined) => void;
  groupId?: string;
  currentDirectory?: string[];
  setDownloadKey?: (str: string) => void;
  userState: UserState;
};

const uploadImage = async (props: Props) => {
  if (!props.image) return;

  const { image, groupId, currentDirectory, userState } = props;

  let storagePath = "temp";
  if (groupId) {
    storagePath = `groups/${props.groupId}`;

    if (currentDirectory && currentDirectory.length > 0) {
      storagePath += `/${currentDirectory.join("/")}`;
    }
  }

  // 元画像ベースにファイル名を変更して、新しく画像を作成する為の情報
  const trueFileName = image.name;
  const fileExtention = trueFileName.substring(
    trueFileName.lastIndexOf(".") + 1
  );
  const blob = image.slice(0, image.size, image.type);

  const storageFilesNames: string[] = [];
  const listRef = ref(storage, storagePath);

  try {
    const response = await listAll(listRef);
    response.items.forEach((itemRef) => {
      const uploadedFileName = itemRef.name.split(".")[0];
      storageFilesNames.push(uploadedFileName);
    });

    // 乱数6桁のファイル名生成
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
      type: image.type,
    });

    const storageRef = ref(storage, `${storagePath}/${newFileName}`);
    // メタデータに元のファイル名を持たせる(名刺交換用)
    const metadata = {
      customMetadata: {
        trueFileName: trueFileName,
        uploadedUid: userState.uid,
      },
    };
    await uploadBytes(storageRef, renamedFile, metadata);

    // firestoreに登録(名刺交換時を除く)
    if (groupId) {
      const downloadUrl = await getDownloadURL(storageRef);

      let storeRef = doc(db, "groups", groupId, "images", newFileName);
      if (currentDirectory && currentDirectory.length > 0) {
        const cdStr: string[] = [];
        cdStr.push("directories");
        currentDirectory.forEach((dir, i) => {
          cdStr.push(dir);
          i < currentDirectory.length - 1 && cdStr.push("directories");
        });
        cdStr.push("images");

        storeRef = doc(db, "groups", groupId, ...cdStr, newFileName);
      }
      const timestamp = Timestamp.now();
      const imageData = {
        imageId: newFileName,
        createdAt: timestamp,
        fileName: trueFileName,
        uploadedUid: userState.uid,
        downloadUrl: downloadUrl,
      };

      await setDoc(storeRef, imageData);
    }

    // ダウンロードキーを設定(画像交換時)
    if (props.setDownloadKey) {
      props.setDownloadKey(newFileName);
    }

    // props.setImageData(undefined);

    alert("画像のアップロードが完了しました");
  } catch (error) {}
};
export default uploadImage;

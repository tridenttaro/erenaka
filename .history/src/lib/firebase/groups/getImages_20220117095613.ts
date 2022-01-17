import { collection, doc, getDocs } from "firebase/firestore";
import { ref } from "firebase/storage";
import { db, storage } from "..";
import { ImageData } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  groupId: string;
  currentDirectory: string[];
  inputImages: (images: ImageData[]) => void;
};

const getImages = async (props: Props) => {
  const { groupId, currentDirectory, inputImages } = props;
  const imageDataList: ImageData[] = [];

  let storeRef = collection(db, "groups", groupId, "images");
  if (currentDirectory && currentDirectory.length > 0) {
    const cdStr: string[] = [];
    cdStr.push("directories");
    currentDirectory.forEach((dir, i) => {
      cdStr.push(dir);
      i < currentDirectory.length - 1 && cdStr.push("directories");
    });
    cdStr.push("images");

    storeRef = collection(db, "groups", groupId, ...cdStr);
  }

  try {
    const snapshots = await getDocs(storeRef);
    snapshots.forEach((doc) => {
      const docData = doc.data();
      const {
        imageId,
        createdAt,
        fileName,
        uploadedUid,
        downloadUrl,
        ...businessCardData
      } = docData;
      const createdAt = datetimeToString({ timeStamp: docData.createdAt });

      imageDataList.push({
        imageId: docData.imageId,
        createdAt: createdAt,
        fileName: docData.fileName,
        uploadedUid: docData.uploadedUid,
        downloadUrl: docData.downloadUrl,
      });
    });

    // return imageDataList;
    inputImages(imageDataList);

    return "OK";
  } catch (error) {
    return [];
  }
};

export default getImages;

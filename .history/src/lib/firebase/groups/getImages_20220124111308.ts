import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db, storage } from "..";
import { BusinessCardData, ImageData } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  groupId: string;
  currentDirectory: string[];
  setImageDataList: (images: ImageData[]) => void;
  page: number;
  perPage: number;
  setAllImagesCount: (count: number) => void;
};

const getImages = async (props: Props) => {
  const {
    groupId,
    currentDirectory,
    setImageDataList,
    page,
    perPage,
    setAllImagesCount,
  } = props;

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

  const q1 = query(storeRef, orderBy("updated_at", "desc"));

  try {
    // const snapshots = await getDocs(storeRef);
    const snapshots = await getDocs(q1);
    let index = 0;
    if (page === 1) {
      snapshots.forEach((snapshot) => {
        if (index < perPage) {
          const docData = snapshot.data();

          const {
            imageId,
            createdAt,
            fileName,
            uploadedUid,
            downloadUrl,
            ...businessCardData
          } = docData;
          const createdAtStr = datetimeToString({ timeStamp: createdAt });

          imageDataList.push({
            imageId: imageId as string,
            createdAt: createdAtStr,
            fileName: fileName as string,
            uploadedUid: uploadedUid as string,
            downloadUrl: downloadUrl as string,
            ...(businessCardData as BusinessCardData),
          });
        }

        index++;
      });
    } else {
      const prevItems = (page - 1) * perPage;
      snapshots.forEach((snapshot) => {
        if (index > prevItems - 1 && index < prevItems + perPage) {
          const docData = snapshot.data();

          const {
            imageId,
            createdAt,
            fileName,
            uploadedUid,
            downloadUrl,
            ...businessCardData
          } = docData;
          const createdAtStr = datetimeToString({ timeStamp: createdAt });

          imageDataList.push({
            imageId: imageId as string,
            createdAt: createdAtStr,
            fileName: fileName as string,
            uploadedUid: uploadedUid as string,
            downloadUrl: downloadUrl as string,
            ...(businessCardData as BusinessCardData),
          });
        }

        index++;
      });
    }

    setAllImagesCount(index);

    // ページング実装前のコード
    // snapshots.forEach((doc) => {
    //   const docData = doc.data();
    //   const {
    //     imageId,
    //     createdAt,
    //     fileName,
    //     uploadedUid,
    //     downloadUrl,
    //     ...businessCardData
    //   } = docData;
    //   const createdAtStr = datetimeToString({ timeStamp: createdAt });

    //   imageDataList.push({
    //     imageId: imageId as string,
    //     createdAt: createdAtStr,
    //     fileName: fileName as string,
    //     uploadedUid: uploadedUid as string,
    //     downloadUrl: downloadUrl as string,
    //     ...(businessCardData as BusinessCardData),
    //   });
    // });

    setImageDataList(imageDataList);

    return "OK";
  } catch (error) {
    return [];
  }
};

export default getImages;

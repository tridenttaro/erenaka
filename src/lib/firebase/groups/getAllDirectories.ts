import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "..";
import { JoinedGroups } from "../../../components/organisms";
import { AllDirectoryData, DirectoryData } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  joinedGroupsId: string[];

  setAllDirectories: (dir: AllDirectoryData) => void;
};

const getAllDirectories = async ({
  joinedGroupsId,
  setAllDirectories,
}: Props) => {
  const allDirectories: AllDirectoryData = {};

  try {
    for (const groupId of joinedGroupsId) {
      // まずグループ直下のディレクトリを取得
      let ref = collection(db, "groups", groupId, "directories");

      const dirSnaps = await getDocs(ref);
      dirSnaps.forEach((dirDoc) => {
        const data = dirDoc.data();
        const createdAt = datetimeToString({ timeStamp: data.createdAt });
        const updatedAt = datetimeToString({ timeStamp: data.updatedAt });
        allDirectories[groupId].push({
          createdAt: createdAt,
          directoryName: data.directoryName,
          createdUid: data.createdUid,
          updatedAt: updatedAt,
        });
      });
    }

    setAllDirectories(allDirectories);
  } catch (e) {}
  //   if (allDirectories.length > 0) {
  //     // グループ直下のディレクトリ直下のディレクトリを取得
  //     for (const directory of allDirectories) {
  //     }
  //   }
  // } catch (error) {
  //   return;
  // }

  // let ref = collection(db, "groups", groupId, "directories");
  // if (currentDirectory != [] && currentDirectory.length > 0) {
  //   const storePath: string[] = [];
  //   currentDirectory.forEach((dir, i) => {
  //     storePath.push(dir);
  //     storePath.push("directories");
  //   });
  //   ref = collection(db, "groups", groupId, "directories", ...storePath);
  // }

  // try {
  //   const dirSnaps = await getDocs(ref);
  //   dirSnaps.forEach((dirDoc) => {
  //     const docData = dirDoc.data();
  //     const createdAt = datetimeToString({ timeStamp: docData.createdAt });
  //     const updatedAt = datetimeToString({ timeStamp: docData.updatedAt });
  //     directories.push({
  //       createdAt: createdAt,
  //       directoryName: docData.directoryName,
  //       createdUid: docData.createdUid,
  //       updatedAt: updatedAt,
  //     });
  //   });
  // } catch (error) {
  //   return;
  // }
};

export default getAllDirectories;

import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { GroupData } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  joinedGroupsId: string[];
  setGroupsInfo: (
    groupInfo: GroupData[] | { id: string; name: string }[]
  ) => void;
  downloadFilePageFlag?: boolean;
};

const getGroupsInfo = async (props: Props) => {
  // 名刺交換時以外
  if (!props.downloadFilePageFlag) {
    const groupsInfo: GroupData[] = [];
    for (const id of props.joinedGroupsId) {
      const docRef = doc(db, "groups", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        const createdAt = datetimeToString({ timeStamp: docData.createdAt });
        const updatedAt = datetimeToString({ timeStamp: docData.updatedAt });

        groupsInfo.push({
          createdAt: createdAt,
          createdUid: docData.createdUid,
          groupId: id,
          groupName: docData.groupName,
          updatedAt: updatedAt,
        });
      }
    }

    props.setGroupsInfo(groupsInfo);
  } else {
    const groupsInfo: { id: string; name: string }[] = [];

    for (const id of props.joinedGroupsId) {
      const docRef = doc(db, "groups", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();

        groupsInfo.push({
          id: id,
          name: docData.groupName,
        });
      }
    }

    props.setGroupsInfo(groupsInfo);
  }
};

export default getGroupsInfo;
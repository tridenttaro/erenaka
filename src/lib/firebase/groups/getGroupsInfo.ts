import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { GroupInfo } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  joinedGroupsId: string[];
  setGroupsInfo: (groupInfo: GroupInfo[]) => void;
};

const getGroupsInfo = async (props: Props) => {
  const groupsInfo: GroupInfo[] = [];
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
};

export default getGroupsInfo;

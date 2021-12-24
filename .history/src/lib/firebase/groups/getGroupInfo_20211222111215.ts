import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { GroupInfo } from "../../../types/other";

const datetimeToString = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2)
  );
};

type Props = {
  joinedGroupsId: string[];
  setGroupsInfo: (groupInfo: GroupInfo[]) => void;
};

const joinedGroups = async (props: Props) => {
  const groupsInfo: GroupInfo[] = [];
  for (const id of props.joinedGroupsId) {
    const docRef = doc(db, "groups", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const createdAt = datetimeToString(
        (docData.createdAt as Timestamp).toDate()
      );
      const updatedAt = datetimeToString(
        (docData.updatedAt as Timestamp).toDate()
      );

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

export default joinedGroups;

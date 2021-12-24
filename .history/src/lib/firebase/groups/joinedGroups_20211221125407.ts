import { doc, getDoc } from "firebase/firestore";
import { db } from "..";
import { GroupInfo } from "../../../types/other";

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
      groupsInfo.push({
        createdAt: createdAt,
        createdUid: docData.createdUid,
        groupId: id,
        groupName: docData.groupName,
        updatedAt: updatedAt,
      });
    }
  }
};

export default joinedGroups;

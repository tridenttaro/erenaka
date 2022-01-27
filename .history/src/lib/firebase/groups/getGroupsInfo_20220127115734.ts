import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { GroupData } from "../../../types/other";
import datetimeToString from "../../datetimeToString";

type Props = {
  joinedGroupsId: string[];
  setGroupsInfo?: (groupInfo: GroupData[]) => void;
  // 名刺交換時
  setJoinedGroupsInfo?: (groupInfo: { id: string; name: string }[]) => void;
};

const getGroupsInfo = async (props: Props) => {
  try {
    // 名刺交換時以外
    if (props.setGroupsInfo && !props.setJoinedGroupsInfo) {
      // if (!props.setGroupsInfo) return;

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
      // 送信先フォルダのセレクトボックス選択時や、
      // 表示中のグループの情報取得

      if (!props.setJoinedGroupsInfo) return;

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

      props.setJoinedGroupsInfo(groupsInfo);
    }
    console.log("せいこう");
  } catch (error) {
    console.log("えらーｚ");
  }
};

export default getGroupsInfo;

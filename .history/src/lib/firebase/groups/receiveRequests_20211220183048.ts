import { UserState } from "../../../types/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";
import createGroup from "./createGroup";

type Props = {
  userState: UserState;
  setRequestsList: (requestsList: RequestItem[]) => void;
};
const receiveRequests = async (props: Props) => {
  const { userState } = props;

  // 参加グループがない=作成したグループがない=実行しない
  if (
    !userState.joinedGroups ||
    userState.joinedGroups === [] ||
    userState.joinedGroups === [""]
  ) {
    return;
  }

  const joinedGroups = userState.joinedGroups;
  // 自身が管理者(作成者)であるグループのリスト
  const createdGroups: string[] = [];

  const groupsSnapshots = await getDocs(collection(db, "groups"));
  groupsSnapshots.forEach((groupsDoc) => {
    const groupsDocData = groupsDoc.data();

    joinedGroups.forEach((joinedGroup) => {
      // 自身が参加しているグループを探査
      if (joinedGroup === groupsDocData.groupId) {
        console.log("参加グループ: " + groupsDocData.groupId);
        // 自身が管理者(作成者)である場合のみグループの参加を許す
        if (userState.uid === groupsDocData.createdUid) {
          console.log("自身が作成したグループを発見");
          createdGroups.push(groupsDocData.groupId);
        }
      }
    });
  });

  console.log("createdGroups!!");
  console.log(createdGroups);

  if (createdGroups.length > 0) {
    const requestsList: RequestItem[] = [];
    // ※forEachは非同期に非対応のためfor.ofを使用
    for (const group of createdGroups) {
      const requestsSnapshots = await getDocs(
        collection(db, "groups", group, "requests")
      );

      requestsSnapshots.forEach((doc) => {
        const docData = doc.data();

        requestsList.push({
          requestId: docData.requestId,
          requestedUid: docData.requestedUid,
          groupId: group,
          createdAt: docData.createdAt,
        });
      });
    }

    props.setRequestsList(requestsList);
  }
};

export default receiveRequests;

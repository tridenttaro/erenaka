import { UserState } from "../../../types/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

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

  // 参加しているグループをリスト化(現時点では一つのみ)
  const joinedGroupIds: string[] = [];
  joinedGroupIds.push(userState.groupId1);
  // 自身が管理者(作成者)であるグループのリスト
  const createdGroupIds: string[] = [];

  const groupsSnapshots = await getDocs(collection(db, "groups"));
  groupsSnapshots.forEach((groupsDoc) => {
    const groupsDocData = groupsDoc.data();
    joinedGroupIds.forEach((joinedGroupId) => {
      console.log("doc.data()");
      console.log(groupsDocData);

      if (joinedGroupId === groupsDocData.groupId) {
        console.log("参加したグループを発見");

        // 管理者(作成者)のみがグループの参加を許す
        if (userState.uid === groupsDocData.createdUid) {
          console.log("自身が作成したグループを発見");
          createdGroupIds.push(groupsDocData.groupId);
        }
      }
    });
  });

  if (createdGroupIds.length > 0) {
    const requestsList: RequestItem[] = [];
    // ※forEachは非同期に非対応
    for (const createdGroupId of createdGroupIds) {
      const requestsSnapshots = await getDocs(
        collection(db, "groups", createdGroupId, "requests")
      );

      requestsSnapshots.forEach((requestsDoc) => {
        const requestsDocData = requestsDoc.data();

        requestsList.push({
          requestedUid: requestsDocData.requestedUid,
          groupId: createdGroupId,
          createdAt: requestsDocData.createdAt,
        });
      });
    }

    props.setRequestsList(requestsList);
  }
};

export default receiveRequests;

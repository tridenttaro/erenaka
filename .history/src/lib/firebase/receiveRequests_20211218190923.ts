import { UserState } from "../../types/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { RequestsList } from "../../types/other";

type Props = {
  userState: UserState;
  setRequestsList: (requestsList: RequestsList) => void;
};
const receiveRequests = async (props: Props) => {
  const { userState } = props;

  // 参加グループがない=作成したグループがない=禁止
  if (!userState.groupId1 || userState.groupId1 === "") return;

  // 参加しているグループをリスト化(現時点では一つのみ)
  const joinedGroupIds: string[] = [];
  joinedGroupIds.push(userState.groupId1);
  // 自身が管理者(作成者)であるグループのリスト
  const createdGroupIds: string[] = [];

  // const docRef = doc(db, "groups", userState.groupId1);
  // const docSnap = await getDoc(docRef);

  const groupsSnapshots = await getDocs(collection(db, "groups"));
  groupsSnapshots.forEach((groupsDoc) => {
    const groupsDocData = groupsDoc.data();
    joinedGroupIds.forEach((joinedGroupId) => {
      console.log("doc.data()");
      console.log(groupsDocData);

      if (joinedGroupId === groupsDocData.group_id) {
        console.log("参加したグループを発見");

        // 管理者(作成者)のみがグループの参加を許す
        if (userState.uid === groupsDocData.created_uid) {
          console.log("自身が作成したグループを発見");
          createdGroupIds.push(groupsDocData.group_id);
        }
      }
    });
  });

  if (createdGroupIds.length > 0) {
    // ※forEachは非同期に非対応
    for (const createdGroupId of createdGroupIds) {
      const requestsSnapshots = await getDocs(
        collection(db, "groups", createdGroupId, "requests")
      );
      requestsSnapshots.forEach((requestsDoc) => {
        const requestsDocData = requestsDoc.data();
        const requestsList = {};
      });
    }
  }

  // if (docSnap.exists()) {
  //   const docData = docSnap.data();
  //   const created_uid = docData.created_uid;

  //   if (created_uid == userState.uid) {
  //   }
  // } else {
  //   console.log("No such document!");
  // }
};

export default receiveRequests;

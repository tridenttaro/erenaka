import { UserState } from "../../../types/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

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
  userState: UserState;
  setRequestsList: (requestsList: RequestItem[]) => void;
};
const receiveRequests = async (props: Props) => {
  const { userState, setRequestsList } = props;

  // 参加グループがない=作成したグループがない=実行しない
  if (
    !userState.joinedGroups ||
    userState.joinedGroups === [] ||
    userState.joinedGroups === [""]
  ) {
    return;
  }

  const joinedGroups = userState.joinedGroups;

  // 自身が管理者(作成者)であるグループリストを作成
  type CreatedGroup = {
    groupId: string;
    groupName: string;
  };
  const createdGroups: CreatedGroup[] = [];

  const groupsSnaps = await getDocs(collection(db, "groups"));
  groupsSnaps.forEach((groupsDoc) => {
    const docData = groupsDoc.data();

    joinedGroups.forEach((joinedGroup) => {
      // 自身が参加しているグループであるか
      if (joinedGroup === docData.groupId) {
        // 自身が管理者(作成者)であるか
        if (userState.uid === docData.createdUid) {
          createdGroups.push({
            groupId: docData.groupId,
            groupName: docData.groupName,
          });
        }
      }
    });
  });

  if (createdGroups.length > 0) {
    const requestsList: RequestItem[] = [];
    // 参加申請情報を取得(送信者氏名除く)
    // ※forEachは非同期に非対応のためfor-ofを使用
    for (const group of createdGroups) {
      const requestsSnapshots = await getDocs(
        collection(db, "groups", group.groupId, "requests")
      );
      requestsSnapshots.forEach((doc) => {
        const docData = doc.data();
        const createdAt = datetimeToString(
          (docData.createdAt as Timestamp).toDate()
        );
        requestsList.push({
          requestId: docData.requestId,
          requestedUid: docData.requestedUid,
          requestedUsername: "",
          groupId: group.groupId,
          groupName: group.groupName,
          createdAt: createdAt,
        });
      });
    }

    // ユーザー名の取得
    for (const request of requestsList) {
      const docRef = doc(db, "users", request.requestedUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        request.requestedUsername = docData.username;
      }
    }

    setRequestsList(requestsList);
  }
};

export default receiveRequests;

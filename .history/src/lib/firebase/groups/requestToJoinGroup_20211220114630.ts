import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { UserState } from "../../../types/auth";
import { RequestItem } from "../../../types/other";

type Props = {
  userState: UserState;
  groupId: string;
  setGroupId: (str: string) => void;
};
const requestJoinGroup = async (props: Props) => {
  const { userState, groupId, setGroupId } = props;

  if (groupId === "") {
    alert("必須項目が未入力です");
    return false;
  }
  if (userState.joinedGroups.includes(groupId)) {
    alert("既に参加しているグループです");
    return false;
  }
  const timestamp = Timestamp.now();

  const docRef = doc(db, "groups", groupId);
  // グループが存在するか確認
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // 存在する
    try {
      const requestData = {
        requestedUid: userState.uid,
        createdAt: timestamp,
      };
      await setDoc(
        doc(db, "groups", groupId, "requests", userState.uid),
        requestData
      );

      alert("グループ参加リクエストを送信しました。");
      setGroupId("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    alert("グループが見つかりません。IDが間違っていないかご確認ください。");
  }
};

export default requestJoinGroup;

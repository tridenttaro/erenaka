import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import { JoinedGroup, UserState } from "../../../types/auth";
import { RequestItem } from "../../../types/other";

type Props = RequestItem & {
  receiveRequests: () => void;
};

const acceptRequests = async (props: Props) => {
  const { requestedUid: uid, groupId, receiveRequests } = props;

  const userRef = doc(db, "users", uid);

  // 申請者の参加済みグループを取得
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const docData = docSnap.data();
    const joinedGroups: string[] = docData.joinedGroups;

    // 既に参加しているグループに申請が送信されてしまっていた場合、回避
    if (!joinedGroups.includes(groupId)) {
      joinedGroups.push(groupId);
      try {
        // グループの一員にする
        await setDoc(userRef, { joinedGroups: joinedGroups }, { merge: true });

        // 申請を削除
        await deleteDoc(doc(db, "groups", groupId, "requests", uid));

        // 画面表示を更新
        receiveRequests();

        alert("参加申請を承認しました。");
      } catch (error) {
        // console.error(error);
      }
    } else {
      console.log("このグループには既に参加されています");
      return;
    }
  } else {
    console.log("No such document!");
  }
};

export default acceptRequests;
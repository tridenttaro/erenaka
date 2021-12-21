import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import { JoinedGroup } from "../../../types/auth";
import { RequestItem } from "../../../types/other";
import receiveRequests from "./receiveRequests";

type Props = RequestItem & {
  inputRequestsList: (requests: RequestItem[]) => void;
};

const acceptRequests = async (props: Props) => {
  console.log("zikkoo");
  const { requestedUid: uid, groupId } = props;

  const userRef = doc(db, "users", uid);

  // 申請者の参加済みグループを取得
  const userDocSnap = await getDoc(userRef);
  if (userDocSnap.exists()) {
    const userDocData = userDocSnap.data();
    const joinedGroups: string[] = userDocData.joinedGroups;

    // 何らかの原因で既に参加しているグループに申請が送信されてしまっていた場合の対処
    if (!joinedGroups.includes(groupId)) {
      joinedGroups.push(groupId);
      try {
        // グループの一員にする
        await setDoc(userRef, { joinedGroups: joinedGroups }, { merge: true });

        // 申請を削除
        await deleteDoc(doc(db, "groups", groupId, "requests", uid));

        // 画面表示を更新
        receiveRequests;

        alert("参加申請を承認しました。");
      } catch (error) {
        console.error(error);
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

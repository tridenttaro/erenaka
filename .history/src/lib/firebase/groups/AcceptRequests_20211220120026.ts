import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem;

const acceptRequests = async (props: Props) => {
  const { requestedUid: uid, groupId, createdAt } = props;

  const userRef = doc(db, "users", uid);

  // 申請者の参加済みグループを取得
  const userDocSnap = await getDoc(userRef);
  if (userDocSnap.exists()) {
    const userDocData = userDocSnap.data();
    const joinedGroups: string[] = userDocData.joinedGroups;

    // 何らかの原因で既に参加しているグループに申請が送信されてしまっていた場合の対処
    if (!joinedGroups.includes(groupId)) {
      joinedGroups.push(groupId);
      // グループの一員にする
      try {
        await setDoc(userRef, { joinedGroups: joinedGroups }, { merge: true });
      } catch (error) {}
    } else {
      console.log("このグループには既に参加されています");
      return;
    }
  } else {
    console.log("No such document!");
  }
};

export default acceptRequests;

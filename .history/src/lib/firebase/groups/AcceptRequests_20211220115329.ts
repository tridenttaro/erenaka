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
    const userDocData = 
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  // グループの一員にする
  // await setDoc(userRef, { joinedGroups:  }, { merge: true });
};

export default acceptRequests;

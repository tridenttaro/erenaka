import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem;

const acceptRequests = async (props: Props) => {
  const { requestedUid: uid, groupId, createdAt } = props;

  const userRef = doc(db, "users", uid);
  // グループの一員にする
  await setDoc(userRef, { groupId1: groupId }, { merge: true });
};

export default acceptRequests;

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem;

const acceptRequests = async (props: Props) => {
  const { requestedUid: uid, groupId, createdAt } = props;
  // const userRef = collection(db, "users", props.requestedUid);
  const userRef = doc(db, "users", uid);
  setDoc(userRef, { capital: true }, { merge: true });
};

export default acceptRequests;

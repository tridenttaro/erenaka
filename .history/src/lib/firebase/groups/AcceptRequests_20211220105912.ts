import { collection } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem;

const acceptRequests = async (props: Props) => {
  const userRef = collection(db, "users", props.requestedUid);
};

export default acceptRequests;

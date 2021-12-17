import { UserState } from "../../types/firebase";
import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Props = {
  userState: UserState;
};
const receiveRequests = (props: Props) => {
  const { userState } = props;

  if (!userState.groupId1) return;

  const docRef = doc(db, "groups", userState.groupId1);
};

export default receiveRequests;

import { doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { UserState } from "../../types/firebase";

type Props = {
  userState: UserState;
};

const ReceiveRequests = (props: Props) => {
  const { userState } = props;
  const;

  if (!userState.groupId1) return;

  const docRef = doc(db, "groups", userState.groupId1);
};

export default ReceiveRequests;

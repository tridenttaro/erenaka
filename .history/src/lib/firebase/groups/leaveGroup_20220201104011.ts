import { doc, getDoc } from "firebase/firestore";
import { db } from "..";
import { UserState } from "../../../types/auth";

type Props = {
  groupId: string;
  userState: UserState;
};

const leaveGroup = async ({ groupId, userState }: Props) => {
  const userRef = doc(db, "users", userState.uid);

  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    const docData = docSnap.data();
    const joinedGroups: string[] = docData.joinedGroups;
  } else {
    // console.log("No such document!");
  }
};

export default leaveGroup;

import { doc, getDoc, setDoc } from "firebase/firestore";
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

    const newJoinedGroups = joinedGroups.filter((n) => n !== groupId);

    try {
      // グループの一員にする
      await setDoc(userRef, { joinedGroups: joinedGroups }, { merge: true });
    } catch (error) {
      // console.error(error);
    }
  } else {
    // console.log("No such document!");
  }
};

export default leaveGroup;

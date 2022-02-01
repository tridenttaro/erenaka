import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import { UserState } from "../../../types/auth";

type Props = {
  groupId: string;
  userState: UserState;
};

const leaveGroup = async ({ groupId, userState }: Props) => {
  const result = confirm("グループから脱退します。よろしいですか？");
  if (result) {
    const userRef = doc(db, "users", userState.uid);

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      const joinedGroups: string[] = docData.joinedGroups;

      const newJoinedGroups = joinedGroups.filter((n) => n !== groupId);

      try {
        // グループの一員にする
        await setDoc(userRef, { joinedGroups: joinedGroups }, { merge: true });

        alert("グループからの脱退が完了しました。");
      } catch (error) {
        // console.error(error);
      }
    } else {
      return;
    }
  } else {
    // console.log("No such document!");
  }
};

export default leaveGroup;

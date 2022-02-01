import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "..";
import { JoinedGroup, UserState } from "../../../types/auth";

type Props = {
  groupId: string;
  userState: UserState;
  joinedGroup: JoinedGroup;
  updateGroups: (joinedGroupsId: string[]) => void;
};

const leaveGroup = async ({
  groupId,
  userState,
  joinedGroup,
  updateGroups,
}: Props) => {
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
        await setDoc(
          userRef,
          { joinedGroups: newJoinedGroups },
          { merge: true }
        );

        // ReducerState更新
        joinedGroup(newJoinedGroups);

        // 画面を更新
        updateGroups(newJoinedGroups);

        alert("グループからの脱退が完了しました。");
      } catch (error) {
        // console.error(error);
      }
    } else {
      // console.log("No such document!");
    }
  } else {
    return;
  }
};

export default leaveGroup;

import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { JoinedGroup, UserState } from "../../../types/auth";

type Props = {
  userState: UserState;
  groupName: string;
  setGroupName: (str: string) => void;
  joinedGroup: JoinedGroup;
};
const createGroup = async (props: Props) => {
  const { groupName, userState, setGroupName } = props;

  if (groupName == "") {
    alert("必須項目が未入力です");
    return false;
  }

  const timestamp = Timestamp.now();

  try {
    const newGroupRef = doc(collection(db, "groups"));
    const groupInitialData = {
      groupId: newGroupRef.id,
      createdAt: timestamp,
      groupName: groupName,
      createdUid: userState.uid,
      updatedAt: timestamp,
    };
    await setDoc(newGroupRef, groupInitialData);

    const userRef = doc(db, "users", userState.uid);
    // 作成者をグループに参加させる
    await setDoc(userRef, { groupId1: newGroupRef.id }, { merge: true });

    setGroupName("");
    alert("グループの作成が完了しました");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createGroup;

import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from ".";
import { JoinedGroup, UserState } from "../../types/auth";

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
      group_id: newGroupRef.id,
      created_at: timestamp,
      groupname: groupName,
      created_uid: userState.uid,
      updated_at: timestamp,
    };
    await setDoc(newGroupRef, groupInitialData);

    const userData: UserState = {
      ...userState,
      groupId1: newGroupRef.id,
    };
    // 作成者をグループに参加させる
    await setDoc(doc(db, "users", userState.uid), userData);

    setGroupName("");
    alert("グループの作成が完了しました");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createGroup;

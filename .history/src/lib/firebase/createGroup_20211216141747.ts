import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from ".";
import { UserState } from "../../types/firebase";

type Props = {
  userState: UserState;
  groupName: string;
  setGroupName: (str: string) => void;
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
      groupName: groupName,
      createdUid: userState.uid,
      updated_at: timestamp,
    };

    // later...
    await setDoc(newGroupRef, groupInitialData);

    setGroupName("");
    alert("グループの作成が完了しました");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createGroup;

import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from ".";

type Props = {
  groupName: string;
  createdUid: string;
  setGroupName: (str: string) => void;
};
const createGroup = async (props: Props) => {
  const { groupName, createdUid, setGroupName } = props;

  if (groupName == "") {
    alert("必須項目が未入力です");
    return false;
  }
  if (createdUid == "") {
    alert("ユーザ認証が正しくありません");
    return false;
  }

  const timestamp = Timestamp.now();

  try {
    const newGroupRef = doc(collection(db, "groups"));
    const groupInitialData = {
      group_id: newGroupRef.id,
      created_at: timestamp,
      groupName: groupName,
      createdUid: createdUid,
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

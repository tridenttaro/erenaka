import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from ".";

type Props = {
  groupName: string;
  createdUid: string;
};
const createGroup = async (props: Props) => {
  const { groupName, createdUid } = props;

  if (groupName == "") {
    alert("必須項目が未入力です");
    return false;
  }
  if (createdUid == "") {
    alert("ユーザ認証が正しくありません");
    return false;
  }

  const timestamp = Timestamp.now();

  const groupInitialData = {
    created_at: timestamp,
    groupName: groupName,
    createdUid: createdUid,
    updated_at: timestamp,
  };

  try {
    await setDoc(doc(db, "groups"), groupInitialData);

    alert("グループの作成が完了しました");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createGroup;

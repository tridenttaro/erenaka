import { Timestamp } from "firebase/firestore";

type Props = {
  groupName: string;
  createdUid: string;
};
const createGroup = (props: Props) => {
  const { groupName, createdUid } = props;

  if (groupName == "") {
    alert("必須項目が未入力です");
    return false;
  }
  if (createdUid == "") {
    alert("ユーザ認証が正しくありません")
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
          await setDoc(doc(db, "users", uid), userInitialData);
          // ホームページに遷移させる
          changePage({ path: "/" });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        }
     
};

export default createGroup;

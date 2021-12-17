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

  try {
        const timestamp = Timestamp.now();

        const groupInitialData = {
          created_at: timestamp,
          groupName: groupName,
          role: "customer",
          uid: uid,
          updated_at: timestamp,
          username: username,
        };

          try {
            await setDoc(doc(db, "users", uid), userInitialData);
            // ホームページに遷移させる
            changePage({ path: "/" });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + "\n" + errorMessage);
      });
  } catch (e) {
    console.error("Error createUser:", e);
  }
};

export default createGroup;

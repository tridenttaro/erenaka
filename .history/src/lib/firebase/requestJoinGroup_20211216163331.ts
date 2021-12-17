import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from ".";
import { UserState } from "../../types/firebase";

type Props = {
  userState: UserState;
  groupId: string;
  setGroupId: (str: string) => void;
};
const requestJoinGroup = async (props: Props) => {
  const { userState, groupId, setGroupId } = props;

  if (groupId == "") {
    alert("必須項目が未入力です");
    return false;
  }

  const timestamp = Timestamp.now();

  const docRef = doc(db, "groups", groupId, "requests", userState.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    // try {
    //   const requestData = {
    //     requested_uid: userState.uid,
    //     created_at: timestamp,
    //   };
    //   await setDoc(
    //     doc(db, "groups", groupId, "requests", userState.uid),
    //     requestData
    //   );

    //   alert("グループ参加リクエストを送信しました。");
    //   setGroupId("");
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export default requestJoinGroup;

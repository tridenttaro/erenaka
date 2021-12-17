import { UserState } from "../../types/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Props = {
  userState: UserState;
};
const receiveRequests = async (props: Props) => {
  const { userState } = props;
  const joinedGroupIds: string[] = [];
  // 参加グループがない=作成したグループがない=
  if (!userState.groupId1 || userState.groupId1 === "") return;

  const docRef = doc(db, "groups", userState.groupId1);
  const docSnap = await getDoc(docRef);

  const querySnapshot = await getDocs(collection(db, "groups"));
  querySnapshot.forEach((doc) => {});

  if (docSnap.exists()) {
    const docData = docSnap.data();
    const created_uid = docData.created_uid;

    if (created_uid == userState.uid) {
    }
  } else {
    console.log("No such document!");
  }
};

export default receiveRequests;

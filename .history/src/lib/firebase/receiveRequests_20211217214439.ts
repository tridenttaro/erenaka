import { UserState } from "../../types/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Props = {
  userState: UserState;
};
const receiveRequests = async (props: Props) => {
  const { userState } = props;
  const joinedGroupIds: string[] = [];

  // 参加グループがない=作成したグループがない=禁止
  if (!userState.groupId1 || userState.groupId1 === "") return;

  // 参加しているグループをリスト化(現時点では一つのみ)
  joinedGroupIds.push(userState.groupId1);

  const docRef = doc(db, "groups", userState.groupId1);
  const docSnap = await getDoc(docRef);

  const querySnapshot = await getDocs(collection(db, "groups"));
  querySnapshot.forEach((doc) => {
    // joinedGroupIds.forEach((joinedGroupId) => {
    //   if (joinedGroupId == )
    // })
    console.log("doc");
    console.log(doc);
    console.log("doc.data()");
    console.log(doc.data());
  });

  // if (docSnap.exists()) {
  //   const docData = docSnap.data();
  //   const created_uid = docData.created_uid;

  //   if (created_uid == userState.uid) {
  //   }
  // } else {
  //   console.log("No such document!");
  // }
};

export default receiveRequests;

import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "..";
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
    // グループ作成
    await setDoc(newGroupRef, groupInitialData);

    const userRef = doc(db, "users", userState.uid);
    const userDocSnap = await getDoc(userRef);

    if (userDocSnap.exists()) {
      const userDocData = userDocSnap.data();
      // 参加済みグループを取得
      const joinedGroups: string[] = userDocData.joinedGroups;
      joinedGroups.push(newGroupRef.id);

      // 作成者をグループに参加させる
      await setDoc(userRef, { joinedGroups: joinedGroups }, { merge: true });

      // stateに反映
      props.joinedGroup(joinedGroups);

      setGroupName("");
      alert("グループの作成が完了しました");
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createGroup;

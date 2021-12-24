import { collection, doc, Timestamp } from "firebase/firestore";
import { dirname } from "path/posix";
import { db } from "..";
import { UserState } from "../../../types/auth";

type Props = {
  userState: UserState;
  groupId: string;
  dirName: string;
  setDirName: (dirName: string) => void;
};

const createDirectory = async (props: Props) => {
  const { groupId, dirName, setDirName, userState } = props;

  if (!groupId || groupId == "" || !dirname || dirName == "") return;

  try {
    const timestamp = Timestamp.now();

    const dirRef = doc(
      collection(db, `groups/${groupId}/storageDirectory/${dirName}`)
    );
    const directoryInitialData = {
      groupId: dirRef.id,
      createdAt: timestamp,
      directoryName: dirName,
      createdUid: userState.uid,
      updatedAt: timestamp,
    };
    // グループ作成
    await setDoc(dirRef, directoryInitialData);

    const userRef = doc(db, "users", userState.uid);
    const userDocSnap = await getDoc(userRef);

    if (userDocSnap.exists()) {
      const userDocData = userDocSnap.data();
      // 参加済みグループを取得
      const joinedGroups: string[] = userDocData.joinedGroups;
      joinedGroups.push(dirRef.id);

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

export default createDirectory;

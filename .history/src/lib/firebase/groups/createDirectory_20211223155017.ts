import { collection, doc } from "firebase/firestore";
import { dirname } from "path/posix";
import { db } from "..";

type Props = {
  groupId: string;
  dirName: string;
  setDirName: (dirName: string) => void;
};

const createDirectory = ({ groupId, dirName, setDirName }: Props) => {
  if (!groupId || groupId == "" || !dirname || dirName == "") return;

  try {
    const timestamp = Timestamp.now();
    const dirRef = doc(
      collection(db, `groups/${groupId}/storageDirectory/${dirName}`)
    );
    const groupInitialData = {
      groupId: dirRef.id,
      createdAt: timestamp,
      groupName: groupName,
      createdUid: userState.uid,
      updatedAt: timestamp,
    };
    // グループ作成
    await setDoc(dirRef, groupInitialData);

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

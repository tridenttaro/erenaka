import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
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


      setDirName("");
      alert("ディレクトリの作成が完了しました");
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createDirectory;

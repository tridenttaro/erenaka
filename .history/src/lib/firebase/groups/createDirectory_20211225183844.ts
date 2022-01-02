import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { UserState } from "../../../types/auth";
import { DirectoryInfo } from "../../../types/other";

type Props = {
  userState: UserState;
  groupId: string;
  currentDirectory: string[];
  dirName: string;
  setDirName: (dirName: string) => void;
  updateDirectories: () => void;
};

const createDirectory = async (props: Props) => {
  if (!props.dirName || props.dirName == "") return;

  const {
    userState,
    groupId,
    currentDirectory,
    dirName,
    setDirName,
    updateDirectories,
  } = props;

  try {
    const timestamp = Timestamp.now();
    let dirRef = doc(db, "groups", groupId, "storageDirectory", dirName);
    if (currentDirectory != [] && currentDirectory.length > 0) {
      dirRef = doc(
        db,
        "groups",
        groupId,
        "storageDirectory",
        ...currentDirectory,
        dirName
      );
    }
    const directoryData = {
      createdAt: timestamp,
      directoryName: dirName,
      createdUid: userState.uid,
      updatedAt: timestamp,
    };
    // ディレクトリ作成
    await setDoc(dirRef, directoryData);

    // 表示の更新
    updateDirectories();

    setDirName("");
    alert("ディレクトリの作成が完了しました");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createDirectory;

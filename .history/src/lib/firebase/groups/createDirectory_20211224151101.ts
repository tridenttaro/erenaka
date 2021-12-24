import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "..";
import { UserState } from "../../../types/auth";
import { DirectoryInfo } from "../../../types/other";

type Props = {
  userState: UserState;
  groupId: string;
  dirName: string;
  setDirName: (dirName: string) => void;
  inputDirectories?: (directories: DirectoryInfo[]);
  getDirectories: () => void;
};

const createDirectory = async (props: Props) => {
  const { groupId, dirName, setDirName, userState, getDirectories } = props;

  if (!groupId || groupId == "" || !dirName || dirName == "") return;

  try {
    const timestamp = Timestamp.now();

    const dirRef = doc(db, "groups", groupId, "storageDirectory", dirName);
    const directoryData = {
      createdAt: timestamp,
      directoryName: dirName,
      createdUid: userState.uid,
      updatedAt: timestamp,
    };
    // ディレクトリ作成
    await setDoc(dirRef, directoryData);

    // 表示の更新
    getDirectories();

    setDirName("");
    alert("ディレクトリの作成が完了しました");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default createDirectory;

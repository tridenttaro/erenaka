import { dirname } from "path/posix";

type Props = {
  groupId: string;
  dirName: string;
  setDirName: (dirName: string) => void;
};

const createDirectory = ({ groupId, dirName, setDirName }: Props) => {
  if (!groupId || groupId == "" || !dirname || !dirName == "") return;
};

export default createDirectory;

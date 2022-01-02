import { ref } from "firebase/storage";
import { storage } from "..";

type Props = {
  groupId: string;
  currentDirectory: string[];
};

const getImages = async (props: Props) => {
  const { groupId, currentDirectory } = props;

  let listRef = ref(storage, `groups/${groupId}`);

  if (currentDirectory != [] && currentDirectory.length > 0) {
    listRef = ref(storage, `groups/${groupId}/${currentDirectory.join("/")}`);
  }
};

export default getImages;

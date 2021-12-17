import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from ".";
import { JoinedGroup, UserState } from "../../types/firebase";

type Props = {
  userState: UserState;
  groupId: string;
  setGroupId: (str: string) => void;
};
const requestJoinGroup = async (props: Props) => {
  const { userState, groupId, setGroupId } = props;

  if (groupId == "") {
    alert("必須項目が未入力です");
    return false;
  }

  const timestamp = Timestamp.now();

  try {
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default requestJoinGroup;

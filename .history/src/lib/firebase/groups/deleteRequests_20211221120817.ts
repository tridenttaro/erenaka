import { deleteDoc, doc } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem & {
  receiveRequests: () => void;
};

const deleteRequests = async (props: Props) => {
  const { requestedUid: uid, groupId, requestId } = props;
  await deleteDoc(doc(db, "groups", groupId, "requests", requestId));
  alert("参加申請を削除しました。");
};
export default deleteRequests;

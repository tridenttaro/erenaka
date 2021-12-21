import { deleteDoc, doc } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem;

const deleteRequests = async (props: Props) => {
  const { requestedUid: uid, groupId } = props;
  await deleteDoc(doc(db, "groups", groupId, "requests", uid));
  alert("参加リクエストを削除しました。");
};
export default deleteRequests;

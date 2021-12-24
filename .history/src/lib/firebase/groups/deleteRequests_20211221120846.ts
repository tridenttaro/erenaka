import { deleteDoc, doc } from "firebase/firestore";
import { db } from "..";
import { RequestItem } from "../../../types/other";

type Props = RequestItem & {
  receiveRequests: () => void;
};

const deleteRequests = async (props: Props) => {
  const { requestedUid: uid, groupId, receiveRequests } = props;
  await deleteDoc(doc(db, "groups", groupId, "requests", uid));

  // 画面表示を更新
  receiveRequests();

  alert("参加申請を削除しました。");
};
export default deleteRequests;

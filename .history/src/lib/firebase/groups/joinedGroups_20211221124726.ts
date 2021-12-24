import { GroupInfo } from "../../../types/other";

type Props = {
  joinedGroupsId: string[];
  setGroupsInfo: (groupInfo: GroupInfo) => void;
};

const joinedGroups = (props: Props) => {
  for (const id of props.joinedGroupsId) {
  }
};

export default joinedGroups;

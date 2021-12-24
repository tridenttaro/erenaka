import { useCallback, useContext, useEffect, useState } from "react";
import getGroupsInfo from "../../lib/firebase/groups/getGroupsInfo";

import { AuthContext } from "./Auth";
import { UserState } from "../../types/auth";
import { GroupInfo } from "../../types/other";

import GroupCard from "../molecules/GroupCard";

const JoinedGroups = () => {
  const [groupsInfo, setGroupsInfo] = useState<GroupInfo[]>([]);

  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroupsId = contextUserState.joinedGroups;

  useEffect(() => {
    getGroupsInfo({ joinedGroupsId, setGroupsInfo });
  }, [joinedGroupsId, setGroupsInfo]);

  return (
    <>
      <h2>参加済みグループ一覧</h2>

      <div className="p-grid__row">
        {groupsInfo.length > 0 &&
          groupsInfo.map((group) => (
            <GroupCard key={group.groupId} {...group} />
          ))}
      </div>
    </>
  );
};

export default JoinedGroups;

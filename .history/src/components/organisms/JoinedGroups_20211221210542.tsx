import { useCallback, useContext, useEffect, useState } from "react";
import joinedGroups from "../../lib/firebase/groups/joinedGroups";

import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/auth";
import { GroupInfo } from "../../types/other";

import GroupCard from "../molecules/GroupCard";

const JoinedGroups = () => {
  const [groupsInfo, setGroupsInfo] = useState<GroupInfo[]>([]);

  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroupsId = contextUserState.joinedGroups;

  useEffect(() => {
    joinedGroups({ joinedGroupsId, setGroupsInfo });
  }, [joinedGroupsId, setGroupsInfo]);

  // console.log(groupsInfo);
  return (
    <>
      <h2>参加済みグループ一覧</h2>

      <div className="p-grid__row">
        {groupsInfo.length > 0 &&
          groupsInfo.map((group) => {
            {
              console.log(group);
            }
            <GroupCard {...group} />;
          })}
      </div>
    </>
  );
};

export default JoinedGroups;

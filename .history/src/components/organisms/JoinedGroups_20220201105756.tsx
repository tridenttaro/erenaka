import { useCallback, useContext, useEffect, useState } from "react";
import getGroupsInfo from "../../lib/firebase/groups/getGroupsInfo";
import { AuthContext } from "./AuthLayout";
import { UserState } from "../../types/auth";
import { GroupData } from "../../types/other";
import groupStyles from "../../styles/group.module.scss";
import GroupCard from "../molecules/GroupCard";

const JoinedGroups = () => {
  const [groupsInfo, setGroupsInfo] = useState<GroupData[]>([]);

  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroupsId = contextUserState.joinedGroups;

  useEffect(() => {
    getGroupsInfo({ joinedGroupsId, setGroupsInfo });
  }, [joinedGroupsId, setGroupsInfo]);

  const updateGroups = useCallback(() => {
    getGroupsInfo({ joinedGroupsId, setGroupsInfo });
  }, [joinedGroupsId, setGroupsInfo]);

  return (
    <section className="c-section-wrapin">
      <h2>参加済みグループ一覧</h2>

      <div className="p-grid__row">
        {groupsInfo.length > 0 &&
          groupsInfo.map((group) => (
            <GroupCard
              key={group.groupId}
              {...group}
              updateGroups={updateGroups}
            />
          ))}
      </div>
    </section>
  );
};

export default JoinedGroups;

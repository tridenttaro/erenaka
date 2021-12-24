import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../pages/Auth";
import { JoinedGroup, UserState } from "../../types/auth";

import GroupCard from "../molecules/GroupCard";

const JoinedGroups = () => {
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroups = contextUserState.joinedGroups;

  useEffect(() => {
    joinedGroups({ joinedGroups });
  }, [joinedGroups]);

  return (
    <>
      <h2>参加済みグループ一覧</h2>

      <div className="p-grid__row">
        {joinedGroups.length > 0 && joinedGroups.map((group) => <GroupCard />)}
      </div>
    </>
  );
};

export default JoinedGroups;

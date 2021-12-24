import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/groups/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { JoinedGroup, UserState } from "../../types/auth";
import { RequestItem } from "../../types/other";
import GroupCard from "../molecules/GroupCard";
import RequestCard from "../molecules/RequestCard";

const JoinedGroups = () => {
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroups = contextUserState.joinedGroups;

  return (
    <>
      <h2>Receive Requests</h2>

      <div className="p-grid__row">
        {joinedGroups.length > 0 && joinedGroups.map((group) => <GroupCard />)}
      </div>
    </>
  );
};

export default JoinedGroups;

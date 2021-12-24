import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/groups/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { JoinedGroup, UserState } from "../../types/auth";
import { RequestItem } from "../../types/other";
import RequestCard from "../molecules/RequestCard";

const JoinedGroups = () => {
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const receiveRequestsCallback = useCallback(() => {
    receiveRequests({ userState: contextUserState, setRequestsList });
  }, [contextUserState, setRequestsList]);

  return (
    <>
      <h2>Receive Requests</h2>

      <div className="p-grid__row">
        {groups.length > 0 &&
          groups.map((request) => (
            // console.log(request);
            <RequestCard
              key={request.requestId}
              {...request}
              receiveRequests={receiveRequestsCallback}
            />
          ))}
      </div>
    </>
  );
};

export default JoinedGroups;

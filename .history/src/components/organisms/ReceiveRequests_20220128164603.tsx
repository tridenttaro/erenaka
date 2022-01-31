import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/groups/receiveRequests";
import { AuthContext } from "./AuthLayout";
import { JoinedGroup, UserState } from "../../types/auth";
import { RequestItem } from "../../types/other";
import RequestCard from "../molecules/RequestCard";

const ReceiveRequests = () => {
  const [requestsList, setRequestsList] = useState<RequestItem[]>([]);
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  useEffect(() => {
    receiveRequests({ userState: contextUserState, setRequestsList });
  }, [contextUserState]);

  const receiveRequestsCallback = useCallback(() => {
    receiveRequests({ userState: contextUserState, setRequestsList });
  }, [contextUserState, setRequestsList]);

  return (
    <div>
      <h2>受信したグループ参加申請</h2>

      <div className="p-grid__row">
        {requestsList.length > 0 &&
          requestsList.map((request) => (
            <RequestCard
              key={request.requestId}
              {...request}
              receiveRequests={receiveRequestsCallback}
            />
          ))}
      </div>
    </div>
  );
};

export default ReceiveRequests;

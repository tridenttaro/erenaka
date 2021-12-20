import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/auth";
import { RequestsList } from "../../types/other";
import RequestCard from "../molecules/RequestCard";

const ReceiveRequests = () => {
  const [requestsList, setRequestsList] = useState<RequestsList>([]);
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  useEffect(() => {
    receiveRequests({ userState: contextUserState, setRequestsList });
  }, [contextUserState]);

  return (
    <>
      <h2>Receive Requests</h2>

      <div className="p-grid__row">
        {requestsList.length > 0 &&
          requestsList.map((request) => (
            // console.log(request);
            <RequestCard
              requestedUid={request.requestedUid}
              groupId={request.groupId}
              createdAt={request.createdAt}
            />
          ))}
      </div>
    </>
  );
};

export default ReceiveRequests;

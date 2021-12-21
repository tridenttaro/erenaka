import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/groups/receiveRequests";
import { AuthContext } from "../../pages/Auth";
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

  const inputRequestsList = useCallback((requests: RequestItem[]) => {
    setRequestsList(requests);
  }, []);

  return (
    <>
      <h2>Receive Requests</h2>

      <div className="p-grid__row">
        {requestsList.length > 0 &&
          requestsList.map((request) => (
            // console.log(request);
            <RequestCard
              key={request.requestId}
              {...request}
              inputRequestsList={inputRequestsList}
            />
          ))}
      </div>
    </>
  );
};

export default ReceiveRequests;

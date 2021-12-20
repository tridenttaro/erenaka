import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/auth";
import { RequestsList } from "../../types/other";

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
          requestsList.map((request) => console.log(request))}
      </div>
    </>
  );
};

export default ReceiveRequests;

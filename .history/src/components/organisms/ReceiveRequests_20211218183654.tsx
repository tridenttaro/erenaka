import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/auth";

type RequestsList = {
  requested_uid: string;
  created_at: Date;
};

const ReceiveRequests = () => {
  const [requestsList, setRequestsList] = useState<RequestsList>();
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  useEffect(() => {
    receiveRequests({ userState: contextUserState });
  }, [contextUserState]);

  return (
    <>
      <h2>Receive Requests</h2>
    </>
  );
};

export default ReceiveRequests;

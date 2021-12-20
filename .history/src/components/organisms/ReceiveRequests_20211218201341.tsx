import { useCallback, useContext, useEffect, useState } from "react";
import receiveRequests from "../../lib/firebase/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/auth";
import { RequestsList } from "../../types/other";
import { TextDetail } from "../atoms";

const ReceiveRequests = () => {
  const [requestsList, setRequestsList] = useState<RequestsList[]>();
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  useEffect(() => {
    receiveRequests({ userState: contextUserState, setRequestsList });
    console.log(requestsList);
  }, [contextUserState, requestsList]);

  return (
    <>
      <h2>Receive Requests</h2>
    </>
  );
};

export default ReceiveRequests;

import { useCallback, useContext, useEffect } from "react";
import receiveRequests from "../../lib/firebase/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/firebase";

const ReceiveRequests = () => {
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  useEffect(() => {
    receiveRequests({ userState: contextUserState });
  }, []);

  return <></>;
};

export default ReceiveRequests;

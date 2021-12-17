import { useCallback, useContext, useEffect } from "react";
import receiveRequests from "../../lib/firebase/receiveRequests";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/firebase";

type Props = {
  userState: UserState;
};

const ReceiveRequests = (props: Props) => {
  const { userState } = props;
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const receiveRequestsCallback = useCallback(() => {
    receiveRequests;
  }, []);
};

export default ReceiveRequests;

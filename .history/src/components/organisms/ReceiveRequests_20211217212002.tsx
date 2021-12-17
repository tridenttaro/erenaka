import { useContext, useEffect } from "react";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/firebase";

type Props = {
  userState: UserState;
};

const ReceiveRequests = (props: Props) => {
  const { userState } = props;
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
};

export default ReceiveRequests;

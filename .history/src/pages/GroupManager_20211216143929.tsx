import { useCallback, useContext, useState } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";
import CreateGroup from "../components/organisms/CreateGroup";
import createGroup from "../lib/firebase/createGroup";
import { UserState } from "../types/firebase";
import { AuthContext } from "./Auth";

const GroupManager = () => {
  const [groupName, setGroupName] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  const createGroup_callback = useCallback(() => {
    createGroup({ userState: contextUserState, groupName, setGroupName });
  }, [groupName, contextUserState]);
  return (
    <>
      <CreateGroup
        groupName={groupName}
        inputGroupName={inputGroupName}
        userState={contextUserState}
        createGroup={createGroup_callback}
      />
    </>
  );
};

export default GroupManager;

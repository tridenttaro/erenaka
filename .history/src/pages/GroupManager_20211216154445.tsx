import { useCallback, useContext, useState } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";
import CreateGroup from "../components/organisms/CreateGroup";
import RequestJoinGroup from "../components/organisms/RequestJoinGroup";
import createGroup from "../lib/firebase/createGroup";
import { UserState } from "../types/firebase";
import { AuthContext } from "./Auth";

const GroupManager = () => {
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );
  const inputGroupId = useCallback(
    (event) => {
      setGroupId(event.target.value);
    },
    [setGroupId]
  );

  const createGroup_callback = useCallback(() => {
    createGroup({ userState: contextUserState, groupName, setGroupName });
  }, [groupName, contextUserState]);
  return (
    <>
      <CreateGroup
        groupName={groupName}
        onChange={inputGroupName}
        userState={contextUserState}
        createGroup={createGroup_callback}
      />

      <RequestJoinGroup groupId={groupId} onChange={} />
    </>
  );
};

export default GroupManager;

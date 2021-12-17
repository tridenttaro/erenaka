import { useCallback, useContext, useState } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";
import CreateGroup from "../components/organisms/CreateGroup";
import RequestJoinGroup from "../components/organisms/RequestJoinGroup";
import createGroup from "../lib/firebase/createGroup";
import { JoinedGroup, UserState } from "../types/firebase";
import { AuthContext } from "./Auth";

const GroupManager = () => {
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroup = context?.joinedGroup as JoinedGroup;

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

  const createGroupCallback = useCallback(() => {
    createGroup({
      userState: contextUserState,
      groupName,
      setGroupName,
      joinedGroup,
    });
  }, [groupName, contextUserState, setGroupName, joinedGroup]);

  return (
    <>
      <CreateGroup
        groupName={groupName}
        onChange={inputGroupName}
        userState={contextUserState}
        createGroup={createGroupCallback}
      />

      <RequestJoinGroup
        groupId={groupId}
        onChange={inputGroupId}
        userState={contextUserState}
        requestJoinGroup={}
      />
    </>
  );
};

export default GroupManager;

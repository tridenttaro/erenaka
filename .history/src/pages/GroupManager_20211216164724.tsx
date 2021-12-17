import { useCallback, useContext, useState } from "react";
import CreateGroup from "../components/organisms/CreateGroup";
import RequestToJoinGroup from "../components/organisms/RequestToJoinGroup";
import createGroup from "../lib/firebase/createGroup";
import requestJoinGroup from "../lib/firebase/requestToJoinGroup";
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

  const requestToJoinGroupCallback = useCallback(() => {
    requestJoinGroup({
      userState: contextUserState,
      groupId,
      setGroupId,
    });
  }, [contextUserState, groupId, setGroupId]);

  return (
    <>
      <CreateGroup
        groupName={groupName}
        onChange={inputGroupName}
        userState={contextUserState}
        createGroup={createGroupCallback}
      />

      <RequestToJoinGroup
        groupId={groupId}
        onChange={inputGroupId}
        userState={contextUserState}
        requestToJoinGroup={requestToJoinGroupCallback}
      />
    </>
  );
};

export default GroupManager;

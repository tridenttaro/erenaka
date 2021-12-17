import { useCallback, useContext, useEffect, useState } from "react";
import CreateGroup from "../components/organisms/CreateGroup";
import ReceiveRequests from "../components/organisms/ReceiveRequests";
import RequestToJoinGroup from "../components/organisms/RequestToJoinGroup";
import createGroup from "../lib/firebase/createGroup";
import receiveRequests from "../lib/firebase/receiveRequests";
import requestJoinGroup from "../lib/firebase/requestToJoinGroup";
import { JoinedGroup, UserState } from "../types/firebase";
import { AuthContext } from "./Auth";

const GroupManager = () => {
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

  const requestToJoinGroupCallback = useCallback(() => {
    requestJoinGroup({
      userState: contextUserState,
      groupId,
      setGroupId,
    });
  }, [contextUserState, groupId, setGroupId]);

  const receiveRequestsCallback = useCallback(() => {
    receiveRequests;
  }, []);

  useEffect();

  return (
    <>
      <CreateGroup onChange={inputGroupName} />

      <RequestToJoinGroup
        groupId={groupId}
        onChange={inputGroupId}
        userState={contextUserState}
        requestToJoinGroup={requestToJoinGroupCallback}
      />

      <ReceiveRequests userState={contextUserState} />
    </>
  );
};

export default GroupManager;

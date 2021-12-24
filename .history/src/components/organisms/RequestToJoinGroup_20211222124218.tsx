import { useCallback, useContext, useState } from "react";
import requestJoinGroup from "../../lib/firebase/groups/requestToJoinGroup";
import { AuthContext } from "./Auth";
import { UserState } from "../../types/auth";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {};

const RequestToJoinGroup = () => {
  const [groupId, setGroupId] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

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
  return (
    <>
      <h2>グループへの参加</h2>
      <TextInput
        fullWidth={false}
        label={"Group Id"}
        multiline={false}
        required={true}
        onChange={inputGroupId}
        rows={1}
        value={groupId}
        type={"text"}
      />
      <PrimaryButton
        label={"REQUEST JOIN GROUP"}
        onClick={requestToJoinGroupCallback}
      />
    </>
  );
};

export default RequestToJoinGroup;

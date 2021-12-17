import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/firebase";
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
  return (
    <>
      <h2>Create Group</h2>
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
        onClick={props.requestToJoinGroup}
      />
    </>
  );
};

export default RequestToJoinGroup;

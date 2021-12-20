import { useCallback, useContext, useState } from "react";
import createGroup from "../../lib/firebase/groups/createGroup";
import { AuthContext } from "../../pages/Auth";
import { JoinedGroup, UserState } from "../../types/auth";
import { PrimaryButton, TextInput } from "../atoms";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const joinedGroup = context?.joinedGroup as JoinedGroup;

  const createGroupCallback = useCallback(() => {
    createGroup({
      userState: contextUserState,
      groupName,
      setGroupName,
      joinedGroup,
    });
  }, [groupName, contextUserState, setGroupName, joinedGroup]);

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  return (
    <>
      <h2>Create Group</h2>
      <TextInput
        fullWidth={false}
        label={"Group Name"}
        multiline={false}
        required={true}
        onChange={inputGroupName}
        rows={1}
        value={groupName}
        type={"text"}
      />
      <PrimaryButton
        label={"Create GROUP"}
        onClick={() => createGroupCallback()}
      />
    </>
  );
};

export default CreateGroup;

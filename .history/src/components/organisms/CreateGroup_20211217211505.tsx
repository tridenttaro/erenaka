import { useCallback, useContext, useState } from "react";
import createGroup from "../../lib/firebase/createGroup";
import { AuthContext } from "../../pages/Auth";
import { JoinedGroup, UserState } from "../../types/firebase";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {
  groupName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userState: UserState;
};

const CreateGroup = (props: Props) => {
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

  return (
    <>
      <h2>Create Group</h2>
      <TextInput
        fullWidth={false}
        label={"Group Name"}
        multiline={false}
        required={true}
        onChange={props.onChange}
        rows={1}
        value={props.groupName}
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

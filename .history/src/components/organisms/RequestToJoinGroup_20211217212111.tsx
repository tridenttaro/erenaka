import { useContext, useState } from "react";
import { AuthContext } from "../../pages/Auth";
import { UserState } from "../../types/firebase";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {
  groupId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userState: UserState;
  requestToJoinGroup: () => void;
};

const RequestToJoinGroup = (props: Props) => {
  const [groupId, setGroupId] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  return (
    <>
      <h2>Create Group</h2>
      <TextInput
        fullWidth={false}
        label={"Group Id"}
        multiline={false}
        required={true}
        onChange={props.onChange}
        rows={1}
        value={props.groupId}
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

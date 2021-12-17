import { UserState } from "../../types/firebase";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {
  groupId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userState: UserState;
  requestAction: () => void;
};

const RequestJoinGroup = () => {
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
        onClick={() => props.createGroup()}
      />
    </>
  );
};

export default RequestJoinGroup;

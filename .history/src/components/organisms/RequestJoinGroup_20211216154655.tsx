import { UserState } from "../../types/firebase";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {
  groupId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userState: UserState;
  requestJoinGroup: () => void;
};

const RequestJoinGroup = (props: Props) => {
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
        value={props.groupId}
        type={"text"}
      />
      <PrimaryButton
        label={"Create GROUP"}
        onClick={() => props.requestJoinGroup}
      />
    </>
  );
};

export default RequestJoinGroup;

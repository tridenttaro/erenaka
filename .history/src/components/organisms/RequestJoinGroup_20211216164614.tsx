import { UserState } from "../../types/firebase";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {
  groupId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userState: UserState;
  requestJoinGroup: () => void;
};

const RequestToJoinGroup = (props: Props) => {
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
        onClick={props.requestJoinGroup}
      />
    </>
  );
};

export default RequestToJoinGroup;

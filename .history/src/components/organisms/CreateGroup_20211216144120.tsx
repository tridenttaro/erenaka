import { UserState } from "../../types/firebase";
import { PrimaryButton, TextInput } from "../atoms";

type Props = {
  groupName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userState: UserState;
  createGroup: () => void;
};

const CreateGroup = (props: Props) => {
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

export default CreateGroup;

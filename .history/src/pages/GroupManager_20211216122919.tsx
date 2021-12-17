import { useCallback, useState } from "react";
import { TextInput } from "../components/atoms";

const GroupManager = () => {
  const [groupName, setGroupName] = useState("");

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );
  return (
    <>
      <h2>make Group</h2>
      <TextInput
        fullWidth={false}
        label={"key"}
        multiline={false}
        required={true}
        onChange={inputGroupName}
        rows={1}
        value={groupName}
        type={"text"}
      />
    </>
  );
};

export default GroupManager;

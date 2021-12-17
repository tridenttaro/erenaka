import { useCallback, useContext, useState } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";
import createGroup from "../lib/firebase/createGroup";
import { UserState } from "../types/firebase";
import { AuthContext } from "./Auth";

const GroupManager = () => {
  const [groupName, setGroupName] = useState("");
  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;
  const uid = contextUserState.uid;

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  const createGroup_callback = useCallback(() => {
    createGroup({ groupName: groupName, createdUid: uid });
  }, [createGroup]);
  return (
    <>
      <h2>Create Group</h2>
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
      <PrimaryButton
        label={"Create GROUP"}
        onClick={() => downloadFile_callback()}
      />
    </>
  );
};

export default GroupManager;

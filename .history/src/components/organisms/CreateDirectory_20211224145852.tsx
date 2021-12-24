import { useCallback, useContext, useState } from "react";
import createDirectory from "../../lib/firebase/groups/createDirectory";
import { UserState } from "../../types/auth";
import { PrimaryButton, TextInput } from "../atoms";
import { AuthContext } from "./Auth";

type Props = {
  groupId: string;
  inputDirectories: () => void;
  getDirectories: () => void;
};

const CreateDirectory = (props: Props) => {
  const { groupId, inputDirectories, getDirectories } = props;
  const [dirName, setDirName] = useState("");

  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const createDirectoryCallback = useCallback(() => {
    createDirectory({
      groupId,
      dirName,
      setDirName,
      userState: contextUserState,
      inputDirectories,
      getDirectories,
    });
  }, [groupId, dirName, setDirName, contextUserState, getDirectories]);

  const inputDirName = useCallback(
    (event) => {
      setDirName(event.target.value);
    },
    [setDirName]
  );

  return (
    <>
      <h2>ディレクトリの作成</h2>
      <TextInput
        fullWidth={false}
        label={"ディレクトリ名"}
        multiline={false}
        required={true}
        onChange={inputDirName}
        rows={1}
        value={dirName}
        type={"text"}
      />
      <PrimaryButton
        label={"ディレクトリ作成"}
        onClick={() => createDirectoryCallback()}
      />
    </>
  );
};

export default CreateDirectory;

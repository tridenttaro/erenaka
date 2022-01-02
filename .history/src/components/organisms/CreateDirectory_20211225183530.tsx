import { useCallback, useContext, useState } from "react";
import createDirectory from "../../lib/firebase/groups/createDirectory";
import { UserState } from "../../types/auth";
import { DirectoryInfo } from "../../types/other";
import { PrimaryButton, TextInput } from "../atoms";
import { AuthContext } from "./Auth";

type Props = {
  groupId: string;
  currentDirectory: string[];
  updateDirectories: () => void;
};

const CreateDirectory = (props: Props) => {
  const { groupId, currentDirectory, updateDirectories } = props;
  const [dirName, setDirName] = useState("");

  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

  const createDirectoryCallback = useCallback(() => {
    createDirectory({
      groupId,
      currentDirectory,
      updateDirectories,
      dirName,
      setDirName,
      userState: contextUserState,
    });
  }, [
    groupId,
    currentDirectory,
    updateDirectories,
    dirName,
    setDirName,
    contextUserState,
  ]);

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

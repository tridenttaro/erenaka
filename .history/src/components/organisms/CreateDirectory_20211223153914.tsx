import { useCallback, useContext, useState } from "react";
import { PrimaryButton, TextInput } from "../atoms";

const CreateDirectory = () => {
  const [dirName, setDirName] = useState("");

  const createDirectoryCallback = useCallback(() => {}, []);

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

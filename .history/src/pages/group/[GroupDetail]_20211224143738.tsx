import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { PrimaryButton, TextInput } from "../../components/atoms";
import DirectoryCard from "../../components/molecules/DirectoryCard";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import { DirectoryInfo } from "../../types/other";
import UploadFileToGroup from "./UploadFileToGroup";

type Props = {
  groupId: string;
  directories: DirectoryInfo[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId = (context?.params?.GroupDetail || "") as string;

  const groupInfo = "";
  const directories = await getDirectories({ groupId });
  // groupをuseReducerに持たせる...?

  const props: Props = {
    groupId: groupId,
    directories: directories,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const [test, setTest] = useState("");
  const inputTest = useCallback(
    (event) => {
      setTest(event.target.value);
    },
    [setTest]
  );
  let testStr = "nomal";
  useEffect(() => {
    testStr = "useEffect";
    console.log("useEffect u");
  }, []);
  console.log("GD-render");

  const { groupId, directories } = props;

  // const GroupDetail = () => {
  // const router = useRouter();
  // const pathName = router.asPath.split("/group/")[1];

  const getDirectoriesCallback = useCallback(() => {
    getDirectories({ groupId });
  }, [groupId]);

  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupIdは{groupId}です</p>
      <div className="p-grid__row">
        {directories.length > 0 &&
          directories.map((dir) => (
            <DirectoryCard key={dir.directoryName} {...dir} />
          ))}
      </div>

      <CreateDirectory
        groupId={groupId}
        getDirectories={getDirectoriesCallback}
      />

      <br />
      <p>testStrは {testStr}です</p>
      <br />
      <TextInput
        fullWidth={false}
        label={"ディレクトリ名"}
        multiline={false}
        required={true}
        onChange={inputTest}
        rows={1}
        value={test}
        type={"text"}
      />

      <UploadFileToGroup groupId={groupId} />
    </>
  );
};

export default GroupDetail;

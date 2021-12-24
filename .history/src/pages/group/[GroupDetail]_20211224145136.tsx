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
  console.log("ssr u");

  const props: Props = {
    groupId: groupId,
    directories: directories,
  };

  return { props };
};

const GroupDetail = ({ groupId, directories }: Props) => {
  // const { groupId, directories } = props;
  // const [test, setTest] = useState(groupId)

  // const router = useRouter();
  // const pathName = router.asPath.split("/group/")[1];
  console.log("groupID: " + groupId);
  const getDirectoriesCallback = useCallback(() => {
    getDirectories({ groupId });
  }, [groupId]);

  const [dirName, setDirName] = useState("");
  console.log("render!!!!");
  const inputDirName = useCallback(
    (event) => {
      setDirName(event.target.value);
    },
    [setDirName]
  );

  return (
    <>
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

      <UploadFileToGroup groupId={groupId} />
    </>
  );
};

export default GroupDetail;

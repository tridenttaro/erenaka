import { GetServerSideProps } from "next";
import { useCallback } from "react";
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
  const { groupId, directories } = props;
  // const GroupDetail = () => {
  // const router = useRouter();
  // const pathName = router.asPath.split("/group/")[1];

  const getDirectoriesCallback = useCallback(() => {
    getDirectories(groupId);
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

      <CreateDirectory groupId={groupId} />

      <UploadFileToGroup groupId={groupId} />
    </>
  );
};

export default GroupDetail;

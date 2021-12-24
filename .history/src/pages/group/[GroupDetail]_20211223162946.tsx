import { GetServerSideProps } from "next";
import DirectoryCard from "../../components/molecules/DirectoryCard";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/getDirectories";
import { DirectoryInfo } from "../../types/other";

type Props = {
  groupId: string;
  directories: DirectoryInfo[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId = (context?.params?.GroupDetail || "") as string;

  const groupInfo = "";
  const directories = getDirectories({ groupId });
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

  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupIdは{groupId}です</p>

      {directories.length > 0 &&
        directories.map((dir) => <DirectoryCard key={dir} dirName={dir} />)}

      <CreateDirectory groupId={groupId} />
    </>
  );
};

export default GroupDetail;

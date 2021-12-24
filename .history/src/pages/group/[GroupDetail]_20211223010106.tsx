import { useRouter } from "next/dist/client/router";
import { DirectoriesInGroupStorage } from "../../components/organisms";
import { GetServerSideProps } from "next";
import getDirectoriesInStorage from "../../lib/firebase/getDirectoriesInStorage";

type Props = {
  groupId: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId = (context?.params?.GroupDetail || "") as string;

  // const directories = getDirectoriesInStorage({path: groupId})

  // groupをuseReducerに持たせる...?

  const props: Props = {
    groupId: groupId,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const { groupId } = props;
  // const GroupDetail = () => {
  // const router = useRouter();
  // const pathName = router.asPath.split("/group/")[1];

  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupidは{groupId}です</p>

      <DirectoriesInGroupStorage />
    </>
  );
};

export default GroupDetail;

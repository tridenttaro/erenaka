import { useRouter } from "next/dist/client/router";
import { DirectoriesInGroupStorage } from "../../components/organisms";
import { GetServerSideProps } from "next";
import getDirectoriesInStorage from "../../lib/firebase/getDirectoriesInStorage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId = context.params;

  // const directories = getDirectoriesInStorage({path: groupId})
  return {
    props: { groupId: groupId },
  };
};

const GroupDetail = () => {
  const router = useRouter();
  const pathName = router.asPath.split("/group/")[1];

  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupidは {pathName} です</p>

      <DirectoriesInGroupStorage />
    </>
  );
};

export default GroupDetail;

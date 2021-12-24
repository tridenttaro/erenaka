import { useRouter } from "next/dist/client/router";
import { DirectoriesInGroupStorage } from "../../components/organisms";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
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

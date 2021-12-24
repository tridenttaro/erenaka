import { useRouter } from "next/dist/client/router";
import { DirectoriesInGroupStorage } from "../../components/organisms";
import { GetServerSideProps } from "next";
import getDirectoriesInStorage from "../../lib/firebase/getDirectoriesInStorage";

type Props = {
  groupId: any;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const groupId = context.params;

  // const directories = getDirectoriesInStorage({path: groupId})

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

  console.log(groupId);
  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupidはです</p>

      <DirectoriesInGroupStorage />
    </>
  );
};

export default GroupDetail;

import { useRouter } from "next/dist/client/router";
import { UploadImageToGroup } from "../../components/organisms";

const GroupDetail = () => {
  const router = useRouter();
  const pathName = router.asPath.split("/group/")[1];

  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupidは {pathName} です</p>

      <UploadImageToGroup />
    </>
  );
};

export default GroupDetail;

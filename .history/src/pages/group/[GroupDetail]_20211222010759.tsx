import { useRouter } from "next/dist/client/router";

const GroupDetail = () => {
  const router = useRouter();
  const pathName = router.pathname.split("/group/");
  return (
    <>
      <h2>グループ詳細画面</h2>
    </>
  );
};

export default GroupDetail;

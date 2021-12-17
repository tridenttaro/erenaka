import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";

const useChangePage = (path: string) => {
  const router = useRouter();
  const changePage = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  changePage(path);
};
export default useChangePage;

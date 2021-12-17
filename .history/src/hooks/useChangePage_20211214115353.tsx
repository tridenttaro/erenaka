import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";

const useChangePage = () => {
  const router = useRouter();
  const changePage = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return changePage;
};
export default useChangePage;

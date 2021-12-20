import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import { ChangePageProps } from "../types/other";

const useChangePage = () => {
  const router = useRouter();
  const changePage = useCallback(
    (props: ChangePageProps) => {
      router.push({ pathname: props.path, query: props.query });
    },
    [router]
  );

  return [changePage];
};
export default useChangePage;

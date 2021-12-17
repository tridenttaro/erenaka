import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";

type Props = {
  path: string;
  query?: { input: string };
};
const useChangePage = () => {
  const router = useRouter();
  const changePage = useCallback(
    (props: Props) => {
      router.push({ pathname: props.path, query: props.query });
    },
    [router]
  );

  return [changePage];
};
export default useChangePage;

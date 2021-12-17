import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";

type Props = {
  path: string;
  query?: string;
};
const useChangePage = () => {
  const router = useRouter();
  const changePage = useCallback(
    (props: Props) => {
      router.push(props.path, props.query);
    },
    [router]
  );

  return [changePage];
};
export default useChangePage;

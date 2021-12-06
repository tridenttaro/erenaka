import { useEffect } from "react";
import { useState } from "react-transition-group/node_modules/@types/react";
import { GetServerSideProps } from "next";

type Props = {
  isSignedIn: boolean;
  children: React.ReactNode;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const Auth = (props: Props) => {
  const [isSignedIn, setIsSignedIn] = useState();

  useEffect(() => {
    // 初回レンダー後に実行
    if (!isSignedIn) {
      // サインインしていない
      dispatch(listenAuthState());
    }
  }, [dispatch, isSignedIn]);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;

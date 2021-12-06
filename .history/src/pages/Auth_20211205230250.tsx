import { useEffect } from "react";
import { useState } from "react-transition-group/node_modules/@types/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  const router = useRouter();
  const pathName = router.pathname;

  type UserState = {
    isSignedIn: boolean;
    role: string;
    uid: string;
    username: string;
  };
  const initialState: CounterState = { count: 0 }; // dummy
  const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
      added: (state, action: PayloadAction<number>) => ({
        ...state,
        count: state.count + action.payload,
      }),
      decremented: (state) => ({ ...state, count: state.count - 1 }),
      incremented: (state) => ({ ...state, count: state.count + 1 }),
    },
  });

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

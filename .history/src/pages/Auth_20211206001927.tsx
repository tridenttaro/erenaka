import { useEffect } from "react";
import {
  useReducer,
  useState,
} from "react-transition-group/node_modules/@types/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  isSignedIn: boolean;
  children: React.ReactNode;
};

type UserState = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
};
// ReduxToolkit-useReducerの場合実際は初期化されず型定義しかされない
const initialState: UserState = {
  isSignedIn: false,
  role: "",
  uid: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn_reducer: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
    // added: (state, action: PayloadAction<number>) => ({
    //   ...state,
    //   count: state.count + action.payload,
    // }),
    // decremented: (state) => ({ ...state, count: state.count - 1 }),
  },
});

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const Auth = (props: Props) => {
  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const router = useRouter();
  const pathName = router.pathname;

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

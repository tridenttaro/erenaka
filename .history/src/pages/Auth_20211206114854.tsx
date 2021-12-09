import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listenAuthState } from "../lib/firebase";
import { useCallback, useReducer } from "react";

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
    signIn_did: (state, action: PayloadAction<UserState>) => ({
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

type Props = {
  // isSignedIn: boolean;
  children: React.ReactNode;
};

const Auth = (props: Props) => {
  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const { signIn_did } = userSlice.actions;

  const signIn_did2 = useCallback(
    (userState: UserState) => {
      dispatch(signIn_did(userState));
    },
    [dispatch, signIn_did]
  );
  // const newChildren = React.cloneElement(props.children, additionalProps);

  const router = useRouter();
  const changePage = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );
  const pathName = router.pathname;
  console.log("pathName: " + pathName);

  useEffect(() => {
    if (!state.isSignedIn) {
      // サインインしていない
      listenAuthState();
    }
  }, [state.isSignedIn, changePage]);

  if (!state.isSignedIn && pathName == "/Test") {
    return <p>未ログイン</p>;
  } else {
    return <>{props.children}</>;
  }
};

export default Auth;

import { useEffect, useCallback, useReducer, createContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listenAuthState } from "../lib/firebase";

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
type AuthContextType = {
  state: UserState;
  signIn_did: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
type Props = {
  // isSignedIn: boolean;
  children: React.ReactNode;
};
const Auth = (props: Props) => {
  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const { signIn_did } = userSlice.actions;

  const signIn_did_memo = useCallback(
    (userState: UserState) => {
      dispatch(signIn_did(userState));
    },
    [dispatch, signIn_did]
  );
  // const newChildren = React.cloneElement(props.children, additionalProps);
  // const newChildren = React.cloneElement(props.children, {
  //   signIn_did: signIn_did2,
  // });

  const router = useRouter();
  const changePage = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );
  const pathName = router.pathname;
  console.log("pathName: " + pathName);
  console.log("userState: " + JSON.stringify(state));
  useEffect(() => {
    if (!state.isSignedIn) {
      // サインインしていない
      listenAuthState({ signIn_did: signIn_did_memo });
    }
  }, [state.isSignedIn, signIn_did_memo]);

  const value = {
    state,
    signIn_did: signIn_did_memo,
  };

  if (
    !state.isSignedIn &&
    pathName != "/" &&
    pathName != "/SignIn" &&
    pathName != "/SignUp"
  ) {
    return <p>未ログイン</p>;
  } else {
    // return <>{props.children}</>;
    return (
      <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
    );
  }
};

export default Auth;

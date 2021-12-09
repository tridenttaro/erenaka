import { useEffect, useCallback, useReducer, createContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listenAuthState } from "../lib/firebase";
import { AuthContextType, UserState } from "../types/firebase";

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
    signed_In: (state, action: PayloadAction<UserState>) => ({
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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
type Props = {
  // isSignedIn: boolean;
  children: React.ReactNode;
};
const Auth = (props: Props) => {
  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const { signed_In } = userSlice.actions;

  const signed_In_callback = useCallback(
    (userState: UserState) => {
      dispatch(signed_In(userState));
    },
    [dispatch, signed_In]
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
      listenAuthState({ signed_In: signed_In_callback });
    }
  }, [state.isSignedIn, signed_In_callback]);

  const value = {
    state: state,
    signIn_did: signed_In_callback,
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

import { useEffect, useCallback, useReducer, createContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import listenAuthState from "../lib/firebase/listenAuthState";
import { AuthContextType, UserState } from "../types/firebase";
import { PrimaryButton } from "../components/atoms";
import useChangePage from "../hooks/useChangePage";

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
    signedIn: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
    signedOut: (state) => ({
      // ...state,
      ...{
        isSignedIn: false,
        role: "",
        uid: "",
        username: "",
      },
    }),
    joinedGroup: (state, action: PayloadAction<string>) => ({
      ...state,
      groupId1: action.payload,
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
  children: React.ReactNode;
};
const Auth = (props: Props) => {
  const [changePage] = useChangePage();
  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const { signedIn, signedOut, joinedGroup } = userSlice.actions;

  const signedInCallback = useCallback(
    (userState: UserState) => {
      dispatch(signedIn(userState));
    },
    [dispatch, signedIn]
  );
  const signedOutCallback = useCallback(() => {
    dispatch(signedOut);
  }, [dispatch, signedOut]);
  const joinedGroupCallback = useCallback(
    (groupId1: string) => {
      dispatch(joinedGroup(groupId1));
    },
    [dispatch, joinedGroup]
  );

  const router = useRouter();
  const pathName = router.pathname;

  console.log("Authレンダリング発生");
  console.log("pathName: " + pathName);
  console.log("userState: " + JSON.stringify(state));
  useEffect(() => {
    if (!state.isSignedIn) {
      // サインインしていない
      listenAuthState({ signedIn: signedInCallback });
    }
  }, [state.isSignedIn, signedInCallback]);

  const contextValue = {
    state: state,
    signedIn: signedInCallback,
    signedOut: signedOutCallback,
    joinedGroup: joinedGroupCallback,
  };

  if (
    !state.isSignedIn &&
    pathName != "/" &&
    pathName != "/SignIn" &&
    pathName != "/SignUp"
  ) {
    return (
      <>
        <p>ログインが必要です</p>
        <PrimaryButton
          label={"ログインページへ"}
          onClick={() => changePage({ path: "/SignIn" })}
        />
      </>
    );
  } else {
    // return <>{props.children}</>;
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
  }
};

export default Auth;

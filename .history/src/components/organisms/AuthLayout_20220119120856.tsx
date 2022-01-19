import {
  useEffect,
  useCallback,
  useReducer,
  createContext,
  useState,
} from "react";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import listenAuthState from "../../lib/firebase/auth/listenAuthState";
import { AuthContextType, UserState } from "../../types/auth";
import { PrimaryButton } from "../atoms";
import { Header } from ".";
import layout from "../../styles/layout.module.scss";
import Head from "next/head";
import { CircularProgress } from "@material-ui/core";

// ReduxToolkit-useReducerの場合実際は初期化されず型定義しかされない
const initialState: UserState = {
  isSignedIn: false,
  role: "",
  uid: "",
  username: "",
  joinedGroups: [],
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
        joinedGroups: [],
      },
    }),
    joinedGroup: (state, action: PayloadAction<string[]>) => ({
      ...state,
      joinedGroups: action.payload,
    }),
    // added: (state, action: PayloadAction<number>) => ({
    //   ...state,
    //   count: state.count + action.payload,
    // }),
  },
});

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};
const AuthLayout = (props: Props) => {
  const router = useRouter();
  const pathName = router.pathname;

  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const { signedIn, signedOut, joinedGroup } = userSlice.actions;

  console.log("pathName: " + pathName);
  console.log("userState: " + JSON.stringify(state));

  const signedInCallback = useCallback(
    (userState: UserState) => {
      dispatch(signedIn(userState));
    },
    [dispatch, signedIn]
  );

  useEffect(() => {
    if (!state.isSignedIn) {
      listenAuthState({ signedIn: signedInCallback, setLoading });
    }
  }, [state.isSignedIn, signedInCallback]);

  const signedOutCallback = useCallback(() => {
    dispatch(signedOut);
  }, [dispatch, signedOut]);

  const joinedGroupCallback = useCallback(
    (joinedGroups: string[]) => {
      dispatch(joinedGroup(joinedGroups));
    },
    [dispatch, joinedGroup]
  );

  const contextValue = {
    state: state,
    signedIn: signedInCallback,
    signedOut: signedOutCallback,
    joinedGroup: joinedGroupCallback,
  };

  return (
    <div className={layout.pageWrapper}>
      <Head>
        <meta name="description" content="電子名刺サービス" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <AuthContext.Provider value={contextValue}>
        <Header />
        {loading ? (
          <div style={{ margin: "0 auto", textAlign: "center" }}>
            <p>Loading...</p>
            <CircularProgress />
          </div>
        ) : !state.isSignedIn &&
          pathName != "/SignIn" &&
          pathName != "/SignUp" &&
          pathName != "/PassReset" ? (
          <div>
            <p>ログインが必要です</p>
            <PrimaryButton
              label={"ログインページへ"}
              onClick={() => router.push("/SignIn")}
            />
          </div>
        ) : (
          <div>{props.children}</div>
        )}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthLayout;

import { useEffect, useCallback, useReducer, createContext } from "react";
// import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import listenAuthState from "../lib/firebase/listenAuthState";
import { AuthContextType, UserState } from "../types/auth";
import { PrimaryButton } from "../components/atoms";

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
    // decremented: (state) => ({ ...state, count: state.count - 1 }),
  },
});

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {},
//   };
// };

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
type Props = {
  children: React.ReactNode;
};
const auth = (props: Props) => {
  const router = useRouter();
  const pathName = router.pathname;

  const [state, dispatch] = useReducer(userSlice.reducer, initialState);
  const { signedIn, signedOut, joinedGroup } = userSlice.actions;

  console.log("Authレンダリング発生");
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
      // サインインしていない
      listenAuthState({ signedIn: signedInCallback });
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
          onClick={() => router.push("/SignIn")}
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

export default auth;

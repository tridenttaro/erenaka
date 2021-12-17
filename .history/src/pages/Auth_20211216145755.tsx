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
  is_signed_in: false,
  role: "",
  uid: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signed_in: (state, action: PayloadAction<UserState>) => ({
      ...state,
      ...action.payload,
    }),
    signed_out: (state) => ({
      // ...state,
      ...{
        is_signed_in: false,
        role: "",
        uid: "",
        username: "",
      },
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
  const { signed_in, signed_out } = userSlice.actions;

  const signed_in_callback = useCallback(
    (userState: UserState) => {
      dispatch(signed_in(userState));
    },
    [dispatch, signed_in]
  );
  const signed_out_callback = useCallback(() => {
    dispatch(signed_out);
  }, [dispatch, signed_out]);

  const router = useRouter();
  const pathName = router.pathname;

  console.log("Authレンダリング発生");
  console.log("pathName: " + pathName);
  console.log("userState: " + JSON.stringify(state));
  useEffect(() => {
    if (!state.is_signed_in) {
      // サインインしていない
      listenAuthState({ signed_In: signed_in_callback });
    }
  }, [state.is_signed_in, signed_in_callback]);

  const contextValue = {
    state: state,
    signed_In: signed_in_callback,
    signed_Out: signed_out_callback,
  };

  if (
    !state.is_signed_in &&
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

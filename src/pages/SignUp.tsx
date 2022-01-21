import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useCallback, useState, useContext } from "react";
import { TextInput, PrimaryButton } from "../components/atoms";
import useChangePage from "../hooks/useChangePage";
import signUp from "../lib/firebase/auth/signUp";
import Head from "next/head";

const SignUp: NextPage = () => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const [changePage] = useChangePage();

  // const context = useContext(AuthContext);
  // const signIn_did = context?.signed_In as Signed_In;

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="c-section-container">
      <Head>
        <title>電子名刺 | サインアップ</title>
      </Head>

      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" />

      <TextInput
        fullWidth={true}
        label={"氏名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード(再確認)"}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() =>
            signUp({ username, email, password, confirmPassword, changePage })
          }
        />
        <div className="module-spacer--medium" />
        <p onClick={() => router.push("/SignIn")}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;

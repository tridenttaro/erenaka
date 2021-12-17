import { useCallback, useState, useContext } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";
import useChangePage from "../hooks/useChangePage";
import signIn from "../lib/firebase/signIn";
import { SignedIn } from "../types/firebase";
import { AuthContext } from "./Auth";

const SignIn = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [message, setMessage] = useState("");
  const [changePage] = useChangePage();

  const context = useContext(AuthContext);
  const signedIn = context?.signedIn as SignedIn;
  // const contextUserState = context?.state as UserState;

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

  const signInCallback = useCallback(() => {
    signIn({
      email,
      password,
      changePage,
      signed_In: signedIn,
      setMessage,
    });
  });

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />

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
      <p style={{ color: "red" }}>{message}</p>
      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton label={"サインイン"} onClick={() => signInCallback()} />
        <div className="module-spacer--medium" />

        <p onClick={() => changePage({ path: "/SignUp" })}>
          アカウントの新規作成
        </p>
        {/* <p onClick={() => changePage("/signin/reset")}>
          パスワードを忘れた方はこちら
        </p> */}
      </div>
    </div>
  );
};

export default SignIn;

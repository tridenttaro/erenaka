import { useCallback, useState, useContext } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";
import useChangePage from "../hooks/useChangePage";
import signIn from "../lib/firebase/signIn";

import { Signed_In } from "../types/firebase";
import { AuthContext } from "./Auth";

const SignIn = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const [changePage] = useChangePage();

  const context = useContext(AuthContext);
  const signed_In = context?.signed_In as Signed_In;
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
      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"サインイン"}
          onClick={() =>
            signIn({ email, password, changePage, signed_In: signed_In })
          }
        />
        <div className="module-spacer--medium" />

        <p onClick={() => changePage("/SignUp")}>アカウントの新規作成</p>
        {/* <p onClick={() => changePage("/signin/reset")}>
          パスワードを忘れた方はこちら
        </p> */}
      </div>
    </div>
  );
};

export default SignIn;

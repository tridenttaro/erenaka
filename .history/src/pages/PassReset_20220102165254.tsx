import { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/atoms"

import { useRouter } from "next/dist/client/router";
import passReset from "../lib/firebase/auth/passReset";

const PassReset = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const passResetCallback = useCallback(() => {
    passReset(email)
  },[email, passReset])

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
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

      <div className="module-spacer--medium" />

      <div className="center">
        <PrimaryButton
          label={"パスワードをリセットする"}
          onClick={() => }
        />
        <div className="module-spacer--medium" />

        <p onClick={() => router.push("/SignIn")}>ログイン画面へ戻る</p>
      </div>
    </div>
  );
};

export default PassReset;

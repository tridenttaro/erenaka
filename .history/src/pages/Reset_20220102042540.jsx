import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";
import { push } from "connected-react-router";

const Reset = () => {
  const [email, setEmail] = useState("");

  // 子要素に関数を渡すとき、useCallbackを使う(メモ化する)とパフォが上がる
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

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
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium" />

        <p onClick={() => dispatch(push("/signin"))}>ログイン画面へ戻る</p>
      </div>
    </div>
  );
};

export default Reset;

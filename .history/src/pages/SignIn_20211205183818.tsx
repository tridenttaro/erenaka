import { useCallback, useState } from "react";
import { PrimaryButton, TextInput } from "../components/atoms";

const SignIn = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const router = useRouter();
  const changePage = useCallback(() => {
    router.push("/");
  }, []);

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
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="module-spacer--medium" />

        <p onClick={() => dispatch(push("/signup"))}>アカウントの新規作成</p>
        <p onClick={() => dispatch(push("/signin/reset"))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignIn;

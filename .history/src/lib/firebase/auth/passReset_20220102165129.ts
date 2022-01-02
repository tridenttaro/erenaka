import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "..";

type Props = {
  email: string;
};

const passReset = async ({ email }: Props) => {
  if (email === "") {
    alert("メールアドレスを入力してください");
    return false;
  } else {
    try {
      await sendPasswordResetEmail(auth, email);

      alert(
        "入力されたメールアドレスにパスワードリセット用のメールを送信しました。"
      );
    } catch (error) {
      alert("パスワードリセットの手続きに失敗しました。");
    }

    // auth
    //   .sendPasswordResetEmail(email)
    //   .then(() => {
    //     alert(
    //       "入力されたメールアドレスにパスワードリセット用にメールを送信しました。"
    //     );
    //     dispatch(push("signin"));
    //   })
    //   .catch(() => {
    //     alert("パスワードリセットの手続きに失敗しました。");
    //   });
  }
};

export default passReset;

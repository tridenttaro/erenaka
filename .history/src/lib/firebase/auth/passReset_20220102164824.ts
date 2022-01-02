type Props = {
  email: string;
};

const passReset = ({ email }: Props) => {
  if (email === "") {
    alert("必須項目が必要です");
    return false;
  } else {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたメールアドレスにパスワードリセット用にメールを送信しました。"
        );
        dispatch(push("signin"));
      })
      .catch(() => {
        alert("パスワードリセットの手続きに失敗しました。");
      });
  }
};

export default passReset;

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export const signUp = (username, email, password, confirmPassword) => {
  // Validation...入力した値が正しいかを確認
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("必須項目が未入力です");
    return false;
  }

  if (password !== confirmPassword) {
    alert("パスワードが一致していません。もう一度お試しください。");
    return false;
  }
  if (password.length < 6) {
    alert("パスワードは6文字以上で入力してください。");
    return false;
  }
  // if(!isValidEmailFormat(email)) {
  //   alert('メールアドレスの形式が不正です。もう1度お試しください。')
  //   return false
  // }
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      if (user) {
        // 成功
        const uid = user.uid; // 登録アカウントのuid
        const timestamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: "customer",
          uid: uid,
          updated_at: timestamp,
          username: username,
        };

        db.collection("users")
          .doc(uid)
          .set(userInitialData) // 登録アカウントのuidでデータを登録----set...データの登録
          .then(() => {
            dispatch(push("/"));
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode + "\n" + errorMessage);
    });
};

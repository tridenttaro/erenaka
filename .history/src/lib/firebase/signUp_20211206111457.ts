import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

type Props = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  changePage: { (path: string): void };
};

const signUp = async (props: Props) => {
  const { username, email, password, confirmPassword, changePage } = props;

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
  try {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        if (user) {
          // 成功
          const uid = user.uid; // 登録アカウントのuid
          const timestamp = Timestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          try {
            await setDoc(doc(db, "users", uid), userInitialData);
            // ホームページに遷移させる
            changePage("/");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + "\n" + errorMessage);
      });
  } catch (e) {
    console.error("Error createUser:", e);
  }
};

export default signUp;

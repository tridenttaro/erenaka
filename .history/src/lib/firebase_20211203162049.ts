import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const signUp = async (username, email, password, confirmPassword) => {
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
    .then(async (userCredential) => {
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

        try {
          const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

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

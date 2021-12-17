import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from ".";
import { Signed_In, UserState } from "../../types/firebase";
import { ChangePage } from "../../types/util";

type Props = {
  email: string;
  password: string;
  changePage: ChangePage;
  signed_In: Signed_In;
  setMessage: (str: string) => void;
};

const signIn = async (props: Props) => {
  const { email, password, changePage } = props;

  if (email === "" || password === "") {
    alert("必須項目が未入力です");
    return false;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      if (user) {
        // サインイン完了
        const uid = user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data);

          const userState = {
            isSignedIn: true,
            role: data.role,
            uid: uid,
            username: data.username,
          };
          props.signed_In(userState);

          changePage({ path: "/" });
        } else {
          console.log("No such document!");
        }
      } else {
        props.setMessage(
          "ログインに失敗しました。メールアドレスとパスワードが間違っていないか確認してください。"
        );
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);

      props.setMessage(
        "ログインに失敗しました。メールアドレスとパスワードが間違っていないか確認してください。2"
      );
    });
};

export default signIn;

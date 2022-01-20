import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from "../";
import { SignedIn } from "../../../types/auth";
import { ChangePage } from "../../../types/other";

type Props = {
  email: string;
  password: string;
  changePage: ChangePage;
  signedIn: SignedIn;
  setMessage: (str: string) => void;
};

const signIn = async (props: Props) => {
  const { email, password, changePage, signedIn, setMessage } = props;

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
            joinedGroups: data.joinedGroups,
          };
          signedIn(userState);

          setMessage("");
          changePage({ path: "/" });
        } else {
          console.log("No such document!");
        }
      } else {
        setMessage(
          "ログインに失敗しました。メールアドレスとパスワードが間違っていないか確認してください。"
        );
      }
    })
    .catch((error) => {
      console.error(error);

      props.setMessage(
        "ログインに失敗しました。メールアドレスとパスワードが間違っていないか確認してください。"
      );
    });
};

export default signIn;
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from "../../firebase";
import { UserState } from "../../types/firebase";

type Props = {
  email: string;
  password: string;
  changePage: (path: string) => void;
  signIn_did: (userState: UserState) => void;
};

const signIn = async (props: Props) => {
  const { email, password, changePage } = props;

  if (email === "" || password === "") {
    alert("必須項目が未入力です");
    return false;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      if (user) {
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
          props.signIn_did(userState);

          changePage("/");
        } else {
          console.log("No such document!");
        }
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);
    });
};

export default signIn;

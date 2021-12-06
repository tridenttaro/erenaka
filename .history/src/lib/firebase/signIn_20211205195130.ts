import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from "../../firebase";

type Props = {
  email: string;
  password: string;
  changePage: { (path: string): void };
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
          console.log("Document data:", docSnap.data());
          changePage("/");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        //     dispatch(
        //       signInAction({
        //         isSignedIn: true,
        //         role: data.role,
        //         uid: uid,
        //         username: data.username,
        //       })
        //     );

        // dispatch(push("/"));
        // });
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

import { onAuthStateChanged } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from ".";
import { UserState } from "../../types/firebase";

type Props = {
  signedIn: { (userState: UserState): void };
};

const listenAuthState = (props: Props) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data);

        const userState = {
          isSignedIn: true,
          role: "customer",
          uid: data.uid,
          username: data.username,
        };
        props.signedIn(userState);
      } else {
        console.log("No such document!");
      }
    } else {
      // サインイン画面に移行
      // props.changePage("/SignIn");
    }
  });
};

export default listenAuthState;

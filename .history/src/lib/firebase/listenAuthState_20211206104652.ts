import { onAuthStateChanged } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from "../../firebase";

type Props = {
  changePage: { (path: string): void };
};

const listenAuthState = (props: Props) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      // db.collection("users").doc(uid).get()   // get...データの取得
      //   .then(snapshot => {
      //     const data = snapshot.data()        // dbから取得したデータ

      //     dispatch(signInAction({
      //       isSignedIn: true,
      //       role: data.role,
      //       uid: uid,
      //       username: data.username
      //     }))

      //   })
    } else {
      // サインイン画面に移行
      // props.changePage("/SignIn");
    }
  });
};

export default listenAuthState;

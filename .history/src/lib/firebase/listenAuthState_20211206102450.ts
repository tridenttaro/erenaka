import { onAuthStateChanged } from "@firebase/auth";
import { collection, getDocs } from "@firebase/firestore";
import { ChangeHistory } from "@material-ui/icons";
import { auth, db } from "../../firebase";

type Props = {
  changePage: { (path: string): void };
};

const listenAuthState = (props: Props) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;

      const querySnapshot = await getDocs(collection(db, "users", uid));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });

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
      props.changePage("/SignIn");
    }
  });
};

export default listenAuthState;

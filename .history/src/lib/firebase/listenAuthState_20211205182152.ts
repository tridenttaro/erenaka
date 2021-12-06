import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../firebase";

const listenAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid

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
      // User is signed out
      // ...
    }
};

export default listenAuthState;

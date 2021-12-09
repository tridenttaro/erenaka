import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const signOutAction = () => {
  signOut(auth)
    .then(() => {
      console.log("サインアウト完了");
    })
    .catch((error) => {
      // An error happened.
    });
};

export default signOutAction;

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const signOutAction = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export default signOutAction;

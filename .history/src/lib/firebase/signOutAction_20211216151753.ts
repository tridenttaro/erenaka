import { auth } from ".";
import { signOut } from "firebase/auth";
import { SignedOut } from "../../types/firebase";

type Props = {
  signed_Out: SignedOut;
};
const signOutAction = (props: Props) => {
  signOut(auth)
    .then(() => {
      props.signed_Out();
      console.log("サインアウト完了");
    })
    .catch((error) => {
      // An error happened.
    });
};

export default signOutAction;

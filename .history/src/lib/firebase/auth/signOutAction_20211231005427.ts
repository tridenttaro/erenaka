import { auth } from "../auth";
import { signOut } from "firebase/auth";
import { SignedOut } from "../../../types/auth";

type Props = {
  signedOut: SignedOut;
};
const signOutAction = (props: Props) => {
  signOut(auth)
    .then(() => {
      props.signedOut();
      console.log("サインアウト完了");
    })
    .catch((error) => {
      // An error happened.
    });
};

export default signOutAction;

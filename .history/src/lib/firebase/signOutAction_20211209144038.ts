import { auth } from ".";
import { signOut } from "firebase/auth";
import { Signed_Out } from "../../types/firebase";

type Props = {
  signed_Out: Signed_Out;
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

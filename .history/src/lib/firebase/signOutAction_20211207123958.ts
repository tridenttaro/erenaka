import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

type Props: {
  signed_Out: () => void;
}
const signOutAction = (props: Props) => {
  signOut(auth)
    .then(() => {
      console.log("サインアウト完了");
    })
    .catch((error) => {
      // An error happened.
    });
};

export default signOutAction;

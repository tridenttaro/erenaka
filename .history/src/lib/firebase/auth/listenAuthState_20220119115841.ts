import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "..";
import { UserState } from "../../../types/auth";

type Props = {
  signedIn: { (userState: UserState): void };
  setLoading: (bool: boolean) => void;
};

const listenAuthState = (props: Props) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;

      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const joinedGroups = data.joinedGroups;
        console.log("Document data:", data);

        const userState = {
          isSignedIn: true,
          role: "customer",
          uid: data.uid,
          username: data.username,
          joinedGroups: joinedGroups,
        };
        props.signedIn(userState);
      } else {
        // console.log("No such document!");
      }
      props.setLoading(false);
    } else {
      props.setLoading(false);
    }
  });
};

export default listenAuthState;

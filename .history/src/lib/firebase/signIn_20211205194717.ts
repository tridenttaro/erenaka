import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { auth, db } from "../../firebase";

type Props = {
  email: string;
  password: string;
};

const signIn = async (props: Props) => {
  const { email, password } = props;

  if (email === "" || password === "") {
    alert("必須項目が未入力です");
    return false;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
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

        // const querySnapshot = await getDocs(collection(db, "users", uid));
        // querySnapshot.forEach((doc) => {
        //   console.log(`${doc.id} => ${doc.data()}`);
        // });
        console.log("ok: " + JSON.stringify(user));

        // db.collection("users")
        //   .doc(uid)
        //   .get() // get...データの取得
        //   .then((snapshot) => {
        //     const data = snapshot.data(); // dbから取得したデータ

        //     dispatch(
        //       signInAction({
        //         isSignedIn: true,
        //         role: data.role,
        //         uid: uid,
        //         username: data.username,
        //       })
        //     );

        // dispatch(push("/"));
        // });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode);
      console.error(errorMessage);
    });
};

export default signIn;

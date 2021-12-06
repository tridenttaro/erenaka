type Props = {
  email: string;
  password: string;
};

const signIn = (props: Props) => {
  const { email, password } = props;

  if (email === "" || password === "") {
    alert("必須項目が未入力です");
    return false;
  }

  auth.signInWithEmailAndPassword(email, password).then((result) => {
    const user = result.user;

    if (user) {
      const uid = user.uid;

      db.collection("users")
        .doc(uid)
        .get() // get...データの取得
        .then((snapshot) => {
          const data = snapshot.data(); // dbから取得したデータ

          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
            })
          );

          dispatch(push("/"));
        });
    }
  });
};

export default signIn;

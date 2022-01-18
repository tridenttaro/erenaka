import { collection, doc, getDoc } from "firebase/firestore";
import { db } from ".";
import { UserState } from "../../types/auth";
import { BusinessCardData } from "../../types/other";

type Props = {
  userState: UserState;
  setBusinessCardData: (data: BusinessCardData) => void;
};

const getLastData = async (props: Props) => {
  const { userState, setBusinessCardData } = props;

  try {
    const docRef = doc(db, "users", userState.uid, "lastData");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setBusinessCardData({
        company: data?.company || "",
        username: userState?.username || "",
        position: data?.positon || "",
        address: data?.address || "",
        telephoneNumber: data?.telephoneNumber || "",
        fax: data?.fax || "",
        email: data?.email || "",
        others: data?.other || "",
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {}
};

export default getLastData;

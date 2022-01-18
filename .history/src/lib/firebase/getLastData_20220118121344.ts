import { collection } from "firebase/firestore";
import { db } from ".";
import { UserState } from "../../types/auth";
import { BusinessCardData } from "../../types/other";

type Props = {
  userState: UserState;
  setBusinessCardData: (data: BusinessCardData) => void;
};

const getLastData = (props: Props) => {
  const { userState, setBusinessCardData } = props;
  const userRef = collection(db, "users", userState.uid, "lastData");
};

export default getLastData;

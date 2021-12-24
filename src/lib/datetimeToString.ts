import { Timestamp } from "firebase/firestore";

type Props = {
  timeStamp: Timestamp;
};

const datetimeToString = ({ timeStamp }: Props) => {
  const date = timeStamp.toDate();
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2)
  );
};

export default datetimeToString;

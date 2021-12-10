import { ref } from "@firebase/storage";
import { storage } from ".";

type Props = {
  receiveKey: string;
};

const downloadFile = (props: Props) => {
  const { receiveKey } = props;
  const pathReference = ref(storage, `temp/${receivekey}`);
};

export default downloadFile;

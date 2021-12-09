import { storageRef } from "../../firebase";

type Props = {
  file?: File;
};

const uploadFile = (props: Props) => {
  if (!props.file) return;

  // const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const S = "0123456789";
  const N = 5;
  const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");

  const listRef = storageRef.child("temp");
  // Find all the prefixes and items.
  listRef
    .listAll()
    .then(function (res) {
      res.prefixes.forEach(function (folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach(function (itemRef) {
        // All the items under listRef.
      });
    })
    .catch(function (error) {
      // Uh-oh, an error occurred!
    });
};
export default uploadFile;

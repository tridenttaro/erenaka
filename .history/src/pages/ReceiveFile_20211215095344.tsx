import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import downloadFile from "../lib/firebase/downloadFile";

const ReceiveFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.input);
    if (router.query.input != undefined && router.query.input != "{}") {
      setDownloadKey(router.query.input as string);
    }
  }, [router]);

  const inputReceiveKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  const downloadFile_callback = useCallback(() => {
    downloadFile({ downloadKey: downloadKey });
  }, [downloadKey]);

  return (
    <>
      <h2>RECEIVE FILE</h2>

      <TextInput
        fullWidth={false}
        label={"key"}
        multiline={false}
        required={true}
        onChange={inputReceiveKey}
        rows={1}
        value={downloadKey}
        type={"text"}
      />

      <PrimaryButton
        label={"RECEIVE FILE"}
        onClick={() => downloadFile_callback()}
      />
      <br />
      <br />
      <Link href="/QrReaderReceiveFile" passHref>
        {/* <a className={styles.card}>UploadFile</a> */}
        <a>QRコードで読み取る</a>
      </Link>
    </>
  );
};

export default ReceiveFile;

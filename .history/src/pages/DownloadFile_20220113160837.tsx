import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback, useState, useEffect, useContext } from "react";
import { SelectBox } from "../components/atoms";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import { AuthContext } from "../components/organisms/AuthLayout";
import downloadFile from "../lib/firebase/downloadFile";
import { UserState } from "../types/auth";

const DownloadFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [upToGroupId, setUpToGroupId] = useState<string>("");

  const router = useRouter();
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  useEffect(() => {
    if (router.query.input != undefined && router.query.input != "{}") {
      setDownloadKey(router.query.input as string);
    }
  }, [router]);

  const inputDownloadKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  const downloadFile_callback = useCallback(() => {
    downloadFile({ downloadKey, userState });
  }, [downloadKey, userState]);

  return (
    <>
      <h2>DOWNLOAD FILE</h2>

      <SelectBox
        label={"アップロード先グループ選択"}
        required={true}
        options={}
        select={setUpToGroupId}
        value={upToGroupId}
      />

      <TextInput
        fullWidth={false}
        label={"key"}
        multiline={false}
        required={true}
        onChange={inputDownloadKey}
        rows={1}
        value={downloadKey}
        type={"text"}
      />

      <PrimaryButton
        label={"DOWNLOAD FILE"}
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

export default DownloadFile;

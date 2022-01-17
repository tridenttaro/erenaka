import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback, useState, useEffect, useContext } from "react";
import { SelectBox } from "../components/atoms";
import PrimaryButton from "../components/atoms/PrimaryButton";
import TextInput from "../components/atoms/TextInput";
import { AuthContext } from "../components/organisms/AuthLayout";
import downloadFile from "../lib/firebase/downloadFile";
import getGroupsInfo from "../lib/firebase/groups/getGroupsInfo";
import { UserState } from "../types/auth";
import { GroupData } from "../types/other";

const DownloadFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  const [joinedGroupsInfo, setJoinedGroupsInfo] = useState<
    { id: string; name: string }[]
  >([]);
  const [upToGroupId, setUpToGroupId] = useState<string>("");

  const router = useRouter();
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;
  const joinedGroupsId = userState.joinedGroups;

  useEffect(() => {
    getGroupsInfo({
      joinedGroupsId,
      setJoinedGroupsInfo,
      downloadFilePageFlag: true,
    });
  }, [joinedGroupsId]);

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
    downloadFile({ downloadKey, userState, upToGroupId });
  }, [downloadKey, userState, upToGroupId]);

  return (
    <>
      <h2>DOWNLOAD FILE</h2>

      <SelectBox
        label={"アップロード先グループ選択"}
        required={true}
        options={joinedGroupsInfo}
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

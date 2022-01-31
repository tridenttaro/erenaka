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
import Head from "next/head";
import getAllDirectories from "../lib/firebase/groups/getAllDirectories";
import { AllDirectoryData } from "../types/other";
import { BreadCrumbs } from "../components/molecules";

const DownloadFile: NextPage = () => {
  const [downloadKey, setDownloadKey] = useState<string>("");
  // SelectBox用
  const [joinedGroupsInfo, setJoinedGroupsInfo] = useState<
    { id: string; name: string }[]
  >([]);
  // SelectBox用
  const [selectedGroupDirsInfo, setSelectedGroupDirsInfo] = useState<
    { id: string; name: string }[]
  >([]);

  const [allDirectories, setAllDirectories] = useState<AllDirectoryData>({});
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedDirectory, setSelectedDirectory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;
  const joinedGroupsId = userState.joinedGroups;

  useEffect(() => {
    (async () => {
      await getGroupsInfo({
        joinedGroupsId,
        setJoinedGroupsInfo,
      });
      setJoinedGroupsInfo((prevState) => [
        ...prevState,
        { id: "download", name: "端末にダウンロード" },
      ]);

      await getAllDirectories({ joinedGroupsId, setAllDirectories });
    })();
  }, [joinedGroupsId]);

  useEffect(() => {
    if (router.query.input != undefined && router.query.input != "{}") {
      setDownloadKey(router.query.input as string);
    }
  }, [router]);

  // useEffect(() => {
  //   if (selectedGroup != "") {
  //     const list = [{ id: "", name: " / (グループ直下)" }];
  //     for (const dir of allDirectories[selectedGroup]) {
  //       list.push({ id: dir.directoryName, name: ` /${dir.directoryName}` });
  //     }
  //     setSelectedGroupDirsInfo(list);
  //   }
  // }, [selectedGroup, allDirectories]);

  const inputDownloadKey = useCallback(
    (event) => {
      setDownloadKey(event.target.value);
    },
    [setDownloadKey]
  );

  const downloadFile_callback = useCallback(() => {
    downloadFile({
      downloadKey,
      userState,
      selectedGroupId: selectedGroup,
      loading,
      setLoading,
    });
  }, [downloadKey, userState, selectedGroup, loading]);

  const bc_lists = [
    { name: "DownloadFile", path: ["DownloadFile", "DownloadFile"] },
  ];

  return (
    <>
      <Head>
        <title>電子名刺 | 名刺交換・受信</title>
      </Head>

      <BreadCrumbs lists={bc_lists} />

      <h2>名刺交換・受信</h2>

      <SelectBox
        label={"アップロード先グループ"}
        required={true}
        options={joinedGroupsInfo}
        select={setSelectedGroup}
        value={selectedGroup}
      />
      {/* <br />
      <SelectBox
        label={"アップロード先フォルダ"}
        required={true}
        options={selectedGroupDirsInfo}
        select={setSelectedDirectory}
        value={selectedDirectory}
      /> */}

      <br />

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
        label={"Receive Image"}
        onClick={() => downloadFile_callback()}
      />
      <br />
      <br />
      <Link href="/QrReaderReceiveFile?input=image" passHref>
        {/* <a className={styles.card}>UploadFile</a> */}
        <a style={{ color: "blue" }}>QRコードで読み取る</a>
      </Link>
    </>
  );
};

export default DownloadFile;

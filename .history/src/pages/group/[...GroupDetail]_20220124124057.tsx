import { GetServerSideProps } from "next";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { DirectoryList, ImageList } from "../../components/organisms";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import { DirectoryData, GroupData, ImageData } from "../../types/other";
import Head from "next/head";
import { BreadCrumbs, ImageModal } from "../../components/molecules";
import { CircularProgress } from "@material-ui/core";
import getGroupsInfo from "../../lib/firebase/groups/getGroupsInfo";
import { AuthContext } from "../../components/organisms/AuthLayout";
import { UserState } from "../../types/auth";
import styles from "../../styles/groupdetail.module.scss";
import { useRouter } from "next/dist/client/router";
import { SelectBox } from "../../components/atoms";

type Props = {
  groupId: string;
  currentDirectory: string[];
  directories: DirectoryData[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlStr = (context?.params?.GroupDetail || []) as string[];
  const groupId = urlStr[0];
  const currentDirectory: string[] = urlStr.length > 1 ? urlStr.slice(1) : [];

  // const nowPage = (context?.query?.p || "1") as string;
  // 表示件数
  // const imagesCount = 0;
  // const pagesCount = Math.ceil(imagesCount / perPage);

  const directories: DirectoryData[] = await getDirectories({
    groupId,
    currentDirectory,
  });

  const props: Props = {
    groupId: groupId,
    currentDirectory: currentDirectory,
    directories: directories,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const { groupId, currentDirectory } = props;
  const [perPage, setPerPage] = useState(20);
  const [groupsInfo, setGroupsInfo] = useState<GroupData[]>();
  const [directories, setDirectories] = useState<DirectoryData[]>([]);

  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  // パンくずリスト用
  const browsePath = "/group/[...GroupDetail]";
  let truePath = `/group/${groupId}`;
  const bc_lists = [{ name: "GROUP", path: [browsePath, truePath] }];
  if (currentDirectory.length > 0) {
    const cdItem = currentDirectory.map((value, index) => {
      currentDirectory.forEach((v, i) => {
        if (i <= index) truePath += `/${v}`;
      });
      return {
        name: value,
        path: [browsePath, truePath],
      };
    });
    bc_lists.push(...cdItem);
  }

  // 表示件数リスト
  const perPageList = [
    { id: "25", name: "25" },
    { id: "50", name: "50" },
  ];

  useEffect(() => {
    getGroupsInfo({ joinedGroupsId: [groupId], setGroupsInfo });
  }, [groupId]);

  useEffect(() => {
    setDirectories(props.directories);
  }, [props.directories]);

  const updateDirectories = useCallback(async () => {
    const data = await getDirectories({ groupId, currentDirectory });
    setDirectories(data);
  }, [groupId, currentDirectory]);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);
  const inputModalImageUrl = useCallback((url: string) => {
    setModalImageUrl(url);
  }, []);

  return (
    <div>
      <Head>
        <title>電子名刺 | 名刺一覧</title>
      </Head>

      <BreadCrumbs lists={bc_lists} />

      {groupsInfo && (
        <>
          <br />
          <p className={styles.gpName}>{groupsInfo[0].groupName}</p>
          <p className={styles.gpId}> ({groupId})</p>
        </>
      )}

      <div className={styles.perPageSelect}>
        <SelectBox
          label={"表示件数"}
          required={true}
          options={perPageList}
          select={setPerPage}
          value={perPage.toString()}
        />
      </div>

      {/* <Suspense fallback={<CircularProgress />}>
        <DirectoryList {...{ groupId, currentDirectory, directories }} />
      </Suspense> */}

      <ImageModal
        open={modalOpen}
        handleClose={handleModalClose}
        modalImageUrl={modalImageUrl}
      />

      <Suspense fallback={<CircularProgress />}>
        <ImageList
          {...{
            groupId,
            currentDirectory,
            handleModalOpen,
            inputModalImageUrl,
            perPage,
          }}
        />
      </Suspense>

      {/* <CreateDirectory {...{ groupId, currentDirectory, updateDirectories }} /> */}
      <br />

      <br />
    </div>
  );
};

export default GroupDetail;

import { GetServerSideProps } from "next";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { DirectoryList, ImageList } from "../../components/organisms";
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlStr = (context?.params?.GroupDetail || []) as string[];
  const groupId = urlStr[0];
  const currentDirectory: string[] = urlStr.length > 1 ? urlStr.slice(1) : [];

  const props: Props = {
    groupId: groupId,
    currentDirectory: currentDirectory,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const { groupId, currentDirectory } = props;
  const [perPage, setPerPage] = useState(10);
  const [groupsInfo, setGroupsInfo] = useState<GroupData[]>();

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
    { id: "10", name: "10" },
    { id: "30", name: "30" },
    { id: "50", name: "50" },
  ];

  useEffect(() => {
    getGroupsInfo({ joinedGroupsId: [groupId], setGroupsInfo });
  }, [groupId]);

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
        <div className={styles.gpInfo}>
          <br />
          <p className={styles.gpName}>{groupsInfo[0].groupName}</p>
          <p className={styles.gpId}> ({groupId})</p>
        </div>
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

      <ImageModal
        open={modalOpen}
        handleClose={handleModalClose}
        modalImageUrl={modalImageUrl}
      />

      <Suspense fallback={<CircularProgress />}>
        <DirectoryList {...{ groupId, currentDirectory }} />
      </Suspense>

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

      <br />
    </div>
  );
};

export default GroupDetail;
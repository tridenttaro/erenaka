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
  const [urlError, setUrlError] = useState(false);
  const [groupLoading, setGroupLoading] = useState(true);

  const [perPage, setPerPage] = useState(10);
  // 利用する関数の形式により、配列型とする↓
  const [groupsInfo, setGroupsInfo] = useState<GroupData[]>([]);
  const [directories, setDirectories] = useState<DirectoryData[]>([]);
  // フォルダ作成メニューの開閉用↓
  const [upMenuOpen, setUpMenuOpen] = useState(false);
  // モーダル用↓
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  // フォルダの多重作成を禁止(1階層まで)
  if (currentDirectory.length > 1) setUrlError(true);

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

  // フォルダ作成メニュー
  const menuClass = upMenuOpen
    ? `${styles.menuWrapperOpen}`
    : `${styles.menuWrapperClose}`;
  const handleMenuButtonText = upMenuOpen
    ? "フォルダ作成メニューを閉じる"
    : "フォルダ作成メニューを展開▽";

  useEffect(() => {
    (async () => {
      await getGroupsInfo({ joinedGroupsId: [groupId], setGroupsInfo });
      if (groupsInfo.length < 1) setUrlError(true);
    })();
  }, [groupId]);

  useEffect(() => {
    getDirectories({ groupId, currentDirectory, setDirectories });
  }, [groupId, currentDirectory]);

  const updateDirectories = useCallback(() => {
    getDirectories({ groupId, currentDirectory, setDirectories });
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

  const handleMenu = useCallback(() => {
    setUpMenuOpen(!upMenuOpen);
  }, [upMenuOpen]);

  return (
    <div>
      <Head>
        <title>電子名刺 | 名刺一覧</title>
      </Head>

      {urlError ? (
        <>
          <p>不正なURLです</p>
        </>
      ) : (
        <>
          <BreadCrumbs lists={bc_lists} />

          {groupsInfo.length > 0 && (
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
            <DirectoryList {...{ groupId, currentDirectory, directories }} />
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

          <p className={styles.handleMenuButton} onClick={() => handleMenu()}>
            {handleMenuButtonText}
          </p>
          <div className={menuClass}>
            <CreateDirectory
              {...{ groupId, currentDirectory, updateDirectories }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetail;

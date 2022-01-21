import { GetServerSideProps } from "next";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { DirectoryList, ImageList } from "../../components/organisms";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import getImages from "../../lib/firebase/groups/getImages";
import { DirectoryData, GroupData, ImageData } from "../../types/other";
import { UploadImageToGroup } from "../../components/organisms";
import Head from "next/head";
import { BreadCrumbs, ImageModal } from "../../components/molecules";
import { CircularProgress } from "@material-ui/core";
import getGroupsInfo from "../../lib/firebase/groups/getGroupsInfo";
import { AuthContext } from "../../components/organisms/AuthLayout";
import { UserState } from "../../types/auth";

type Props = {
  groupId: string;
  currentDirectory: string[];
  directories: DirectoryData[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlStr = (context?.params?.GroupDetail || []) as string[];
  const groupId = urlStr[0];
  const currentDirectory: string[] = urlStr.length > 1 ? urlStr.slice(1) : [];

  const nowPage = (context?.query?.p || "1") as string;
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
  const [perPage, setPerPage] = useState("25");
  const [groupsInfo, setGroupsInfo] = useState<GroupData[]>();
  const [directories, setDirectories] = useState<DirectoryData[]>([]);
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);

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

  const inputImages = useCallback((images) => {
    setImageDataList(images);
  }, []);
  const updateImages = useCallback(async () => {
    const res = await getImages({ groupId, currentDirectory, inputImages });
  }, [groupId, currentDirectory, inputImages]);

  return (
    <div>
      <Head>
        <title>電子名刺 | 名刺一覧</title>
      </Head>

      <BreadCrumbs lists={bc_lists} />

      {groupsInfo && (
        <>
          <p>{groupsInfo[0].groupName}</p>
          <p> {groupId}</p>
        </>
      )}

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
            imageDataList,
            inputImages,
            updateImages,
            handleModalOpen,
            inputModalImageUrl,
          }}
        />
      </Suspense>

      {/* <CreateDirectory {...{ groupId, currentDirectory, updateDirectories }} /> */}
      <br />
      <hr />
      <br />
      <UploadImageToGroup {...{ groupId, currentDirectory, updateImages }} />
    </div>
  );
};

export default GroupDetail;

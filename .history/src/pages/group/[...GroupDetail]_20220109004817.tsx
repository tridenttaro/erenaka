import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { DirectoryCard } from "../../components/molecules";
import { DirectoryList, ImageList } from "../../components/organisms";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import getImages from "../../lib/firebase/groups/getImages";
import { DirectoryData, ImageData } from "../../types/other";
import UploadImageToGroup from "./UploadImageToGroup";
import layout from "../../styles/layout.module.scss";
import Head from "next/head";
import { Breadcrumbs } from "../../components/molecules";

type Props = {
  groupId: string;
  currentDirectory: string[];
  directories: DirectoryData[];
  imageDataList: ImageData[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlStr = (context?.params?.GroupDetail || []) as string[];
  const groupId = urlStr[0];
  const currentDirectory: string[] = urlStr.length > 1 ? urlStr.slice(1) : [];
  const groupInfo = "";

  const nowPage = (context?.query?.p || "1") as string;
  // 表示件数
  const perPage = 12;
  // const imagesCount = 0;
  // const pagesCount = Math.ceil(imagesCount / perPage);

  console.log("nowPage: " + JSON.stringify(nowPage));

  const directories: DirectoryData[] = await getDirectories({
    groupId,
    currentDirectory,
  });

  const imageDataList = await getImages({
    groupId,
    currentDirectory,
  });

  const props: Props = {
    groupId: groupId,
    currentDirectory: currentDirectory,
    directories: directories,
    imageDataList: imageDataList,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const { groupId, currentDirectory } = props;
  const [directories, setDirectories] = useState<DirectoryData[]>([]);
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);

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
    setDirectories(props.directories);
    setImageDataList(props.imageDataList);
  }, [props.directories, props.imageDataList]);

  const updateDirectories = useCallback(async () => {
    const data = await getDirectories({ groupId, currentDirectory });
    setDirectories(data);
  }, [groupId, currentDirectory]);

  const updateImages = useCallback(async () => {
    const data = await getImages({ groupId, currentDirectory });
    setImageDataList(data);
  }, [groupId, currentDirectory]);

  return (
    <div className={layout.page}>
      <Head>
        <title>電子名刺 | グループ詳細</title>
      </Head>

      <Breadcrumbs lists={bc_lists} />

      <DirectoryList {...{ groupId, currentDirectory, directories }} />

      <br />
      <ImageList
        groupId={groupId}
        currentDirectory={currentDirectory}
        imageDataList={imageDataList}
        updateImages={updateImages}
      />
      <br />
      <CreateDirectory {...{ groupId, currentDirectory, updateDirectories }} />
      <br />

      <UploadImageToGroup {...{ groupId, currentDirectory, updateImages }} />
    </div>
  );
};

export default GroupDetail;

import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { DirectoryCard } from "../../components/molecules";
import { ImageList } from "../../components/organisms";
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
  const params = (context?.params?.GroupDetail || [""]) as string[];
  const groupId = params[0];
  let currentDirectory: string[] = [];
  const groupInfo = "";

  console.log("params" + params);

  if (params.length > 1) {
    currentDirectory = params.slice(1);
  }

  const directories: DirectoryData[] = await getDirectories({
    groupId,
    currentDirectory,
  });

  const imageDataList = await getImages({
    groupId,
    currentDirectory,
  });
  // // 余裕があればページング
  // const imagesCount = 0;
  // // 表示件数
  // const perPage = 3;
  // const pagesCount = Math.ceil(imagesCount / perPage);

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

      <div className="p-grid__row">
        {directories.length > 0 &&
          directories.map((dir) => (
            <DirectoryCard
              key={dir.directoryName}
              groupId={groupId}
              currentDirectory={currentDirectory}
              dirInfo={dir}
            />
          ))}
      </div>

      <br />
      <ImageList
        groupId={groupId}
        currentDirectory={currentDirectory}
        imageDataList={imageDataList}
        updateImages={updateImages}
      />
      <br />
      <CreateDirectory
        groupId={groupId}
        currentDirectory={currentDirectory}
        updateDirectories={updateDirectories}
      />
      <br />
      <UploadImageToGroup
        groupId={groupId}
        currentDirectory={currentDirectory}
        updateImages={updateImages}
      />
    </div>
  );
};

export default GroupDetail;

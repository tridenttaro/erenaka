import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { DirectoryCard } from "../../components/molecules";
import { ImageList } from "../../components/organisms";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import { DirectoryInfo } from "../../types/other";
import UploadFileToGroup from "./UploadFileToGroup";

type Props = {
  groupId: string;
  currentDirectory: string[];
  directories: DirectoryInfo[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = (context?.params?.GroupDetail || [""]) as string[];
  const groupId = params[0];
  let currentDirectory: string[] = [];
  const groupInfo = "";

  // ディレクトリ内
  if (params.length > 1) {
    currentDirectory = params.slice(1);
  }
  const directories: DirectoryInfo[] = await getDirectories({
    groupId,
    currentDirectories: currentDirectory,
  });

  // const groupId = groupIdArray.join("/");

  const imagesCount = 0;
  // 表示件数
  const perPage = 2;
  const pagesCount = Math.ceil(imagesCount / perPage);
  // const ImagesDirectlyUnderGroup = await getImages()

  console.log("ssr u");

  const props: Props = {
    groupId: groupId,
    currentDirectory: currentDirectory,
    directories: directories,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const { groupId, currentDirectory } = props;
  const [directories, setDirectories] = useState(props.directories);

  const updateDirectories = useCallback(async () => {
    const dir = await getDirectories({ groupId });
    setDirectories(dir);
  }, [groupId]);

  return (
    <>
      <h2>グループ詳細画面</h2>
      <p>groupIdは{groupId}です</p>
      <div className="p-grid__row">
        {directories.length > 0 &&
          directories.map((dir) => (
            <DirectoryCard key={dir.directoryName} groupId={groupId} {...dir} />
          ))}
      </div>

      <br />
      {/* <ImageList /> */}
      <br />
      <CreateDirectory
        groupId={groupId}
        updateDirectories={updateDirectories}
      />
      <br />
      <UploadFileToGroup groupId={groupId} />
    </>
  );
};

export default GroupDetail;

import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { DirectoryCard } from "../../components/molecules";
import { ImageList } from "../../components/organisms";
import CreateDirectory from "../../components/organisms/CreateDirectory";
import getDirectories from "../../lib/firebase/groups/getDirectories";
import getImages from "../../lib/firebase/groups/getImages";
import { DirectoryData, ImageData } from "../../types/other";
import UploadFileToGroup from "./UploadFileToGroup";

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

  // ディレクトリ下
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

  console.log("ssr u!group:currentDir:dirs");
  console.log(groupId);
  console.log(currentDirectory);
  console.log(directories);

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

  useEffect(() => {
    setDirectories(props.directories);
  }, [props.directories]);

  const pathStr = groupId + "/" + currentDirectory.join("/");

  const updateDirectories = useCallback(async () => {
    const dir = await getDirectories({ groupId, currentDirectory });
    setDirectories(dir);
  }, [groupId, currentDirectory]);

  return (
    <>
      <h3>{pathStr}</h3>
      {/* <h3>groupIdは{groupId}</h3> */}

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
      {/* <ImageList /> */}
      <br />
      <CreateDirectory
        groupId={groupId}
        currentDirectory={currentDirectory}
        updateDirectories={updateDirectories}
      />
      <br />
      <UploadFileToGroup
        groupId={groupId}
        currentDirectory={currentDirectory}
      />
    </>
  );
};

export default GroupDetail;

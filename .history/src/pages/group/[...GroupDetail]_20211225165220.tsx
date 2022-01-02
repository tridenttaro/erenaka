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
  directories: DirectoryInfo[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = (context?.params?.GroupDetail || [""]) as string[];
  const groupId = params[0];
  console.log(params.length);
  // const groupId = groupIdArray.join("/");

  const groupInfo = "";
  const directories = await getDirectories({ groupId });
  // const directories = [];
  // const ImagesDirectlyUnderGroup = await getImages()

  const imagesCount = 0;
  // 表示件数
  const perPage = 2;
  const pagesCount = Math.ceil(imagesCount / perPage);

  console.log("ssr u");

  const props: Props = {
    groupId: groupId,
    directories: directories,
  };

  return { props };
};

const GroupDetail = (props: Props) => {
  const groupId = props.groupId;
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
            <DirectoryCard key={dir.directoryName} {...dir} />
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

import { useCallback, useState } from "react";
import { ImageData } from "../../types/other";
import ImageCard from "../molecules/ImageCard";
import { PageButton } from "./../molecules";
import useSWR from "swr";
import getImages from "../../lib/firebase/groups/getImages";
import UploadImageToGroup from "../../pages/group/UploadImageToGroup";

type Props = {
  groupId: string;
  currentDirectory: string[];
};

const ImageList = (props: Props) => {
  const { groupId, currentDirectory } = props;

  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);

  const inputImages = useCallback((images) => {
    setImageDataList(images);
  }, []);

  const updateImages = useCallback(async () => {
    const res = await getImages({ groupId, currentDirectory, inputImages });
  }, [groupId, currentDirectory, inputImages]);

  const { data } = useSWR(
    "imageDataList",
    () =>
      getImages({
        groupId,
        currentDirectory,
        inputImages,
      }),
    { suspense: true }
  );

  return (
    <section className="c-section-wrapin">
      <h2>画像リスト</h2>
      <div className="p-grid__row">
        {imageDataList.length > 0 &&
          imageDataList.map((imageData) => (
            <ImageCard
              key={imageData.imageId}
              imageId={imageData.imageId}
              createdAt={imageData.createdAt}
              fileName={imageData.fileName}
              uploadedUid={imageData.uploadedUid}
              downloadUrl={imageData.downloadUrl}
              groupId={groupId}
              currentDirectory={currentDirectory}
              updateImages={updateImages}
            />
          ))}
      </div>

      <UploadImageToGroup {...{ groupId, currentDirectory, updateImages }} />
    </section>
  );
};

export default ImageList;

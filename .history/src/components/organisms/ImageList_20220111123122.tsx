import { useCallback } from "react";
import { ImageData } from "../../types/other";
import ImageCard from "../molecules/ImageCard";
import { PageButton } from "./../molecules";
import useSWR from "swr";
import getImages from "../../lib/firebase/groups/getImages";

type Props = {
  groupId: string;
  currentDirectory: string[];
  inputImages: (images: ImageData[]) => void;
  updateImages: () => void;
};

const ImageList = (props: Props) => {
  const { groupId, currentDirectory, updateImages } = props;

  const { data } = useSWR("imageDataList", () =>
    getImages({
      groupId,
      currentDirectory,
    })
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
    </section>
  );
};

export default ImageList;

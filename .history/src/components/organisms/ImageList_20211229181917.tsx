import { useCallback } from "react";
import { ImageData } from "../../types/other";
import ImageCard from "../molecules/ImageCard";
import { PageButton } from "./../molecules";

type Props = {
  groupId: string;
  currentDirectory: string[];
  imageDataList: ImageData[];
};

const ImageList = (props: Props) => {
  const { groupId, currentDirectory, imageDataList } = props;

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
            />
          ))}
      </div>
    </section>
  );
};

export default ImageList;

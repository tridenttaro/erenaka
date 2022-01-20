import { useCallback, useEffect } from "react";
import { ImageData } from "../../types/other";
import ImageCard from "../molecules/ImageCard";
import { PageButton } from "./../molecules";
import useSWR from "swr";
import getImages from "../../lib/firebase/groups/getImages";

type Props = {
  groupId: string;
  currentDirectory: string[];
  imageDataList: ImageData[];
  inputImages: (images: ImageData[]) => void;
  updateImages: () => void;
  handleModalOpen: () => void;
  inputModalImageUrl: (Url: string) => void;
};

const ImageList = (props: Props) => {
  const {
    groupId,
    currentDirectory,
    imageDataList,
    inputImages,
    updateImages,
    handleModalOpen,
    inputModalImageUrl,
  } = props;

  // const { data } = useSWR(
  //   "imageDataList",
  //   () =>
  //     const res = getImages({
  //       groupId,
  //       currentDirectory,
  //       inputImages,
  //     }),
  //   { suspense: true }
  // );
  useEffect(() => {
    getImages({
      groupId,
      currentDirectory,
      inputImages,
    });
  }, [groupId, currentDirectory, inputImages]);

  return (
    <section className="c-section-wrapin">
      <h2>画像リスト</h2>
      <div className="p-grid__row">
        {imageDataList.length > 0 &&
          imageDataList.map((imageData) => (
            <ImageCard
              key={imageData.imageId}
              imageData={imageData}
              groupId={groupId}
              currentDirectory={currentDirectory}
              updateImages={updateImages}
              handleModalOpen={handleModalOpen}
              inputModalImageUrl={inputModalImageUrl}
            />
          ))}
      </div>
    </section>
  );
};

export default ImageList;

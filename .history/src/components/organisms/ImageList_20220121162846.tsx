import { useCallback, useEffect, useState } from "react";
import { ImageData } from "../../types/other";
import ImageCard from "../molecules/ImageCard";
import { PageButton } from "./../molecules";
import useSWR from "swr";
import getImages from "../../lib/firebase/groups/getImages";
import { useRouter } from "next/dist/client/router";
import { UploadImageToGroup } from ".";
import { GreyButton } from "../atoms";

type Props = {
  groupId: string;
  currentDirectory: string[];
  handleModalOpen: () => void;
  inputModalImageUrl: (Url: string) => void;
};

const ImageList = (props: Props) => {
  const { groupId, currentDirectory, handleModalOpen, inputModalImageUrl } =
    props;
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);

  const router = useRouter();
  const query = router?.query?.p || "1";

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
      setImageDataList,
    });
  }, [groupId, currentDirectory]);

  const updateImages = useCallback(() => {
    getImages({
      groupId,
      currentDirectory,
      setImageDataList,
    });
  }, [groupId, currentDirectory]);

  return (
    <>
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

      <a>画像をアップロード</a>

      <UploadImageToGroup {...{ groupId, currentDirectory, updateImages }} />
    </>
  );
};

export default ImageList;

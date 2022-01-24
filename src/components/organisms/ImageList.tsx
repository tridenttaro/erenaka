import { useCallback, useEffect, useState } from "react";
import { ImageData } from "../../types/other";
import ImageCard from "../molecules/ImageCard";
import { PageButton } from "./../molecules";
import useSWR from "swr";
import getImages from "../../lib/firebase/groups/getImages";
import { useRouter } from "next/dist/client/router";
import { UploadImageToGroup } from ".";
import styles from "../../styles/components/organisms/imagelist.module.scss";

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
  const [upMenuOpen, setUpMenuOpen] = useState(false);

  const router = useRouter();
  const query = router?.query?.p || "1";

  const menuClass = upMenuOpen
    ? `${styles.menuWrapperOpen}`
    : `${styles.menuWrapperClose}`;
  const handleMenuButtonText = upMenuOpen
    ? "画像アップロードメニューを閉じる"
    : "画像アップロードメニューを展開▽";

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

  const handleMenu = useCallback(() => {
    setUpMenuOpen(!upMenuOpen);
  }, [upMenuOpen]);

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

      <div className="module-spacer--small" />

      <p className={styles.handleMenuButton} onClick={() => handleMenu()}>
        {handleMenuButtonText}
      </p>
      <div className={menuClass}>
        <UploadImageToGroup {...{ groupId, currentDirectory, updateImages }} />
      </div>
    </>
  );
};

export default ImageList;

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
  perPage: number;
};

const ImageList = (props: Props) => {
  const {
    groupId,
    currentDirectory,
    handleModalOpen,
    inputModalImageUrl,
    perPage,
  } = props;
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);
  const [allImagesCount, setAllImagesCount] = useState(0);
  const [upMenuOpen, setUpMenuOpen] = useState(false);

  const router = useRouter();

  let page = router?.query?.p ? parseInt(router.query.p as string) : 1;
  const pagesCount = Math.ceil(allImagesCount / perPage);
  if (page < 1 || page > pagesCount) {
    page = 1;
  }

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
      page,
      perPage,
      setAllImagesCount,
    });
  }, [groupId, currentDirectory, page, perPage]);

  const changePage = useCallback(
    (selectedPage) => {
      router.push(
        `/group/[...GroupDetail]?p=${selectedPage}`,
        `/group/${groupId}?p=${selectedPage}`
      );
    },
    [router, groupId]
  );

  const updateImages = useCallback(() => {
    getImages({
      groupId,
      currentDirectory,
      setImageDataList,
      page,
      perPage,
      setAllImagesCount,
    });
  }, [groupId, currentDirectory, page, perPage]);

  const handleMenu = useCallback(() => {
    setUpMenuOpen(!upMenuOpen);
  }, [upMenuOpen]);

  console.log("page: " + page);
  console.log(router.query);

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

      <PageButton pagesCount={pagesCount} onChange={changePage} />

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

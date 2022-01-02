import { useCallback } from "react";
import { ImageData } from "../../types/other";
import { PageButton } from "./../molecules";

type Props = {
  groupId: string;
  currentDirectory: string[];
  imageDataList: ImageData[];
};

const ImageList = (props: Props) => {
  const {} = props;

  // }, [dispatch, path, gender, category])

  return (
    <section className="c-section-wrapin">
      <h2>画像リスト</h2>
      <div className="p-grid__row">
        {/* {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))} */}
      </div>
    </section>
  );
};

export default ImageList;

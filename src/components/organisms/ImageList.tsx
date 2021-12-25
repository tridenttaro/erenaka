import { useCallback } from "react";
import { PageButton } from "./../molecules";

type Props = {
  imageCount: number;
  perPage: number;
  pagesCount: number;
};

const ImageList = (props: Props) => {
  const { imageCount, perPage, pagesCount } = props;

  // const changePage = useCallback((selectedPage) => {
  //   const genderPath = gender !== "" ? ("?gender=" + gender) : ""
  //   const categoryPath = category !== "" ? ("?category=" + category) : ""
  //   let nextPath = path + genderPath + categoryPath

  //   if (selectedPage > 1) {
  //     if (genderPath === "" && categoryPath === "") {
  //       nextPath = nextPath + "?p=" + selectedPage
  //     } else {
  //       nextPath = nextPath + "&p=" + selectedPage
  //     }
  //   }
  //   dispatch(push(nextPath))
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
      <PageButton
        pagesCount={pagesCount}
        // onChange={changePage}
      />
    </section>
  );
};

export default ImageList;

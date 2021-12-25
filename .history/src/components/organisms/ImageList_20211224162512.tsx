import { PageButton } from "./../molecules/PageButton";

type Props = {};

const ImageList = (props: Props) => {
  const imagesCount = 0;
  // 表示件数
  const perPage = 2;
  const pagesCount = Math.ceil(imagesCount / perPage);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
      <PageButton pagesCount={pagesCount} onChange={changePage} />
    </section>
  );
};

export default ImageList;

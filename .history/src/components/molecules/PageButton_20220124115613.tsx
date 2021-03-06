import MuiPagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";

type Props = {
  pagesCount: number;
  onChange: (page: number) => void;
  page: number;
};

const PageButton = (props: Props) => {
  //ページ番号
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  const Pagination = withStyles({
    root: {
      display: "inline-block", //中央寄せのためインラインブロックに変更
    },
  })(MuiPagination);

  return (
    <div style={{ textAlign: "center" }}>
      <Pagination
        count={props.pagesCount} //総ページ数
        color="primary" //ページネーションの色
        onChange={(e, page) => {
          setPage(page);
          props.onChange(page);
        }}
        page={page} //現在のページ番号
      />
    </div>
  );
};

export default PageButton;

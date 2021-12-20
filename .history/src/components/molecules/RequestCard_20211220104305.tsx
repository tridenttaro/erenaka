import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import NoImage from "../../assets/img/src/no_image.png";
// import { push } from "connected-react-router";
// import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
// import { deleteProduct } from "../../reducks/products/operations";
import useChangePage from "../../hooks/useChangePage";

const useStyles = makeStyles((theme) => ({
  // theme...meterial-uiにあるテーマ
  root: {
    [theme.breakpoints.down("sm")]: {
      // 幅がsmの幅(themeファイルで定義:600px)より未満の場合
      margin: 8,
      width: "calc(50% - 16px)", // 16pxはmargin分
    },
    [theme.breakpoints.up("sm")]: {
      // 幅がsmの幅(themeファイルで定義)より未満の場合
      margin: 16,
      width: "calc(33.3333% - 32px)", // 16pxはmargin分
    },
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      // 疑似要素(Scss似)
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

type Props = {
  requestedUid: string;
  groupId: string;
  createdAt: Date;
};

const RequestCard = (props: Props) => {
  const classes = useStyles();
  const [changePage] = useChangePage();

  // メニューボタン用
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const acceptRequestsCallback = useCallback(() => {
    acceptRequests;
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div onClick={() => console.log("cardContent clicked")}>
          <Typography color="textSecondary" component="p">
            {" "}
            {/* Typography...テキストを入れるための箱 */}
            {props.groupId}
          </Typography>
          <Typography component="p" className={classes.price}>
            {props.requestedUid}
          </Typography>
        </div>
        {/* メニュー開閉用のボタン*/}
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              console.log("編集する clicked!");
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log("削除する clicked");
              handleClose();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default RequestCard;

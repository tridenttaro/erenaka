import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { useCallback, useState } from "react";
import { RequestItem } from "../../types/other";
import acceptRequests from "../../lib/firebase/groups/AcceptRequests";
import deleteRequests from "../../lib/firebase/groups/deleteRequests";

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

type Props = RequestItem;

const RequestCard = (props: Props) => {
  const classes = useStyles();

  // メニューボタン用
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const acceptRequestsCallback = useCallback(() => {
    () => acceptRequests({ ...props });
  }, [props]);
  const deleteRequestsCallback = useCallback(() => {
    () => deleteRequests({ ...props });
  }, [props]);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div onClick={() => console.log("cardContent clicked")}>
          <Typography component="p" display="inline">
            {"GroupID: "}
          </Typography>
          <Typography component="p">{props.groupId}</Typography>

          <Typography color="textSecondary">{"GroupID:"}</Typography>
          <Typography component="p" className={classes.price}>
            {"GroupName:    "}
            {props.groupName}
          </Typography>
          <Typography color="textSecondary" component="p">
            {" "}
            GroupID: {props.groupId}
          </Typography>
          <Typography component="p" className={classes.price}>
            userID: {props.requestedUid}
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
              acceptRequestsCallback();
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteRequestsCallback();
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

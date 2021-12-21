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
import { useCallback, useContext, useState } from "react";
import { RequestItem } from "../../types/other";
import acceptRequests from "../../lib/firebase/groups/AcceptRequests";
import deleteRequests from "../../lib/firebase/groups/deleteRequests";
import { AuthContext } from "../../pages/Auth";
import { JoinedGroup, UserState } from "../../types/auth";

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

type Props = RequestItem & {
  inputRequestsList: (requests: RequestItem[]) => void;
};
const RequestCard = (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const context = useContext(AuthContext);
  const contextUserState = context?.state as UserState;

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

  // const acceptRequestsCallback = useCallback(() => {
  //   () =>
  //     acceptRequests({
  //       ...props,
  //       inputRequestsList,
  //       userState: contextUserState,
  //     });
  // }, [props]);
  const deleteRequestsCallback = useCallback(() => {
    () => deleteRequests({ ...props });
  }, [props]);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div onClick={() => console.log("cardContent clicked")}>
          <Typography component="p" color="textSecondary" display="inline">
            {"申請先グループ名: "}
          </Typography>
          <Typography component="p" className={classes.price} display="inline">
            {props.groupName}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"送信者名: "}
          </Typography>
          <Typography component="p" className={classes.price} display="inline">
            {props.requestedUsername}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"GroupID: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.groupId}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"UserID: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.requestedUid}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"申請日時: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.createdAt}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"申請ID: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.requestId}
          </Typography>
          <br />
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
              // acceptRequestsCallback();
              acceptRequests({
                ...props,
                inputRequestsList,
                userState: contextUserState,
              });

              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              // deleteRequestsCallback();
              deleteRequests({ ...props });
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

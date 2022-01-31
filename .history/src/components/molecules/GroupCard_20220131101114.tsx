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
import { GroupData } from "../../types/other";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles((theme) => ({
  // theme...meterial-uiにあるテーマ
  root: {
    [theme.breakpoints.down("sm")]: {
      // 幅がsmの幅が(themeファイルで定義:600px)より未満の場合
      margin: 16,
      width: "calc(100% - 32px)",
    },
    [theme.breakpoints.up("sm")]: {
      // 幅がsmの幅が600px以上の場合
      margin: 8,
      width: "calc(50% - 16px)", // 16pxはmargin分
    },
    backgroundColor: "#A8E688",
    "&:hover": {
      backgroundColor: "#88C668",
    },
    wordBreak: "break-word",
  },
  content: {
    display: "flex",
    width: "100%",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      // 疑似要素(Scss似)
      paddingBottom: 16,
    },
  },
  contentText: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  txt: {},
  colorTxt: {
    // color: theme.palette.secondary.main,
    width: "100%",
    fontSize: 28,
    fontWeight: "bold",
  },
  menu: {
    margin: "auto 0 auto auto",
  },
}));

type Props = GroupData;

const GroupCard = (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div
          className={classes.contentText}
          onClick={() =>
            router.push("/group/[...GroupDetail]", `/group/${props.groupId}`)
          }
        >
          <Typography component="p" color="textSecondary" display="inline">
            {"グループ名: "}
          </Typography>
          <Typography
            component="p"
            className={classes.colorTxt}
            display="inline"
          >
            {props.groupName}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"GroupID: "}
          </Typography>
          <Typography component="p" display="inline" className={classes.txt}>
            {props.groupId}
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
          <Typography component="p" color="textSecondary" display="inline">
            {"更新日時: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.updatedAt}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"作成日時: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.createdAt}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"管理者ID: "}
          </Typography>
          <Typography component="p" display="inline">
            {props.createdUid}
          </Typography>
          <br />

          {/* <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            グループから抜ける(仮)
          </MenuItem> */}
        </Menu>
      </CardContent>
    </Card>
  );
};

export default GroupCard;

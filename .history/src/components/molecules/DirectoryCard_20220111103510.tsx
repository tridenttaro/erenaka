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
import { DirectoryData, GroupData } from "../../types/other";
import { useRouter } from "next/dist/client/router";

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
    backgroundColor: "rgb(255,240,180)",
    "&:hover": {
      backgroundColor: "#DFD094",
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
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  menu: {
    margin: "auto 0 auto auto",
  },
}));

type Props = {
  groupId: string;
  currentDirectory: string[];
  dirInfo: DirectoryData;
};

const DirectoryCard = ({ groupId, currentDirectory, dirInfo }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();
  // 遷移先
  let routerPath = `/group/${groupId}`;
  if (currentDirectory.length > 0) {
    routerPath += `/${currentDirectory.join("/")}`;
  }
  routerPath += `/${dirInfo.directoryName}`;

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div
            onClick={() => {
              console.log("D-C clicked");
              router.push("/group/[...GroupDetail]", routerPath);
            }}
          >
            <Typography component="p">{"フォルダ"}</Typography>
            <Typography component="p">{dirInfo.directoryName}</Typography>
          </div>
          {/* メニュー開閉用のボタン*/}
          <IconButton onClick={handleClick} className={classes.menu}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Typography component="p" color="textSecondary" display="inline">
              {"ディレクトリ名: "}
            </Typography>
            <Typography
              component="p"
              className={classes.price}
              display="inline"
            >
              {dirInfo.directoryName}
            </Typography>
            <br />

            <Typography component="p" color="textSecondary" display="inline">
              {"更新日時: "}
            </Typography>
            <Typography component="p" display="inline">
              {dirInfo.updatedAt}
            </Typography>
            <br />

            <Typography component="p" color="textSecondary" display="inline">
              {"作成日時: "}
            </Typography>
            <Typography component="p" display="inline">
              {dirInfo.createdAt}
            </Typography>
            <br />

            <Typography component="p" color="textSecondary" display="inline">
              {"管理者ID: "}
            </Typography>
            <Typography component="p" display="inline">
              {dirInfo.createdUid}
            </Typography>
            <br />

            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              ディレクトリ削除(仮)
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>
    </>
  );
};

export default DirectoryCard;

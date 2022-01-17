import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardMedia,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { useCallback, useState } from "react";
import { GroupData, ImageData } from "../../types/other";
import { useRouter } from "next/dist/client/router";
import deleteImage from "../../lib/firebase/groups/deleteImage";

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
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#DFDFDF",
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
  imageData: ImageData;
  groupId: string;
  currentDirectory: string[];
  updateImages: () => void;
};

const ImageCard = (props: Props) => {
  const { imageData, groupId, currentDirectory, updateImages } = props;
  const {(alias) type ImageData = {
    imageId,
    createdAt,
    fileName,
    uploadedUid,
    downloadUrl}
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const deleteImageCallback = useCallback(() => {
    deleteImage({ imageId, groupId, currentDirectory, updateImages });
  }, [imageId, groupId, currentDirectory, updateImages]);

  return (
    <Card className={classes.root}>
      <CardMedia
        image={imageData.downloadUrl}
        className={classes.media}
        title=""
        // onClick={() => dispatch(push("/product/" + id))}
      />
      <CardContent className={classes.content}>
        <div
        // onClick={() =>
        //   router.push("/group/[...GroupDetail]", `/group/${groupId}`)
        // }
        >
          <br />

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
              deleteImageCallback();
              handleClose();
            }}
          >
            画像を削除
          </MenuItem>

          <Typography component="p" color="textSecondary" display="inline">
            {"ファイル名: "}
          </Typography>
          <Typography component="p" className={classes.price} display="inline">
            {fileName}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"ImageID: "}
          </Typography>
          <Typography component="p" display="inline">
            {imageId}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"作成日時: "}
          </Typography>
          <Typography component="p" display="inline">
            {createdAt}
          </Typography>
          <br />

          <Typography component="p" color="textSecondary" display="inline">
            {"送信者ID: "}
          </Typography>
          <Typography component="p" display="inline">
            {uploadedUid}
          </Typography>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ImageCard;

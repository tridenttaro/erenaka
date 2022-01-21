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
import { BusinessCardData, GroupData, ImageData } from "../../types/other";
import deleteImage from "../../lib/firebase/groups/deleteImage";

const useStyles = makeStyles((theme) => ({
  // theme...meterial-uiにあるテーマ
  root: {
    [theme.breakpoints.down("sm")]: {
      // 幅がsmの幅(themeファイルで定義:600px)より未満の場合
      margin: 8,
      width: "calc(100% - 16px)", // 16pxはmargin分
    },
    [theme.breakpoints.up("sm")]: {
      // 幅がsmの幅(themeファイルで定義)より未満の場合
      margin: 8,
      width: "calc(50% - 16px)", // 16pxはmargin分
    },
    [theme.breakpoints.up("md")]: {
      // md(960px)未満
      margin: 16,
      width: "calc(33.3333% - 32px)", // 16pxはmargin分
    },

    backgroundColor: "#FFFFFF",
    // "&:hover": {
    //   backgroundColor: "#DFDFDF",
    // },
    wordBreak: "break-word",
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "50%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
  menu: {
    margin: "auto 0 auto auto",
  },
}));

type Props = {
  imageData: ImageData;
  groupId: string;
  currentDirectory: string[];
  updateImages: () => void;
  handleModalOpen: () => void;
  inputModalImageUrl: (Url: string) => void;
};

const ImageCard = (props: Props) => {
  const {
    imageData,
    groupId,
    currentDirectory,
    updateImages,
    handleModalOpen,
    inputModalImageUrl,
  } = props;
  const {
    imageId,
    createdAt,
    fileName,
    uploadedUid,
    downloadUrl,
    ...businessCardData
  } = imageData;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

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
        image={downloadUrl}
        className={classes.media}
        title=""
        onClick={() => {
          inputModalImageUrl(downloadUrl);
          handleModalOpen();
        }}
      />
      <CardContent className={classes.content}>
        <div
        // onClick={() =>
        //   router.push("/group/[...GroupDetail]", `/group/${groupId}`)
        // }
        >
          <Typography component="p" color="textSecondary" display="inline">
            {`会社名: `}
          </Typography>
          <Typography component="p" className={classes.price} display="inline">
            {businessCardData.company}
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" display="inline">
            {`氏名: `}
          </Typography>
          <Typography component="p" display="inline">
            {businessCardData.username}
          </Typography>
          <br />
          {businessCardData.position && (
            <>
              <Typography component="p" color="textSecondary" display="inline">
                {`部署・役職名: `}
              </Typography>
              <Typography component="p" display="inline">
                {businessCardData.position}
              </Typography>
              <br />
            </>
          )}
          <Typography component="p" color="textSecondary" display="inline">
            {`住所: `}
          </Typography>
          <Typography component="p" display="inline">
            {businessCardData.address}
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" display="inline">
            {`電話番号: `}
          </Typography>
          <Typography component="p" display="inline">
            {businessCardData.telephoneNumber}
          </Typography>
          <br />
          <Typography component="p" color="textSecondary" display="inline">
            {`メール: `}
          </Typography>
          <Typography component="p" display="inline">
            {businessCardData.email}
          </Typography>
          <br />
          {businessCardData.fax && (
            <>
              <Typography component="p" color="textSecondary" display="inline">
                {`FAX: `}
              </Typography>
              <Typography component="p" display="inline">
                {businessCardData.fax}
              </Typography>
              <br />
            </>
          )}
          {businessCardData.others && (
            <>
              <Typography component="p" color="textSecondary" display="inline">
                {`その他: `}
              </Typography>
              <Typography component="p" display="inline">
                {businessCardData.others}
              </Typography>
              <br />
            </>
          )}
        </div>

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
          <br />
          <hr />
          <br />
          <MenuItem
            onClick={() => {
              deleteImageCallback();
              handleClose();
            }}
          >
            画像を削除
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ImageCard;

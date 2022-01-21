import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import Image from "next/image";

type Props = {
  open: boolean;
  handleClose: () => void;
  modalImageUrl: string;
};

const useStyles = makeStyles(() => ({
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "70%",
    backgroundColor: "white",
    border: "2px solid #000",
    objectFit: "contain",
    // boxShadow: 24,
    // p: 4,
  },
  media: {
    height: "100%",
    objectFit: "contain",
  },
}));
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   height: "80%",
//   width: "70%",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const ImageModal = (props: Props) => {
  const classes = useStyles();

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
        <Box className={classes.box}>
          {/* <Typography>{props.modalImageUrl}</Typography> */}
          {/* <CardMedia image={props.modalImageUrl} className={classes.media} /> */}
          <div style={{ height: "100%", width: "100%" }}>
            <Image
              src={props.modalImageUrl}
              alt="名刺画像"
              layout="fixed"
              height={"100%"}
              width={"100%"}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageModal;

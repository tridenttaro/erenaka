import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  modalImageUrl: string;
};

// const useStyles = makeStyles(() => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// }));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ImageModal = (props: Props) => {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMedia image={props.modalImageUrl} />
        </Box>
      </Modal>
    </div>
  );
};

export default ImageModal;
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
import { GroupInfo } from "../../types/other";
import { useRouter } from "next/dist/client/router";

type Props = {
  dirName: string;
};

const DirectoryCard = (props: Props) => {
  return (
    <>
      <p>{props.dirName}</p>
    </>
  );
};

export default DirectoryCard;

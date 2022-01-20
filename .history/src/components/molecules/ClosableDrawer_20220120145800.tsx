import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GroupsIcon from "@material-ui/icons/Groups";
import ArrowCircleUpIcon from "@material-ui/icons/ArrowCircleUp";
import ArrowCircleDownIcon from "@material-ui/icons/ArrowCircleDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { AuthContext } from "../organisms/AuthLayout";
import { SignedOut, UserState } from "../../types/auth";
import signOutAction from "../../lib/firebase/auth/signOutAction";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32,
  },
}));

type Props = {
  open: boolean;
  onClose: (event: any, bool: boolean) => void;
};

const ClosableDrawer = (props: Props) => {
  const classes = useStyles();
  const router = useRouter();

  const context = useContext(AuthContext);
  const userState = context?.state as UserState;
  const signedOut = context?.signedOut as SignedOut;

  const signOutActionCallback = useCallback(() => {
    signOutAction({ signedOut });
  }, [signedOut]);

  const selelctMenu = (event: any, path: string) => {
    router.push(path);
    props.onClose(event, false);
  };

  const [filters, setFilters] = useState([
    {
      func: selelctMenu,
      label: "セレクトメニュー1",
      id: "all",
      path: "/",
    },
    {
      func: selelctMenu,
      label: "セレクトメニュー2",
      id: "male",
      path: "/?gender=male",
    },
  ]);

  const signedInMenus = [
    {
      func: selelctMenu,
      label: "グループ管理",
      icon: <GroupsIcon />,
      id: "GroupManager",
      path: "/GroupManager",
    },
    {
      func: selelctMenu,
      label: "名刺交換(送信)",
      icon: <ArrowCircleUpIcon />,
      id: "upTemp",
      path: "/UploadFileToTemp",
    },
    {
      func: selelctMenu,
      label: "名刺交換(受信)",
      icon: <ArrowCircleDownIcon />,
      id: "upDown",
      path: "/DownloadFile",
    },
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        // container={container}
        variant="temporary" // ドロワーの開閉ができる
        anchor="right" // どちらに表示するか
        open={props.open}
        onClose={(e) => props.onClose(e, false)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }} // スマホ表示のパフォ向上
      >
        <div
          // onClose={(e) => props.onClose(e, false)}
          onKeyDown={(e) => props.onClose(e, false)}
        >
          <List>
            <ListItem>
              <ListItemText>aaa</ListItemText>
            </ListItem>
          </List>
          <Divider />
          {userState?.isSignedIn && (
            <List>
              {signedInMenus.map((menu) => (
                <ListItem
                  button
                  key={menu.id}
                  onClick={(e) => menu.func(e, menu.path)}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItem>
              ))}

              <ListItem
                button
                key="logout"
                onClick={(e) => {
                  signOutActionCallback();
                  props.onClose(e, false);
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={"ログアウト"} />
              </ListItem>
            </List>
          )}
          <Divider />
          {/* <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.path)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List> */}
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;

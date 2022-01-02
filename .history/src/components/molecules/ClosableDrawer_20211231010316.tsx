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
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { AuthContext } from "../organisms/AuthLayout";
import { SignedOut } from "../../types/auth";
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
  // const { container } = props;
  const context = useContext(AuthContext);
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

  const menus = [
    {
      func: selelctMenu,
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      path: "/product/edit",
    },
    {
      func: selelctMenu,
      label: "注文履歴",
      icon: <HistoryIcon />,
      id: "history",
      path: "/order/history",
    },
    {
      func: selelctMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      path: "/user/mypage",
    },
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={props}
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
          <Divider />
          <List>
            {menus.map((menu) => (
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
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.path)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;

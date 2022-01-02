import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import logo from "../../../public/images/logo.png";
import { UserState } from "../../types/auth";
import { HeaderMenus, ClosableDrawer } from "../molecules";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "./AuthLayout";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingBottom: "100px",
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
});

const Header = () => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = useCallback(
    (event, isOpen: boolean) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(isOpen);
    },
    [setOpen]
  );

  console.log("header rendering!!");

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        {" "}
        {/* position-fixed...位置の固定化 */}
        <Toolbar className={classes.toolBar}>
          {/* <img
            src={logo}
            alt="logoImg"
            width="128px"
            onClick={() => router.push("/")}
          /> */}

          {console.log(userState?.isSignedIn)}
          {userState?.isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* <ClosableDrawer open={open} onClose={handleDrawerToggle} /> */}
    </div>
  );
};

export default Header;

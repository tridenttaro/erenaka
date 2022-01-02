import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import logo from "../../assets/img/icons/logo1.png";
import { UserState } from "../../types/auth";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import { HeaderMenus, ClosableDrawer } from ".";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "./Auth";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
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
  const contextUserState = context?.state as UserState;

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event, isOpen) => {
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

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        {" "}
        {/* position-fixed...位置の固定化 */}
        <Toolbar className={classes.toolBar}>
          <img
            src={logo}
            alt="logoImg"
            width="128px"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;

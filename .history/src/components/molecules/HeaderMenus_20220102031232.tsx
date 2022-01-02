import { IconButton, Badge } from "@material-ui/core";
import ShoppingCardIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext, useEffect } from "react";
import { AuthContext } from "../organisms/AuthLayout";
import { UserState } from "../../types/auth";
import { useRouter } from "next/dist/client/router";

type Props = {
  handleDrawerToggle: (event: any, bool: boolean) => void;
};

const HeaderMenus = (props: Props) => {
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;

  const router = useRouter();

  // // storeのデータとリアルタイムに更新(ecだとカート、お気に入り等)
  // useEffect(() => {
  // }, []);

  return (
    <>
      <IconButton onClick={() => router.push("/")}>
        {" "}
        <Badge badgeContent={0} color="secondary">
          {" "}
          <HomeIcon />
        </Badge>
      </IconButton>
      {/* <IconButton onClick={() => console.log("FaboriteBorderIcon-clicked!!")}>
        <Badge badgeContent={0} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton> */}
      <IconButton onClick={(event) => props.handleDrawerToggle(event, true)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;

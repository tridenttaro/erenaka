import { IconButton, Badge } from "@material-ui/core";
import ShoppingCardIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext, useEffect } from "react";
import { AuthContext } from "../organisms/Auth";
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
      <IconButton onClick={() => console.log("shoppingCartIcon-clicked!!")}>
        {" "}
        {/* ライブラリのタグなのでuseCallbackは不要 */}
        <Badge badgeContent={0} color="secondary">
          {" "}
          {/* badgeContent...バッジに入る内容 */}
          <ShoppingCardIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={() => console.log("FaboriteBorderIcon-clicked!!")}>
        <Badge badgeContent={0} color="primary">
          <FavoriteBorderIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event, true)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;

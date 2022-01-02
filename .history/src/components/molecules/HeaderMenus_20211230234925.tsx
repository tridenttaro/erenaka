// Badge...アイコンに付く数字など
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCardIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import {
  getProductsInCart,
  getProductsInFavorite,
  getUserId,
} from "../../reducks/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { db } from "../../firebase";
import {
  fetchProductsInCart,
  fetchProductsInFavorite,
} from "../../reducks/users/operations";
import { push } from "connected-react-router";
import { AuthContext } from "../organisms/Auth";
import { UserState } from "../../types/auth";

type Props = {};

const HeaderMenus = (props: Props) => {
  const context = useContext(AuthContext);
  const userState = context?.state as UserState;
  let productsInCart = getProductsInCart(selector);
  let productsInFavorite = getProductsInFavorite(selector);

  // // 更新情報を受け取って、バッジを更新
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("favorite")
      // onSnapshot...コレクションの追加・削除・変更をクライアントサイドにリアルタイムに反映
      .onSnapshot((snapshots) => {
        // snapshots...受け取った値全て
        snapshots.docChanges().forEach((change) => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInFavorite.push(product);
              break;
            case "modified":
              const index = productsInFavorite.findIndex(
                (value) => value.favoriteId === change.doc.id
              ); // findIndex...filterの最初の一つだけ返す版
              productsInFavorite[index] = product;
              break;
            case "removed":
              // eslint-disable-next-line
              productsInFavorite = productsInFavorite.filter(
                (value) => value.favoriteId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });

        dispatch(fetchProductsInFavorite(productsInFavorite));
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        {" "}
        {/* ライブラリのタグなのでuseCallbackは不要 */}
        <Badge badgeContent={productsInCart.length} color="secondary">
          {" "}
          {/* badgeContent...バッジに入る内容 */}
          <ShoppingCardIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(push("/favorite"))}>
        <Badge badgeContent={productsInFavorite.length} color="primary">
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

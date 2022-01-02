// Drawer...分割するための線
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, IconButton } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import HistoryIcon from "@material-ui/icons/History"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { TextInput } from "../UIkit"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"
import { signOut } from "../../reducks/users/operations"
import { db } from "../../firebase"

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
      width: 256
    }
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: "center",
    display: "flex",
    marginLeft: 32
  }
}))

const ClosableDrawer = (props) => {
  const classes = useStyles()
  const {container} = props
  const dispatch = useDispatch()

  const selelctMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event, false)
  }

  const [keyword, setKeyword] = useState(""),
        [filters, setFilters] = useState([
          {func: selelctMenu, label: "すべて",     id: "all",    value: "/"              },
          {func: selelctMenu, label: "メンズ",     id: "male",   value: "/?gender=male"  },
          {func: selelctMenu, label: "レディース", id: "female", value: "/?gender=female"},
        ])

  const menus = [
    {func: selelctMenu, label: "商品登録",     icon: <AddCircleIcon/>, id: "register", value: "/product/edit"},
    {func: selelctMenu, label: "注文履歴",     icon: <HistoryIcon/>,   id: "history",  value: "/order/history"},
    {func: selelctMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"}
  ]

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword])


  useEffect(() => {
    db.collection("categories").orderBy("order", "asc").get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push(
            // eslint-disable-next-line
            {func: selelctMenu, label: data.name, id: data.id, value: `/?category=${data.id}`}
          )
        })
        setFilters(prevState => [...prevState, ...list])
      })
  // eslint-disable-next-line
  }, [])

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"     // ドロワーの開閉ができる 
        anchor="right"          // どちらに表示するか
        open={props.open}  
        onClose={(e) => props.onClose(e, false)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}    // スマホ表示のパフォ向上
      >
        <div
          onClose={(e) => props.onClose(e, false)}
          onKeyDown={(e) => props.onClose(e, false)}
        >
          <div className={classes.searchField}>
            <TextInput 
              fullWidth={false} label="キーワードを入力" multiline={false}
              onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem 
              button key="logout" 
              onClick={(e) => {         // 見本ではonClickは無いが、ドロワーを閉じるため追加
                dispatch(signOut())
                props.onClose(e, false)
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
            {filters.map(filter => (
              <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
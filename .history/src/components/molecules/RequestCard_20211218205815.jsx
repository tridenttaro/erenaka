import { Card, CardContent, CardMedia, Typography, IconButton, Menu, MenuItem,  } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { makeStyles } from '@material-ui/core/styles'
import NoImage from "../../assets/img/src/no_image.png"
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { deleteProduct } from '../../reducks/products/operations'


const useStyles = makeStyles((theme) => ({        // theme...meterial-uiにあるテーマ
  root: {
    [theme.breakpoints.down("sm")]: {             // 幅がsmの幅(themeファイルで定義:600px)より未満の場合
      margin: 8,
      width: "calc(50% - 16px)"                   // 16pxはmargin分
    },     
    [theme.breakpoints.up("sm")]: {               // 幅がsmの幅(themeファイルで定義)より未満の場合
      margin: 16,
      width: "calc(33.3333% - 32px)"              // 16pxはmargin分
    }          
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {                             // 疑似要素(Scss似)
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: "100%"
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16
  }
}))

const ProductCard = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)                                      // メニューボタン用

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }


  const images = (props.images.length > 0) ? props.images : [{path: NoImage}]          // 画像が無い場合、特定の画像を指定
  const price = props.price.toLocaleString()                                           // 数字を三桁区切りに

  return (
    <Card className={classes.root} >
      <CardMedia 
        image={images[0].path} className={classes.media} 
        title="" onClick={() => dispatch(push("/product/" + props.id))}
      />
      <CardContent className={classes.content} >
        <div onClick={() => dispatch(push("/product/" + props.id))} >
          <Typography color="textSecondary" component="p" >                            {/* Typography...テキストを入れるための箱 */}
            {props.name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ￥{price}
          </Typography>
        </div>
        {/* メニュー開閉用のボタン*/}
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem 
            onClick={() => {
              dispatch(push("/product/edit/" + props.id))
              handleClose()                                   
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose()
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard
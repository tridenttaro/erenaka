import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core"; // materialUIのタグにスタイルを適用させる際に用いる

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.grey["300"],
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256,
  },
}));

type Props = {
  label: string;
  onClick: () => void;
};

const GreyButton = (props: Props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default GreyButton;

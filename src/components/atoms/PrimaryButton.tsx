import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core"; // materialUI独自のstyleを適用したい場合

const useStyles = makeStyles({
  button: {
    backgroundColor: "#4dd0e1",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256,
  },
});

type props = {
  label: string;
  onClick: () => void;
};

const PrimaryButton = (props: props) => {
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

export default PrimaryButton;

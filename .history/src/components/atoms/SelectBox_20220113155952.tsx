import { InputLabel } from "@material-ui/core/";
import { MenuItem } from "@material-ui/core/";
import { FormControl } from "@material-ui/core/";
import { Select } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  FormControl: {
    marginBottom: 16,
    minWidth: 128,
    width: "100%",
  },
});

type Props = {
  label: string;
  required: boolean;
  value: string;
  options: undefined;
  select: (e: any) => void;
};

const SelectBox = (props: Props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.FormControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        required={props.required}
        value={props.value}
        defaultValue=""
        onChange={(event) => props.select(event.target.value)}
      >
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;

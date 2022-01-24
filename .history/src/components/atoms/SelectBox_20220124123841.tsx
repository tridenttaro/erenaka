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
  options: { id: string; name: string }[];
  select: (e: any) => void;

  // groupListFlag?: boolean;
};

const SelectBox = (props: Props) => {
  const { label, required, value, options, select } = props;

  const classes = useStyles();

  return (
    <FormControl className={classes.FormControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        required={required}
        value={value}
        defaultValue=""
        onChange={(event) => select(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;

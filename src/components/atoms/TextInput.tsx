import TextField from "@material-ui/core/TextField";
import { ChangeEventHandler, useState } from "react";

type props = {
  fullWidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: props) => {
  return (
    <TextField
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;

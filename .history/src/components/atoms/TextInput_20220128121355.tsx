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
  inputProps?: { className?: unknown; maxLength?: number; pattern: string };
  inputRef?: unknown;
  error?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: props) => {
  const disabled = props.disabled ? props.disabled : false;
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
      inputProps={props.inputProps}
      inputRef={props.inputRef}
      error={props.error}
      disabled={disabled}
    />
  );
};

export default TextInput;

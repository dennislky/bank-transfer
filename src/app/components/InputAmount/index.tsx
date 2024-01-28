import { TextField } from "@mui/material";
import React, { MutableRefObject } from "react";

const InputAmount = ({
  formDataRef,
}: {
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.amount = parseInt(
      (event.target as HTMLInputElement).value,
      10
    );
  };
  return (
    <TextField
      required
      id="filled-amount"
      label="Amount"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      defaultValue="0"
      variant="filled"
      onChange={onChange}
    />
  );
};

export default InputAmount;

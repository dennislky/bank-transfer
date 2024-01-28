import { TextField } from "@mui/material";
import React, { MutableRefObject, useState } from "react";

const InputAmount = ({
  availableBalance,
  formDataRef,
}: {
  availableBalance: number;
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const [error, setError] = useState<string>("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    if (value <= 0) {
      setError("Please input amount > 0");
    } else if (value > availableBalance) {
      setError("Please input amount below account's available balance");
    } else {
      setError("");
      formDataRef.current.amount = value;
    }
  };
  return (
    <TextField
      required
      id="filled-amount"
      label="Amount"
      type="number"
      error={!!error}
      helperText={error}
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

import { TextField } from "@mui/material";
import React, { MutableRefObject, useState, useEffect } from "react";

const InputAmount = ({
  selectedCurrency,
  availableBalance,
  formDataRef,
}: {
  selectedCurrency: string,
  availableBalance: CurrencyBalance[];
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const currencyBalance = availableBalance.length ? availableBalance.find(balance => balance.currency === selectedCurrency) : undefined;
    if (formDataRef.current.amount <= 0) {
      setError("Please input amount > 0");
    } else if (!currencyBalance) {
      setError("No available balance for such currency");
    } else if (formDataRef.current.amount > currencyBalance.amount) {
      setError("Please input amount below account's available balance");
    } else {
      setError("");
    }
  }, [availableBalance, formDataRef, selectedCurrency]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    const currencyBalance = availableBalance.find(balance => balance.currency === selectedCurrency);
    if (value <= 0) {
      setError("Please input amount > 0");
    } else if (!currencyBalance) {
      setError("No available balance for such currency");
    } else if (value > currencyBalance.amount) {
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

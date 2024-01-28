"use client";

import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, MutableRefObject } from "react";

const InputFromAccount = ({
  formDataRef,
  setAvailableBalance,
  refetchOptions,
}: {
  formDataRef: MutableRefObject<TransferData>;
  setAvailableBalance: Function;
  refetchOptions: boolean;
}) => {
  const [options, setOptions] = useState<AccountOptionData[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const apiResponse = await axios.get("/api/account/1");
        setOptions(apiResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOptions();
  }, [refetchOptions]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt((event.target as HTMLInputElement).value, 10);
    formDataRef.current.from = options[index].value;
    setAvailableBalance(options[index].availableBalance);
  };
  return (
    <TextField
      required
      id="filled-from-account"
      select
      label="From Account"
      defaultValue={options.length ? options[0].value : ""}
      helperText="Please select account transfer from"
      variant="filled"
      onChange={onChange}
    >
      {options.map((option, index) => (
        <MenuItem key={option.value} value={index}>
          {`${option.label} (${option.value})`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default InputFromAccount;

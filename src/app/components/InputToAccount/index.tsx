"use client";

import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, MutableRefObject } from "react";

const InputFromAccount = ({
  formDataRef,
}: {
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const [options, setOptions] = useState<AccountOptionData[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const apiResponse = await axios.get("/api/account/1/to");
        setOptions(apiResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOptions();
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.to = (event.target as HTMLInputElement).value;
  };
  return (
    <TextField
      required
      id="filled-to-account"
      select
      label="To Account"
      defaultValue={options.length ? options[0].value : ""}
      helperText="Please select account transfer to"
      variant="filled"
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {`${option.label} (${option.value})`}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default InputFromAccount;

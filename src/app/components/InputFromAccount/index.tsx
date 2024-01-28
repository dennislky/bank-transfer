"use client";

import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const InputFromAccount = () => {
  const [options, setOptions] = useState<AccountOptionData[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      const apiResponse = await axios.get("/api/account");
      console.log(apiResponse);
      setOptions(apiResponse.data.data);
    };
    fetchOptions();
  }, []);
  return (
    <TextField
      required
      id="filled-from-account-number"
      select
      label="From Account Number"
      defaultValue={options.length ? options[0].value : ""}
      helperText="Please select your account to transfer from"
      variant="filled"
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

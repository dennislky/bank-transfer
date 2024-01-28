"use client";

import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const InputCurrency = () => {
  const [options, setOptions] = useState<CurrencyOptionData[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      const apiResponse = await axios.get("/api/currency");
      console.log(apiResponse);
      setOptions(apiResponse.data.data);
    };
    fetchOptions();
  }, []);
  return (
    <TextField
      required
      id="filled-currency"
      select
      label="Currency"
      defaultValue={options.length ? options[0].value : "USD"}
      helperText="Please select your currency"
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

export default InputCurrency;

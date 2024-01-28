"use client";

import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, MutableRefObject } from "react";

const InputCurrency = ({
  formDataRef,
}: {
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const [options, setOptions] = useState<CurrencyOptionData[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const apiResponse = await axios.get("/api/currency");
        setOptions(apiResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOptions();
  }, []);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.currency = (event.target as HTMLInputElement).value;
  };
  return (
    <TextField
      required
      id="filled-currency"
      select
      label="Currency"
      defaultValue={options.length ? options[0].value : ""}
      helperText="Please select your currency"
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

export default InputCurrency;

"use client";

import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, MutableRefObject } from "react";

const InputCurrency = ({
  formDataRef,
  setSelectedCurrency,
}: {
  formDataRef: MutableRefObject<TransferData>;
  setSelectedCurrency: Function;
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
    const value = (event.target as HTMLInputElement).value;
    formDataRef.current.currency = value;
    setSelectedCurrency(value);
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

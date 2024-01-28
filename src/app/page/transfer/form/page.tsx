import TransactionDatePicker from "@/app/components/DatePicker";
import { Box, TextField, MenuItem } from "@mui/material";
import React from "react";

const transferForm = () => {
  const options = {
    fromAccounts: [
      {
        label: "test from 1",
        value: "11111111",
        availableBalance: 10,
      },
      {
        label: "test from 1",
        value: "22222222",
        availableBalance: 20,
      },
      {
        label: "test from 1",
        value: "33333333",
        availableBalance: 30,
      },
    ],
    currencies: [
      {
        label: "$",
        value: "USD",
      },
      {
        label: "€",
        value: "EUR",
      },
      {
        label: "¥",
        value: "JPY",
      },
      {
        label: "฿",
        value: "BTC",
      },
    ],
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& .MuiFormHelperText-root": { ml: 1 },
      }}
    >
      <div className="flex flex-col p-4">
        <span>Create Transfer Form</span>
        <TransactionDatePicker />
        <TextField
          required
          id="filled-from-account-number"
          select
          label="From Account Number"
          defaultValue={options.fromAccounts[0].value || ""}
          helperText="Please select your account to transfer from"
          variant="filled"
        >
          {options.fromAccounts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {`${option.label} (${option.value})`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="filled-to-account-number"
          label="To Account Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue=""
          variant="filled"
        />
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
        />
        <TextField
          id="filled-description"
          label="Description"
          variant="filled"
        />
        <TextField
          required
          id="filled-currency"
          select
          label="Currency"
          defaultValue={options.currencies[0].value || "USD"}
          helperText="Please select your currency"
          variant="filled"
        >
          {options.currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {`${option.label} (${option.value})`}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
};

export default transferForm;

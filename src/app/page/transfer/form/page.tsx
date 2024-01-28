import TransactionDatePicker from "@/app/components/DatePicker";
import InputCurrency from "@/app/components/InputCurrency";
import InputFromAccount from "@/app/components/InputFromAccount";
import { Box, TextField } from "@mui/material";
import React from "react";

const TransferForm: React.FC = () => {
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
        <InputFromAccount />
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
        <InputCurrency />
      </div>
    </Box>
  );
};

export default TransferForm;

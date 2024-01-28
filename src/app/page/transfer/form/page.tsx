import InputForm from "@/app/components/InputForm";
import { Box } from "@mui/material";
import React from "react";

const TransferForm: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "384px" },
        "& .MuiButtonBase-root": { m: 1 },
        "& .MuiFormHelperText-root": { ml: 1 },
      }}
    >
      <InputForm />
    </Box>
  );
};

export default TransferForm;

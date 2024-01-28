"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import PaymentIcon from "@mui/icons-material/Payment";

import TransactionDatePicker from "@/app/components/DatePicker";
import InputCurrency from "@/app/components/InputCurrency";
import InputFromAccount from "@/app/components/InputFromAccount";
import InputToAccount from "@/app/components/InputToAccount";

import InputDescription from "../InputDescription";
import InputAmount from "../InputAmount";

const InputForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const formDataRef = useRef<TransferData>({
    timestamp: new Date(),
    from: "11111111",
    to: "33333333",
    amount: 0,
    currency: "USD",
  });
  const onClick = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await axios.post(
        "/api/transfer",
        formDataRef.current
      );
      console.log(apiResponse);
      alert("Transfer created successfully");
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col p-4">
      <span>Create Transfer Form</span>
      <TransactionDatePicker formDataRef={formDataRef} />
      <InputFromAccount formDataRef={formDataRef} />
      <InputToAccount formDataRef={formDataRef} />
      <InputAmount formDataRef={formDataRef} />
      <InputDescription formDataRef={formDataRef} />
      <InputCurrency formDataRef={formDataRef} />
      <LoadingButton
        loading={isLoading}
        loadingIndicator="Loading…"
        loadingPosition="start"
        startIcon={<PaymentIcon />}
        variant="outlined"
        sx={{ height: "48px", width: "384px" }}
        color="primary"
        onClick={onClick}
      >
        Submit Transfer
      </LoadingButton>
    </div>
  );
};

export default InputForm;

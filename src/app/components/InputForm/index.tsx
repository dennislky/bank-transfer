"use client";

import React, { useRef, useState } from "react";
import dayjs from "dayjs";
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
  const [availableBalance, setAvailableBalance] = useState<CurrencyBalance[]>([]);
  const [refetchOptions, setRefetchOptions] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const defaultFormData = {
    timestamp: dayjs().startOf('day').toDate(),
    from: "",
    to: "",
    amount: 0,
    currency: "",
  };
  const formDataRef = useRef<TransferData>(defaultFormData);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await axios.post("/api/transfer", formDataRef.current);
      if (apiResponse.data.code === -1) {
        throw new Error(apiResponse.data.message);
      }
      alert("Transfer created successfully");
      setRefetchOptions(!refetchOptions);
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
      <InputFromAccount
        formDataRef={formDataRef}
        setAvailableBalance={setAvailableBalance}
        refetchOptions={refetchOptions}
      />
      <InputToAccount formDataRef={formDataRef} />
      <InputCurrency formDataRef={formDataRef} setSelectedCurrency={setSelectedCurrency} />
      <InputAmount
        selectedCurrency={selectedCurrency}
        availableBalance={availableBalance}
        formDataRef={formDataRef}
      />
      <InputDescription formDataRef={formDataRef} />
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

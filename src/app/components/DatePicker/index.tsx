"use client";

import React, { MutableRefObject } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TransactionDatePicker = ({
  formDataRef,
}: {
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const today = dayjs();
  const onChange = (value: Dayjs | null) => {
    formDataRef.current.timestamp = value ? value.toDate() : formDataRef.current.timestamp;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{ "& .MuiTypography-root": { ml: 1 } }}
      >
        <DemoItem label="Date of Transaction">
          <DatePicker
            defaultValue={today}
            minDate={today}
            views={["year", "month", "day"]}
            onChange={onChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TransactionDatePicker;

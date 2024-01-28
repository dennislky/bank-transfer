"use client";

import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TransactionDatePicker = () => {
  const today = dayjs();
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
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TransactionDatePicker;

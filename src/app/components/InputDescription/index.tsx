import { TextField } from "@mui/material";
import React, { MutableRefObject } from "react";

const InputDescription = ({
  formDataRef,
}: {
  formDataRef: MutableRefObject<TransferData>;
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.description = (event.target as HTMLInputElement).value;
  };
  return (
    <TextField
      id="filled-description"
      label="Description"
      variant="filled"
      onChange={onChange}
    />
  );
};

export default InputDescription;

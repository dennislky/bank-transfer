'use client';

import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

const columns: GridColDef<TransferData>[] = [
  { field: "id", headerName: "ID", width: 240 },
  { field: "timestamp", headerName: "Timestamp", width: 270 },
  { field: "from", headerName: "From", width: 120 },
  {
    field: "to",
    headerName: "To",
    width: 120,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 160,
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 120,
  },
];

const DataTable = () => {
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    const fetchTransferList = async () => {
      try {
        const apiResponse = await axios.get("/api/transfer");
        setRows(apiResponse.data.data);
      } catch (error: any) {
        console.error(error);
        alert(error.message);
      }
    };
    fetchTransferList();
  }, []);

  return (
    <div className="h-screen w-screen">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;

import React, {useState} from 'react';
import "./BatchOrderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchOrderColumn } from "./BatchOrderColumn";
import record from './MOCK_DATA (6).json';

function BatchOrderList() {
  // const [data, setData] = useState([]);
  const [batchID, setBatchID] = useState("");
  const data = record;
  // query only the batch with the status pending registration

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="acceptButton">Accept</div>
            <div
              className="rejectButton">
              Reject
            </div>
          </div>

        );
      },
    },
  ];
  return (
    <>
      <div className="batchorderlist">
        <DataGrid
          rows={data}
          getRowId={(row) => row.retailerID}
          columns={BatchOrderColumn.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </>
    
  );
};

export default BatchOrderList;
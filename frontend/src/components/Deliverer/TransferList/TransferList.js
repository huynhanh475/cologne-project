import React, {useState} from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { TransferListColumn } from './TransferListColumn';
import './TransferList.css';
import record from './MOCK_DATA (4).json';

function TransferList() {
    // const [data, setData] = useState([]);
    const [batchID, setBatchID] = useState("");
    const data = record;
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
            return (
                <div className="cellAction">
                    {params.row.status==="transfered-to-deliverer" && <div className="confirmButton">Confirm</div>}
                </div>
            );
            },
        },
    ];
  return (
    <>
        <div className="transferlisttable-deliverer">
            <DataGrid
            rows={data}
            getRowId={(row) => row.batchID}
            columns={TransferListColumn.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            />
        </div>
    </>
    
  )
}

export default TransferList
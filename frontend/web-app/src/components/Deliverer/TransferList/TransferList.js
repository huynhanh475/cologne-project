import React, {useState} from 'react'
import Navbar from '../NavBarDeliverer/NavBar'
import { TransferListColumn } from './TransferListColumn';
import './TransferList.css';
import { DataGrid } from "@mui/x-data-grid";
import record from './MOCK_DATA (4).json';
import FilterTransferList from './FilterTransferList';

function TransferList() {
    // const [data, setData] = useState([]);
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
    <div>
        <Navbar/>
        <FilterTransferList/>
        <div className="transferlisttable">
            <DataGrid
            className="datagrid"
            rows={data}
            getRowId={(row) => row.batchID}
            columns={TransferListColumn.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            />
        </div>
    </div>
  )
}

export default TransferList
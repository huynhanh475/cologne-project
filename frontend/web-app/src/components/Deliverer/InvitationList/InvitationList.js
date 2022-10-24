import React, {useState} from 'react';
import Navbar from '../NavBarDeliverer/NavBar';
import { DataGrid } from "@mui/x-data-grid";
import { InvitationListColumn } from "./InvitationListColumn";
import './InvitationList.css';
import record from './MOCK_DATA (4).json';
import FilterInvitationList from './FilterInvitationList';

function InvitationList() {

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
                    {params.row.status==="pending-invite-to-deliverer" && <div className="approveButton">Approve</div>}
                    {params.row.status==="pending-invite-to-deliverer" && <div className="rejectButton">Reject</div>}
                </div>
            );
            },
        },
    ];
  return (
    <div>
        <Navbar/>
        <FilterInvitationList/>
        <div className="invitationlisttable">
            <DataGrid
            className="datagrid"
            rows={data}
            getRowId={(row) => row.batchID}
            columns={InvitationListColumn.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            />
        </div>
    </div>
  )
}

export default InvitationList
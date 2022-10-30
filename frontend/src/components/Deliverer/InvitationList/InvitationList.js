import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { InvitationListColumn } from "./InvitationListColumn";
import './InvitationList.css';
import { request } from '../../../utils/request';
import {Modal} from 'antd';
// import record from './MOCK_DATA (4).json';

function InvitationList() {

    // const [data, setData] = useState([]);
    const [data, setData] = useState([]);
    const [stateChange, setStateChange] = useState(false);
    // const [batchId, setBatchId] = useState("");
    // query data dựa trên delivererID và status
    const handleApprove = async (a) => {
        let batchId = a.batchId;
        let action = "approved";
        let token = localStorage.getItem("AUTH_DATA");
        let item = { batchId, action };
        let params = {
            method: "POST",
            url: "/transact/replyInvitation",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        console.log(response.status);
        if (response.ok) {
            setStateChange(true);
            Modal.success({
                content: "Approve invitation successfully!",
            });
        }
    }

    const handleReject = async (a) => {
        let batchId = a.batchId;
        let action = "disapproved";
        let token = localStorage.getItem("AUTH_DATA");
        let item = { batchId, action };
        let params = {
            method: "POST",
            url: "/transact/replyInvitation",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        console.log(response.status);
        if (response.ok) {
            setStateChange(true);
            Modal.success({
                content: "Reject invitation successfully!",
            });
        }
    }

    useEffect(() => {
        const getInvitation = async () => {
            let token = localStorage.getItem("AUTH_DATA");
            let params = {
                method: "GET",
                url: "/batch/all",
                headers: { 'Content-Type': "application/json", 'x-access-token': token },
            }
            let response = await request(params);
            let rawData = await response.text();
            let jsonData = JSON.parse(rawData);
            let body = jsonData["data"]; //take the body of data

            body.forEach((component) => {
                component.date = component.date.orderedDate
            })

            let newData = body.filter(component => component.status === "pending-invite-to-deliverer")
            setData(newData)
        };
        getInvitation();
        return () => {
            // this now gets called when the component unmounts
        };
    }, [stateChange]);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {params.row.status === "pending-invite-to-deliverer" && <div className="approveButton" onClick={() => handleApprove(params.row)}>Approve</div>}
                        {params.row.status === "pending-invite-to-deliverer" && <div className="rejectButton" onClick={() => handleReject(params.row)}>Reject</div>}
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <div className="invitationlisttable">
                <DataGrid
                    rows={data}
                    getRowId={(row) => row.batchId}
                    columns={InvitationListColumn.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default InvitationList
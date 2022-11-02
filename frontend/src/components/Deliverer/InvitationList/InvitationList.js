import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { InvitationListColumn } from "./InvitationListColumn";
import './InvitationList.css';
import { request } from '../../../utils/request';
import { Modal } from 'antd';
import { Row, Col, Typography, Spin } from 'antd';
// import record from './MOCK_DATA (4).json';

function InvitationList() {

    // const [data, setData] = useState([]);
    const [data, setData] = useState([]);
    const [toggleFetch, setToggleFetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const reFetch = () => {
        setToggleFetch(!toggleFetch);
    }
    //const [stateChange, setStateChange] = useState(false);
    // const [batchId, setBatchId] = useState("");
    // query data dựa trên delivererID và status
    const handleApprove = async (a) => {
        setIsLoading(true);
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
        setIsLoading(false);

        if (response.ok) {
            //setStateChange(true);
            Modal.success({
                content: "Invitation is approved!",
            });
            reFetch();
        }
        else {
            Modal.error({
                content: "Invitation cannot be approved!",
            });
        }
    }

    const handleReject = async (a) => {
        setIsLoading(true);
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
        setIsLoading(false);
        
        if (response.ok) {
            //setStateChange(true);
            Modal.success({
                content: "Invitation is rejected!",
            });
            reFetch();
        }
        else {
            Modal.error({
                content: "Invitation cannot be rejected",
            });
        }
        //setStateChange(false);
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
                component.date = component.date.orderedDate;
                component.productName = component.productObj.name;
                if (component.retailerObj) {
                    component.retailerObj = component["retailerObj"]["name"];
                }
                if (component.manufacturerObj) {
                    component.manufacturerObj = component["manufacturerObj"]["name"];
                }
            })

            let newData = body.filter(component => component.status === "pending-invite-to-deliverer")
            setData(newData)
        };
        getInvitation();
        return () => {
            // this now gets called when the component unmounts
        };
    }, [toggleFetch]);

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
        <div className="page-container">
            <Row justify="end" align='middle'>
                <Col flex="auto">
                    <Typography.Title level={3}>Invitation List</Typography.Title>
                </Col>
            </Row>
            <Spin spinning={isLoading}>
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
            </Spin>
        </div>
    )
}

export default InvitationList
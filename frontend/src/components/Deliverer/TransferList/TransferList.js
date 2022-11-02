import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { TransferListColumn } from './TransferListColumn';
import './TransferList.css';
import { request } from '../../../utils/request';
import { Modal, Spin } from 'antd';
import { Row, Col, Typography } from 'antd';

function TransferList() {
    const [data, setData] = useState([]);
    const [isTransferConfirm, setIsTransferConfirm] = useState(false);
    const [batchId, setBatchId] = useState("");
    const [productId, setProductId] = useState("");
    const [manufacturerId, setManufacturerId] = useState("");
    const [retailerId, setRetailerId] = useState("");
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isTransfer, setIsTransfer] = useState(false);
    const [isFault, setIsFault] = useState(false);
    const [manufacturerObj, setManufacturerObj] = useState("");
    const [retailerObj, setRetailerObj] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const typeOfUser = JSON.parse(localStorage.getItem('USER_DATA'))["userType"];

    const [toggleFetch, setToggleFetch] = useState("false");

    const reFetch = () => {
        setToggleFetch(!toggleFetch);
    }

    useEffect(() => {
        const getBatch = async () => {
            const token = localStorage.getItem("AUTH_DATA");
            const params = {
                method: "GET",
                url: "/batch/all",
                headers: { 'Content-Type': "application/json", 'x-access-token': token },
            }
            const response = await request(params);
            let rawData = await response.text();
            let jsonData = JSON.parse(rawData);
            let body = jsonData["data"]; //take the body of data

            body.forEach((component) => {
                component.date = component.date.sendToDelivererDate;
                component.productName = component.productObj.name;
                if (component.retailerObj) {
                    component.retailerObj = component["retailerObj"]["name"];
                }
                if (component.manufacturerObj) {
                    component.manufacturerObj = component["manufacturerObj"]["name"];
                }
            })

            let newData = body.filter(component => component.status === 'transferred-to-deliverer' || component.status === 'deliverer-confirm-transfer')
            setData(newData)
        };
        getBatch();
        return () => {
            // this now gets called when the component unmounts
        };
    }, [toggleFetch]);

    const handleConfirm = async (a) => {
        setIsTransferConfirm(true);
        setBatchId(a.batchId);
        setProductId(a.productId);
        setManufacturerId(a.manufacturerId);
        setRetailerId(a.retailerId);
        setDate(a.date);
        setQuantity(a.quantity);
    }

    const handleOkConfirm = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        let token = localStorage.getItem("AUTH_DATA");
        let item = { batchId };
        let params = {
            method: "POST",
            url: "/transact/confirmTransfer",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        setIsLoading(false);
        
        if (response.ok) {
            setIsTransferConfirm(false);
            Modal.success({
                content: "Transfer is confirmed!",
            });
            reFetch();
        }
        else {
            Modal.error({
                content: "Transfer is not confirmed!"
            });
        }
    }

    const handleCancelConfirm = () => {
        setIsTransferConfirm(false);
    }

    const handleOnClickTransfer = (a) => {

        setIsTransfer(true);
        setBatchId(a.batchId);
        setProductId(a.productId);
        setManufacturerObj(a.manufacturerObj);
        setRetailerObj(a.retailerObj);
        //setDelivererObj(a.delivererObj);
        setQuantity(a.quantity);
    }

    const handleOnClickFault = (a) => {
        setIsFault(true);
        setBatchId(a.batchId);
        setProductId(a.productId);
        setManufacturerObj(a.manufacturerObj);
        setRetailerObj(a.retailerObj);
        //setDelivererObj(a.delivererObj);
        setQuantity(a.quantity);
    }

    const handleOkTransfer = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const token = localStorage.getItem("AUTH_DATA");
        const item = { batchId };
        const params = {
            method: "POST",
            url: "/transact/transferToRetailer",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok) {
            setIsTransfer(false);
            Modal.success({
                content: "Batch is transferred!",
            });
            reFetch();
        }
        else {
            Modal.error({
                content: "Batch is not transferred!"
            });
        }
        setIsLoading(false);
    };

    const handleCancelTransfer = () => {
        setIsTransfer(false);
    };

    const handleOkFault = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const token = localStorage.getItem("AUTH_DATA");
        const item = { batchId };
        const params = {
            method: "POST",
            url: "/batch/report",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok) {
            setIsFault(false);
            Modal.success({
                content: "Batch is marked fault!",
            });
            reFetch();
        }
        else {
            Modal.error({
                content: "Batch is not marked fault!"
            });
        }
        setIsLoading(false);
        setIsFault(false);
    };

    const handleCancelFault = () => {
        setIsFault(false);
    };

    const statusAllowMarkFault = {
        "pending-registration": "",
        "approved": "manufacturer",
        "pending-invite-to-deliverer": "manufacturer",
        "approve-invitation-by-deliverer": "manufacturer",
        "reject-invitation-by-deliverer": "manufacturer",
        "transferred-to-deliverer": "deliverer",
        "deliverer-confirm-transfer": "deliverer",
        "transferred-to-retailer": "retailer",
        "retailer-confirm-transfer": "retailer",
        "fault": "",
    }


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {params.row.status === "transferred-to-deliverer" && <div className="confirmButton" onClick={() => handleConfirm(params.row)}>Confirm</div>}
                        {params.row.status === "deliverer-confirm-transfer" && <div className="transferButton" onClick={() => handleOnClickTransfer(params.row)}>Transfer</div>}
                        {(statusAllowMarkFault[params.row.status] === typeOfUser) && <div className="markFaultButton" onClick={() => handleOnClickFault(params.row)}>Mark Fault</div>}
                    </div>

                );
            },
        },
    ];
    return (
        <div className="page-container">
            <Modal title="Transfer To Retailer Confirmation" open={isTransfer} okText={isLoading ? <Spin/> : "Confirm"} onOk={handleOkTransfer} onCancel={handleCancelTransfer}>
                <div>
                    <p>1. Batch ID: {batchId}</p>
                    <p>2. Product ID: {productId}</p>
                    <p>3. Manufacturer Name: {manufacturerObj}</p>
                    <p>4. Retailer Name: {retailerObj}</p>
                    <p>5. Quantity: {quantity}</p>
                </div>
            </Modal>
            {/* <MarkFaultModal isFault={isFault} setIsFault={setIsFault} batchID={batchId} productID={productId} manufacturerID={manufacturerId} retailerID={retailerId} delivererID={delivererId} />  */}
            <Modal title="Mark Fault Confirmation" open={isFault} okText={isLoading ? <Spin/> : "Confirm"} onOk={handleOkFault} onCancel={handleCancelFault}>
                <div>
                    <p>1. Batch ID: {batchId}</p>
                    <p>2. Product ID: {productId}</p>
                    <p>3. Manufacturer Name: {manufacturerObj}</p>
                    <p>4. Retailer Name: {retailerObj}</p>
                    <p>5. Quantity: {quantity}</p>
                </div>
            </Modal>
            <Row justify="end" align='middle'>
                <Col flex="auto">
                    <Typography.Title level={3}>Transfer List</Typography.Title>
                </Col>
            </Row>
            <Modal title="Transfer Confirmation" open={isTransferConfirm} okText={isLoading ? <Spin/> : "Confirm"} onOk={handleOkConfirm} onCancel={handleCancelConfirm}>
                <div>
                    <p>1. Batch ID: {batchId}</p>
                    <p>2. Product ID: {productId}</p>
                    <p>3. Manufacturer ID: {manufacturerId}</p>
                    <p>4. Retailer ID: {retailerId}</p>
                    <p>5. Date of transfer: {date}</p>
                    <p>6. Quantity: {quantity}</p>
                </div>
            </Modal>
            <div className="transferlisttable-deliverer">
                <DataGrid
                    rows={data}
                    getRowId={(row) => row.batchId}
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
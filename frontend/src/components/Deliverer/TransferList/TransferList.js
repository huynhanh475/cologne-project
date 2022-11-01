import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { TransferListColumn } from './TransferListColumn';
import './TransferList.css';
import { request } from '../../../utils/request';
import {Modal} from 'antd';

function TransferList() {
    const [data, setData] = useState([]);
    const [isTransfer, setIsTransfer] = useState(false);
    const [batchId, setBatchId] = useState("");
    const [productId, setProductId] = useState("");
    const [manufacturerId, setManufacturerId] = useState("");
    const [retailerId, setRetailerId] = useState("");
    const [date, setDate] = useState("");
    const [quantity, setQuantity] = useState("");

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
                if (component.retailerObj) {
                    component.retailerObj = component["retailerObj"]["name"];
                }
                if (component.manufacturerObj) {
                    component.manufacturerObj = component["manufacturerObj"]["name"];
                }
            })

            let newData = body.filter(component => component.status === 'transferred-to-deliverer')
            setData(newData)
        };
        getBatch();
        return () => {
            // this now gets called when the component unmounts
        };
    }, [toggleFetch]);

    const handleConfirm = async (a) => {
        setIsTransfer(true);
        setBatchId(a.batchId);
        setProductId(a.productId);
        setManufacturerId(a.manufacturerId);
        setRetailerId(a.retailerId);
        setDate(a.date);
        setQuantity(a.quantity);
    }

    const handleOkConfirm = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("AUTH_DATA");
        let item = { batchId };
        let params = {
            method: "POST",
            url: "/transact/confirmTransfer",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        console.log(response.status);
        if (response.ok) {
            setIsTransfer(false);
            Modal.success({
                content: "Transfer is confirmed!",
            });
            reFetch();
        }
        else{
            Modal.error({
                content: "Transfer is not confirmed!"
            });
        }
    }

    const handleCancelConfirm = () => {
        setIsTransfer(false);
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {params.row.status === "transferred-to-deliverer" && <div className="confirmButton" onClick={()=>handleConfirm(params.row)}>Confirm</div>}
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Modal title="Transfer Confirmation" open={isTransfer} onOk={handleOkConfirm} onCancel={handleCancelConfirm}>
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
        </>

    )
}

export default TransferList
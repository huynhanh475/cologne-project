import React, { useState, useEffect } from 'react'
import "./BatchJourneyList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchJourneyColumn } from "./BatchJourneyColumn";
// import record from './MOCK_DATA (3).json';
// import TransferModal from './TransferModal';
// import MarkFaultModal from './MarkFaultModal';
import { request } from '../../../utils/request';
import { Modal, Popover, Button, Timeline } from 'antd';

function BatchJourneyListDeliverer() {
  const [data, setData] = useState([]);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isFault, setIsFault] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [productId, setProductId] = useState("");
  const [manufacturerObj, setManufacturerObj] = useState("");
  const [retailerObj, setRetailerObj] = useState("");
  const [delivererObj, setDelivererObj] = useState("");
  const [quantity, setQuantity] = useState("");
  const typeOfUser = JSON.parse(localStorage.getItem('USER_DATA'))["userType"];
  // const data = record;
  const handleOnClickTransfer = (a) => {
    setIsTransfer(true);
    setBatchId(a.batchId);
    setProductId(a.productId);
    setManufacturerObj(a.manufacturerObj);
    setRetailerObj(a.retailerObj);
    setDelivererObj(a.delivererObj);
    setQuantity(a.quantity);
  }

  const handleOnClickFault = (a) => {
    setIsFault(true);
    setBatchId(a.batchId);
    setProductId(a.productId);
    setManufacturerObj(a.manufacturerObj);
    setRetailerObj(a.retailerObj);
    setDelivererObj(a.delivererObj);
    setQuantity(a.quantity);
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

      body.forEach((element) => {
        //component.date = component.date.orderedDate;
        if (element.retailerObj) {
          element.retailerObj = element["retailerObj"]["name"];
        }
        if (element.manufacturerObj) {
          element.manufacturerObj = element["manufacturerObj"]["name"];
        }
      })
      //let newData = body.filter(component => component.status !== 'pending-invite-to-deliverer' && component.status !== 'approved' && component.status !== 'pending-registration')
      let newData = body.filter(component => component.status !== 'pending-registration');
      setData(newData)
    };
    getBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [isTransfer, isFault]);

  const handleOkTransfer = async (e) => {
    e.preventDefault();
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
    }
  };

  const handleCancelTransfer = () => {
    setIsTransfer(false);
  };

  const handleOkFault = async (e) => {
    e.preventDefault();
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
    }
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === "deliverer-confirm-transfer" && <div className="transferButton" onClick={() => handleOnClickTransfer(params.row)}>Transfer</div>}
            {(statusAllowMarkFault[params.row.status] === typeOfUser) && <div className="markFaultButton" onClick={() => handleOnClickFault(params.row)}>Mark Fault</div>}
          </div>
        );
      },
    },
  ];

  const [orderedDate, setOrderedDate] = useState("");
  const [sendToDelivererDate, setSendToDelivererDate] = useState("");
  const [sendToRetailerDate, setSendToRetailerDate] = useState("");
  const [markedFaultDate, setMarkedFaultDate] = useState("");

  let content = (
    <div>
      <Timeline>
        <Timeline.Item color="gray">Ordered Date: {orderedDate}</Timeline.Item>
        <Timeline.Item color="blue">Send To Deliverer Date: {sendToDelivererDate} </Timeline.Item>
        <Timeline.Item color="green">Send To Retailer Date: {sendToRetailerDate}</Timeline.Item>
        <Timeline.Item color="red">Marked Fault Date: {markedFaultDate}</Timeline.Item>
      </Timeline>
    </div>
  );

  const handleOnClickView = (a) => {
    setOrderedDate(a.date.orderedDate);
    setSendToDelivererDate(a.date.sendToDelivererDate);
    setSendToRetailerDate(a.date.sendToRetailerDate);
    setMarkedFaultDate(a.date.markedFaultDate);
  }

  // "markedFaultDate": "",
  // "orderedDate": "2022-10-31",
  // "sendToDelivererDate": "",
  // "sendToRetailerDate": ""

  const viewColumn = [
    {
      field: "viewaction",
      headerName: "View",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellViewAction">
            <Popover title="Date" content={content} trigger="click">
              <Button type="primary" onClick={() => handleOnClickView(params.row)}>View</Button>
            </Popover>
          </div>
        )
      }
    }
  ];

  return (
    <>
      {/* <TransferModal isTransfer={isTransfer} setIsTransfer={setIsTransfer} batchID={batchId} productID={productId} manufacturerID={manufacturerId} retailerID={retailerId} delivererID={delivererId} quantity={quantity} /> */}
      <Modal title="Transfer Confirmation" open={isTransfer} onOk={handleOkTransfer} onCancel={handleCancelTransfer}>
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer Name: {manufacturerObj}</p>
          <p>4. Retailer Name: {retailerObj}</p>
          <p>5. Deliverer Name: {delivererObj}</p>
          <p>6. Quantity: {quantity}</p>
        </div>
      </Modal>
      {/* <MarkFaultModal isFault={isFault} setIsFault={setIsFault} batchID={batchId} productID={productId} manufacturerID={manufacturerId} retailerID={retailerId} delivererID={delivererId} /> */}
      <Modal title="Mark Fault Confirmation" open={isFault} onOk={handleOkFault} onCancel={handleCancelFault}>
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer Name: {manufacturerObj}</p>
          <p>4. Retailer Name: {retailerObj}</p>
          <p>5. Deliverer Name: {delivererObj}</p>
          <p>6. Quantity: {quantity}</p>
        </div>
      </Modal>
      <div className="batchjourneytable">
        <DataGrid
          rows={data}
          columns={BatchJourneyColumn.concat(actionColumn, viewColumn)}
          getRowId={(row) => row.batchId}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </>

  );
}

export default BatchJourneyListDeliverer
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
  const [manufacturerId, setManufacturerId] = useState("");
  const [retailerId, setRetailerId] = useState("");
  const [delivererId, setDelivererId] = useState("");
  const [quantity, setQuantity] = useState("");

  // const data = record;
  const handleOnClickTransfer = (a) => {
    setIsTransfer(true);
    setBatchId(a.batchId);
    setProductId(a.productId);
    setManufacturerId(a.manufacturerId);
    setRetailerId(a.retailerId);
    setDelivererId(a.delivererId);
    setQuantity(a.quantity);
  }

  const handleOnClickFault = (a) => {
    setIsFault(true);
    setBatchId(a.batchId);
    setProductId(a.productId);
    setManufacturerId(a.manufacturerId);
    setRetailerId(a.retailerId);
    setDelivererId(a.delivererId);
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

      let newData = body.filter(component => component.status !== 'pending-invite-to-deliverer' && component.status !== 'approved' && component.status !== 'pending-registration')
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === "deliverer-confirm-transfer" && <div className="transferButton" onClick={() => handleOnClickTransfer(params.row)}>Transfer</div>}
            {params.row.status !== "fault" && (params.row.status=== "transferred-to-deliverer"||params.row.status=== "deliverer-confirm-transfer"||params.row.status=== "transferred-to-retailer") && <div className="markFaultButton" onClick={() => handleOnClickFault(params.row)}>Fault</div>}
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
          <p>3. Manufacturer ID: {manufacturerId}</p>
          <p>4. Retailer ID: {retailerId}</p>
          <p>5. Deliverer ID: {delivererId}</p>
          <p>6. Quantity: {quantity}</p>
        </div>
      </Modal>
      {/* <MarkFaultModal isFault={isFault} setIsFault={setIsFault} batchID={batchId} productID={productId} manufacturerID={manufacturerId} retailerID={retailerId} delivererID={delivererId} /> */}
      <Modal title="Mark Fault Confirmation" open={isFault} onOk={handleOkFault} onCancel={handleCancelFault}>
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer ID: {manufacturerId}</p>
          <p>4. Retailer ID: {retailerId}</p>
          <p>5. Deliverer ID: {delivererId}</p>
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
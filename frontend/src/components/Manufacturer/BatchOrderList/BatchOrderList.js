import React, { useState, useEffect } from 'react';
import "./BatchOrderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchOrderColumn } from "./BatchOrderColumn";
import { request } from '../../../utils/request';
import { Modal, Row, Col, Typography } from 'antd';
import { batchStatusTranslation } from '../../../utils/constants';

function BatchOrderList() {
  const [data, setData] = useState([]);
  //const [stateChange, setStateChange] = useState("false");
  const [toggleFetch, setToggleFetch] = useState("false");

  const reFetch = () => {
    setToggleFetch(!toggleFetch);
  }
  // const [batchID, setBatchID] = useState("");
  // const data = record;
  // query only the batch with the status pending registration

  //copied from batch journey list
  const [isTransfer, setIsTransfer] = useState(false);
  const [isFault, setIsFault] = useState(false);
  const [batchId, setBatchID] = useState("");
  const [productId, setProductID] = useState("");
  const [manufacturerId, setManufacturerID] = useState("");
  const [retailerId, setRetailerID] = useState("");
  const [delivererId, setDelivererID] = useState("");
  const [quantity, setQuantity] = useState("");
  const typeOfUser = JSON.parse(localStorage.getItem('USER_DATA'))["userType"];

  const handleOnClickTransfer = (a) => {
    setIsTransfer(true);
    setBatchID(a.batchId);
    setProductID(a.productId);
    setManufacturerID(a.manufacturerId);
    setRetailerID(a.retailerId);
    setDelivererID(a.delivererId);
    setQuantity(a.quantity);
  }

  const handleOnClickFault = (a) => {
    setIsFault(true);
    setBatchID(a.batchId);
    setProductID(a.productId);
    setManufacturerID(a.manufacturerId);
    setRetailerID(a.retailerId);
    setDelivererID(a.delivererId);
    setQuantity(a.quantity);
  }

  const handleOkTransfer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("AUTH_DATA");
    const item = { batchId };
    const params = {
      method: "POST",
      url: "/transact/transferToDeliverer",
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
        content: "Batch cannot be transferred!",
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
    // console.log(batchId);
    const params = {
      method: "POST",
      url: "/batch/report",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    const response = await request(params);
    //console.log(await response.text());
    if (response.ok) {
      Modal.success({
        content: "Batch is marked fault!",
      });
      setIsFault(false);
      reFetch();
    }
    else {
      Modal.error({
        content: "Batch cannot be marked fault!",
      });
    }
    console.log(await response.text());
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
            {params.row.status === "approve-invitation-by-deliverer" && <div className="transferButton" onClick={() => handleOnClickTransfer(params.row)}>Transfer</div>}
            {(statusAllowMarkFault[params.row.status] === typeOfUser) && <div className="markFaultButton" onClick={() => handleOnClickFault(params.row)}>Mark Fault</div>}
            {params.row.status === "pending-registration" && <div className="acceptButton" onClick={() => handleAccept(params.row)}>Accept</div>}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const getBatch = async () => {
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
        component.processedStatus = batchStatusTranslation[component.status];
        if (component.retailerObj) {
          component.retailerObj = component["retailerObj"]["name"];
        }
      })

      let newData = body;//.filter(component => component.status === "pending-registration")
      setData(newData)
    };
    getBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [toggleFetch]);

  const handleAccept = async (a) => {
    let batchId = a.batchId;
    let token = localStorage.getItem("AUTH_DATA");
    let item = { batchId };
    let params = {
      method: "POST",
      url: "/transact/approveOrder",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    const response = await request(params);
    if (response.ok) {
      //setStateChange(true);
      Modal.success({
        content: "Batch Order is approved!",
      });
      reFetch();
    }
    //setStateChange(false);
  }

  // const actionAcceptColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           <div className="acceptButton" onClick={() => handleAccept(params.row)}>Accept</div>
  //         </div>

  //       );
  //     },
  //   },
  // ];
  return (
    <div className="page-container">
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
      {/* <MarkFaultModal isFault={isFault} setIsFault={setIsFault} batchId={batchId} productId={productId} manufacturerId={manufacturerId} retailerId={retailerId} delivererId={delivererId} /> */}
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
      <Row justify="end" align='middle'>
        <Col flex="auto">
          <Typography.Title level={3}>Transaction List</Typography.Title>
        </Col>
      </Row>
      <div className="batchorderlist">
        <DataGrid
          rows={data}
          getRowId={(row) => row.batchId}
          columns={BatchOrderColumn.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default BatchOrderList;
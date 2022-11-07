import React, { useState, useEffect } from 'react';
import "./BatchOrderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { request } from '../../../utils/request';
import { Modal, Row, Col, Typography, Select, Spin } from 'antd';
import { batchStatusTranslation } from '../../../utils/constants';
import { getUser } from '../../../utils/auth';

function BatchOrderList() {
  const [data, setData] = useState([]);
  const [deliverers, setDeliverers] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reFetch = () => {
    setToggleFetch(!toggleFetch);
  }
  // const [batchID, setBatchID] = useState("");
  // const data = record;
  // query only the batch with the status pending registration

  //copied from batch journey list
  const [isTransfer, setIsTransfer] = useState(false);
  const [isFault, setIsFault] = useState(false);
  const [isInvite, setIsInvite] = useState(false);

  const [batchId, setBatchID] = useState("");
  const [productId, setProductID] = useState("");
  const [manufacturerId, setManufacturerID] = useState("");
  const [retailerId, setRetailerID] = useState("");
  const [delivererId, setDelivererID] = useState("");
  const [quantity, setQuantity] = useState("");

  const typeOfUser = JSON.parse(getUser()).userType;

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

  const handleOnClickInvite = (a) => {
    setIsInvite(true);
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

    setIsLoading(true);
    const response = await request(params);
    setIsLoading(false);

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
    const params = {
      method: "POST",
      url: "/batch/report",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }

    setIsLoading(true);
    const response = await request(params);
    setIsLoading(false);

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
  };

  const handleCancelFault = () => {
    setIsFault(false);
  };

  const handleOkInvite = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("AUTH_DATA");
    const item = { batchId, delivererId };
    const params = {
      method: "POST",
      url: "/transact/inviteDeliverer",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }

    setIsLoading(true);
    const response = await request(params);
    setIsLoading(false);

    if (response.ok) {
      Modal.success({
        content: "Invite deliverer successfully!",
      });
      setIsInvite(false);
      reFetch();
    }
    else {
      const message = (await response.json()).message;
      Modal.error({
        content: message,
      });
    }
  }

  const handleCancelInvite = () => {
    setIsInvite(false);
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

  const renderDelivererCell = (params) => {
    if (!params.row.delivererObj && params.row.status !== "pending-registration" && params.row.status !== "fault") {
      return (
        <div className="inviteButton" onClick={() => handleOnClickInvite(params.row)}>Invite Deliverer</div>
      )
    } else return params.row.delivererObj
  };

  const batchOrderColumn = [
    { field: "batchId", headerName: "Batch ID", width: 120,},
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "retailerObj", headerName: "Retailer Name", width: 150 },
    { field: "delivererObj", headerName: "Deliverer Name", width: 150, renderCell: renderDelivererCell },
    { field: "date", headerName: "Ordered Date", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "processedStatus", headerName: "Status", width: 200},
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === "approve-invitation-by-deliverer" && <div className="transferButton" onClick={() => handleOnClickTransfer(params.row)}>Transfer</div>}
            {(statusAllowMarkFault[params.row.status] === typeOfUser) && <div className="markFaultButton" onClick={() => handleOnClickFault(params.row)}>Mark Fault</div>}
            {params.row.status === "pending-registration" && <div className="acceptButton" onClick={() => handleAccept(params.row)}>Approve</div>}
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
        component.productName = component.productObj.name;
        component.retailerObj = component.retailerObj?.name;
        component.delivererObj = component.delivererObj?.name;
      })

      let newData = body;//.filter(component => component.status === "pending-registration")
      setData(newData)
    };
    getBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [toggleFetch]);

  useEffect(() => {
    const getDeliverers = async () => {
      let token = localStorage.getItem("AUTH_DATA");
      let params = {
        method: "GET",
        url: "/user/deliverer",
        headers: { 'Content-Type': "application/json", 'x-access-token': token },
      }
      let response = await request(params);
      let jsonData = await response.json();

      setDeliverers(jsonData.data)
    };
    getDeliverers();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

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

    setIsLoading(true);
    const response = await request(params);
    setIsLoading(false);

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
    <Spin spinning={isLoading}>
    <div className="page-container">
      <Modal title="Transfer Confirmation" open={isTransfer} onOk={handleOkTransfer} okText={isLoading ? <Spin/> : "Confirm"} onCancel={handleCancelTransfer}>
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
      <Modal title="Mark Fault Confirmation" open={isFault} onOk={handleOkFault} okText={isLoading ? <Spin/> : "Confirm"} onCancel={handleCancelFault}>
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer ID: {manufacturerId}</p>
          <p>4. Retailer ID: {retailerId}</p>
          <p>5. Deliverer ID: {delivererId}</p>
          <p>6. Quantity: {quantity}</p>
        </div>
      </Modal>
      <Modal title="Invite Deliverer" open={isInvite} onOk={handleOkInvite} okText={isLoading ? <Spin/> : "Invite"} onCancel={handleCancelInvite}>
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer ID: {manufacturerId}</p>
          <p>4. Retailer ID: {retailerId}</p>
          <p>5. Quantity: {quantity}</p>
          <span>6. Deliverer: </span>
          <Select
            id="userType"
            placeholder="Select Deliverer"
            style={{width: "300px"}}
            onSelect={(value) => setDelivererID(value)}
            value={delivererId}
          >
            {deliverers.map(deliverer => (
                <Select.Option key={deliverer.userId} value={deliverer.userId}>
                    {deliverer.name}
                </Select.Option>
            ))}
          </Select>
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
          columns={batchOrderColumn}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
    </Spin>
  );
};

export default BatchOrderList;
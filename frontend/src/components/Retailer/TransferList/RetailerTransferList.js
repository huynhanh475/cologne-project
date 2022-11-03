import React, { useEffect, useState } from 'react';
import { RetailerTransferColumn } from './RetailerTransferColumn';
import { DataGrid } from "@mui/x-data-grid";
import './RetailerTransferList.css';
// import ConfirmModal from './ConfirmModal';
// import MarkFaultModal from './MarkFaultModal';
import { request } from '../../../utils/request';
import { Modal } from 'antd';
import { Row, Col, Typography, Button } from 'antd';
import { batchStatusTranslation } from '../../../utils/constants';

function TransferList() {
  const [data, setData] = useState([]);
  const [batchId, setBatchID] = useState("");
  const [productId, setProductID] = useState("");
  const [manufacturerObj, setManufacturerObj] = useState("");
  const [retailerObj, setRetailerObj] = useState("");
  const [delivererObj, setDelivererObj] = useState("");
  //const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isConfirm, setIsConfirm] = useState(false);
  const [isMarkFault, setIsMarkFault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("AUTH_DATA");
  const typeOfUser = JSON.parse(localStorage.getItem("USER_DATA"))['userType'];
  const statusAllowReport = {
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
  //error

  useEffect(() => {
    const getCurrentBatches = async () => {
      const params = {
        method: "GET",
        url: "/batch/all",
        headers: { 'Content-Type': "application/json", 'x-access-token': token }
      }
      const response = await request(params);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"];

      body.forEach((element) => {
        if (element.manufacturerObj) {
          element.manufacturerObj = element["manufacturerObj"]["name"];
        }
        if (element.retailerObj) {
          element.retailerObj = element["retailerObj"]["name"];
        }
        if (element.delivererObj) {
          element.delivererObj = element["delivererObj"]["name"];
        }
        element.productName = element.productObj.name;
        element.processedStatus = batchStatusTranslation[element.status];
      });
      // let newData = body.filter(element => element.status !== "fault")
      setData(body);
    }
    getCurrentBatches();
    return () => { };
  }, [isConfirm, isMarkFault]);

  const handleOnClickConfirm = (a) => {
    setIsConfirm(true);
    setBatchID(a.batchId);
    setProductID(a.productId);
    setManufacturerObj(a.manufacturerObj);
    setRetailerObj(a.retailerObj);
    setDelivererObj(a.delivererObj);
    // setDate(a.date);
    setQuantity(a.quantity);
  }

  const handleOnClickMarkFault = (a) => {
    setIsMarkFault(true);
    setBatchID(a.batchId);
    setProductID(a.productId);
    setManufacturerObj(a.manufacturerObj);
    setRetailerObj(a.retailerObj);
    setDelivererObj(a.delivererObj);
    // setDate(a.date);
    setQuantity(a.quantity);
  }



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === 'transferred-to-retailer' && <div className="confirmButton" onClick={() => handleOnClickConfirm(params.row)}>Confirm</div>}
            {statusAllowReport[params.row.status] === typeOfUser && <div className="markFaultButton" onClick={() => handleOnClickMarkFault(params.row)}>Mark Fault</div>}
          </div>
        );
      },
    },
  ];

  // const [orderedDate, setOrderedDate] = useState("");
  // const [sendToDelivererDate, setSendToDelivererDate] = useState("");
  // const [sendToRetailerDate, setSendToRetailerDate] = useState("");
  // const [markedFaultDate, setMarkedFaultDate] = useState("");

  // let content = (
  //   <div>
  //     <Timeline>
  //       <Timeline.Item color="gray">Ordered Date: {orderedDate}</Timeline.Item>
  //       <Timeline.Item color="blue">Send To Deliverer Date: {sendToDelivererDate} </Timeline.Item>
  //       <Timeline.Item color="green">Send To Retailer Date: {sendToRetailerDate}</Timeline.Item>
  //       <Timeline.Item color="red">Marked Fault Date: {markedFaultDate}</Timeline.Item>
  //     </Timeline>
  //   </div>
  // );

  // const handleOnClickView = (a) => {
  //   setOrderedDate(a.date.orderedDate);
  //   setSendToDelivererDate(a.date.sendToDelivererDate);
  //   setSendToRetailerDate(a.date.sendToRetailerDate);
  //   setMarkedFaultDate(a.date.markedFaultDate);
  // }

  // // "markedFaultDate": "",
  // // "orderedDate": "2022-10-31",
  // // "sendToDelivererDate": "",
  // // "sendToRetailerDate": ""

  // const viewColumn = [
  //   {
  //     field: "viewaction",
  //     headerName: "View",
  //     width: 180,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellViewAction">
  //           <Popover title="Date" content={content} trigger="click">
  //             <Button type="primary" onClick={() => handleOnClickView(params.row)}>View</Button>
  //           </Popover>
  //         </div>
  //       )
  //     }
  //   }
  // ];
  const handleOkConfirm = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const item = { batchId };
    const params = {
      method: "POST",
      url: "/transact/receiveProduct",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    const response = await request(params);
    setIsLoading(false);

    if (response.ok) {
      setIsConfirm(false);
      Modal.success({
        content: "Batch is confirmed!",
      });
    }
    else {
      setIsConfirm(false);
      Modal.error({
        content: "Batch is not confirmed!",
      });
    }

  };

  const handleCancelConfirm = () => {
    setIsConfirm(false);
  };

  const handleOkFault = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const item = { batchId };
    const params = {
      method: "POST",
      url: "/batch/report",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    const response = await request(params);
    setIsLoading(false);

    if (response.ok) {
      setIsMarkFault(false);
      Modal.success({
        content: "Batch is marked fault!"
      });
    }
    else {
      setIsMarkFault(false);
      Modal.error({
        content: "Batch cannot be marked fault!"
      });
    }

  };

  const handleCancelFault = () => {
    setIsMarkFault(false);
  };

  return (
    <div className="page-container">
      <Modal 
        title="Transfer Confirmation" 
        open={isConfirm} 
        onOk={handleOkConfirm} 
        onCancel={handleCancelConfirm}
        footer={[
          <Button key="back" onClick={handleCancelConfirm}>
              Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} disabled={isLoading} onClick={handleOkConfirm}>
              Confirm
          </Button>,
        ]}
      >
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer Name: {manufacturerObj}</p>
          <p>4. Retailer Name: {retailerObj}</p>
          <p>5. Deliverer Name: {delivererObj}</p>
          <p>6. Quantity: {quantity}</p>
        </div>
      </Modal>

      <Modal title="Mark Fault" open={isMarkFault} onOk={handleOkFault} onCancel={handleCancelFault}
        footer={[
          <Button key="back" onClick={handleCancelFault}>
              Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} disabled={isLoading} onClick={handleOkFault}>
              Confirm
          </Button>,
        ]}
      >
        <div>
          <p>1. Batch ID: {batchId}</p>
          <p>2. Product ID: {productId}</p>
          <p>3. Manufacturer Name: {manufacturerObj}</p>
          <p>4. Retailer Name: {retailerObj}</p>
          <p>5. Deliverer Name: {delivererObj}</p>
          <p>6. Quantity: {quantity}</p>
        </div>
      </Modal>

      <Row justify="end" align='middle'>
        <Col flex="auto">
          <Typography.Title level={3}>Transaction List</Typography.Title>
        </Col>
      </Row>

      <div className="transferlisttable">
        <DataGrid
          rows={data}
          columns={RetailerTransferColumn.concat(actionColumn)}
          getRowId={(row) => row.batchId}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default TransferList
//error
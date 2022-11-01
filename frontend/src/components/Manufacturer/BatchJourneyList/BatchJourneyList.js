import React, { useState, useEffect } from 'react'
import "./BatchJourneyList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchJourneyColumn } from "./BatchJourneyColumn";
// import TransferModal from './TransferModal';
// import MarkFaultModal from './MarkFaultModal';
import { request } from '../../../utils/request';
import { Modal, Popover, Button, Timeline } from 'antd';


function BatchJourneyList() {
  const [data, setData] = useState([]);
  // query data based on the manufacturerID
  const [isTransfer, setIsTransfer] = useState(false);
  const [isFault, setIsFault] = useState(false);
  const [batchId, setBatchID] = useState("");
  const [productId, setProductID] = useState("");
  const [manufacturerId, setManufacturerID] = useState("");
  const [retailerId, setRetailerID] = useState("");
  const [delivererId, setDelivererID] = useState("");
  const [quantity, setQuantity] = useState("");
  const typeOfUser = JSON.parse(localStorage.getItem('USER_DATA'))["userType"];

  // const record = [{ "batchID": "5d55a008-2df0-4aaf-bacd-b10172c13ac1", "productID": "94160fb8-34d0-4440-941f-13a248853fa3", "manufacturerID": "aebaafbd-d2c6-4591-9357-c399c5e8ff73", "retailerID": "76c925ec-d078-44c0-9168-2b591ea8ef7e", "delivererID": "57ff6ec8-02b6-4570-a844-dd6ee6cbfde6", "status": "approve-invitation-by-deliverer", "date": { "orderedDate": "27-12-2001" }, "quantity": "33-373-3482" },
  // { "batchID": "225612ef-b58c-420a-a177-57dba1f0b476", "productID": "adfde43e-9fbd-4211-936b-132e8c5adf9a", "manufacturerID": "b1de9c4d-0ae5-43ba-92dd-28ba53feeb10", "retailerID": "919827a2-9821-4141-b32a-aaab2a060379", "delivererID": "657990df-62b2-4822-bbf5-2c0dbdc0634b", "status": "approve-invitation-by-deliverer", "date": { "orderedDate": "7/15/2022" }, "quantity": "92-394-4475" },
  // { "batchID": "f8b7b4d6-381a-45fa-8350-b40dc52cb428", "productID": "48f111f2-b11f-4569-b1bd-3b946869d800", "manufacturerID": "c956c59e-0d88-4281-a852-92c4e280bae7", "retailerID": "c0a5835e-40cd-413f-98c1-b26a320abe6a", "delivererID": "2bd2e13f-012c-4795-97b9-fd8c7cb935ab", "status": "approve-invitation-by-deliverer", "date": { "orderedDate": "7/15/2022" }, "quantity": "93-836-8541" },
  // { "batchID": "053c6e43-9b3b-45dd-83c3-e73cb2b6fed9", "productID": "761569fb-7efc-4393-a5d4-462f7c5910a7", "manufacturerID": "7ee0042f-38bc-4b68-8faa-255852138cbb", "retailerID": "7e976a0a-9ca8-4640-b38a-27cc2db9dfb1", "delivererID": "b0dd38f0-bbc9-4a88-b3dc-6c3ce7facc9f", "status": "approve-invitation-by-deliverer", "date": { "orderedDate": "7/15/2022" }, "quantity": "57-777-0442" },
  // { "batchID": "3ad0cc3d-6115-4d42-bde0-bb4520335bcf", "productID": "4c1c82ee-a686-436e-9f39-c1ec9a4d8932", "manufacturerID": "cd4c1954-dba6-449c-b0a6-f920eaf7a222", "retailerID": "7b8db1e5-24b1-47dd-a03d-d7a6caa057e4", "delivererID": "79fd9f87-247b-45c0-8637-6e42bab7c0c0", "status": "approve-invitation-by-deliverer", "date": { "orderedDate": "7/15/2022" }, "quantity": "54-262-6413" }]

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
        if (element.delivererObj) {
          element.delivererObj = element["delivererObj"]["name"];
        }
      })


      let newData = body.filter(component => component.status !== 'pending-registration');
      setData(newData)
    };
    getBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [isTransfer, isFault]);

  // useEffect(() => {
  //   body.forEach((component) => {
  //     component.date = component.date.orderedDate;
  //   })

  //   let newData = body.filter(component => component.status !== "fault" && component.status === 'approve-invitation-by-deliverer')
  //   setData(newData)
  //   console.log(body)

  //   return () => {
  //     // this now gets called when the component unmounts
  //   };
  // }, []);

  // record.forEach((component) => {
  //   component.date = component.date.orderedDate
  // })
  // console.log(record);

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
            {params.row.status === "approve-invitation-by-deliverer" && <div className="transferButton" onClick={() => handleOnClickTransfer(params.row)}>Transfer</div>}
            {(statusAllowMarkFault[params.row.status] === typeOfUser) && <div className="markFaultButton" onClick={() => handleOnClickFault(params.row)}>Mark Fault</div>}
          </div>
        );
      },
    },
  ];

  // const hide = () => {
  //   setOpen(false);
  // };

  // const handleOpenChange = (newOpen: boolean) => {
  //   setOpen(newOpen);
  // };

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
      {/* <TransferModal isTransfer={isTransfer} setIsTransfer={setIsTransfer} batchId={batchId} productId={productId} manufacturerId={manufacturerId} retailerId={retailerId} delivererId={delivererId} quantity={quantity} /> */}
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
      <div className="batchjourneylisttable">
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
};

export default BatchJourneyList;
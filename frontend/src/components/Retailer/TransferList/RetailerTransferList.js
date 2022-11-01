import React, { useEffect, useState } from 'react';
import { RetailerTransferColumn } from './RetailerTransferColumn';
import { DataGrid } from "@mui/x-data-grid";
import './RetailerTransferList.css';
import ConfirmModal from './ConfirmModal';
import MarkFaultModal from './MarkFaultModal';
import { request } from '../../../utils/request';
import { Modal, Popover, Button, Timeline } from 'antd';

function TransferList() {
  const [data, setData] = useState([]);
  const [batchId, setBatchID] = useState("");
  const [productId, setProductID] = useState("");
  const [manufacturerId, setManufacturerID] = useState("");
  const [retailerId, setRetailerID] = useState("");
  const [delivererId, setDelivererID] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isConfirm, setIsConfirm] = useState(false);
  const [isMarkFault, setIsMarkFault] = useState(false);

  const token = localStorage.getItem("AUTH_DATA");

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

      // body.forEach((element) => {
      //   element.date = element.date.sendToDelivererDate;
      // });
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
    setManufacturerID(a.manufacturerId);
    setRetailerID(a.retailerId);
    setDelivererID(a.delivererId);
    setDate(a.date);
    setQuantity(a.quantity);
  }

  const handleOnClickMarkFault = (a) => {
    setIsMarkFault(true);
    setBatchID(a.batchId);
    setProductID(a.productId);
    setManufacturerID(a.manufacturerId);
    setRetailerID(a.retailerId);
    setDelivererID(a.delivererId);
    setDate(a.date);
    setQuantity(a.quantity);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === 'transferred-to-retailer' && <div className="confirmButton" onClick={() => handleOnClickConfirm(params.row)}>Confirm</div>}
            {params.row.status === 'transferred-to-retailer' && <div className="markFaultButton" onClick={() => handleOnClickMarkFault(params.row)}>Fault</div>}
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
      width: 180,
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
    <div>
      <ConfirmModal isConfirm={isConfirm} setIsConfirm={setIsConfirm} batchId={batchId} productId={productId} manufacturerId={manufacturerId} retailerId={retailerId} delivererId={delivererId} date={date} quantity={quantity} />
      <MarkFaultModal isMarkFault={isMarkFault} setIsMarkFault={setIsMarkFault} batchId={batchId} productId={productId} manufacturerId={manufacturerId} retailerId={retailerId} delivererId={delivererId} date={date} quantity={quantity} />
      <div className="transferlisttable">
        <DataGrid
          rows={data}
          columns={RetailerTransferColumn.concat(actionColumn, viewColumn)}
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
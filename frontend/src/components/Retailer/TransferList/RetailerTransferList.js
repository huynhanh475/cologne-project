import React, { useEffect, useState } from 'react';
import { RetailerTransferColumn } from './RetailerTransferColumn';
import { DataGrid } from "@mui/x-data-grid";
import './RetailerTransferList.css';
import ConfirmModal from './ConfirmModal';
import MarkFaultModal from './MarkFaultModal';
import { request } from '../../../utils/request';


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
      let newData = body.filter(element => element.status !== "fault")
      setData(newData);
    }
    getCurrentBatches();
    return () => {};
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
      width: 200,
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

  return (
    <div>
      <ConfirmModal isConfirm={isConfirm} setIsConfirm={setIsConfirm} batchId={batchId} productId={productId} manufacturerId={manufacturerId} retailerId={retailerId} delivererId={delivererId} date={date} quantity={quantity} />
      <MarkFaultModal isMarkFault={isMarkFault} setIsMarkFault={setIsMarkFault} batchId={batchId} productId={productId} manufacturerId={manufacturerId} retailerId={retailerId} delivererId={delivererId} date={date} quantity={quantity} />
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
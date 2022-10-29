import React, {useState} from 'react';
import {RetailerTransferColumn} from './RetailerTransferColumn';
import record from './MOCK_DATA (4).json';
import { DataGrid } from "@mui/x-data-grid";
import './RetailerTransferList.css';
import ConfirmModal from './ConfirmModal';
import MarkFaultModal from './MarkFaultModal';

function TransferList() {
  const data = record;
  const [batchID, setBatchID] = useState("");
  const [productID, setProductID] = useState("");
  const [manufacturerID, setManufacturerID] = useState("");
  const [retailerID, setRetailerID] = useState("");
  const [delivererID, setDelivererID] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isConfirm, setIsConfirm] = useState(false);
  const [isMarkFault, setIsMarkFault] = useState(false);

  const handleOnClickConfirm=(a) => {
    setIsConfirm(true);
    setBatchID(a.batchID);
    setProductID(a.productID);
    setManufacturerID(a.manufacturerID);
    setRetailerID(a.retailerID);
    setDelivererID(a.delivererID);
    setDate(a.date);
    setQuantity(a.quantity);
  }

  const handleOnClickMarkFault=(a) => {
    setIsMarkFault(true);
    setBatchID(a.batchID);
    setProductID(a.productID);
    setManufacturerID(a.manufacturerID);
    setRetailerID(a.retailerID);
    setDelivererID(a.delivererID);
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
            {params.row.status==='transfer-to-retailer'&&<div className="confirmButton" onClick={()=>handleOnClickConfirm(params.row)}>Confirm</div>}
            {params.row.status!=='fault'&&<div className="markFaultButton" onClick={()=>handleOnClickMarkFault(params.row)}>Fault</div>}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ConfirmModal isConfirm={isConfirm} setIsConfirm={setIsConfirm} batchID={batchID} productID={productID} manufacturerID={manufacturerID} retailerID={retailerID} delivererID={delivererID} date={date} quantity={quantity}/>
      <MarkFaultModal isMarkFault={isMarkFault} setIsMarkFault={setIsMarkFault} batchID={batchID} productID={productID} manufacturerID={manufacturerID} retailerID={retailerID} delivererID={delivererID} date={date} quantity={quantity}/>
      <div className="transferlisttable">
          <DataGrid
          rows={data}
          columns={RetailerTransferColumn.concat(actionColumn)}
          getRowId={(row) => row.batchID}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          />
      </div>

    </div>
  )
}

export default TransferList
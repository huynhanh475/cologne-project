import React, {useState} from 'react'
import "./BatchJourneyList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchJourneyColumn } from "./BatchJourneyColumn";
import Navbar from '../NavBarDeliverer/NavBar';
import record from './MOCK_DATA (3).json';
import TransferModal from './TransferModal';
import MarkFaultModal from './MarkFaultModal';

function BatchJourneyListDeliverer() {
  // const [data, setData] = useState([]);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isFault, setIsFault] = useState(false);
  const [batchID, setBatchID] = useState("");
  const [productID, setProductID] = useState("");
  const [manufacturerID, setManufacturerID] = useState("");
  const [retailerID, setRetailerID] = useState("");
  const [delivererID, setDelivererID] = useState("");
  const [quantity, setQuantity] = useState("");
  
  const data = record;
  const handleOnClickTransfer=(a) => {
    setIsTransfer(true);
    setBatchID(a.batchID);
    setProductID(a.productID);
    setManufacturerID(a.manufacturerID);
    setRetailerID(a.retailerID);
    setDelivererID(a.delivererID);
    setQuantity(a.quantity);
  }

  const handleOnClickFault=(a) => {
    setIsFault(true);
    setBatchID(a.batchID);
    setProductID(a.productID);
    setManufacturerID(a.manufacturerID);
    setRetailerID(a.retailerID);
    setDelivererID(a.delivererID);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status==="deliverer-confirm-transfer" && <div className="transferButton" onClick={()=>handleOnClickTransfer(params.row)}>Transfer</div>}
            {params.row.status!=="fault" && <div className="markFaultButton" onClick={()=>handleOnClickFault(params.row)}>Fault</div>}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="navbarcomponent">
          <Navbar/>
      </div>
      <TransferModal isTransfer={isTransfer} setIsTransfer={setIsTransfer} batchID={batchID} productID={productID} manufacturerID={manufacturerID} retailerID={retailerID} delivererID={delivererID} quantity={quantity}/>
      <MarkFaultModal isFault={isFault} setIsFault={setIsFault} batchID={batchID} productID={productID} manufacturerID={manufacturerID} retailerID={retailerID} delivererID={delivererID}/>
      <div className="batchjourneytable">
        <DataGrid
          rows={data}
          columns={BatchJourneyColumn.concat(actionColumn)}
          getRowId={(row) => row.batchID}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </>
    
  );
}

export default BatchJourneyListDeliverer
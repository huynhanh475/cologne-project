import React from 'react';
import "./DelivererList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DelivererColumn } from "./DelivererColumn";
import { useState } from "react";
import Navbar from '../NavBarManufacturer/NavBar';
import FilterDeliverer from './FilterDeliverer';
import DelivererForm from './DelivererForm';
import record from './MOCK_DATA.json';


function DelivererList() {
  // const [data, setData] = useState([]);
  // const data = [{"name":"Mercedes-Benz","userID":"com.shareasale.Vagram","email":"wgittus0@weebly.com","address":"52 Logan Park"},
  // {"name":"Saturn","userID":"uk.gov.Duobam","email":"lmccafferky1@drupal.org","address":"1053 Lerdahl Center"},
  // {"name":"Subaru","userID":"eu.europa.Cookley","email":"bdye2@accuweather.com","address":"397 Michigan Crossing"},
  // {"name":"Jaguar","userID":"com.marriott.Veribet","email":"bhasslocher3@unicef.org","address":"1 Graedel Court"}]

  const data = record;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [delivererID, setDelivererID] = useState("");


  const handleOnClick=(a) => {
    setIsOpenModal(true);    
    setDelivererID(a.delivererID);
    console.log(a.delivererID);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="inviteButton" onClick={()=>handleOnClick(params.row)}>
              Invite
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <DelivererForm isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} delivererID={delivererID}/>
      <Navbar/>
      <FilterDeliverer isOpenModal={isOpenModal}/>
      <div className="deliverertable">
        <DataGrid
          className="datagrid"
          rows={data}
          getRowId={(row) => row.delivererID}
          columns={DelivererColumn.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default DelivererList;
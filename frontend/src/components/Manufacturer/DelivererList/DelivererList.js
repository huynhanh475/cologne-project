import React, {useEffect} from 'react';
import "./DelivererList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DelivererColumn } from "./DelivererColumn";
import { useState } from "react";
import DelivererForm from './DelivererForm';
import record from './MOCK_DATA.json';
import { request } from '../../../utils/request';

function DelivererList() {
  const [data, setData] = useState([]);
  // const data = [{"name":"Mercedes-Benz","userID":"com.shareasale.Vagram","email":"wgittus0@weebly.com","address":"52 Logan Park"},
  // {"name":"Saturn","userID":"uk.gov.Duobam","email":"lmccafferky1@drupal.org","address":"1053 Lerdahl Center"},
  // {"name":"Subaru","userID":"eu.europa.Cookley","email":"bdye2@accuweather.com","address":"397 Michigan Crossing"},
  // {"name":"Jaguar","userID":"com.marriott.Veribet","email":"bhasslocher3@unicef.org","address":"1 Graedel Court"}]

  const token = localStorage.getItem("AUTH_DATA");
  const params = {
    method: "GET",
    url: "/user/deliverer",
    headers: { 'Content-Type': "application/json", 'x-access-token': token },
  }

  useEffect(() => {
    const getDelivererList = async () => {
      const response = await request(params);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"]; //take the body of data
      setData(body);
    };
    getDelivererList();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
  //////////////////////////////////////////////////////////

  // const data = record;
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [user, setUserID] = useState("");
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
    <div className="maintable">
      <DelivererForm isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} delivererID={delivererID}/>
      <div className="deliverertable">
        <DataGrid
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
import React, { useState, useEffect } from 'react';
import "./BatchOrderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchOrderColumn } from "./BatchOrderColumn";
import { request } from '../../../utils/request';
import {Modal} from 'antd';

function BatchOrderList() {
  const [data, setData] = useState([]);
  const [stateChange, setStateChange] = useState("false");
  // const [batchID, setBatchID] = useState("");
  // const data = record;
  // query only the batch with the status pending registration

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
        component.date = component.date.orderedDate
      })

      let newData = body.filter(component => component.status === "pending-registration")
      setData(newData)
    };
    getBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [stateChange]);

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
      setStateChange(true);
      Modal.success({
        content: "Approve batch order successfully!",
    });
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="acceptButton" onClick={()=>handleAccept(params.row)}>Accept</div>
            {/* <div
              className="pendingButton">
              Pending
            </div> */}
          </div>

        );
      },
    },
  ];
  return (
    <>
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
    </>

  );
};

export default BatchOrderList;
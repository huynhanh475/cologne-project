import React, { useState, useEffect } from 'react';
import "./FaultyBatchList.css";
import { DataGrid } from "@mui/x-data-grid";
import { FaultyBatchColumn } from "./FaultyBatchColumn";
import { request } from '../../../utils/request';

function FaultyBatchList() {
  const [data, setData] = useState([]);
  // query data dưạ trên manufacturerID và status là fault
  // const [batchID, setBatchID] = useState("");
  // const body = [{"batchID":"11d6e1a9-a42c-468b-a638-b332fa66f8cd","productID":"44f53860-a8fc-4afd-9295-92a457dbd3d8","manufacturerID":"c08f2477-cae0-456f-a5f9-15740d4e831f","retailerID":"c7a6bcbf-daf7-4893-8758-9ce0c269a277","delivererID":"9196c766-9f12-40cb-bfa4-1a54a34408ad","date":{"markedFaultDate":"27-12-2001"},"quantity":"77-816-2266","markedFaultBy":"44f53860-a8fc-4afd-9295-92a457dbd3d8","status":"healthy"},
  // {"batchID":"16c86d0e-2ec7-4edb-88ed-0f9363ed06c6","productID":"e1ad7ae5-a872-46ed-a167-bb3c043962e9","manufacturerID":"751dbc57-23a7-4851-9f31-204f0ac59c84","retailerID":"85b8ad72-aae8-44fe-9337-e88f36f4d9b5","delivererID":"2a8ce40a-5b43-4499-bec3-051151e3270e","date":{"markedFaultDate":"27-12-2001"},"quantity":"19-515-1401","markedFaultBy":"44f53860-a8fc-4afd-9295-92a457dbd3d8","status":"fault"},
  // {"batchID":"7d4bc474-7b39-4cb5-8cd8-4bf82828e3d2","productID":"d397f6a0-9062-454d-9be7-a86667687e81","manufacturerID":"4157a3b2-ed80-4d91-8e53-fefe5aa38608","retailerID":"4bd81100-393f-4818-87b0-2480a6726c84","delivererID":"a2d4c3f3-377f-48f0-a016-e9b1108425ca","date":{"markedFaultDate":"27-12-2001"},"quantity":"10-996-4138","markedFaultBy":"44f53860-a8fc-4afd-9295-92a457dbd3d8","status":"healthy"},
  // {"batchID":"9216159e-8f51-426e-8a43-081a732251ac","productID":"d9c49443-afb4-4d90-8963-7d4d590752a0","manufacturerID":"9283a919-1b8e-45db-84e3-eb14115b3a12","retailerID":"d6afd855-cf53-4a36-920c-248586760523","delivererID":"5dcb6020-2f36-4f18-87b9-59d74bc4aa93","date":{"markedFaultDate":"27-12-2001"},"quantity":"81-024-0342","markedFaultBy":"44f53860-a8fc-4afd-9295-92a457dbd3d8","status":"fault"}]

  // body.forEach((component)=>{
  //   component.date = component.date.markedFaultDate
  // })

  // let newData = body.filter(component => component.status==="fault");
  // console.log(newData);
  // setData(newData)

  const token = localStorage.getItem("AUTH_DATA");
  const params = {
    method: "GET",
    url: "/batch/query",
    headers: { 'Content-Type': "application/json", 'x-access-token': token },
  }

  useEffect(() => {
    const getFaultBatch = async () => {
      const response = await request(params);
      // console.log(response.statusText);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"]; //take the body of data

      body.forEach((component)=>{
        component.date = component.date.markedFaultDate
        if(component.retailerObj)
        {
          component.retailerObj = component["retailerObj"]["name"];
        }
        if(component.delivererObj)
        {
          component.delivererObj = component["delivererObj"]["name"];
        }
      })

      
      // let newData = body.filter(component => component.status==="fault")
      setData(body)
    };
    getFaultBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
  return (
    <div>
      <div className="faultybatchmanufacturertable-container">
        <DataGrid
          rows={data}
          getRowId={(row) => row.batchId}
          columns={FaultyBatchColumn}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default FaultyBatchList;
import React, { Component, useEffect, useState } from 'react';
import './FaultyBatchList.css';
import { DataGrid } from "@mui/x-data-grid";
import { FaultyBatchColumn } from './FaultyBatchColumn';
import { request } from '../../../utils/request';

function RetailerFaultyBatchList() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("AUTH_DATA");
  const params = {
    method: "GET",
    url: "/batch/query",
    headers: { "Content-Type": "application/json", "x-access-token": token }
  }

  useEffect(() => {
    const getFaultBatch = async () => {
      const response = await request(params);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"];

      body.forEach(element => {
        element.date = element.date.markedFaultDate
        if(element.manufacturerObj)
        {
          element.manufacturerObj = element["manufacturerObj"]["name"];
        }
        if(element.delivererObj)
        {
          element.delivererObj = element["delivererObj"]["name"];
        }
        // if(element.markedFaultBy)
        // {
        //   element.markedFaultBy = element["markedFaultBy"];
        // }
      });
      setData(body);
    };
    getFaultBatch();
    return () => { };
  }, []);

  return (
    <div>
      <div className="faultybatchtable">
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
  )
}

export default RetailerFaultyBatchList
import React, { useState, useEffect } from 'react';
import "./FaultyBatchList.css";
import { DataGrid } from "@mui/x-data-grid";
import { FaultyBatchColumn } from "./FaultyBatchColumn";
import { request } from '../../../utils/request';
import { Row, Col, Typography } from 'antd';

function FaultyBatchList() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AUTH_DATA");
  const params = {
    method: "GET",
    url: "/batch/query",
    headers: { 'Content-Type': "application/json", 'x-access-token': token },
  }

  useEffect(() => {
    const getFaultBatch = async () => {
      const response = await request(params);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"]; //take the body of data

      body.forEach((component) => {
        component.date = component.date.markedFaultDate;
        component.productName = component.productObj.name;
        component.markedFaultName = component.markedFaultByObj.name;
        if (component.retailerObj) {
          component.retailerObj = component["retailerObj"]["name"];
        }
        if (component.delivererObj) {
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
  // eslint-disable-next-line
  }, []);
  return (
    <div className="page-container">
      <Row justify="end" align='middle'>
        <Col flex="auto">
          <Typography.Title level={3}>Faulty Batch List</Typography.Title>
        </Col>
      </Row>
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
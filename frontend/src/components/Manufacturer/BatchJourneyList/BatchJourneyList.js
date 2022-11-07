import React, { useState, useEffect } from 'react'
import "./BatchJourneyList.css";
import { DataGrid } from "@mui/x-data-grid";
import { BatchJourneyColumn } from "./BatchJourneyColumn";
// import TransferModal from './TransferModal';
// import MarkFaultModal from './MarkFaultModal';
import { request } from '../../../utils/request';
import { Popover, Button, Timeline } from 'antd';
import { Row, Col, Typography } from 'antd';
import { batchStatusTranslation } from '../../../utils/constants';

function BatchJourneyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getBatch = async () => {
      const token = localStorage.getItem("AUTH_DATA");
      const params = {
        method: "GET",
        url: "/batch/all",
        headers: { 'Content-Type': "application/json", 'x-access-token': token },
      }
      const response = await request(params);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"]; //take the body of data

      body.forEach((element) => {
        element.productName = element.productObj.name;
        element.processedStatus = batchStatusTranslation[element.status];
        if (element.retailerObj) {
          element.retailerObj = element["retailerObj"]["name"];
        }
        if (element.delivererObj) {
          element.delivererObj = element["delivererObj"]["name"];
        }
      })


      let newData = body.filter(component => component.status !== 'pending-registration');
      setData(newData)
    };
    getBatch();
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

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

  const viewColumn = [
    {
      field: "viewaction",
      headerName: "View",
      width: 200,
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
    <div className='page-container'>
      <Row justify="end" align='middle'>
        <Col flex="auto">
          <Typography.Title level={3}>Batch Journey</Typography.Title>
        </Col>
      </Row>

      <div className="batchjourneylisttable">
        <DataGrid
          rows={data}
          columns={BatchJourneyColumn.concat(viewColumn)}
          getRowId={(row) => row.batchId}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>

  );
};

export default BatchJourneyList;
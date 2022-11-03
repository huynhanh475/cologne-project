import React, { useState, useEffect } from 'react';
import { ProductListColumn } from "./ProductListColumn";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductListManufacturer.css";
import { request } from '../../../utils/request';
import { Modal, Row, Col, Typography, Button } from 'antd';
import Swal from 'sweetalert2';

function ProductListManufacturer() {
  const [data, setData] = useState([]);
  const [isFault, setIsFault] = useState(false);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status !== "fault" && <div className="markFault" onClick={() => handleOnClickFault(params.row)}>Mark Fault</div>}
          </div>
        );
      },
    },
  ];

  const handleOnClickFault = (a) => {
    setIsFault(true);
    setProductId(a.productId);
    setDate(a.date);
    setName(a.name);
    setQuantity(a.quantity);
    setPrice(a.price);
  }

  const handleOkFault = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("AUTH_DATA");
    const params = {
      method: "POST",
      url: "/product/report/" + productId,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    
    setIsLoading(true);
    const response = await request(params);
    if (response.ok) {
      setIsFault(false);
      setIsLoading(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: "Mark Product Fault Failed",
        text: await response.json().message,
      })
    }
  };

  const handleCancelFault = () => {
    setIsFault(false);
  };

  useEffect(() => {
    const getProduct = async () => {
      const token = localStorage.getItem("AUTH_DATA");
      const params = {
        method: "GET",
        url: "/product",
        headers: { 'Content-Type': "application/json", 'x-access-token': token },
      }
      const response = await request(params);
      let rawData = await response.text();
      let jsonData = JSON.parse(rawData);
      let body = jsonData["data"]; //take the body of data
      setData(body.map((e) => {
        let result = e;
        result.markedFaultName = result.markedFaultBy.name;
        return result;
      }))
    };
    getProduct();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [isFault]);
  return (
    <div className='page-container'>
      <Modal 
        title="Mark Fault Confirmation" 
        open={isFault} 
        onOk={handleOkFault} 
        onCancel={handleCancelFault}
        footer={[
          <Button key="back" onClick={handleCancelFault}>
              Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} disabled={isLoading} onClick={handleOkFault}>
              Confirm
          </Button>,
      ]}
      >
        <div style={{marginBottom: "1rem"}}>
          Are you sure to mark fault this product with following information?
        </div>
        <div>
          <p>1. Product ID: {productId}</p>
          <p>2. Name: {name}</p>
          <p>3. Manufacture Date: {date}</p>
          <p>4. Price: {price}</p>
          <p>5. Quantity: {quantity}</p>
        </div>
      </Modal>
      <Row justify="end" align='middle'>
        <Col flex="auto">
          <Typography.Title level={3}>Product List</Typography.Title>
        </Col>
      </Row>
      <div className="product-list-manufacturer-container">
        <DataGrid
          rows={data}
          getRowId={(row) => row.productId}
          columns={ProductListColumn.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ProductListManufacturer
import React, { useState, useEffect } from 'react';
import { ProductListColumn } from "./ProductListColumn";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductListManufacturer.css";
import { request } from '../../../utils/request';
import { Modal } from 'antd';

function ProductListManufacturer() {
  const [data, setData] = useState([]);
  const [isFault, setIsFault] = useState(false);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status !== "fault" && <div className="markFault" onClick={() => handleOnClickFault(params.row)}>Fault</div>}
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
      url: "/product/report/"+productId,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    const response = await request(params);
    if (response.ok) {
      setIsFault(false);
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
      setData(body)
    };
    getProduct();
    return () => {
      // this now gets called when the component unmounts
    };
  }, [isFault]);
  return (
    <div>
      <Modal title="Mark Fault Confirmation" open={isFault} onOk={handleOkFault} onCancel={handleCancelFault}>
        <div>
          <p>1. Product ID: {productId}</p>
          <p>2. Name: {name}</p>
          <p>3. Date: {date}</p>
          <p>4. Price: {price}</p>
          <p>5. Quantity: {quantity}</p>
        </div>
      </Modal>
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
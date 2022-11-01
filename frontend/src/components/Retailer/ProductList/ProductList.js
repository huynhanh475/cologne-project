import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { DataGrid } from "@mui/x-data-grid";
import { ProductColumn } from "./ProductColumn";
import RegisterProductForm from './RegisterProductForm';
import { request } from '../../../utils/request';

function ProductList() {
  const [data, setData] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [productId, setProductID] = useState("");
  const [name, setName] = useState("");
  const [manufacturerId, setManufacturerID] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("AUTH_DATA");
  const params = {
    method: "GET",
    url: "/product",
    headers: { 'Content-Type': "application/json", 'x-access-token': token },
  }

  useEffect(() => {
    const getAllProducts = async () => {
        const response = await request(params);
        let rawData = await response.text();
        let jsonData = JSON.parse(rawData);
        let body = jsonData["data"];
        setData(body);
    };
    getAllProducts();
    return () => { };
  });


  const handleOnClickRegister = (a) => {
    setIsRegister(true);
    setProductID(a.productId);
    setName(a.name);
    setManufacturerID(a.manufacturerId);
    setDate(a.date);
    setPrice(a.price);
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="registerButton" onClick={() => handleOnClickRegister(params.row)}>Register</div>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <RegisterProductForm isRegister={isRegister} setIsRegister={setIsRegister} productId={productId} name={name} manufacturerId={manufacturerId} date={date} price={price} />
      <div className="productlisttable">
        <DataGrid
          rows={data}
          columns={ProductColumn.concat(actionColumn)}
          getRowId={(row) => row.productId + row.manufacturerId}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>

    </div>
  )
}

export default ProductList
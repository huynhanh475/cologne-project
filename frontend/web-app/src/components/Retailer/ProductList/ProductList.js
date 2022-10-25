import React, {useState} from 'react';
import './ProductList.css';
import record from './MOCK_DATA (5).json';
import { DataGrid } from "@mui/x-data-grid";
import { ProductColumn } from "./ProductColumn";
import RegisterProductForm from './RegisterProductForm';
import NavBar from '../NavBarRetailer/NavBar';

function ProductList() {
    const data = record;
    const [isRegister, setIsRegister] = useState(false);
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [manufacturerID, setManufacturerID] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");

    const handleOnClickRegister=(a) => {
        setIsRegister(true);
        setProductID(a.productID);
        setName(a.name);
        setManufacturerID(a.manufacturerID);
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
                <div className="registerButton" onClick={()=>handleOnClickRegister(params.row)}>Register</div>
              </div>
            );
          },
        },
    ];
  return (
    <div>
        <div className="navbarcomponent">
          <NavBar/>
        </div>
        <div className='filter_product_retailer'>
            <input
                type="text"
                placeholder="Search by Product ID..."
                onChange={(e)=>{setProductID(e.target.value)}}
            />
        </div>
        <RegisterProductForm isRegister={isRegister} setIsRegister={setIsRegister} productID={productID} name={name} manufacturerID={manufacturerID} date={date} price={price}/>
        <div className="productlisttable">
            <DataGrid
            rows={data}
            columns={ProductColumn.concat(actionColumn)}
            getRowId={(row) => row.productID+row.manufacturerID}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            />
        </div>

    </div>
  )
}

export default ProductList
import React, {useState} from 'react';
import Cologne from '../../images/Cologne.png';
import login from '../../images/login.jpg';
import {Button} from 'antd';
import './ProductForm.css'
import Navbar from '../NavBarManufacturer/NavBar';

function ProductForm() {

  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [manufacturerID, setManufacturerID] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <div>
      <div className="navbarcomponent">
        <Navbar/>
      </div>
      <div className="create-product-background">
        <div className="create-product-container">
          <div className="container-create-product">
            <img src={Cologne} alt="logo" className="logo-create-product" />
            <img src={login} alt="login-image-create-product" className="login-image-create-product" />
          </div>

          <div className="container-2-create-product">
            <div className="create-product-info">
              <div className="create-product-title">Create Product</div>
              <div className="product-info">Product Information</div>
              <div className="line"></div>
              <div className="label-create-product">Product ID</div>
              <input className="label-input-create-product" onChange={(e) => { setProductID(e.target.value)}} />
              <div className="label-create-product">Name</div>
              <input className="label-input-create-product" onChange={(e) => { setName(e.target.value)}}/>
              <div className="label-create-product">Manufacturer ID</div>
              <input className="label-input-create-product" onChange={(e) => { setManufacturerID(e.target.value)}}/>
              <div className="label-create-product">Date</div>
              <input className="label-input-create-product" onChange={(e) => { setDate(e.target.value) }} type="date"/>
              <div className="label-create-product">Price</div>
              <input className="label-input-create-product" onChange={(e) => { setPrice(e.target.value) }}/>
              <div className="label-create-product">Quantity</div>
              <input className="label-input-create-product" onChange={(e) => { setQuantity(e.target.value) }}/>
              <div className="submit-button-create-product">
                <Button type="primary" htmlType="submit">Submit</Button>
              </div>
            </div>
        </div>
      </div>
    </div>
      
    </div>
    
  );
}

export default ProductForm
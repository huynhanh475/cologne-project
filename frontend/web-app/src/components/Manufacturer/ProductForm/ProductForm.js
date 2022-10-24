import React from 'react'
import FormInput from './FormInput';
import { useState } from "react";
import './ProductForm.css'
import Navbar from '../NavBarManufacturer/NavBar';

function ProductForm() {
    const [values, setValues] = useState({
      productID: "",
      name: "",
      manufacturerID: "",
      date: "",
      price: "",
      quantity:""
    });
    
      const inputs = [
        {
          id: 1,
          name: "productID",
          type: "text",
          placeholder: "Product ID",
          label: "Product ID",
          required: true,
        },
        {
          id: 2,
          name: "name",
          type: "text",
          placeholder: "Name of Product",
          label: "Name of Product",
          required: true,
        },
        {
          id: 3,
          name: "manufacturerID",
          type: "text",
          placeholder: "Manufacturer ID",
          label: "Manufacturer ID",
          required: true,
        },
        {
          id: 4,
          name: "date",
          type: "date",
          placeholder: "Date",
          label: "Date",
          required: true,
        },
        {
          id: 5,
          name: "price",
          type: "number",
          placeholder: "Price",
          label: "Price",
          required: true,
        },
        {
          id: 6,
          name: "quantity",
          type: "number",
          placeholder: "Quantity",
          label: "Quantity",
          required: true,
        },
      ];
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <>
            <Navbar/>
            <div className="productform">
                <form onSubmit={handleSubmit}>
                <h1>Create Product</h1>
                {inputs.map((input) => (
                    <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    />
                ))}
                <button className="submitButton">Submit</button>
                </form>
            </div>
        </>
      );
}

export default ProductForm
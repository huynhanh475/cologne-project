import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import './ProductList.css';
import { request } from '../../../utils/request';


function RegisterProductForm({ isRegister, setIsRegister, productId, name, manufacturerId, date, price }) {
    const form = useRef();
    const [quantity, setQuantity] = useState("");

    const handleOk = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("AUTH_DATA");
        const item = { productId, quantity };
        const params = {
            method: "POST",
            url: "/transact/resigerOrder",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok)
            setIsRegister(false);
        document.getElementById("CreateProductForm").reset();
    };

    const handleCancel = () => {
        setIsRegister(false);
        document.getElementById("CreateProductForm").reset();
    };
    return (
        <div>
            <Modal open={isRegister} onOk={handleOk} onCancel={handleCancel} title="Create Product Form">
                <form ref={form} id="CreateProductForm" className="create_form">
                    <div>
                        <label for='productId'>1. Product ID: {productId}</label>
                    </div>

                    <div>
                        <label for='name'>2. Name: {name}</label>
                    </div>

                    <div>
                        <label for='manufacturerId'>3. Manufacturer Id: {manufacturerId}</label>
                    </div>

                    <div>
                        <label for='date'>4. Date: {date}</label>
                    </div>

                    <div>
                        <label for='price'>5. Price: {price}</label>
                    </div>

                    <div>
                        <label for='quantity'>6. Quantity</label>
                        <input type="text" name="quantity" onChange={(e) => { setQuantity(e.target.value) }} required />
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default RegisterProductForm
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
            url: "/transact/registerOrder",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok){
            setIsRegister(false);
            Modal.success({
                content: 'A new batch has been registered!',
            });
        }
            
        document.getElementById("CreateProductForm").reset();
    };

    const handleCancel = () => {
        setIsRegister(false);
        Modal.error({
            content: 'Please fill in the required information!'
        })
        document.getElementById("CreateProductForm").reset();
    };
    return (
        <div>
            <Modal open={isRegister} onOk={handleOk} onCancel={handleCancel} title="Create Product Form">
                <form ref={form} id="CreateProductForm" className="create_form">
                    <div>
                        <label for='productId'>1. Product ID: <strong>{productId}</strong></label>
                    </div>

                    <div>
                        <label for='name'>2. Name: <strong>{name}</strong></label>
                    </div>

                    <div>
                        <label for='manufacturerId'>3. Manufacturer Id: <strong>{manufacturerId}</strong></label>
                    </div>

                    <div>
                        <label for='date'>4. Date created: <strong>{date}</strong></label>
                    </div>

                    <div>
                        <label for='price'>5. Price: <strong>{price}</strong></label>
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
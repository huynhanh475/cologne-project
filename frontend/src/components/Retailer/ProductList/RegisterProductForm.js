import React, { useRef, useState } from 'react';
import { Modal, Button, Input } from 'antd';
import './ProductList.css';
import { request } from '../../../utils/request';


function RegisterProductForm({ isRegister, setIsRegister, productId, name, manufacturerId, date, price }) {
    const form = useRef();
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleOk = async (e) => {
        e.preventDefault();

        if (!quantity) {
            Modal.warning({
                title: 'Failed to register product',
                content: 'Please input required field quantity.',
              })
            return;
        }
        const token = localStorage.getItem("AUTH_DATA");
        const item = { productId, quantity };
        const params = {
            method: "POST",
            url: "/transact/registerOrder",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }

        setIsLoading(true);
        const response = await request(params);
        setIsLoading(false);

        if (response.ok){
            setIsRegister(false);
            Modal.success({
                content: 'A new batch has been registered! Please go to Transaction List to view it.',
            });
        }
            
        document.getElementById("CreateProductForm").reset();
    };

    const handleCancel = () => {
        setIsRegister(false);
        document.getElementById("CreateProductForm").reset();
    };
    return (
        <div>
            <Modal 
                open={isRegister}
                onOk={handleOk} 
                onCancel={handleCancel} 
                title="Register Batch Order Form"
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isLoading} disabled={isLoading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
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
                        <span for='quantity'>6. Quantity: </span>
                        <Input style={{width: "320px"}} type="number" name="quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                    </div>

                </form>
            </Modal>
        </div>
    )
}

export default RegisterProductForm
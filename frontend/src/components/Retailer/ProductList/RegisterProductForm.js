import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import './ProductList.css';

function RegisterProductForm({ isRegister, setIsRegister, productID, name, manufacturerID, date, price }) {
    const form = useRef();
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        const registerOrder = async () => {
          let rawData = await response.text();
          let jsonData = JSON.parse(rawData);
          setData(jsonData["data"]);
        };
        registerOrder();
        return () => { };
      }, []);

    const handleOk = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("AUTH_DATA");
        const item = { "productId": productID, "quantity": quantity };
        const params = {
            method: "POST",
            url: "/transact/resigerOrder",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);

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
                        <label for='productID'>1. Product ID: {productID}</label>
                    </div>

                    <div>
                        <label for='name'>2. Name: {name}</label>
                    </div>

                    <div>
                        <label for='manufacturerID'>3. Manufacturer ID: {manufacturerID}</label>
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
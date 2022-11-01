import React from 'react';
import { Modal } from 'antd';
import { request } from '../../../utils/request';

function ConfirmModal({ isConfirm, setIsConfirm, batchId, productId, manufacturerId, retailerId, delivererId, date, quantity }) {
    const token = localStorage.getItem("AUTH_DATA");

    const handleOk = async (e) => {
        e.preventDefault();
        const item = { batchId };
        const params = {
            method: "POST",
            url: "/transact/receiveProduct",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok){
            setIsConfirm(false);
            Modal.success({
                content: await response.text(),
            });
        }
        else{
            setIsConfirm(false);
            Modal.error({
                content: await response.text(),
            });
        }
            
    };

    const handleCancel = () => {
        setIsConfirm(false);
    };
    
    return (
        <>
            <Modal title="Transfer Confirmation" open={isConfirm} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>1. Batch ID: {batchId}</p>
                    <p>2. Product ID: {productId}</p>
                    <p>3. Manufacturer ID: {manufacturerId}</p>
                    <p>4. Retailer ID: {retailerId}</p>
                    <p>5. Deliverer ID: {delivererId}</p>
                    <p>6. Date: {date}</p>
                    <p>7. Quantity: {quantity}</p>
                </div>
            </Modal>
        </>
    )
}

export default ConfirmModal
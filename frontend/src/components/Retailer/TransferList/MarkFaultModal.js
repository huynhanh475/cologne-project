import React from 'react';
import { Modal } from 'antd';

function MarkFaultModal({ isMarkFault, setIsMarkFault, batchId, productId, manufacturerId, retailerId, delivererId, date, quantity }) {
    const item = { batchId };
    const handleOk = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("AUTH_DATA");
        const params = {
            method: "POST",
            url: "/batch/report",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok)
            setIsConfirm(false);
    };

    const handleCancel = () => {
        setIsMarkFault(false);
    };
    return (
        <>
            <Modal title="Mark Fault" open={isMarkFault} onOk={handleOk} onCancel={handleCancel}>
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

export default MarkFaultModal
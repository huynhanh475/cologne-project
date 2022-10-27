import React from 'react';
import {Modal} from 'antd';

function ConfirmModal({isConfirm, setIsConfirm, batchID, productID, manufacturerID, retailerID, delivererID, date, quantity}) {
    const handleOk = () => {
        setIsConfirm(false);
    };
    
    const handleCancel = () => {
        setIsConfirm(false);
    };
  return (
    <>
        <Modal title="Transfer Confirmation" open={isConfirm} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <p>1. Batch ID: {batchID}</p>
                <p>2. Product ID: {productID}</p>
                <p>3. Manufacturer ID: {manufacturerID}</p>
                <p>4. Retailer ID: {retailerID}</p>
                <p>5. Deliverer ID: {delivererID}</p>
                <p>6. Date: {date}</p>
                <p>7. Quantity: {quantity}</p>
            </div>
        </Modal>
    </>
  )
}

export default ConfirmModal
import React from 'react';
import {Modal} from 'antd';

function TransferModal({isTransfer, setIsTransfer, batchID, productID, manufacturerID, retailerID, delivererID, quantity}) {
    const handleOk = () => {
        setIsTransfer(false);
    };
    
    const handleCancel = () => {
        setIsTransfer(false);
    };
  return (
    <>
        <Modal title="Transfer Confirmation" open={isTransfer} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <p>1. Batch ID: {batchID}</p>
                <p>2. Product ID: {productID}</p>
                <p>3. Manufacturer ID: {manufacturerID}</p>
                <p>4. Retailer ID: {retailerID}</p>
                <p>5. Deliverer ID: {delivererID}</p>
                <p>6. Quantity: {quantity}</p>
            </div>
        </Modal>
    </>
  )
}

export default TransferModal
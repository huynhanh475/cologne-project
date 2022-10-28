import React from 'react';
import {Modal} from 'antd';

function MarkFaultModal({isFault, setIsFault, batchID, productID, manufacturerID, retailerID, delivererID}) {
    const handleOk = () => {
        setIsFault(false);
    };
    
    const handleCancel = () => {
        setIsFault(false);
    };
  return (
    <>
        <Modal title="Mark Fault Confirmation" open={isFault} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <p>1. Batch ID: {batchID}</p>
                <p>2. Product ID: {productID}</p>
                <p>3. Manufacturer ID: {manufacturerID}</p>
                <p>4. Retailer ID: {retailerID}</p>
                <p>5. Deliverer ID: {delivererID}</p>
            </div>
        </Modal>
    </>
  )
}

export default MarkFaultModal;
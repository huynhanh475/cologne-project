import React from 'react';
import {Modal} from 'antd';
import { request } from '../../../utils/request';

function TransferModal({isTransfer, setIsTransfer, batchId, productId, manufacturerId, retailerId, delivererId, quantity}) {
    const handleOk = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("AUTH_DATA");
        const item = {batchId};
        const params = {
          method: "POST",
          url: "/transact/transferToDeliverer",
          body: item,
          headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok){
            setIsTransfer(false);
        }
    };
    
    const handleCancel = () => {
        setIsTransfer(false);
    };
  return (
    <>
        <Modal title="Transfer Confirmation" open={isTransfer} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <p>1. Batch ID: {batchId}</p>
                <p>2. Product ID: {productId}</p>
                <p>3. Manufacturer ID: {manufacturerId}</p>
                <p>4. Retailer ID: {retailerId}</p>
                <p>5. Deliverer ID: {delivererId}</p>
                <p>6. Quantity: {quantity}</p>
            </div>
        </Modal>
    </>
  )
}

export default TransferModal
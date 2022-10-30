import React from 'react';
import {Modal} from 'antd';
import { request } from '../../../utils/request';

function TransferModal({isTransfer, setIsTransfer, batchID, productID, manufacturerID, retailerID, delivererID, quantity}) {
    const handleOk = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("AUTH_DATA");
        const item = {batchID};
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
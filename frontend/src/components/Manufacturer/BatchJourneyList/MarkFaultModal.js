import React from 'react';
import {Modal} from 'antd';
import { request } from '../../../utils/request';

function MarkFaultModal({isFault, setIsFault, batchID, productID, manufacturerID, retailerID, delivererID}) {
    const handleOk = async (e) =>  {
        e.preventDefault();
        const token = localStorage.getItem("AUTH_DATA");
        const item = {batchID};
        const params = {
          method: "POST",
          url: "/batch/report",
          body: item,
          headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        if (response.ok){
            setIsFault(false);
        }
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
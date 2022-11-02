import { Modal } from 'antd';
import React, { useState, useRef } from 'react';
import './DelivererList.css';
import { request } from '../../../utils/request';

function DelivererForm({ isOpenModal, setIsOpenModal, delivererId }) {
  const form = useRef();
  const [batchId, setBatchId] = useState("");
  // const [retailerID, setRetailerID] = useState("");
  // const [delivererID, setDelivererID] = useState("");
  const handleOk = async () => {
    const token = localStorage.getItem("AUTH_DATA");
    const item = { batchId, delivererId};
    const params = {
      method: "POST",
      url: "/transact/inviteDeliverer",
      body: item,
      headers: { 'Content-Type': "application/json", 'x-access-token': token },
    }
    const response = await request(params);
    if (response.ok) {
      setIsOpenModal(false);
      Modal.success({
        content: "Invitation is sent to deliverer!",
      });
      document.getElementById("InviteDelivererForm").reset();
    } else {
      Modal.error({
        content: await response.json().message,
      });
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
    document.getElementById("InviteDelivererForm").reset();
  };

  return (
    <div>
      <Modal title="Invite Deliverers"
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}>
        <form ref={form} id="InviteDelivererForm" className="create_form">
          <div>
            <label htmlFor='delivererID'>Deliverer ID</label>
            <input type="text" name="delivererId" value={delivererId} readOnly required />
          </div>
{/* 
          <div>
            <label for='retailerID'>Retailer ID</label>
            <input type="text" name="retailerID" placeholder="Enter retailer ID: " onChange={(e) => { setRetailerID(e.target.value) }} required />
          </div> */}

          <div>
            <label htmlFor='batchID'>Batch ID</label>
            <input type="text" name="batchId" placeholder="Enter batch ID: " onChange={(e) => { setBatchId(e.target.value) }} required />
          </div>
        </form>

      </Modal>
    </div>
  )
}

export default DelivererForm;
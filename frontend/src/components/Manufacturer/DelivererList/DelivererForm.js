import { Modal } from 'antd';
import React, {useState, useRef} from 'react';
import './DelivererList.css';

function DelivererForm({isOpenModal, setIsOpenModal, delivererID}) {
  const form = useRef();
  const [batchID, setBatchID] = useState("");
  const [retailerID, setRetailerID] = useState("");
  // const [delivererID, setDelivererID] = useState("");
  const handleOk = () => {
    setIsOpenModal(false);
    document.getElementById("InviteDelivererForm").reset();
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
                <label for='delivererID'>Deliverer ID</label>
                <input type="text" name="delivererID" value={delivererID} required/>
              </div>

              <div>
                <label for='retailerID'>Retailer ID</label>
                <input type="text" name="retailerID" placeholder="Enter retailer ID: " onChange={(e)=>{setRetailerID(e.target.value)}} required/>
              </div>

              <div>
                <label for='batchID'>Batch ID</label>
                <input type="text" name="batchID" placeholder="Enter batch ID: " onChange={(e)=>{setBatchID(e.target.value)}} required/>
              </div>
            </form>
            
          </Modal>
      </div>
  )
}

export default DelivererForm;
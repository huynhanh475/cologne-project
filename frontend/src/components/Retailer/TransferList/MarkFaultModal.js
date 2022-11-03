import React from 'react';
import { Modal } from 'antd';
import { request } from '../../../utils/request';

function MarkFaultModal({ isMarkFault, setIsMarkFault, batchId, productId, manufacturerId, retailerId, delivererId, date, quantity }) {
    const token = localStorage.getItem("AUTH_DATA");
    const [isLoading, setIsLoading] = useState(false);

    const handleOk = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const item = { batchId };
        const params = {
            method: "POST",
            url: "/batch/report",
            body: item,
            headers: { 'Content-Type': "application/json", 'x-access-token': token },
        }
        const response = await request(params);
        setIsLoading(false);
        
        if (response.ok){
            setIsMarkFault(false);
            Modal.success({
                content:await  response.text()
            });
        }
        else{
            setIsMarkFault(false);
            Modal.error({
                content: await response.text()
            });   
        }

    };

    const handleCancel = () => {
        setIsMarkFault(false);
    };

    return (
        <>
            <Modal title="Mark Fault" open={isMarkFault} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isLoading} disabled={isLoading} onClick={handleOk}>
                        Confirm
                    </Button>,
                ]}
            >
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
import React, { createContext, useState } from "react";
import { Switch, Routes, Route } from "react-router-dom";

import ProductForm from '../Manufacturer/ProductForm/ProductForm';
import BatchOrderList from '../Manufacturer/BatchOrderList/BatchOrderList';
import DelivererList from '../Manufacturer/DelivererList/DelivererList';
import BatchJourneyList from '../Manufacturer/BatchJourneyList/BatchJourneyList';
import FaultyBatchList from '../Manufacturer/FaultyBatchList/FaultyBatchList';
import InvitationList from '../Deliverer/InvitationList/InvitationList';
import TransferList from '../Deliverer/TransferList/TransferList';
import BatchJourneyListDeliverer from '../Deliverer/BatchJourneyList/BatchJourneyListDeliverer';
import DelivererFaultyBatch from '../Deliverer/FaultyBatchList/DelivererFaultyBatch';
import ProductList from '../Retailer/ProductList/ProductList';
import RetailerFaultyBatch from '../Retailer/FaultyBatchList/RetailerFaultyBatch';
import RetailerTransferList from '../Retailer/TransferList/RetailerTransferList';
import CreateUserForm from '../Admin/CreateUserForm/CreateUserForm';
import UserList from '../Admin/UserList/UserList';

export default function RootNavigator() {
    return (
        <>
            <Routes>
                <Route path="/manufacturer/productform" element={<ProductForm/>} />
                <Route path="/manufacturer/batchorderlist" element={<BatchOrderList/>} />
                <Route path="/manufacturer/delivererlist" element={<DelivererList/>} />
                <Route path="/manufacturer/batchjourney" element={<BatchJourneyList/>} />
                <Route path="/manufacturer/faultybatch" element={<FaultyBatchList/>} />
                <Route path="/deliverer/invitationlist" element={<InvitationList/>} />
                <Route path="/deliverer/transferlist" element={<TransferList/>} />
                <Route path="/deliverer/batchjourney" element={<BatchJourneyListDeliverer/>} />
                <Route path="/deliverer/faultybatch" element={<DelivererFaultyBatch/>} />
                <Route path="/retailer/productlist" element={<ProductList/>} />
                <Route path="/retailer/transferlist" element={<RetailerTransferList/>} />
                <Route path="/retailer/faultybatch" element={<RetailerFaultyBatch/>} />
                <Route path="/admin/createuser" element={<CreateUserForm/>} />
                <Route path="/admin/userlist" element={<UserList/>} />
            </Routes>
        </>
    );
}